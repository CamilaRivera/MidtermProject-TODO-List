const { findRestaurant } = require('./taskFunction');


module.exports = (req, res) => {
  const movie = Object.keys(req.body)[0];
  findRestaurant(movie)
    .then(movieInfo => {
      res.send(movieInfo);
    });
};