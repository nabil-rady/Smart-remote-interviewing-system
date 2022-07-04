require('dotenv').config();
const app = require('../server').app;
const supertest = require('supertest');
const request = supertest(app);
const sinon = require('sinon');

const Interview = require('../models/interview');
const JobListing = require('../models/jobListing');
const Question = require('../models/question');

describe('Candidate', () => {
  describe('Join interview', () => {
    describe('Join with non valid code', () => {
      it('Should return 404', async () => {
        sinon.stub(Interview, 'findOne');
        Interview.findOne.returns();

        const response = await request.get('/candidate/join/Ai59OK12');

        expect(response.statusCode).toBe(404);

        Interview.findOne.restore();
      });
    });
    describe('Join with an interview code that has started before', () => {
      it('Should return 403', async () => {
        sinon.stub(Interview, 'findOne');
        Interview.findOne.returns({
          dataValues: {
            interviewId: '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
            name: 'test',
            email: 'backend@test.com',
            phoneCode: '+20',
            phoneNumber: '1155282790',
            invitationCode: '53AY3819',
            started: true,
          },
        });

        const response = await request.get('/candidate/join/53AY3819');

        expect(response.statusCode).toBe(403);

        Interview.findOne.restore();
      });
    });
    describe('Successful join interview', () => {
      it('Should return 200', async () => {
        sinon.stub(Interview, 'findOne');
        Interview.findOne.returns({
          dataValues: {
            interviewId: '7cb300c7-b9b3-488c-a45a-06aa490eeb16',
            name: 'test',
            email: 'backend@test.com',
            phoneCode: '+20',
            phoneNumber: '1155282790',
            invitationCode: '53AY3819',
            started: false,
          },
        });

        sinon.stub(Interview, 'update');
        Interview.update.returns();

        sinon.stub(JobListing, 'findOne');
        JobListing.findOne.returns({
          dataValues: {},
        });

        sinon.stub(Question, 'findAll');
        Question.findAll.returns([]);

        const response = await request.get('/candidate/join/53AY3819');

        expect(response.statusCode).toBe(200);

        Interview.findOne.restore();
        Interview.update.restore();
        Question.findAll.restore();
        JobListing.findOne.restore();
      });
    });
  });
});
