const cardService = require('./card-service');

async function checkCardExists(req, res, next) {
  const { id } = req.params;

  if (!Number(id)) {
    return res.status(400).send('Card ID must be an integer');
  }

  try {
    const card = await cardService.getCardById(req.app.get('db'), id);
    if (!card) {
      return res.status(404).send('That card does not exist');
    }
    res.card = card;
    return next();
  } catch (error) {
    return next(error);
  }
}

function checkCardContent(req, res, next) {
  const { userId, title, content, tags } = req.body;

  if (!userId) {
    return res.status(400).send('Card must contain a user id');
  }
  if (!title) {
    return res.status(400).send('Card must contain a title');
  }
  if (!content) {
    return res.status(400).send('Card must contain content');
  }
  if (!tags) {
    return res.status(400).send('Card must contain a valid tag');
  }

  if (content.length > 500) {
    return res.status(400).send('Card content cannot exceed 500 characters');
  }

  if (content.length <= 3) {
    return res.status(400).send('Card content must exceed 3 characters');
  }

  if (title.length <= 3) {
    return res.status(400).send('Card title must exceed 3 characters');
  }
  return next();
}

function checkUserId(req, res, next) {
  const { id } = req.params;

  cardService.getCardById(req.app.get('db'), id).then((card) => {
    if (card.user_id !== res.userId) {
      return res.status(401).send('You cannot modify other user posts!');
    }
    return next();
  });
}

module.exports = { checkUserId, checkCardExists, checkCardContent };
