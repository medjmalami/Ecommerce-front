        // Get cart items with quantities
        function getCartItems() {
            const cartString = sessionStorage.getItem('cartItems');
            return cartString ? JSON.parse(cartString) : {};
          }
  
          function saveCartItems(cartItems) {
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
          }
  
          // Shopping cart functionality
          function addToCart(productId) {
            let notif = document.getElementById("notif");
            notif.style.display = 'inline';
  
            // Get current cart items
            const cartItems = getCartItems();
  
            // Increment quantity or add new item
            cartItems[productId] = (cartItems[productId] || 0) + 1;
  
            // Save updated cart
            saveCartItems(cartItems);
  
            document.getElementById("cart-indicator").textContent = "Your Product Has Been Added";
            document.getElementById("cart-indicator").classList.add("active");
            notif.style.display = 'inline';
  
            // Hide the indicator after 3 seconds
            setTimeout(() => {
              document.getElementById("cart-indicator").textContent = "";
              document.getElementById("cart-indicator").classList.remove("active");
            }, 3000);
          }
  
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