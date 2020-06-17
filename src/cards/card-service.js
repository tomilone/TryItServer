const CardService = {
  getAllCards(db) {
    return db.select('*').from('cards');
  },
  insertCard(db, newCard) {
    return db.insert(newCard).into('cards').returning('*');
  },
  updateTries(db, id, tries) {
    return db('cards').where({ id }).update({ tries });
  },
  updateCardContent(db, id, content) {
    return db('cards')
      .where({ id })
      .update({ content })
      .returning('*')
      .then((rows) => rows[0]);
  },
  getCardById(db, id) {
    return db('cards').where({ id }).first();
  },
  getUserCards(db, userId) {
    return db('cards').select('*').where({ user_id: userId });
  },
  deleteCard(db, id) {
    return db('cards').where({ id }).delete();
  },
};

module.exports = CardService;
