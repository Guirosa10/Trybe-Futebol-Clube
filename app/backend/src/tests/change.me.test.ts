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

describe('Faz o login', () => {
  /**des
   * Exemplo do uso de stubs com tipos
   */
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
    });
    


  })
  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
