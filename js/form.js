window.onload = function(){
    var prix = sessionStorage.getItem('prix') || '0';
    var element = document.getElementById('sum');
    var elem = element.querySelector("span");
    elem.textContent = prix;
    
    // Initialize shipping cost based on default selection
    const shippingCost = document.getElementById("standard").checked ? 10 : 20;
    var basePrice = parseInt(prix) || 0;
    var totalPrice = basePrice + shippingCost;
    elem.textContent = totalPrice.toFixed(2);
  }
  
  const form = document.getElementById("orderForm");
  const thankyou = document.getElementById("thankyou");
  const standardRadio = document.getElementById("standard");
  const expressRadio = document.getElementById("express");

  standardRadio.addEventListener("change", handleShippingChange);
  expressRadio.addEventListener("change", handleShippingChange);
  
  function handleShippingChange(event) {
    const shippingCost = event.target.value === "standard" ? 10 : 20;
    var element = document.getElementById('sum');
    var elem = element.querySelector("span");
    var basePrice = parseInt(sessionStorage.getItem('prix')) || 0;
    var totalPrice = basePrice + shippingCost;
    elem.textContent = totalPrice.toFixed(2);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    thankyou.textContent = `Thank you, ${name}, for your order!`;
    var element = document.getElementById('sum');
    element.style.display = 'none';

    // Add class to trigger animation/transition
    thankyou.classList.add("shown");
    form.reset();
    //empty the cart items and total price
    sessionStorage.removeItem('cartItems');
    sessionStorage.removeItem('prix');
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
      e.preventDefault();
      e.stopPropagation();
      const parentLi = this.parentElement;
      parentLi.classList.toggle('submenu-active');
    });
  });