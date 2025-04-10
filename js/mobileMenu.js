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