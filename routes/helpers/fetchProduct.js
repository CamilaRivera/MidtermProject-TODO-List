const {findProduct} = require('./taskFunction');
const google = require('google-parser');

module.exports = (req, res) => {
  const product = Object.keys(req.body)[0];
  google.img(product)
    .then(productImg => {
      res.send([findProduct(product.split(" ").join("+")), productImg]);
    });
};