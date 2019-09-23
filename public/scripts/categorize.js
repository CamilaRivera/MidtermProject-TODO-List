const rp = require('request-promise');
const yelp = require('yelp-fusion');
const client = yelp.client('KlApp9IJGJazvPakCx_WLYokoG2PezkELLTzRMgfo6hxE8MuVWiWhWJwtR7Gi-paJwgUAJXAWeW2GPucixzwte55ir5tu_IfcEvgfGW9xlbof0csEd9bo3VRJhKIXXYx');
const AliExpressSpider = require('aliexpress');

/**
 * imdb api
 * if movie is not found by the api, concludes that it is not a movie
 */
const findMovie = (userQuery) => {
  return rp(`http://www.omdbapi.com/?t=${userQuery}&apikey=94910d78`);
};


/**
 * google book api
 * if book is not found by the api, concludes that it is not a book
 */
const findBook = (userQuery) => {
  return rp(`https://www.googleapis.com/books/v1/volumes?q=${userQuery}`);
};

/**
 * yelp api for finding restauratns
 */

const findRestaurant = (userQuery) => {
  return client.search({
    term: userQuery,
    location: 'Vancouver, bc'
  });
};


/**
 * aliexpress api for product
 * this api does not stop so you have to do
 */


const findProduct = (userQuery) => {
  return AliExpressSpider.Search({
    keyword: userQuery
  });
};

