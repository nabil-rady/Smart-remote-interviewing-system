require('dotenv').config();
const app = require('../server').app;
const supertest = require('supertest');
const request = supertest(app);
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = require('../utils/create-token');

const User = require('../models/user');
const Question = require('../models/question');
const JobListing = require('../models/jobListing');
const Keyword = require('../models/keyword');
const Interview = require('../models/interview');
const Video = require('../models/video');
const Notification = require('../models/notification');
const Result = require('../models/result');

describe('JobListing', () => {
  const userId = '7cb300c7-b9b3-488c-a45a-06aa490eeb16';
  const token = createToken(userId, process.env.TOKEN_SECRET, '10h');
  let tokenExpireDate = new Date(0);
  tokenExpireDate.setUTCSeconds(jwt.decode(token).exp);

  describe('Create', () => {
    describe('Create a jobListing with a passed expiryDate', () => {
      it('Should return 422', async () => {
        const listing = {
          positionName: 'JobListing',
          expiryDate: '2022-04-28',
          questions: [
            {
              statement: 'Question 1.1',
              keywords: ['aab', 'bba', 'cca'],
              timeToThink: 3,
              timeToAnswer: 5,
            },
            {
              statement: 'Question 1.2',
              keywords: ['dda', 'eea', 'ffa'],
              timeToThink: 7,
              timeToAnswer: 15,
            },
          ],
        };

        const response = await request
          .post('/job-listing/create')
          .send(listing)
          .set('Authorization', token);
        expect(response.statusCode).toBe(422);
      });
    });
    describe('Create a jobListing with no questions', () => {
      it('Should return 422', async () => {
        const listing = {
          positionName: 'JobListing',
          expiryDate: '2022-09-28',
          questions: [],
        };

        const response = await request
          .post('/job-listing/create')
          .send(listing)
          .set('Authorization', token);
        expect(response.statusCode).toBe(422);
      });
    });
    describe('Create a jobListing with a question that has no statement', () => {
      it('Should return 422', async () => {
        const listing = {
          positionName: 'JobListing',
          expiryDate: '2022-09-28',
          questions: [
            {
              statement: '',
              keywords: ['aab', 'bba', 'cca'],
              timeToThink: 3,
              timeToAnswer: 5,
            },
            {
              statement: 'Question 1.2',
              keywords: ['dda', 'eea', 'ffa'],
              timeToThink: 7,
              timeToAnswer: 15,
            },
          ],
        };

        const response = await request
          .post('/job-listing/create')
          .send(listing)
          .set('Authorization', token);
        expect(response.statusCode).toBe(422);
      });
    });
    describe('Create a jobListing with a negative answer time', () => {
      it('Should return 422', async () => {
        const listing = {
          positionName: 'JobListing',
          expiryDate: '2022-09-28',
          questions: [
            {
              statement: 'Question 1.1',
              keywords: ['aab', 'bba', 'cca'],
              timeToThink: 3,
              timeToAnswer: -15,
            },
            {
              statement: 'Question 1.2',
              keywords: ['dda', 'eea', 'ffa'],
              timeToThink: 7,
              timeToAnswer: 15,
            },
          ],
        };

        const response = await request
          .post('/job-listing/create')
          .send(listing)
          .set('Authorization', token);
        expect(response.statusCode).toBe(422);
      });
    });
    describe('Create a valid jobListing', () => {
      it('Should return 201', async () => {
        sinon.stub(User, 'findOne');
        User.findOne.returns({
          dataValues: {
            loggedIn: true,
            emailConfirmed: true,
          },
        });

        sinon.stub(JobListing, 'create');
        JobListing.create.returns({
          dataValues: {
            jobListingId: 'fdasufsgjnhrfnsjlgnsgfsngagfndbhseoughfi',
          },
        });

        sinon.stub(Question, 'create');
        Question.create.returns({
          dataValues: {
            questionId: 'fdasufsgjnhrfnsjlgnsgfsngagfndbhseoughfi',
          },
        });

        sinon.stub(Keyword, 'create');
        Keyword.create.returns({
          dataValues: {
            value: 'fdasufsgjnhrfnsjlgnsgfsngagfndbhseoughfi',
          },
        });

        sinon.stub(Keyword, 'findAll');
        Keyword.findAll.returns([
          {
            dataValues: {
              value: 'fdasufsgjnhrfnsjlgnsgfsngagfndbhseoughfi',
            },
          },
        ]);

        const listing = {
          positionName: 'JobListing',
          expiryDate: '2022-09-28',
          questions: [
            {
              statement: 'Question 1.1',
              keywords: ['aab', 'bba', 'cca'],
              timeToThink: 3,
              timeToAnswer: 15,
            },
            {
              statement: 'Question 1.2',
              keywords: ['dda', 'eea', 'ffa'],
              timeToThink: 7,
              timeToAnswer: 15,
            },
          ],
        };

        const response = await request
          .post('/job-listing/create')
          .send(listing)
          .set('Authorization', token);
        expect(response.statusCode).toBe(201);

        User.findOne.restore();
        JobListing.create.restore();
        Question.create.restore();
        Keyword.create.restore();
        Keyword.findAll.restore();
      });
    });
  });
  describe('Get user listings', () => {
    it('Should return 200', async () => {
      sinon.stub(User, 'findOne');
      User.findOne.returns({
        dataValues: {
          loggedIn: true,
          emailConfirmed: true,
        },
      });

      sinon.stub(JobListing, 'findAll');
      JobListing.findAll.returns([
        {
          dataValues: {
            jobListingId: 'fdasufsgjnhrfnsjlgnsgfsngagfndbhseoughfi',
            Interviews: [
              {
                dataValues: {
                  processed: true,
                },
              },
            ],
          },
        },
      ]);

      const response = await request
        .get('/job-listing/get-listings')
        .set('Authorization', token);
      expect(response.statusCode).toBe(200);

      User.findOne.restore();
      JobListing.findAll.restore();
    });
  });
  //   describe('Invite applicantes', ()=>{
  //     describe('Successful invitations', ()=>{
  //         it('Should return 200', async()=>{
  //             sinon.stub(User, 'findOne');
  //             User.findOne.returns({
  //                 dataValues:{
  //                     loggedIn: true,
  //                     emailConfirmed: true
  //                 }
  //             });

  //             sinon.stub(JobListing, 'findOne');
  //             JobListing.findOne.returns([{
  //                 dataValues:{
  //                     jobListingId: 'ef0d7b7c-bb86-4229-970a-32e85f05d0f3',
  //                 }
  //             }]);

  //             sinon.stub(Interview, 'findOne');
  //             Interview.findOne.returns();

  //             sinon.stub(Interview, 'create');
  //             Interview.create.returns();

  //             const req = {
  //                 listingId: "ef0d7b7c-bb86-4229-970a-32e85f05d0f3",
  //                 candidates: [
  //                     {
  //                         name: "Mohamed Medhat",
  //                         email: "mohamed.medhat2199@gmail.com",
  //                         phoneCode: "+20",
  //                         phoneNumber: 1155282790
  //                     },
  //                     {
  //                         name: "3M Medo",
  //                         email: "test@test.com",
  //                         phoneCode: "+20",
  //                         phoneNumber: 1155282790
  //                     }
  //                 ]
  //             };

  //             const response = await request.post('/job-listing/invite').send(req).set('Authorization', token);
  //             expect(response.statusCode).toBe(200);

  //             User.findOne.restore();
  //             JobListing.findOne.restore();
  //             Interview.findOne.restore();
  //             Interview.create.restore();
  //         });
  //       });
  //     });
});
