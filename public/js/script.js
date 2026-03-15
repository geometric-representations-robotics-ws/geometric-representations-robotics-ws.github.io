(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');
  var body = document.body;

  // Function to handle responsive sidebar behavior
  function handleResponsiveSidebar() {
    if (window.innerWidth >= 1024) { // 64em = 1024px
      // On large screens, remove overlay behavior and open sidebar by default
      body.classList.remove('sidebar-overlay');
      
      if (!checkbox.hasAttribute('data-user-controlled')) {
        checkbox.checked = true;
      }
    } else {
      // On smaller screens, use overlay behavior and reset user control
      body.classList.add('sidebar-overlay');
      checkbox.removeAttribute('data-user-controlled');
      checkbox.checked = false;
    }
  }

  // Mark when user manually controls the sidebar on large screens
  if (toggle) {
    toggle.addEventListener('click', function() {
      if (window.innerWidth >= 1024) {
        checkbox.setAttribute('data-user-controlled', 'true');
      }
    });
  }

  // Check on page load
  handleResponsiveSidebar();

  // Check on window resize
  window.addEventListener('resize', function() {
    // Small delay to ensure smooth transition
    setTimeout(handleResponsiveSidebar, 100);
  });

  // Close sidebar when clicking outside (with responsive behavior)
  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
    
    // Mark as user controlled on large screens
    if (window.innerWidth >= 1024) {
      checkbox.setAttribute('data-user-controlled', 'true');
    }
  }, false);
})(document);
