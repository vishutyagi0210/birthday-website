// Select all cards
const cards = document.querySelectorAll('.card');

// Add click event listener to each card
cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
    
    // Add some confetti effect when opening
    if (card.classList.contains('open')) {
      createConfetti(card);
    }
  });
});

// Function to create confetti effect
function createConfetti(card) {
  const colors = ['#ff6b6b', '#48dbfb', '#7d5fff', '#1dd1a1', '#feca57', '#ff9ff3'];
  
  // Create 50 confetti particles
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-particle';
    
    // Random position, color, and animation duration
    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random() * 0.5;
    
    // Apply styles
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = color;
    confetti.style.left = `${left}%`;
    confetti.style.animationDuration = `${duration}s`;
    confetti.style.animationDelay = `${delay}s`;
    
    // Add to DOM
    document.body.appendChild(confetti);
    
    // Remove after animation completes
    setTimeout(() => {
      confetti.remove();
    }, (duration + delay) * 1000);
  }
}

// Function to manage the continuous flow of images
function manageBackgroundFlow() {
  const collageImages = document.querySelectorAll('.collage-image');
  
  // Initially set random animation durations for each image
  collageImages.forEach(image => {
    if (!image.style.animationDuration) {
      const duration = 20 + Math.random() * 10; // Random duration between 20-30s
      image.style.animationDuration = `${duration}s`;
    }
  });
}

// Call the function when the page loads
window.addEventListener('load', manageBackgroundFlow);

// CSS for confetti (added programmatically to avoid editing the CSS file directly)
const style = document.createElement('style');
style.textContent = `
  .confetti-particle {
    position: fixed;
    top: -10px;
    z-index: 100;
    border-radius: 50%;
    animation: confetti-fall linear forwards;
  }
  
  @keyframes confetti-fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
// window.addEventListener('load', () => {
//   const message = document.getElementById('personal-message');
//   message.style.display = 'block';
//   setTimeout(() => {
//     message.style.display = 'none';
//   }, 2000);
// });

function adjustContainerPadding() {
  const countdown = document.getElementById('countdown');
  const container = document.querySelector('.container');
  const countdownHeight = countdown.offsetHeight;
  const currentPadding = parseInt(window.getComputedStyle(container).paddingBottom);
  container.style.paddingBottom = `${Math.max(currentPadding, countdownHeight + 40)}px`;
}

window.addEventListener('load', adjustContainerPadding);
window.addEventListener('resize', adjustContainerPadding);


function updateCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const birthdate = new Date(currentYear, 5, 15); // Change month (0-11) and day as needed

  if (now > birthdate) {
    birthdate.setFullYear(currentYear + 1);
  }

  const difference = birthdate - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('countdown-timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);

function createWordCloud() {
  const wordCloud = document.getElementById('word-cloud');
  const words = [
    "Happy Birthday!", "Wonderful", "Amazing", "Brilliant", "Kind", "Thoughtful",
    "Creative", "Inspiring", "Talented", "Generous", "Funny", "Caring",
    "Energetic", "Passionate", "Determined", "Unique", "Extraordinary", "Radiant",
    "Joyful", "Beloved", "Cherished", "Special", "Unforgettable", "Fantastic"
  ];

  const colors = ['#ff6b6b', '#48dbfb', '#7d5fff', '#1dd1a1', '#feca57', '#ff9ff3'];

  words.forEach((word) => {
    const element = document.createElement('div');
    element.classList.add('word-cloud-item');
    element.textContent = word;
    
    // const size = Math.random() * 24 + 12; // Random size between 12px and 36px
    // element.style.fontSize = `${size}px`;

    let size;

      if (window.innerWidth <= 768) {
        // Phone screens (<= 768px width)
          size = Math.random() * 15 + 15; // Random size between 15px and 30px
      } else {
        // Tablets and laptops (> 768px width)
          size = Math.random() * 6 + 30; // Random size between 30px and 36px
}

element.style.fontSize = `${size}px`;

    
    const left = Math.random() * 90 + 5; // Random position
    const top = Math.random() * 90 + 5;
    element.style.left = `${left}%`;
    element.style.top = `${top}%`;
    
    element.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    wordCloud.appendChild(element);
  });

  setInterval(toggleWordVisibility, 800);
}

function toggleWordVisibility() {
  const words = document.querySelectorAll('.word-cloud-item');
  words.forEach(word => {
    if (Math.random() > 0.5) {
      word.style.opacity = word.style.opacity === '0' ? '1' : '0';
    }
  });
}

window.addEventListener('load', createWordCloud);
