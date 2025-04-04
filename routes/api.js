'use strict'

module.exports = function (app) {
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema
  const issueSchema = new Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_on: { type: Date, required: true, default: Date.now() },
    updated_on: { type: Date, required: true, default: Date.now() },
    created_by: { type: String },
    assigned_to: { type: String },
    open: { type: Boolean, required: true, default: true },
    status_text: { type: String }
  })
  const Issue = mongoose.model('Issue', issueSchema)
  app
    .route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project
    })

    .post(function (req, res) {
      let project = req.params.project
      const instance = new Issue()
      console.log('processing post; project is ' + project)
      console.log('test data is ' + req.body.issue_title)
      res.json({
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: req.body.status_text,
        created_on: Date.now(),
        updated_on: Date.now(),
        open: true,
        _id: 'someId'
      })
    })

    .put(function (req, res) {
      let project = req.params.project
    })

    .delete(function (req, res) {
      let project = req.params.project
    })
}
