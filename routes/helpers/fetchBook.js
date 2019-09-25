const { findBook } = require('./taskFunction');


module.exports = (req, res) => {
  const book = Object.keys(req.body)[0];
  findBook(book)
    .then(bookInfo => {
      res.send(bookInfo);
    });
};