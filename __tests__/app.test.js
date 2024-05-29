const request = require('supertest');
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const { articleData, commentData, topicData, userData } = require('../db/data/test-data/index');
const app = require('../app');
const jsonRef = require("../endpoints.json");

beforeAll(() => seed({ articleData, commentData, topicData, userData }));
afterAll(() => db.end());

describe('/api/topics', () => {
    test('GET:200 sends an array of all topics to the client', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
          expect(response.body.topics.length).toBe(3);
          response.body.topics.forEach((topic) => {
            expect(topic).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String)
            });
          });
        });
    })
    test('GET:404 error when given an invalid URL',() => {
      return request(app)
      .get('/api/combatWombat')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("URL doesn't exist")
      })
    })
})

describe('/api', () => {
  test('GET:200 sends an object describing all available end points on server', () => {
    return request(app)
    .get('/api')
    .expect(200)
    .then((response) => {
      expect(response.body.endPoints).toEqual(jsonRef)
    })
  })
})

describe.skip('/api/articles/:article_id', ()=>{
  test('Get:200 sends an object matching the article requested', ()=>{
    return request(app)
    .get('/api/articles/5')
    .expect(200)
    .then((response) => {
      expect(response.body).toMatchObject({
        author: expect.any(String), 
        title: expect.any(String),
        article_id: expect.any(Number),
        body: expect.any(String), 
        topic: expect.any(String),
        created_at: expect.any(Date),
        votes: expect.any(integer),
        article_img_url: expect.any(String)
      })
    })
  })
  test('Get:400 responds with an error message when given an invalid id',() => {
  })

  test('Get:404 responds with an error message when given a valid but non-existent id',()=> {
  })
})
