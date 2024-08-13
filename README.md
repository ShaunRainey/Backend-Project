NC News API

Overview

NC News is a backend server/API built using Express in JavaScript. It provides a range of endpoints for accessing and interacting with news articles, topics, users, and comments. The data is stored in a PostgreSQL database, and the API follows the Model-View-Controller (MVC) architecture. Basic error handling is implemented using Express's next function.

Table of Contents

Installation

Configuration

Endpoints
- GET /api
- GET /api/topics
- GET /api/articles
- GET /api/users
- GET /api/articles/
- GET /api/articles/comments
- POST /api/articles/comments
- PATCH /api/articles/
- DELETE /api/comments/
  
Error Handling


Installation

To set up the NC News API locally, follow these steps:

Clone the repository:

git clone https://github.com/yourusername/nc-news-api.git

cd nc-news-api

Install dependencies:

npm install


Set up PostgreSQL:
Ensure you have PostgreSQL installed and running.

Create a database and configure the connection settings in your environment variables.

Create a .env file:

Create a .env file in the root directory with the following variables:

env

Copy code

PGHOST=your_postgresql_host

PGDATABASE=your_database_name

PGUSER=your_database_user

PGPASSWORD=your_database_password

PORT=your_desired_port

Run the server:

bash
Copy code
npm start
Configuration
The API is configured to run on the port specified in the .env file.
Database connection settings are also taken from the .env file.
Endpoints
GET /api
Description: Displays all available endpoints.
Example Response:
json
Copy code
{
  "endpoints": {
    "GET /api": "Displays all available endpoints",
    "GET /api/topics": "Displays all topics of articles",
    ...
  }
}
GET /api/topics
Description: Displays all topics of articles.
Example Response:
json
Copy code
[
  {
    "slug": "coding",
    "description": "Code is love, code is life"
  },
  ...
]
GET /api/articles
Description: Displays all news articles.
Example Response:
json
Copy code
[
  {
    "article_id": 1,
    "title": "Article Title",
    "body": "Article body content",
    "votes": 100,
    ...
  },
  ...
]
GET /api/users
Description: Displays all user account names.
Example Response:
json
Copy code
[
  {
    "username": "user1",
    "name": "User One",
    "avatar_url": "http://example.com/avatar1.png"
  },
  ...
]
GET /api/articles/
Description: Displays a specific article using its unique article ID.
Parameters:
article_id (required): The unique ID of the article.
Example Response:
json
Copy code
{
  "article_id": 1,
  "title": "Article Title",
  "body": "Article body content",
  "votes": 100,
  ...
}
GET /api/articles/
/comments
Description: Displays all comments associated with a specific article when given the article ID.
Parameters:
article_id (required): The unique ID of the article.
Example Response:
json
Copy code
[
  {
    "comment_id": 1,
    "body": "This is a comment",
    "article_id": 1,
    "author": "user1",
    ...
  },
  ...
]
POST /api/articles/
/comments
Description: Allows a user to post a comment on a specific article.
Parameters:
article_id (required): The unique ID of the article.
Request Body:
json
Copy code
{
  "username": "user1",
  "body": "This is a comment"
}
Example Response:
json
Copy code
{
  "comment_id": 1,
  "body": "This is a comment",
  "article_id": 1,
  "author": "user1",
  ...
}
PATCH /api/articles/
Description: Allows a user to increase the upvotes on an article.
Parameters:
article_id (required): The unique ID of the article.
Request Body:
json
Copy code
{
  "inc_votes": 1
}
Example Response:
json
Copy code
{
  "article_id": 1,
  "title": "Article Title",
  "body": "Article body content",
  "votes": 101,
  ...
}
DELETE /api/comments/
Description: Allows a user to delete their comment by using a unique comment ID.
Parameters:
comment_id (required): The unique ID of the comment.
Example Response:
json
Copy code
{
  "message": "Comment deleted"
}
Error Handling
Errors are handled using Express's next function. Common errors include:

400 Bad Request: Invalid input data.
404 Not Found: Resource not found.
500 Internal Server Error: Server encountered an error.
