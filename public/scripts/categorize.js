const rp = require('request-promise');
const yelp = require('yelp-fusion');
const client = yelp.client('KlApp9IJGJazvPakCx_WLYokoG2PezkELLTzRMgfo6hxE8MuVWiWhWJwtR7Gi-paJwgUAJXAWeW2GPucixzwte55ir5tu_IfcEvgfGW9xlbof0csEd9bo3VRJhKIXXYx');
const AliExpressSpider = require('aliexpress');

/**
 * imdb api
 * if movie is not found by the api, concludes that it is not a movie
 *
 * if the movie isnt there, it will return {"Response":"False","Error":"Movie not found!"}
 *
 * if the movie is there, we should extract out
 * Title, Year, Genre, Plot, Poster, imdbRating, Type
 * 
 * the return value of the promise need to be parsed by json
 */
const findMovie = (userQuery) => {
  return rp(`http://www.omdbapi.com/?t=${userQuery}&apikey=94910d78`)
    .then(data => {
      const movieObj = JSON.parse(data);
      const {Title, Year, Genre, Plot, Poster, imdbRating, Type} = movieObj;
      return {Title, Year, Genre, Plot, Poster, imdbRating, Type};
    })
    .catch(err => {
      console.log('error during categorizing movie:', err);
    });
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
 * this api does not stop so you have to do process.exit
 */
const findProduct = (userQuery) => {
  return AliExpressSpider.Search({
    keyword: userQuery
  });
};


// const bookPromise = findBook('sweet and sour pork');
// const foodPromise = findRestaurant('sweet and sour pork');

// Promise.all([moviePromise, bookPromise, foodPromise])
//   .then(values => {
//     if (!values[0]) console.log('cant find movie');
//     if (!values[1]) console.log('cant find book');
//     if (!values[2]) console.log('cant find food');
//   });