const express = require('express');
const tagService = require('./tags-service');

const tagRouter = express.Router();

tagRouter.route('/').get((req, res, next) => {
  tagService
    .getAllTags(req.app.get('db'))
    .then((tags) => {
      return res.json(tags);
    })
    .catch(next);
});

module.exports = tagRouter;
