Task Management REST API

A RESTful Task Management API built with Node.js, Express.js, MongoDB, and Mongoose.
This project was created as hands-on practice for backend development, REST APIs, CRUD operations, routing, async/await, and MongoDB update operators.

🚀 Features

Create a new task

Get all tasks

Get a single task by ID

Update a task

Delete a task

Search tasks

MongoDB database integration using Mongoose

Schema validation

Async/await with try/catch error handling

MongoDB update operators such as $set, $inc, $push, and $pull

🛠️ Technologies Used

Node.js

Express.js

MongoDB

Mongoose

JavaScript

Thunder Client / Postman for API testing

📁 Project Structure

project/
├── controllers/
├── models/
├── routes/
├── server.js
├── package.json
├── package-lock.json
└── README.md

The exact folder names may vary depending on the final project structure.

⚙️ Installation

1. Clone the repository

git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <PROJECT_FOLDER_NAME>

2. Install dependencies

npm install

3. Configure environment variables

Create a .env file in the project root:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Do not commit .env to GitHub. Add it to .gitignore.

4. Start the server

For a normal Node.js start:

node server.js

If your project has a development script:

npm run dev

🔗 API Endpoints

Typical endpoints used in this project:

Method

Endpoint

Purpose

GET

/tasks

Get all tasks

GET

/tasks/:id

Get one task by ID

GET

/tasks/search

Search tasks

POST

/tasks

Create a task

PUT

/tasks/:id

Update a task

DELETE

/tasks/:id

Delete a task

The exact endpoint prefix depends on how the routes are mounted in server.js.

📝 Example Request

Create Task

POST /tasks

{
  "title": "Learn MongoDB",
  "status": "pending",
  "priority": "high"
}

Example Response

{
  "_id": "example_id",
  "title": "Learn MongoDB",
  "status": "pending",
  "priority": "high"
}

Mongoose may also add fields such as timestamps and __v, depending on the schema configuration.

🔄 Async/Await

The project uses async/await for database operations:

const tasks = await Task.find();
res.status(200).json(tasks);

await waits for the database operation inside the current async function without blocking the entire Node.js server from handling other requests.

🗄️ MongoDB Update Operators

The project also covers useful MongoDB update operators:

$set — replace/update a field value

$inc — increase or decrease a number

$push — add an item to an array

$pull — remove an item from an array

Example:

await Task.findByIdAndUpdate(
  id,
  { $set: { status: "completed" } },
  { new: true, runValidators: true }
);

🧪 Testing

API endpoints can be tested using Postman or Thunder Client.

Test the following operations:

Create a task

Get all tasks

Get a task by ID

Search tasks

Update a task

Delete a task

🔐 Environment Variables

Never upload sensitive credentials to GitHub.

Example .gitignore:

node_modules/
.env

📚 Learning Outcomes

Through this project, I practiced:

REST API development

Express.js routing

Controllers and models

CRUD operations

MongoDB and Mongoose

Request and response handling

req.body and req.params

Async/await

Error handling with try/catch

MongoDB update operators

API testing with Postman/Thunder Client

Git and GitHub workflow


This repository is part of my backend development and MERN stack learning journey.