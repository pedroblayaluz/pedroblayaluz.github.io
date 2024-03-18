/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const elements = document.querySelectorAll('.hover-effect');

elements.forEach((element) => {
  // Add touchstart event listener
  element.addEventListener('touchstart', () => {
    element.classList.add('touch-hover-effect');
  });

  element.addEventListener('touchend', () => {
    // Remove touch effect
    element.classList.remove('touch-hover-effect');
  });
});