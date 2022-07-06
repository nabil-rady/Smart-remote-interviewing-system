require('dotenv').config();
const app = require('../server').app;
const supertest = require('supertest');
const request = supertest(app);
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = require('../utils/create-token');

const User = require('../models/user');
const Notification = require('../models/notification');

describe('User', () => {
  const userId = '7cb300c7-b9b3-488c-a45a-06aa490eeb16';
  const token = createToken(userId, process.env.TOKEN_SECRET, '10h');
  let tokenExpireDate = new Date(0);
  tokenExpireDate.setUTCSeconds(jwt.decode(token).exp);
  describe('profile', () => {
    describe('Get profile info', () => {
      it('Should return 200', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId,
            loggedIn: true,
            emailConfirmed: true,
            password: 'fsgdtshhgdydf',
            verificationCode: '12345678',
          },
        });

        const response = await request
          .get(`/user/${userId}`)
          .set('Authorization', token);
        expect(response.statusCode).toBe(200);

        User.findOne.restore();
      });
    });
    describe('Get profile info for non existing user', () => {
      it('Should return 404', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns();

        const response = await request
          .get(`/user/efafafuhfra`)
          .set('Authorization', token);
        expect(response.statusCode).toBe(404);

        User.findOne.restore();
      });
    });
    describe('Edit phone number', () => {
      describe('Unvalid phone number', () => {
        it('Should return 422', async () => {
          sinon.stub(User, 'findOne');
          User.findOne.returns({
            dataValues: {
              userId,
              loggedIn: true,
              emailConfirmed: true,
              phoneCode: '+20',
              phoneNumber: '1155282790',
            },
          });

          sinon.stub(User, 'update');
          User.update.returns();

          const req = {
            phoneCode: '+20',
            phoneNumber: '1234567At',
          };

          const response = await request
            .put('/user/edit')
            .send(req)
            .set('Authorization', token);
          expect(response.statusCode).toBe(422);

          User.findOne.restore();
          User.update.restore();
        });
      });
      describe('Valid phone number', () => {
        it('Should return 200', async () => {
          sinon.stub(User, 'findOne');
          User.findOne.returns({
            dataValues: {
              userId,
              loggedIn: true,
              emailConfirmed: true,
              phoneCode: '+20',
              phoneNumber: '1155282790',
            },
          });

          sinon.stub(User, 'update');
          User.update.returns();

          const req = {
            phoneCode: '+20',
            phoneNumber: '1155282791',
          };

          const response = await request
            .put('/user/edit')
            .send(req)
            .set('Authorization', token);
          expect(response.statusCode).toBe(200);

          User.findOne.restore();
          User.update.restore();
        });
      });
    });
    describe('Change password', () => {
      describe('Incorrect old password', () => {
        it('Should return 401', async () => {
          const salt = await bcrypt.genSalt(12);
          const password = await bcrypt.hash('12345678', salt);
          sinon.stub(User, 'findOne');
          User.findOne.returns({
            dataValues: {
              userId,
              loggedIn: true,
              emailConfirmed: true,
              password,
            },
          });

          sinon.stub(User, 'update');
          User.update.returns();

          const req = {
            oldPassword: '1234567890',
            newPassword: '123456789',
            newConfirmPassword: '123456789',
          };

          const response = await request
            .put('/user/changepassword')
            .send(req)
            .set('Authorization', token);
          expect(response.statusCode).toBe(401);

          User.findOne.restore();
          User.update.restore();
        });
      });
      describe('Not matching new passwords', () => {
        it('Should return 422', async () => {
          const salt = await bcrypt.genSalt(12);
          const password = await bcrypt.hash('12345678', salt);
          sinon.stub(User, 'findOne');
          User.findOne.returns({
            dataValues: {
              userId,
              loggedIn: true,
              emailConfirmed: true,
              password,
            },
          });

          sinon.stub(User, 'update');
          User.update.returns();

          const req = {
            oldPassword: '1234567890',
            newPassword: '123456789',
            newConfirmPassword: '12345678900',
          };

          const response = await request
            .put('/user/changepassword')
            .send(req)
            .set('Authorization', token);
          expect(response.statusCode).toBe(422);

          User.findOne.restore();
          User.update.restore();
        });
      });
      describe('Valid passwords', () => {
        it('Should return 200', async () => {
          const salt = await bcrypt.genSalt(12);
          const password = await bcrypt.hash('1234567890', salt);
          sinon.stub(User, 'findOne');
          User.findOne.returns({
            dataValues: {
              userId,
              loggedIn: true,
              emailConfirmed: true,
              password,
            },
          });

          sinon.stub(User, 'update');
          User.update.returns();

          const req = {
            oldPassword: '1234567890',
            newPassword: '123456789',
            newConfirmPassword: '123456789',
          };

          const response = await request
            .put('/user/changepassword')
            .send(req)
            .set('Authorization', token);
          expect(response.statusCode).toBe(200);

          User.findOne.restore();
          User.update.restore();
        });
      });
    });
  });

  describe('Notifications', () => {
    const notificationId = '7cb300c7-b9b3-488c-a45a-06aa490eeb75';

    describe('Get notifications with not comfirmed email', () => {
      it('Should return 402', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId,
            loggedIn: true,
            emailConfirmed: false,
          },
        });

        const response = await request
          .get('/user/notifications')
          .set('Authorization', token);
        expect(response.statusCode).toBe(402);

        User.findOne.restore();
      });
    });
    describe('Get notifications', () => {
      it('Should return 200', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId,
            loggedIn: true,
            emailConfirmed: true,
          },
        });

        const response = await request
          .get('/user/notifications')
          .set('Authorization', token);
        expect(response.statusCode).toBe(200);

        User.findOne.restore();
      });
    });
    describe('Read notification', () => {
      it('Should return 200', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId,
            loggedIn: true,
            emailConfirmed: true,
          },
        });

        sinon.stub(Notification, 'findOne');
        Notification.findOne.returns({
          dataValues: {
            manualRead: false,
          },
        });

        sinon.stub(Notification, 'update');
        Notification.update.returns();

        const response = await request
          .post(`/user/read-notification/${notificationId}`)
          .set('Authorization', token);
        expect(response.statusCode).toBe(200);

        User.findOne.restore();
        Notification.findOne.restore();
        Notification.update.restore();
      });
    });
    describe('Read a notification that does not exist', () => {
      it('Should return 404', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            userId,
            loggedIn: true,
            emailConfirmed: true,
          },
        });

        sinon.stub(Notification, 'findOne');
        Notification.findOne.returns();

        sinon.stub(Notification, 'update');
        Notification.update.returns();

        const response = await request
          .post(`/user/read-notification/${notificationId}`)
          .set('Authorization', token);
        expect(response.statusCode).toBe(404);

        User.findOne.restore();
        Notification.findOne.restore();
        Notification.update.restore();
      });
    });
  });
});
