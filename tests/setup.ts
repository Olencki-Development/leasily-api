import * as chai from 'chai'
import * as sinon from 'sinon'
import { Container } from '@halliganjs/service-container'
import container from '../src/container'

type ChaiAndSinonAssert = Chai.Assert & sinon.SinonAssert

const chaiAndSinonAssert = (sinon.assert.expose(chai.assert, {
  prefix: ''
}) as unknown) as ChaiAndSinonAssert

declare module 'mocha' {
  export interface Context {
    assert: ChaiAndSinonAssert
    sinon: sinon.SinonStatic
    container: Container
  }
}

before(function () {
  this.assert = chaiAndSinonAssert
  this.sinon = sinon
  this.container = container
})

beforeEach(function () {
  this.container.reset()
})
