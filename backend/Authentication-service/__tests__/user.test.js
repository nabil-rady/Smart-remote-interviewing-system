require('dotenv').config();
const sequelize = require('../utils/db');
const app = require('../server').app;
const supertest = require('supertest');
const request = supertest(app);
const User = require('../models/user');
const { use } = require('../routes/user');

jest.setTimeout(10000);

describe('User', () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  const user = {
    firstName: 'Test',
    lastName: 'Test',
    companyName: 'Back-end test',
    email: 'backend@test.com',
    password: 123456789,
    confirmPassword: 123456789,
    phoneCode: '+20',
    phoneNumber: '1155282790',
  };

  let jwt, code;

  describe('SignUp', () => {
    describe('SignUp with not valid email', () => {
      it('Should return 422', async () => {
        const user2 = { ...user };
        user2.email = 'not valid email';

        const response = await request.post('/user/signup').send(user2);

        expect(response.statusCode).toBe(422);
      });
    });
    describe('SignUp with not matching passwords', () => {
      it('Should return 422', async () => {
        const user2 = { ...user };
        user2.password = 1234567899;

        const response = await request.post('/user/signup').send(user2);

        expect(response.statusCode).toBe(422);
      });
    });
    describe('Successful signUp', () => {
      it('Should return 201', async () => {
        const response = await request.post('/user/signup').send(user);

        expect(response.statusCode).toBe(201);
      });
    });
    describe('SignUp with exists email', () => {
      it('Should return 422', async () => {
        const response = await request.post('/user/signup').send(user);

        expect(response.statusCode).toBe(422);
      });
    });
  });
  describe('Login', () => {
    describe('Wrong email', () => {
      it('Should return 404', async () => {
        const loginUser = {
          email: 'test@notfound.com',
          password: user.password,
        };
        const response = await request.post('/user/login').send(loginUser);

        expect(response.statusCode).toBe(404);
      });
    });
    describe('Wrong password', () => {
      it('Should return 401', async () => {
        const loginUser = {
          email: user.email,
          password: 111111111,
        };
        const response = await request.post('/user/login').send(loginUser);

        expect(response.statusCode).toBe(401);
      });
    });
    describe('Successful login', () => {
      it('Should return 200', async () => {
        const loginUser = {
          email: user.email,
          password: user.password,
        };
        const response = await request.post('/user/login').send(loginUser);

        expect(response.statusCode).toBe(200);
        jwt = response.body.token;
      });
    });
  });
  describe('Send verificationCode', () => {
    it('Should return 200, verificationCode should not be null', async () => {
      const response = await request
        .post('/user/confirm-email')
        .set('Authorization', jwt);
      expect(response.statusCode).toBe(200);

      const fetchedUser = await User.findOne({
        where: {
          email: user.email,
        },
      });

      expect(fetchedUser.verificationCode).toBeTruthy();
      code = fetchedUser.verificationCode;
    });
  });
  describe('Confirm email', () => {
    describe('Wrong verificationCode', () => {
      it('Should return 422, emailConfirmed still false', async () => {
        const req = {
          verificationCode: 123456,
        };

        const response = await request
          .post('/user/verify')
          .set('Authorization', jwt)
          .send(req);
        expect(response.statusCode).toBe(422);
        const fetchedUser = await User.findOne({
          where: {
            email: user.email,
          },
        });

        expect(fetchedUser.emailConfirmed).toBe(false);
      });
    });
    describe('Right verificationCode', () => {
      it('Should return 200, emailConfirmed is true', async () => {
        const req = {
          verificationCode: code,
        };

        const response = await request
          .post('/user/verify')
          .set('Authorization', jwt)
          .send(req);
        expect(response.statusCode).toBe(200);
        const fetchedUser = await User.findOne({
          where: {
            email: user.email,
          },
        });

        expect(fetchedUser.emailConfirmed).toBe(true);
      });
    });
  });
});
