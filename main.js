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