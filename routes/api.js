'use strict'

module.exports = function (app) {
  const mongoose = require('mongoose')
  const Schema = mongoose.Schema
  const issueSchema = new Schema({
    project_name: { type: String, required: true },
    issue_data: [
      {
        issue_title: { type: String, required: true },
        issue_text: { type: String, required: true },
        created_on: { type: Date, required: true, default: Date.now() },
        updated_on: { type: Date, required: true, default: Date.now() },
        created_by: { type: String, required: true },
        assigned_to: { type: String },
        open: { type: Boolean, required: true, default: true },
        status_text: { type: String }
      }
    ]
  })
  const Issue = mongoose.model('Issue', issueSchema)
  app
    .route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project
      console.log('processing get; project is ' + project)
    })

    .post(async (req, res) => {
      let project = req.params.project
      console.log('processing post; project is ' + project)
      console.log('issue_title is ' + req.body.issue_title)
      console.log('issue_text is ' + req.body.issue_text)
      console.log('created_by is ' + req.body.created_by + '\n')
      if (
        !req.body.issue_title ||
        !req.body.issue_text ||
        !req.body.created_by
      ) {
        res.json({ error: 'required field(s) missing' })
        return
      }
      const foundProject = Issue.findOne({ project_name: project })
      var activeId
      if (!foundProject) {
        const instance = new Issue({
          project_name: project,
          issue_data: [
            {
              issue_title: req.body.issue_title,
              issue_text: req.body.issue_text,
              created_by: req.body.created_by
            }
          ]
        })
        const savedIssue = await instance.save()
        activeId = savedIssue._id
      } else {
        activeId = foundProject._id
        const update = {
          $push: {
            issue_data: {
              issue_title: req.body.issue_title,
              issue_text: req.body.issue_text,
              created_by: req.body.created_by
            }
          }
        }
        const updatedProject = await Issue.findOneAndUpdate(
          { _id: activeId },
          update,
          { new: true }
        )
      }
      res.json({
        project_name: project,
        issue_data: {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: '',
        created_on: Date.now(),
        updated_on: Date.now(),
        open: true},
        _id: activeId
      })
    })

    .put(function (req, res) {
      let project = req.params.project
    })

    .delete(function (req, res) {
      let project = req.params.project
    })
}
