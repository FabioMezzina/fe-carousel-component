import Carousel from './carousel.js';

// types and cardinalities allowed values array
// used to randomly chose a value for 'type' and 'category' card property
const types = ['video', 'playlist', 'news', 'other'];
const cardinalities = ['single', 'collection'];

/**
 * reusable fetchCards function
 * it returns "chunkSize" card objects to be displayed in the carousel
 */
const fetchCards = chunkSize => {
  console.log('ciao');
  // create and populate the cards array to be returned
  let cards = [];
  for( let i = 0; i < chunkSize; i++) {
    cards.push({
      image: 'https://picsum.photos/150/100',
      type: types[Math.floor(Math.random() * 4)],
      duration: 3600, // duration in seconds, must be converted in human readable format
      title: 'Just a title',
      cardinality: cardinalities[Math.floor(Math.random() * 2)],
    });
  }
  // return the JSON-like array of new cards to render
  return cards;
}

/* First carousel instance */
const options1 = {
  container: 'myCarousel1',
  icon: 'collections',
  title: 'Fresh and just uploaded content >',
  subtitle: 'lorem ipsum dolor sit amet, consectetur adipisicing elit. Cras mollis condimentum nisl a tristique.',
  /**
   * function that returns "chunkSize" card objects to be displayed in the carousel
   */
  fetchCards: fetchCards,
};
const carousel1 = new Carousel(options1);

/* Second carousel instance */
const options2 = {
  container: 'myCarousel2',
  icon: 'event_seat',
  title: 'Another carousel instance title',
  subtitle: 'Totam illo magnam officiis minus suscipit, enim laboriosam delectus culpa libero dignissimos.',
  /**
   * function that returns "chunkSize" card objects to be displayed in the carousel
   */
  fetchCards: fetchCards,
};
const carousel2 = new Carousel(options2);