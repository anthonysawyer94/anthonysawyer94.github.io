async function navload() {
  const res = await fetch('../navbar');
  const data = await res.text();
  document.getElementById('navbar').innerHTML =  data;
}

document.addEventListener('DOMContentLoaded', async function () {
  
  // Make sure the navbar is fully loaded
  await navload();

  // Projects Dropdown
  const projectsLink = document.getElementById('projects');
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
});
