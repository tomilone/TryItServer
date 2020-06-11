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
  //author is an int
  getUserCards(db, author) {
    return db('cards').where({ author });
  },
  deleteCard(db, id) {
    return db('cards').where({ id }).delete();
  },
};

module.exports = CardService;
