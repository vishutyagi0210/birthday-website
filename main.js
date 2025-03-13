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
  const birthdate = new Date(currentYear, 2, 14); // March is month 2 (0-indexed)

  // If today's date is past this year's birthday, calculate for next year
  if (now > birthdate) {
    birthdate.setFullYear(currentYear + 1);
  }

  const difference = birthdate - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById('countdown-timer').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
  // Optional message when it's birthday
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    document.getElementById('countdown-timer').innerHTML += " <br>Happy Birthday!";
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initialize countdown on page load
updateCountdown();

function createWordCloud() {
  const wordCloud = document.getElementById('word-cloud');
  const words = [
    "Happy Birthday!", "Wonderful", "Amazing", "Brilliant", "Kind", "Thoughtful",
    "Creative", "Inspiring", "Talented", "Generous", "Funny", "Caring",
    "Energetic", "Passionate", "Determined", "Unique", "Extraordinary", "Radiant",
    "Joyful", "Beloved", "Cherished", "Special", "Unforgettable", "Fantastic"
  ];
  
  const colors = ['#ff6b6b', '#48dbfb', '#7d5fff', '#1dd1a1', '#feca57', '#ff9ff3'];
  
  // Clear existing words
  wordCloud.innerHTML = '';
  
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
  words.forEach((word) => {
    const element = document.createElement('div');
    element.classList.add('word-cloud-item');
    element.textContent = word;
    
    // Responsive font sizing
    let size;
    if (windowWidth <= 768) {
      // Phone screens
      size = Math.random() * 14 + 20; // 12px to 26px
    } else {
      // Larger screens
      size = Math.random() * 16 + 34; // 20px to 36px
    }
    element.style.fontSize = `${size}px`;
    
    // Add the element to DOM temporarily to measure its width and height
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    wordCloud.appendChild(element);
    const wordWidth = element.offsetWidth;
    const wordHeight = element.offsetHeight;
    
    // Calculate position to ensure the word stays within the screen
    // We leave a small margin (the word's own size) from the edges
    const maxLeft = windowWidth - wordWidth;
    const maxTop = windowHeight - wordHeight;
    
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    element.style.visibility = 'visible';
    
    element.style.color = colors[Math.floor(Math.random() * colors.length)];
  });
  
  // Start animation
  setInterval(toggleWordVisibility, 900);
}

function toggleWordVisibility() {
  const words = document.querySelectorAll('.word-cloud-item');
  words.forEach(word => {
    if (Math.random() > 0.5) {
      word.style.opacity = word.style.opacity === '0' ? '1' : '0';
    }
  });
}

// Initial creation
window.addEventListener('load', createWordCloud);

// Recalculate on resize for responsiveness
window.addEventListener('resize', createWordCloud);




// Add this to your main.js file
document.addEventListener('DOMContentLoaded', function() {
  const musicToggle = document.getElementById('music-toggle');
  const music = document.getElementById('background-music');
  musicToggle.addEventListener('click', function() {
    if (music.paused) {
      music.play();
      musicToggle.classList.add('playing');
    } else {
      music.pause();
      musicToggle.classList.remove('playing');
    }
  });
});
