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
        assigned_to: { type: String, default: '' },
        open: { type: Boolean, required: true, default: true },
        status_text: { type: String, default: '' },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId()
        }
      }
    ]
  })
  const Issue = mongoose.model('Issue', issueSchema)
  app
    .route('/api/issues/:project')

    .get(async function (req, res) {
      let project = req.params.project
      console.log('processing get; project is ' + project)
      const foundProject = await Issue.findOne({ project_name: project })
      if (req.query._id) {
        console.log('passed in _id query; _id is ' + req.query._id)
        const foundIssueById = await Issue.findOne(
          { _id: foundProject._id },
          { issue_data: { $elemMatch: { _id: req.query._id } } }
        )
        console.log('foundIssueById: ' + foundIssueById)
        res.send(foundIssueById.issue_data)
        return
      }
      var filters = {}
      if (req.query.created_by) {
        console.log(
          'passed in created_by query; created_by is ' + req.query.created_by
        )
        filters.created_by = req.query.created_by
      }
      if (req.query.assigned_to) {
        console.log(
          'passed in assigned_to query; assigned_to is ' + req.query.assigned_to
        )
        filters.assigned_to = req.query.assigned_to
      }

      //console.log('processing get; project is ' + project + "; foundProject is " + foundProject)
      const issueData = foundProject.issue_data
      console.log('filters is ' + JSON.stringify(filters))
      const filteredIssues = issueData.filter(item =>
        Object.keys(filters).every(key => item[key] === filters[key])
      )
      console.log('length of filteredIssues is ' + filteredIssues.length)
      if (filteredIssues.length < 5)
        console.log('filteredIssues: ' + filteredIssues)
      res.send(filteredIssues)
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
      var activeId
      const foundProject = await Issue.findOne({ project_name: project })
      if (!foundProject) {
        const instance = new Issue({
          project_name: project,
          issue_data: [
            {
              issue_title: req.body.issue_title,
              issue_text: req.body.issue_text,
              created_by: req.body.created_by,
              assigned_to: req.body.assigned_to
            }
          ]
        })
        const savedIssue = await instance.save()
        activeId = savedIssue._id
        console.log('saved new instance; activeId is ' + activeId)
      } else {
        activeId = foundProject._id
        //console.log("foundProject is " + foundProject)
        const update = {
          $push: {
            issue_data: {
              issue_title: req.body.issue_title,
              issue_text: req.body.issue_text,
              created_by: req.body.created_by,
              assigned_to: req.body.assigned_to
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
        //issue_data: [{
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status_text: '',
        created_on: Date.now(),
        updated_on: Date.now(),
        open: true,
        //}],
        _id: activeId
      })
    })

    .put(function (req, res) {
      let project = req.params.project
      console.log("in put code")
      console.log("req.body: " + JSON.stringify(req.body))
      res.json({result: 'successfully updated',_id: req.body._id})
    })

    .delete(function (req, res) {
      let project = req.params.project
    })
}
