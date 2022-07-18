import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import users from '../database/models/users';
import * as jwt from 'jsonwebtoken'
import usersInterface from '../interfaces/usersInterface'
import { Response } from 'superagent';
import teams from '../database/models/teams';
import matches from '../database/models/matches';

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
        .resolves({ id: 1, username:'gui', email: 'admin@admin.com', password: 'xablau', role: 'admin' } as users)
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
        .resolves({id: 1, username:'gui', email: 'admin@admin.com', password: 'xablau', role: 'admin'} as users)
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
          password: 'xablau'
        })
      expect(chaiHttpResponse.status).to.be.equal(401)
      expect(chaiHttpResponse.body).to.be.eql({ message: 'Incorrect email or password' })
    })
  })
  describe('Quando o email e senha estão corretos', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves({id: 1, username:'gui', email: 'admin@admin.com', password: 'xablau', role: 'admin'} as users)
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
          password: 'xablau'
        })
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.contain.keys(['token'])
    })
  })
  describe('Quando o email não foi inserido', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves({id: 1, username:'gui', email: 'admin@admin.com', password: 'xablau', role: 'admin'} as users)
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
        .resolves({id: 1, username:'gui', email: 'admin@admin.com', password: 'xablau', role: 'admin'} as users)
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
        sinon
        .stub(jwt, 'verify')
        .resolves(false)
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
  describe('testa /login/validate', () => {
    before(async () => {
      sinon
        .stub(users, "findOne")
        .resolves()
      sinon
        .stub(jwt, 'verify')
        .resolves(true)
    })

    after(()=>{
      (users.findOne as sinon.SinonStub).restore();
    })

    it('Espera um sucesso', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
      expect(chaiHttpResponse.status).to.be.equal(200)
    })
  })

});
describe('testa a camada teams no /teams', () => {
  describe('retorna o array no get', () => {
    before(async () => {
      sinon
        .stub(teams, "findAll")
        .resolves([{id: 1, teamName: 'Xablau'}] as teams[])
    })

    after(()=>{
      (teams.findAll as sinon.SinonStub).restore();
    })
    it('Espera uma resposta com array de times', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.eql([{id: 1, teamName: 'Xablau'}])
    })
  })
  describe('retorna um array vazio quando não há times no banco', () => {
    before(async () => {
      sinon
        .stub(teams, "findAll")
        .resolves([] as teams[])
    })

    after(()=>{
      (teams.findAll as sinon.SinonStub).restore();
    })
    it('Espera uma resposta com array de times', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams')
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.eql([])
    })  

  
  })
  describe('retorna um objeto com id e time', () => {
    before(async () => {
      sinon
        .stub(teams, "findByPk")
        .resolves({id: 1, teamName: 'Flamengo'} as teams)
    })
  
    after(()=>{
      (teams.findAll as sinon.SinonStub).restore();
    })
    it('Espera uma resposta com um objeto de times', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1')
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.equal({id: 1, teamName: 'Flamengo'})
    })
  })
})

describe('testa a camada matches em /matches', () => {
  describe('retorna um array vazio quando não existem partidas', () => {
    before(async () => {
      sinon
        .stub(matches, "findAll")
        .resolves([])
    })

    after(()=>{
      (matches.findAll as sinon.SinonStub).restore();
    })
    it('Espera uma resposta com array vazio', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/matches')
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.eql([])
    })
  })

})

describe('testa a camada matches em /leaderboard', () => {
  describe('retorna um array quando existem partidas', () => {
    before(async () => {
      sinon
        .stub(matches, "findAll")
        .resolves([{
          id: 1,
          homeTeam: 1,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: false,}] as matches[])
      sinon.stub(teams, 'findOne')
      .resolves({
        id: 1,
        teamName: 'Avaí/Kindermann',
      } as teams)
    })

    after(()=>{
      (matches.findAll as sinon.SinonStub).restore();
      (teams.findOne as sinon.SinonStub).restore();
    })
    it('Espera uma resposta com um array', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
      expect(chaiHttpResponse.status).to.be.equal(200)
      expect(chaiHttpResponse.body).to.be.eql([{ 
        team: 'Avaí/Kindermann',
        totalGames: 1,
        totalVictories: 0,
        totalPoints: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 1,
        goalsOwn: 8,
        goalsBalance: -7,
        efficiency: 0,
    }])
  })
  

  })
  describe('retorna um array vazio quando não existem partidas', () => {
    before(async () => {
      sinon
        .stub(matches, "findAll")
        .resolves([{
          id: 1,
          homeTeam: 1,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: false,}] as matches[])
      sinon.stub(teams, 'findOne')
      .resolves({
        id: 1,
        teamName: 'Avaí/Kindermann',
      } as teams)
    })

    after(()=>{
      (matches.findAll as sinon.SinonStub).restore();
      (teams.findOne as sinon.SinonStub).restore();
    })
    it('Espera uma resposta com um array', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
      expect(chaiHttpResponse.status).to.be.equal(400)
      expect(chaiHttpResponse.body).to.not.be.eql([{ 
        team: 'Avaí/Kindermann',
        totalGames: 1,
        totalVictories: 0,
        totalPoints: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 1,
        goalsOwn: 8,
        goalsBalance: -7,
        efficiency: 0,
    }])
  })
  

  })
})


