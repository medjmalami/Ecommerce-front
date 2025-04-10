      // Store cart items with quantities
      function getCartItems() {
        const cartString = sessionStorage.getItem('cartItems');
        return cartString ? JSON.parse(cartString) : {};
      }
      
      function saveCartItems(cartItems) {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
      
      window.onload = function() {
        // Get cart items with quantities
        const cartItems = getCartItems();
        
        // Hide elements by default
        var buyElement = document.getElementById('buy');
        var sumElement = document.getElementById('sum');
        var emptyCartMessage = document.getElementById('p');
        
        if (buyElement) buyElement.style.display = 'none';
        if (sumElement) sumElement.style.display = 'none';
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        
        // Check if cart has items
        const productIds = Object.keys(cartItems);
        if (productIds.length > 0) {
          let totalPrice = 0;
          
          // Display each product with its quantity
          productIds.forEach(productId => {
            const element = document.getElementById(productId);
            const quantity = cartItems[productId];
            
            if (element) {
              // Display the product
              element.style.display = 'flex';
              
              // Set quantity
              const quantityElement = element.querySelector('.quantity');
              if (quantityElement) {
                quantityElement.textContent = quantity;
              }
              
              // Calculate item total
              const priceElement = element.querySelector('.new');
              if (priceElement) {
                const priceText = priceElement.textContent.replace(' DT', '').trim();
                const price = parseFloat(priceText);
                
                if (!isNaN(price)) {
                  const itemTotal = price * quantity;
                  totalPrice += itemTotal;
                  
                  // Update item total display
                  const itemTotalElement = element.querySelector('.item-total');
                  if (itemTotalElement) {
                    itemTotalElement.textContent = itemTotal.toFixed(3);
                  }
                }
              }
            }
          });
          
          // Update total price display
          const priceElement = document.getElementById('price');
          if (priceElement) {
            priceElement.textContent = totalPrice.toFixed(3);
            sessionStorage.setItem('prix', totalPrice.toString());
          }
          
          // Show relevant elements
          if (buyElement) buyElement.style.display = 'block';
          if (sumElement) sumElement.style.display = 'block';
          if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        }
      };
      
      function increaseQuantity(productId) {
        const cartItems = getCartItems();
        cartItems[productId] = (cartItems[productId] || 0) + 1;
        saveCartItems(cartItems);
        
        // Update UI
        updateProductQuantity(productId, cartItems[productId]);
        updateTotalPrice();
      }
      
      function decreaseQuantity(productId) {
        const cartItems = getCartItems();
        if (cartItems[productId] && cartItems[productId] > 1) {
          cartItems[productId]--;
          saveCartItems(cartItems);
          
          // Update UI
          updateProductQuantity(productId, cartItems[productId]);
          updateTotalPrice();
        } else if (cartItems[productId] === 1) {
          // If quantity becomes 0, remove the item
          removed(productId);
        }
      }
      
      function updateProductQuantity(productId, quantity) {
        const element = document.getElementById(productId);
        if (element) {
          // Update quantity display
          const quantityElement = element.querySelector('.quantity');
          if (quantityElement) {
            quantityElement.textContent = quantity;
          }
          
          // Update item total
          const priceElement = element.querySelector('.new');
          if (priceElement) {
            const priceText = priceElement.textContent.replace(' DT', '').trim();
            const price = parseFloat(priceText);
            
            if (!isNaN(price)) {
              const itemTotal = price * quantity;
              const itemTotalElement = element.querySelector('.item-total');
              if (itemTotalElement) {
                itemTotalElement.textContent = itemTotal.toFixed(3);
              }
            }
          }
        }
      }
      
      function updateTotalPrice() {
        const cartItems = getCartItems();
        let totalPrice = 0;
        
        Object.keys(cartItems).forEach(productId => {
          const element = document.getElementById(productId);
          if (element) {
            const priceElement = element.querySelector('.new');
            if (priceElement) {
              const priceText = priceElement.textContent.replace(' DT', '').trim();
              const price = parseFloat(priceText);
              
              if (!isNaN(price)) {
                totalPrice += price * cartItems[productId];
              }
            }
          }
        });
        
        // Update total price display
        const priceElement = document.getElementById('price');
        if (priceElement) {
          priceElement.textContent = totalPrice.toFixed(3);
          sessionStorage.setItem('prix', totalPrice.toString());
        }
      }
      
      function removed(productId) {
        const element = document.getElementById(productId);
        if (element) {
          // Remove the item from display
          element.style.display = "none";
          
          // Remove from cart items
          const cartItems = getCartItems();
          delete cartItems[productId];
          saveCartItems(cartItems);
          
          // Update total price
          updateTotalPrice();
          
          // Show/hide elements based on cart status
          const productIds = Object.keys(cartItems);
          if (productIds.length > 0) {
            document.getElementById('buy').style.display = 'block';
            document.getElementById('sum').style.display = 'block';
            document.getElementById('p').style.display = 'none';
          } else {
            document.getElementById('buy').style.display = 'none';
            document.getElementById('sum').style.display = 'none';
            document.getElementById('p').style.display = 'block';
          }
        }
      }
      
      function gotoform() {
        window.location.href = "form.html";
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