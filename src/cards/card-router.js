const express = require('express');
const CardService = require('./card-service');
const logger = require('../logger');
const { json } = require('express');
const requireToken = require('../middleware/requireToken');
const {
  checkUserId,
  checkCardExists,
  checkCardContent,
} = require('./card-helper');

const CardRouter = express.Router();
const jsonBodyParser = express.json();

CardRouter.route('/')
  .get((req, res, next) => {
    const { userId } = req.query;

    if (userId) {
      return CardService.getUserCards(req.app.get('db'), userId).then(
        (userCards) => {
          return res.json(userCards);
        }
      );
    }

    CardService.getAllCards(req.app.get('db'))
      .then((cards) => {
        return res.json(cards);
      })
      .catch(next);
  })
  .post(jsonBodyParser, requireToken, checkCardContent, (req, res) => {
    const { title, content, tags, userId } = req.body;
    const newCard = { title, content, tags, userId };

    CardService.insertCard(req.app.get('db'), newCard)
      .then((card) => {
        logger.info(`card with id of ${card.id} has been created!`);
        return res.status(201).location(`/cards/${card.id}`).json(card);
      })
      .catch((err) => console.log(err));
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

CardRouter.route('/:id')
  .all(checkCardExists)
  .get((req, res) => res.json(card))
  .patch(
    jsonBodyParser,
    requireToken,
    checkUserId,
    checkCardContent,
    (req, res) => {
      const { id } = req.params;
      const { content } = req.body;

      return CardService.updateCardContent(
        req.app.get('db'),
        id,
        content
      ).then((updatedCard) => res.status(200).json(updatedCard));
    }
  )
  .delete(jsonBodyParser, requireToken, checkUserId, (req, res) => {
    const { id } = req.params;

    return CardService.deleteCard(req.app.get('db'), id).then(
      res.status(204).end()
    );
  });

module.exports = CardRouter;
