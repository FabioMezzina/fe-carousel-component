class Carousel {
  /**
   * carousel constructor function
   * @param {object} options 
   */
  constructor(options) {
    // destructure options object to construct Carousel class property
    const { container, icon, title, subtitle, fetchCards } = options;
    this.container = container;
    this.icon = icon;
    this.title = title;
    this.subtitle = subtitle;
    this.fetchCards = fetchCards;

    // generate for every Carousel instance a random chunk size from 3 to 6
    this.chunkSize = Math.floor(Math.random() * 4 ) + 3;

    // get carousel DOM element
    this.carouselEl = document.getElementById(container);

    // call the function for rendering the component after 1.5s timeout (to simulate API call)
    setTimeout(() => {
      this.renderComponent();
    }, 1500);
  }

  /**
   * generate cards array to be rendered
   */
  generateCards() {
    this.cards = this.fetchCards(this.chunkSize);
  }

  /**
   * render the whole component
   */
  renderComponent() {
    // ...

    // add listener to navigation arrows
    this.carouselEl.querySelector('.prev').addEventListener('click', this.generateCards);
    this.carouselEl.querySelector('.next').addEventListener('click', this.generateCards);
  }

  /**
   * render cards array
   */
  renderCards() {

  }
}

export default Carousel;