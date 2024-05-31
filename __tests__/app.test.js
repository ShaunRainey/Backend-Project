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
    .get('/api/articles/3/comments')
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

describe('Post request /api/articles/:article_id/comments',() => {
  test('POST:201 adds a comment to specified article with correct shape',() => {
    const newComment = {
      username:'butter_bridge',
      body: 'Immortal'
    }
    return request(app)
    .post('/api/articles/3/comments')
    .send(newComment)
    .expect(201)
    .then((response)=> {
      expect(response.body.comment.author).toBe(newComment.username)
      expect(response.body.comment.body).toBe(newComment.body)
      expect(response.body.comment)
    })
  })
  test('POST:400 responds with an error message when given an invalid id', () => {

    const newComment = {
      username:'butter_bridge',
      body: 'Immortal'
    }
    return request(app)
    .post('/api/articles/iNeedPizza/comments')
    .send(newComment)
    .expect(400)
    .then((response)=> {
      expect(response.body.msg).toBe('Bad request')
  })
  })
  test('POST:404 responds with an error message when given a valid but non-existent id', () => {

    const newComment = {
      username:'butter_bridge',
      body: 'Immortal'
    }
    return request(app)
    .post('/api/articles/07734/comments')
    .send(newComment)
    .expect(404)
    .then((response)=> {
      expect(response.body.msg).toBe('Not Found');
  })
  })
})

describe('Patch request /api/articles/:article_id', () => {
  test('Patch:200 updates an article when given a valid article id', () =>{
    const patchObject = {inc_votes: 120}
    return request(app)
    .patch('/api/articles/3')
    .send(patchObject)
    .expect(200)
    .then((response)=> {
      expect(response.body.article).toEqual({
        article_id: 3,
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: '2020-11-03T09:12:00.000Z',
        votes: 120,
        article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
      })
    })
  })
  test('Patch:404 responds with an error message when given a valid but non-existent id', () => {
    
    const patchObject = {inc_votes: 120}
    
    return request(app)
    .patch('/api/articles/07734')
    .send(patchObject)
    .expect(404)
    .then((response)=> {
      expect(response.body.msg).toBe('Not Found');
    })
  })
  test('Patch:400 responds with an error message when given an invalid id', () => {
  
    const patchObject = {inc_votes: 120}
  
    return request(app)
    .patch('/api/articles/burgersToo')
    .send(patchObject)
    .expect(400)
    .then((response)=> {
      expect(response.body.msg).toBe('Bad request')
  })
  })
})

describe('Delete request /api/comments/:comment_id', ()=>{
  test('Delete:204 deletes a comment when given a valid comment id',() =>{
    return request(app)
    .delete('/api/comments/3')
    .expect(204)
    .then((response)=>{ 
      expect(!response.rows)
    })
  })
  test('Delete:404 responds with an error message when given a valid but non-existent id', () => {
    
    return request(app)
    .delete('/api/comments/3142')
    .expect(404)
    .then((response)=> {
      expect(response.body.msg).toBe('Not Found');
    })
  })
  test('Delete:400 responds with an error message when given an invalid id', () => {
    
    return request(app)
    .delete('/api/comments/GitGudScrub')
    .expect(400)
    .then((response)=> {
      expect(response.body.msg).toBe('Bad request');
    })
  })
})

describe('/api/users', () => {
  test('GET:200 sends an array of all users to the client', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((response) => {
        expect(response.body.length).toBe(4);
        response.body.forEach((user) => {
          expect(user).toMatchObject({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
          });
        });
      });
  })
  test('GET:404 error when given an invalid URL',() => {
    return request(app)
    .get('/api/Fiji')
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("URL doesn't exist")
    })
  })
})

describe('/api/articles', () => {
  test('GET:200 sends an articles array of articles filtered by the query', () => {
    return request(app)
      .get('/api/articles?topic=cats')
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(1);
        expect(response.body.articles).toBeSortedBy('created_at',{descending: true})
        response.body.articles.forEach((article) => {
          expect(article.topic).toBe('cats')
          expect(article).toMatchObject({
              title: expect.any(String),
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
  test('GET:400 sends an error message if given an invalid query', () => {
    return request(app)
      .get('/api/articles?topic=cfsbdfb')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Invalid Query')
        })
      })
    })
