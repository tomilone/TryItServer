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
};

module.exports = CardService;
