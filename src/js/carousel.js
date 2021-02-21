class Carousel {
  /**
   * carousel constructor function
   * @param {object} options 
   */
  constructor(options) {
    // destructure options object to construct Carousel class property
    const { container, icon, title, subtitle } = options;
    this.container = container;
    this.icon = icon;
    this.title = title;
    this.subtitle = subtitle;
    this.fetchCards = options.fetchCards;

    // generate for every Carousel instance a random chunk size from 3 to 6
    this.chunkSize = Math.floor(Math.random() * 4 ) + 3;

    // get carousel DOM element
    this.carouselEl = document.getElementById(container);

    // call the function for rendering the component
    this.renderComponent();
  }

  /**
   * render the whole component
   */
  renderComponent() {
    // carousel base template
    this.carouselEl.innerHTML = `
      <div id="${this.container}">
        <!-- carousel header -->
        <header class="carousel-header">
          <div class="icon-wrapper">
            <i class="far fa-${this.icon}"></i>
          </div>
          <section class="title-section">
            <h3 class="title">${this.title}</h3>
            <p class="subtitle">${this.subtitle}</p>
          </section>
        </header>
        
        <!-- carousel cards section -->
        <section class="cards-section">
          <!-- single card -->
          <div class="cards"></div>

          <!-- navigation arrows -->
          <div class="arrow prev">
            <i class="fas fa-chevron-left"></i>
          </div>
          <div class="arrow next">
            <i class="fas fa-chevron-right"></i>
          </div>

        </section>
      </div>
    `;

    // add listeners to navigation arrows
    this.carouselEl.querySelector('.prev').addEventListener('click', () => {
      this.generateCards();
    });
    this.carouselEl.querySelector('.next').addEventListener('click', () => {
      this.generateCards();
    });

    // generate cards into cards section
    this.generateCards();
  }

  /**
   * render a fake loading cards list
   * after 1.5s delay, generate a real cards list
   */
  generateCards() {
    // get cards wrapper DOM element
    this.cards = this.carouselEl.querySelector('.cards');

    // generate fake loading cards
    this.renderCards(true);

    // generate cards after 1.5s timeout (to simulate API call)
    setTimeout(() => {
      this.renderCards(false);
    }, 1500);
  }

  /**
   * render a generated cards array
   * if loading argument is true, all cards generated simulate a loading image
   * if false, an array of cards with random images is generated
   * @param {boolean} loading 
   */
  renderCards(loading) {

    let cardList = [];
    if(loading) {
      const card = {
        image: 'https://www.jqueryscript.net/images/loading-indicator-view.jpg',
        type: 'loading...',
        duration: 0,
        title: 'Loading...',
        cardinality: '',
      }
      for(let i = 0; i < this.chunkSize; i++) {
        cardList.push(card);
      }
    } else {
      cardList = this.fetchCards(this.chunkSize);
    }
    
    // delete and re-render the cardList array
    this.cards.innerHTML = '';
    cardList.forEach( card => {
      // convert duration in a human readable format
      const time = this.secondsToHuman(card.duration);
      const newCard = `
        <div class="card">
          <div class="card-image-wrapper">
            <img class="card-image" src="${card.image}" alt="oops..image not found">
            <span class="type">${card.type}</span>
            <span class="duration">${time}</span>
          </div>
          <h4 class="card-title">${card.title}</h4>
        </div>
      `;
      this.cards.innerHTML += newCard;
    });
  }

  /**
   * converts an integer number of minutes into human readable format
   * @param {number} sec 
   */
  secondsToHuman(sec) {
    const hours = Math.floor(((sec % 31536000) % 86400) / 3600);
    const minutes = Math.floor((((sec % 31536000) % 86400) % 3600) / 60);
    let seconds = (((sec % 31536000) % 86400) % 3600) % 60;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;

    return (hours > 0) ? `${hours}h ${minutes}m` : `${minutes}:${seconds}`;
  }
}

export default Carousel;