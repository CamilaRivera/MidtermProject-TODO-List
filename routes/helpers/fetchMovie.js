const { findMovie } = require('./taskFunction');


module.exports = (req, res) => {
  const movie = Object.keys(req.body)[0];
  findMovie(movie)
    .then(movieInfo => {
      res.send(movieInfo);
    });
};