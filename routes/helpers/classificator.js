const bayes = require('classificator');
const classifier = bayes();

const foodSeeds = [
  'restaurants near me', 'whats open now', 'late night food in', 'what to eat for lunch', 'what should I eat', 'Where to eat', 'best breakfast in', 'breakfast near me', 'lunch near me', 'chinese food near me', 'best sushi place', 'tim hortons', 'Boston Pizza', 'closest mcdonald\'s', 'all you can eat', 'sushi', 'chinese food', 'japanese food', 'korean food', 'indian food', 'kimchi fried rice', 'fried rice', 'dim sum near me', 'dim sum around me', 'good dim sum near me', 'good dim sum around me', 'good sushi near me', 'good sushi around me',' where to eat', 'cheesecake', 'cake', 'donut', 'shaved ice', 'bubble tea', 'tea', 'pho', 'coffee', 'bakery', 'baked good', 'pizza factory', 'spaghetti factory', 'meat ball spaghetti', 'spaghetti', 'best cheesecake', 'mac and cheese', 'delicious', 'delicious food', 'vegan food', 'vegan', 'vegan burger', 'beyond meat', 'beyond meat burger', 'fast food', 'shitty food', 'junk food', 'fonde', 'chicken', 'almond chicken', 'spicy pork', 'pork belly', 'healthy food', 'healthy restaurant', 'tofu', 'protein', 'smoothie', 'protein shakes', 'smoothie shakes', 'orange', 'orange juice', 'apple', 'apple juice', 'coconut juice', 'coconut water', 'water', 'drinks', 'beers', 'alochol', 'cuisine', 'japadog', 'thai', 'dessert', 'earls', 'earl\'s', 'white spot', 'pub', 'club', 'browns', 'taco', 'a&w', 'organic', 'papa john', 'bread', 'soup', 'where to eat tacos'
];

const bookSeeds = [
  'best selling novel', 'non-fiction', 'what to read', 'how to read', 'self improvement books', 'Jordan Peterson book', 'pop magazine', 'new york times best selling author', 'new york times best selling', 'new york times', 'To Kill a Mockingbird', 'good reads', 'closest bookstore',  '1984 by George Orwell', 'J K Rowling', 'Harry Potter book', 'divergent book', 'lord of the ring book', 'game of thrones book', 'game of thrones', 'shakespeare', 'online pdf', 'amazon kindle', 'kindle books', 'online books', 'e books', 'e-books', 'read textbook', 'read books', 'Jordan Peterson book', 'read textbook', 'read notes', 'read journal', 'read new york times', 'read newspaper', 'read the news', 'audio books', 'audio book', 'spark joy', 'how to win friends and influence people', 'book series', 'volumes', 'programming books', 'language books', 'indigo', 'chapters', 'fiction', 'mystery novel', 'novel', 'ficition novel', 'paperback', 'how to build self discipline', '12 rules for life', 'reicipes', 'vegan recipes', 'chinese recipes', 'korean recipes', 'vegetarian recipes', 'learn java', 'learn css', 'learn to ', 'self help book', 'how to', 'bible', 'christian bible', 'free textbook', 'free pdf', 'reicipe book', 'comic books', 'manga', 'japanese manga', 'comic', 'walking dead comic', 'beginner', 'the beginner guide to', 'the beginner guide', 'guide to', 'guide'
];

const productSeeds = [
  'cheapest laptop', 'how much is a gaming laptop', 'EB Games', 'best buy', 'cheap macbook', 'second hand macbook', 'seconad hand laptop', 'cheap laptop', 'how much is an', 'best price for', 'best online shops', 'amazon prime day', 'amazon prime day sales', 'how much is an iphone', 'how much is', 'where can i buy tissue', 'where can i buy toothpaste', 'male product', 'female product', 'male hygiene product', 'female hygiene product', 'where can i buy glasses', 'second hand iphone', 'second hand iphone x', 'gym clothes', 'summer clothes', 'winter clothes', 'gardening supplies', 'school supplies', 'back to school sales', 'winter sales', 'summer sales', 'pet food', 'pet smart', 'foot locker', 'coquitlam mall', 'guildford mall', 'movie poster', 'stickers', 'shooting games', 'fun games', 'racing games', 'ps4 games', 'xbox games', 'switch games', 'nintendo switch', 'nintendo games', 'calculus textbook', 'where to buy textbook', 'where to buy', 'where can i buy', 'chair', 'skateboard', 'protein powder', 'supplements', 'equipements', 'vitamins', 'paint brush', 'make up', 'lip stick', 'sephora', 'h&m', 'where to buy make up', 'shorts', 'jeans', 'summer shorts', 'summer jeans', 'winter pants', 't shirt', 't-shirt', 'halloween costumes', 'costumes', 'pokemon', 'pokemon games', 'pokemon toys', 'outfit', 'college textbook', 'university textbook', 'keyboard', 'joggle', 'christmas', 'football', 'gear', 'sport', 'muay thai', 'android', 'car', 'truck', 'watch', 'sticker', 'jacket', 'best tv brand', 'medicines', 'apple airpods'
];

const moviesSeeds = [
  'netflix 2019 shows', 'netflix shows', 'movies showtime', 'best tv shows 2018', 'best tv drama 2017', 'hbo drama', 'game of thrones', 'the walking dead', 'lord of the rings', 'the office', 'orange is the new black', 'lion king', 'gang related drama', 'narcos', 'watch something online', 'watch another thing online', 'divergent movie', 'harry potter movie', 'cineplex movies', 'cineplex near', 'cineplex near me', 'horror movies', 'scary movies', 'scary move', 'comedy movies', 'action movies', 'avengers end game', 'first avegeners', 'the art of racing in the rain', 'best movie', 'worst movie', 'stoner movie', 'high movie', 'funny movie', 'japanese movie', 'romance movie', 'best chick flick', 'asian drama', 'drama', 'dramas', 'shows', 'marvel the avengeners', 'marvel', 'spiderman', 'captain america', 'aqua man', 'ultra man', 'catch 22', 'inception', 'shutter island', 'the island', 'jurassic world', 'king kong', 'sci-fi', 'sci-fi movie', 'doctor strange', 'pokemon movies', 'pokemon i choose you', 'toys story 1', 'toy story 2', 'toy story 3', 'christian movie', 'chinese movie', 'korean movies', 'favourite movie', 'one piece movie', 'one piece', 'anime movie', 'pirates of the caribbean movie', 'fast furious', 'john wick',' captain marvel', 'disney', 'aladdin disney', 'disney movies', 'kids movies', 'x-men movies', 'frozen 2', 'christmas movie', 'fight club', 'what should I watch', 'stragner things'
];

// console.log(
//   `food: ${foodSeeds.length}
//    book: ${bookSeeds.length}
//    product: ${productSeeds.length}
//    moviesSeeds: ${moviesSeeds.length}`
// )

foodSeeds.forEach(seed => {
  classifier.learn(seed, 'food');
}); 

bookSeeds.forEach(seed => {
  classifier.learn(seed, 'book');
});

productSeeds.forEach(seed => {
  classifier.learn(seed, 'product');
}); 

moviesSeeds.forEach(seed => {
  classifier.learn(seed, 'movie');
});

module.exports = classifier;