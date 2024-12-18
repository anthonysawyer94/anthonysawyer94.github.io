async function navload() {
  const res = await fetch('../navbar');
  const data = await res.text();
  document.getElementById('navbar').innerHTML =  data;
}

document.addEventListener('DOMContentLoaded', async function () {
  
  // Make sure the navbar is fully loaded
  await navload();

  // Projects Dropdown
  const projectsLink = document.getElementById('projects-nav');
  const projectsContent = document.querySelector('.projects-content');

  projectsLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    projectsContent.classList.toggle('show'); // Toggle the 'show' class to open/close the dropdown
  });
  
  // Close the dropdown if clicked outside
  document.addEventListener('click', function (event) {
    if (!projectsContent.contains(event.target) && event.target !== projectsLink) {
        projectsContent.classList.remove('show');
      }
  });

  // Misc Dropdown
  const miscLink = document.getElementById('misc');
  const miscContent = document.querySelector('.misc-content');

  miscLink.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior
    miscContent.classList.toggle('show'); // Toggle the 'show' class to open/close the dropdown
  });

  // Close the dropdown if clicked outside
  document.addEventListener('click', function (event) {
    if (!miscContent.contains(event.target) && event.target !== miscLink) {
      miscContent.classList.remove('show');
    }
  });

  // Venmo link

  function isMobile() {
    const userAgent = navigator.userAgent || window.opera;

    // Enhanced detection for mobile devices, especially iPhones
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i.test(userAgent)
  }

  function handleVenmoLink() {
      if (isMobile()) {
          // If on mobile, use the venmo:// URL scheme
          //alert('you are on a mobile device')
          //window.location.href = "venmo://paycharge?txn=pay&recipients=anthonysawyer";
          window.location.href = "venmo://paycharge?txn=pay&recipients=anthonysawyer"; // just for now
      } else {
          // If on desktop, open the Venmo website link
          window.location.href = "https://venmo.com/anthonysawyer";
      }
  }

  // Add event listener to the button
  document.getElementById("venmo-button").addEventListener("click", handleVenmoLink);


});

// Dont Put Anything Below this - async function waits for nav bar to load