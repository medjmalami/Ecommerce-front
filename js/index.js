const imageContainer = document.getElementById("image-container");
const images = imageContainer.querySelectorAll("img");
let currentImageIndex = 0;

function setImagesWidth() {
  const bodyWidth = document.body.clientWidth;
  images.forEach(image => image.style.width = `${bodyWidth}px`);
}

function rotateImages() {
  images[currentImageIndex].style.display = "none";
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].style.display = "block";
}

window.onload = function(){
  rotateImages();
  rotateImages();
  rotateImages();
  setImagesWidth();

  // Check if cart has items to show notification

}

// Set image width on initial load and window resize
setImagesWidth();
window.addEventListener("resize", setImagesWidth);

setInterval(rotateImages, 2000);

// Get cart items with quantities
function getCartItems() {
  const cartString = sessionStorage.getItem('cartItems');
  return cartString ? JSON.parse(cartString) : {};
}

function saveCartItems(cartItems) {
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Shopping cart functionality
// Replace your existing addToCart function with this
function addToCart(productId) {
// Update notification marker
let notif = document.getElementById("notif");
notif.style.display = 'inline';

// Get current cart items
const cartItems = getCartItems();

// Increment quantity or add new item
cartItems[productId] = (cartItems[productId] || 0) + 1;

// Save updated cart
saveCartItems(cartItems);

// Show notification
const cartIndicator = document.getElementById("cart-indicator");

// Make sure cart indicator exists
if (!cartIndicator) {
console.log("Cart indicator not found, creating one");
const newCartIndicator = document.createElement('div');
newCartIndicator.id = "cart-indicator";
document.body.appendChild(newCartIndicator);
cartIndicator = newCartIndicator;
}

cartIndicator.textContent = "Your Product Has Been Added";
cartIndicator.classList.add("active");

// Hide the indicator after 3 seconds
setTimeout(function() {
cartIndicator.classList.remove("active");
}, 3000);
}

// Add this to ensure the cart indicator is always available
document.addEventListener('DOMContentLoaded', function() {
// Make sure the cart indicator element exists
if (!document.getElementById("cart-indicator")) {
console.log("Cart indicator not found, creating one");
const cartIndicator = document.createElement('div');
cartIndicator.id = "cart-indicator";
document.body.appendChild(cartIndicator);
}
});



// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', function() {
  navMenu.classList.toggle('active');
  this.classList.toggle('active');
});

// Submenu toggle for mobile
const submenuToggles = document.querySelectorAll('.submenu-toggle');

submenuToggles.forEach(toggle => {
  toggle.addEventListener('click', function(e) {
    if (window.innerWidth > 768) {
      e.preventDefault();
      e.stopPropagation();
      const parentLi = this.parentElement;
      parentLi.classList.toggle('submenu-active');
    }
  });
});