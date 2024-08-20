# NC News API

## Overview

NC News is a backend server/API built using Express in JavaScript. It provides a range of endpoints for accessing and interacting with news articles, topics, users, and comments. The data is stored in a PostgreSQL database, and the API follows the Model-View-Controller (MVC) architecture. Basic error handling is implemented using Express's next function.

## Contents

* Installation
* Configuration
* Endpoints
  - GET /api
  - GET /api/topics
  - GET /api/articles
  - GET /api/users
  - GET /api/articles/
  - GET /api/articles/comments
  - POST /api/articles/comments
  - PATCH /api/articles/
  - DELETE /api/comments/
* Error Handling


## Installation

To set up the NC News API locally, follow these steps:

* Clone the repository: https://github.com/ShaunRainey/Backend-Project.git
* Run npm install
* Add .env files (see NOTE below)
* Run npm start 
* Connect to the API using an app/browser

Notes:
* There are two seperate databases included within this project, one for testing and the other for production. In order to access either, please setup your .env files as appropriate.
* In the directory folder, create two files named .env.test and .env.development, to reference either database as required. Within the files, create the following: "PGDATABASE=database_name_here" replacing the assignment with the appropriate database name (see /db/setup.sql within the project folders). Please make sure the .env files are added to .gitignore and that the database names are not shared publicly!

## Configuration

The API is configured to run on the port specified in the .env file. Database connection settings are also taken from the .env file.

## Endpoint Descriptions
### GET /api
Description: Displays all available endpoints.

Example Response:

    "GET /api": "Displays all available endpoints",
    
    "GET /api/topics": "Displays all topics of articles",
    
    ...


### GET /api/topics

Description: Displays all topics of articles.

Example Response:

    {
      "slug": "coding",
      "description": "Code is love, code is life"
    }

### GET /api/articles

Description: Displays all news articles.

Example Response:

    {
      title: "UNCOVERED: catspiracy to bring down democracy",
      
      topic: "cats",
      
      author: "rogersop",
      
      body: "Bastet walks amongst us, and the cats are taking arms!",
      
      created_at: 1596464040000,
      
      article_img_url:
      
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        
    }

### GET /api/users

Description: Displays all user account names.

Example Response:

    {
      username: 'tickle122',
      name: 'Tom Tickle',
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953'
    }


### GET /api/articles/:article_id

Description: Displays a specific article using its unique article ID.

Parameters:
article_id (required): The unique ID of the article.

### GET /api/articles/:article_id/comments

Description: Displays all comments associated with a specific article when given the article ID.

Parameters:
article_id (required): The unique ID of the article.

Example Response:

    {
      "comment_id": 286,
      "body": "Ut accusamus enim vel voluptate quae temporibus labore neque a. Reprehenderit iste est eos velit fugit vel quod velit.",
      "article_id": 1,
      "author": "cooljmessy",
      "votes": 19,
      "created_at": "2020-04-26T01:14:00.000Z"
    }

### POST /api/articles/:article_id/comments

Description: Allows a user to post a comment on a specific article.

Parameters:
article_id (required): The unique ID of the article.

Request Body:

    {
      username:'butter_bridge',
      body: 'Immortal'
    }

### PATCH /api/articles/:article_id

Description: Allows a user to increase the upvotes on an article.

Parameters:
article_id (required): The unique ID of the article.

Example request Body:

    {
      "inc_votes": 1
    }

### DELETE /api/comments/
Description: Allows a user to delete their comment by using a unique comment ID.

Parameters:
comment_id (required): The unique ID of the comment.

### Error Handling
Errors are handled using Express's next function. Common errors include:

400 Bad Request: Invalid input data.

404 Not Found: Resource not found.

500 Internal Server Error: Server encountered an error.
