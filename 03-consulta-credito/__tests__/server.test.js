const express = require('express')
const request = require('supertest');

const app = express().use(express.json()).use('/', require('../src/app'))

test('Servidor na porta 5678', async () => {

  const resposta = await request(app).get('/');

  expect(resposta.status).toBe(200);
});
