const slides = document.querySelector('.slides');
const playPauseBtn = document.getElementById('play-pause-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
let isPlaying = true;
const totalSlides = document.querySelectorAll('.slide').length;

// Clone the first slide for infinite loop effect
const firstSlide = document.querySelector('.slide').cloneNode(true);
slides.appendChild(firstSlide);

// Update the slide position and active dot
function updateSlide(instant = false) {
  slides.style.transition = instant ? 'none' : 'transform 2.5s ease';
  slides.style.transform = `translateY(-${currentSlide * 150}vh)`;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === (currentSlide % totalSlides));
  });
}

// Move to the next slide
function nextSlide() {
  currentSlide++;
  updateSlide();

  // Reset position if on cloned slide
  if (currentSlide === totalSlides) {
    setTimeout(() => {
      currentSlide = 0;
      updateSlide(true);
    }, 2500); // Delay to match transition duration
  }
}

// Play/Pause functionality
let slideInterval = setInterval(nextSlide, 4000);

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    clearInterval(slideInterval);
    playPauseBtn.textContent = 'Play';
  } else {
    slideInterval = setInterval(nextSlide, 4000);
    playPauseBtn.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
});

// Manual control with navigation dots
dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    currentSlide = parseInt(dot.getAttribute('data-index'), 10);
    updateSlide();

    if (isPlaying) {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 4000);
    }
  });
});

// Initialize the carousel
updateSlide();
