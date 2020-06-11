const express = require('express');
const CardService = require('./card-service');
const logger = require('../logger');
const { json } = require('express');

const CardRouter = express.Router();
const jsonBodyParser = express.json();

CardRouter.route('/')
  .get((req, res, next) => {
    CardService.getAllCards(req.app.get('db'))
      .then((cards) => {
        return res.json(cards);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    for (const field of ['title', 'content', 'tags', 'author']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send({
          error: { message: `${field} is required` },
        });
      }
    }

    const { title, content, tags, author } = req.body;
    const newCard = { title, content, tags, author };

    CardService.insertCard(req.app.get('db'), newCard)
      .then((card) => {
        logger.info(`card with id of ${card.id} has been created!`);
        return res.status(201).location(`/cards/${card.id}`).json(card);
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { tries } = req.body;
    const { id } = req.body;

    CardService.updateTries(req.app.get('db'), id, tries)
      .then((numRowsAffected) => {
        return res.status(204).end();
      })
      .catch(next);
  });

module.exports = CardRouter;
