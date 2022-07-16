require('dotenv').config();
const app = require('../server').app;
const supertest = require('supertest');
const request = supertest(app);
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = require('../utils/create-token');

const User = require('../models/user');

describe('User', () => {
  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    companyName: 'Back-end test',
    email: 'backend@test.com',
    password: 123456789,
    confirmPassword: 123456789,
    phoneCode: '+20',
    phoneNumber: '1155282790',
  };

  describe('SignUp', () => {
    describe('SignUp with not valid email', () => {
      it('Should return 422', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const user2 = { ...testUser };
        user2.email = 'not valid email';

        const response = await request.post('/user/signup').send(user2);

        expect(response.statusCode).toBe(422);

        User.findOne.restore();
      });
    });
    describe('SignUp with not matching passwords', () => {
      it('Should return 422', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const user2 = { ...testUser };
        user2.password = 1234567899;

        const response = await request.post('/user/signup').send(user2);

        expect(response.statusCode).toBe(422);

        User.findOne.restore();
      });
    });
    describe('Successful signUp', () => {
      it('Should return 201', async () => {
        sinon.stub(User, 'create');
        User.create.returns({
          dataValues: {
            userId: '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
            loggedIn: false,
            emailConfirmed: false,
            firstName: 'Test',
            lastName: 'Test',
            companyName: 'Back-end test',
            email: 'backend@test.com',
            phoneCode: '+20',
            phoneNumber: '1155282790',
          },
        });

        const response = await request.post('/user/signup').send(testUser);

        expect(response.statusCode).toBe(201);

        User.create.restore();
      });
    });
    describe('SignUp with exists email', () => {
      it('Should return 422', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          email: 'backend@test.com',
        });

        const response = await request.post('/user/signup').send(testUser);

        expect(response.statusCode).toBe(422);

        User.findOne.restore();
      });
    });
  });
  describe('Login', () => {
    describe('Wrong email', () => {
      it('Should return 404', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns();

        const loginUser = {
          email: 'test@notfound.com',
          password: testUser.password,
        };
        const response = await request.post('/user/login').send(loginUser);

        expect(response.statusCode).toBe(404);

        User.findOne.restore();
      });
    });
    describe('Wrong password', () => {
      it('Should return 401', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId: '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
            loggedIn: true,
            emailConfirmed: true,
            firstName: 'Test',
            lastName: 'Test',
            companyName: 'Back-end test',
            email: 'backend@test.com',
            phoneCode: '+20',
            phoneNumber: '1155282790',
            password: 'sdfszguonsdnfusoahn',
          },
        });

        const loginUser = {
          email: testUser.email,
          password: 111111111,
        };
        const response = await request.post('/user/login').send(loginUser);

        expect(response.statusCode).toBe(401);

        User.findOne.restore();
      });
    });
    describe('Successful login', () => {
      it('Should return 200', async () => {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(testUser.password.toString(), salt);
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId: '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
            loggedIn: true,
            emailConfirmed: true,
            firstName: 'Test',
            lastName: 'Test',
            companyName: 'Back-end test',
            email: 'backend@test.com',
            phoneCode: '+20',
            phoneNumber: '1155282790',
            password: hash,
          },
        });

        sinon.stub(User, 'update');
        User.update.returns();

        const loginUser = {
          email: testUser.email,
          password: testUser.password,
        };
        const response = await request.post('/user/login').send(loginUser);

        expect(response.statusCode).toBe(200);

        User.findOne.restore();
        User.update.restore();
      });
    });
  });
  describe('Confirm email', () => {
    const token = createToken(
      '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
      process.env.TOKEN_SECRET,
      '10h'
    );
    let tokenExpireDate = new Date(0);
    tokenExpireDate.setUTCSeconds(jwt.decode(token).exp);

    describe('Wrong verificationCode', () => {
      it('Should return 422, emailConfirmed still false', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId: '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
            loggedIn: true,
            emailConfirmed: false,
            firstName: 'Test',
            lastName: 'Test',
            companyName: 'Back-end test',
            email: 'backend@test.com',
            phoneCode: '+20',
            phoneNumber: '1155282790',
            verificationCode: '11111111',
            verificationCodeGenerationDate: '2022-07-4T17:29:18.000Z',
          },
        });

        sinon.stub(User, 'update');
        User.update.returns();

        const req = {
          verificationCode: '12345678',
        };

        const response = await request
          .post('/user/verify')
          .set('Authorization', token)
          .send(req);

        expect(response.statusCode).toBe(422);

        User.findOne.restore();
        User.update.restore();
      });
    });
    describe('Right verificationCode', () => {
      it('Should return 200, emailConfirmed is true', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId: '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
            loggedIn: true,
            emailConfirmed: false,
            firstName: 'Test',
            lastName: 'Test',
            companyName: 'Back-end test',
            email: 'backend@test.com',
            phoneCode: '+20',
            phoneNumber: '1155282790',
            verificationCode: '12345678',
            verificationCodeGenerationDate: '2022-07-4T17:29:18.000Z',
          },
        });

        sinon.stub(User, 'update');
        User.update.returns();

        const req = {
          verificationCode: '12345678',
        };

        const response = await request
          .post('/user/verify')
          .set('Authorization', token)
          .send(req);

        expect(response.statusCode).toBe(200);

        User.findOne.restore();
        User.update.restore();
      });
    });
  });
});
