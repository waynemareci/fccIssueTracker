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
        created_by: req.body.created_by
      })
    })

    .put(function (req, res) {
      let project = req.params.project
    })

    .delete(function (req, res) {
      let project = req.params.project
    })
}
