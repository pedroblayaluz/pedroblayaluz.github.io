/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
$('.dropbtn').click(function () {
  var isvisible = $(this).next('.dropdown-content').is(":visible")
  $('.dropdown-content:visible').hide();
  if (!isvisible)
    {
      $(this).next('.dropdown-content').toggle()
    }
})