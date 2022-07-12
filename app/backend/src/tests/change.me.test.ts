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
        (Example.findOne as sinon.SinonStub).restore();
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
      (Example.findOne as sinon.SinonStub).restore();
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
      (Example.findOne as sinon.SinonStub).restore();
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
      (Example.findOne as sinon.SinonStub).restore();
    })

    interface ItokenInterface {
      token: string
    }

    it('Espera um erro com mensagem quando o email está incorreto', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login/validate')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin'
        })
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.contain.keys('token')
    })
  })
  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
