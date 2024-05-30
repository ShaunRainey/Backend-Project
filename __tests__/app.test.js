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
          expect(response.body.length).toBe(3);
          response.body.forEach((topic) => {
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

describe('/api/articles/:article_id', ()=>{
  test('Get:200 sends an object matching the article requested', ()=>{
    return request(app)
    .get('/api/articles/5')
    .expect(200)
    .then((response) => {
      expect(response.body.article).toMatchObject({
        author: expect.any(String), 
        title: expect.any(String),
        article_id: expect.any(Number),
        body: expect.any(String), 
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        article_img_url: expect.any(String)
      })
    })
  })
  test('Get:400 responds with an error message when given an invalid id',() => {
    return request(app)
    .get('/api/teams/not-a-team')
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("URL doesn't exist");
    });
  })

  test('Get:404 responds with an error message when given a valid but non-existent id',()=> {
    return request(app)
    .get('/api/articles/999')
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe('article does not exist');
    });
  })
})

describe('/api/articles', () => {
  test('GET:200 sends an articles array of article objects with desired properties', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(13);
        expect(response.body.articles).toBeSortedBy('created_at',{descending: true})
        response.body.articles.forEach((article) => {
          expect(article).toMatchObject({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              article_id: expect.any(Number),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number)
          });
        });
      });
  })
})

describe('/api/articles/:article_id/comments', ()=>{
  test('Get:200 sends an array of comments for the given article_id', ()=>{
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then((response) => {
      expect(response.body.comments).toBeSortedBy('created_at',{descending: true})
      response.body.comments.forEach((comment) =>{
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String), 
          body: expect.any(String), 
          article_id: expect.any(Number),
        })
      })
    })
  })
  test('Get:400 responds with an error message when given an invalid id',() => {
    return request(app)
    .get('/api/articles/HallelujahGoat/comments')
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("Bad request");
    });
  })

  test('Get:404 responds with an error message when given a valid but non-existent id',()=> {
    return request(app)
    .get('/api/articles/155/comments')
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe('Not Found');
    });
  })
})