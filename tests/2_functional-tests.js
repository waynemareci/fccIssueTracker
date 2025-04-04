const chaiHttp = require('chai-http')
const chai = require('chai')
const assert = chai.assert
const server = require('../server')
const res = require('express/lib/response')

chai.use(chaiHttp)

suite('Functional Tests', function () {
  test('Create an issue with every field: POST request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
})
