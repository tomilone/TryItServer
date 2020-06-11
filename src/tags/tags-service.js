const tagService = {
  getAllTags(db) {
    return db.select('*').from('tags');
  },
};

module.exports = tagService;
