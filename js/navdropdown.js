document.addEventListener('DOMContentLoaded', function () {
    const gamesLink = document.getElementById('gamesLink');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    gamesLink.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior
      dropdownContent.classList.toggle('show'); // Toggle the 'show' class
    });
  
    // Close the dropdown if clicked outside
    document.addEventListener('click', function (event) {
      if (!dropdownContent.contains(event.target) && event.target !== gamesLink) {
        dropdownContent.classList.remove('show');
      }
    });
  });
  