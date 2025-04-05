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
      .post('/api/issues/someIssue')
      .send({issue_data: {
        issue_title: 'Some issue',
        issue_text: 'blah blah blah',
        created_by: 'me',
        assigned_to: 'him'
      }})
      .end((err, res) => {
        assert.strictEqual(res.body.project_name,'someIssue')
        assert.strictEqual(res.body.issue_data.issue_title, 'Some issue')
        assert.strictEqual(res.body.issue_data.issue_text, 'blah blah blah')
        assert.strictEqual(res.body.issue_data.created_by, 'me')
        assert.strictEqual(res.body.issue_data.assigned_to, 'him')
        assert.strictEqual(res.body.issue_data.status_text, '')
        done()
      })
  })
  test('Create an issue with only required fields: POST request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Create an issue with missing required fields: POST request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('View issues on a project: GET request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('View issues on a project with one filter: GET request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Update one field on an issue: PUT request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Update an issue with missing _id: PUT request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Delete an issue: DELETE request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Delete an issue with an invalid_id: DELETE request to /api/issues/{project}', done => {
    chai
      .request(server)
      .put('')
      .send()
      .end((err, res) => {
        assert.strictEqual(res.body.issue_title, undefined)
        done()
      })
  })
  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', done => {
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
