// ================================================
// Generate Demo Content
// ================================================
const NUM_SLIDES_TO_MAKE = 5;

const getRandomImageUrl = () => {
  const random = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/500/400/?${random}`;
};

const makePhotoCards = () => {
  const photos = [];

  for (let i=0; i<NUM_SLIDES_TO_MAKE; i++) {
    const photoCard = document.createElement('div');
    photoCard.classList.add('photo-card');
    const image = new Image();
    image.src = getRandomImageUrl();
    photoCard.appendChild(image);
    photos.push(photoCard);
  }

  return photos;
}

// ================================================
// Carousel
// ================================================

class Carousel {
  constructor(element) {
    this.container = element;
    this.slidesContainer = this.container.querySelector('.slides');
  }

  makeAndAppendSlide(content) {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.appendChild(content);
    this.slidesContainer.appendChild(slide);
  }
}

// ================================================
// Main
// ================================================

var carouselEl = document.querySelector('.carousel');
var carousel = new Carousel(carouselEl);

const photos = makePhotoCards();
photos.forEach(photo => carousel.makeAndAppendSlide(photo));
