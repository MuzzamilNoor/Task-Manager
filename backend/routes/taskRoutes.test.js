const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

let token;
let createdTaskId;

const testUser = {
  name: 'Test User',
  email: `testuser_${Date.now()}@example.com`,
  password: 'password123',
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await request(app).post('/api/v1/auth/register').send(testUser);
  const res = await request(app).post('/api/v1/auth/login').send({
    email: testUser.email,
    password: testUser.password,
  });
  token = res.body.token; 
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Task CRUD', () => {
  test('POST /tasks - creates a new task', async () => {
    const res = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', priority: 'medium' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
    createdTaskId = res.body._id;
  });

  test('GET /tasks - returns list of tasks', async () => {
    const res = await request(app)
      .get('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /tasks without token - returns 401', async () => {
    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toBe(401);
  });

  test('PUT /tasks/:id - updates a task', async () => {
    const res = await request(app)
      .put(`/api/v1/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Task');
  });

  test('DELETE /tasks/:id - deletes a task', async () => {
    const res = await request(app)
      .delete(`/api/v1/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});