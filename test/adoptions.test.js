import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js'; 

describe('Adoptions Router', () => {
  it('should return 200 OK and an array of adoptions', async () => {
    const response = await request(app).get('/api/adoptions');

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('payload').to.be.an('array');
    expect(response.body.payload).to.be.empty;
  });

  it('should create a new adoption and return 201 Created', async () => {
    // Es necesario usar IDs de usuarios y mascotas que existan en la base de datos.
    // Sugerencia: puedes usar el endpoint de mocking para crear datos de prueba.
    const validUserId = 'becf2410c8fcd60cf24fea6f'; 
    const validPetId = '6897d5de231910c1d36d3f13'; 

    const newAdoptionData = {
      userId: validUserId,
      petId: validPetId,
    };

    const response = await request(app)
      .post('/api/adoptions')
      .send(newAdoptionData);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('status').to.equal('success');
    expect(response.body).to.have.property('payload').to.be.an('object');
    expect(response.body.payload).to.have.property('userId').to.equal(validUserId);
    expect(response.body.payload).to.have.property('petId').to.equal(validPetId);
  });
});