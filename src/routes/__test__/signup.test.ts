import request from 'supertest';
import { app } from '../../app';

it('Returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('Returns 400 with invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'invalidemail',
      password: 'password'
    })
    .expect(400);
});

it('Returns 400 with invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pas'
    })
    .expect(400);
});

it('Returns 400 with missing password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('Returns 400 with missing password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('Returns 400 with missing email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      password: 'password'
    })
    .expect(400);
});

it('Returns 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password'
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com'
    })
    .expect(400);
});

it('Disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400);
});

it('Sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
