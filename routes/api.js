'use strict'

module.exports = function (app) {
  app
    .route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project
    })

    .post(function (req, res) {
      let project = req.params.project
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
        _id: "someId"
      })
    })

    .put(function (req, res) {
      let project = req.params.project
    })

    .delete(function (req, res) {
      let project = req.params.project
    })
}
