import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import users from '../database/models/users';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tenta fazer o login', () => {
  describe('quando não existem usuários no banco de dados', () => {
    /* let chaiHttpResponse: Response; */
    
    before(async () => {
      sinon
        .stub(users, "findByPk")
        .resolves()
    })

    after(()=>{
        (users.findOne as sinon.SinonStub).restore();
    })

    it('Espera um erro status 400', async () => {
        const chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            username: "trybe",
            password: "trybe"
          })
        
        expect(chaiHttpResponse.status).to.be.equal(400)
    })
  })

  describe('Quando a senha está incorreta', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves()
    })

    after(()=>{
      (users.findOne as sinon.SinonStub).restore();
    })

    it('Espera um erro com mensagem quando a senha está incorreta', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'xablaui'
        })
      expect(chaiHttpResponse.status).to.be.equal(401)
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Incorrect email or password' })
    })
  })
  describe('Quando o email está incorreto', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves()
    })

    after(()=>{
      (users.findOne as sinon.SinonStub).restore();
    })
    
    it('Espera um erro com mensagem quando o email está incorreto', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'xabmin@xaadmin.com',
          password: 'xablaui'
        })
      expect(chaiHttpResponse.status).to.be.equal(401)
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Incorrect email or password' })
    })
  })
  describe('Quando o email e senha estão corretos', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves()
    })

    after(()=>{
      (users.findOne as sinon.SinonStub).restore();
    })

    it('Espera um erro com mensagem quando o email está incorreto', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        })
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.contain.keys(['token'])
    })
  })
  describe('Quando o email não foi inserido', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves()
    })

    after(()=>{
      (users.findOne as sinon.SinonStub).restore();
    })

    it('Espera um erro com status', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: 'secret_admin'
        })
      expect(chaiHttpResponse.status).to.be.equal(400)
      expect(chaiHttpResponse.body).to.be.contain.keys(['message'])
    })
  })
  describe('Quando o password não foi inserido', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves()
    })

    after(()=>{
      (users.findOne as sinon.SinonStub).restore();
    })

    it('Espera um erro com status', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com'
        })
      expect(chaiHttpResponse.status).to.be.equal(400)
      expect(chaiHttpResponse.body).to.be.contain.keys(['message'])
    })
  })
  describe('testa /login/validate', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves()
    })

    after(()=>{
      (users.findOne as sinon.SinonStub).restore();
    })

    it('Espera um erro com status', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .send({
          authorization: "auh190230aspdn10923a1293u9asdn12j93",
        })
      expect(chaiHttpResponse.status).to.be.equal(400)
      expect(chaiHttpResponse.body).to.be('no token')
    })
  })
  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
