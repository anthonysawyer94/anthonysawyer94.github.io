document.addEventListener('DOMContentLoaded', function () {
    const gamesLink = document.getElementById('games');
    console.log('games linkk', gamesLink);
    const dropdownContent = document.querySelector('.dropdown-content');
    console.log('dropdown', dropdownContent);
    gamesLink.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior
      dropdownContent.classList.toggle('show'); // Toggle the 'show' class to open/close the dropdown
    });
  
    // Close the dropdown if clicked outside
    document.addEventListener('click', function (event) {
      if (!dropdownContent.contains(event.target) && event.target !== gamesLink) {
        dropdownContent.classList.remove('show');
      }
    });
  });
  