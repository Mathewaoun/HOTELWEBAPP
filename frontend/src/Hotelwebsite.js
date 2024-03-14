// JavaScript code to handle the guest dropdown functionality

function toggleGuestDropdown() {
    var dropdown = document.getElementById("guestDropdown");
    var summary = document.getElementById("guests-summary");
    summary.classList.toggle("active");
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
  
  function changeGuestCount(guestType, delta) {
    var countElement = document.getElementById(guestType + "Count");
    var currentCount = parseInt(countElement.textContent, 10);
    
    currentCount = Math.max(currentCount + delta, 0); 
    countElement.textContent = currentCount;
  
    var adultCount = document.getElementById("adultCount").textContent;
    var childCount = document.getElementById("childCount").textContent;
    document.getElementById("guests-summary").textContent = `${adultCount} Adult${adultCount !== '1' ? 's' : ''}, ${childCount} Child${childCount !== '1' ? 'ren' : ''}`;
  }
  
  window.addEventListener('click', function(event) {
    if (!event.target.matches('#guests-summary')) {
      var dropdown = document.getElementById("guestDropdown");
      var summary = document.getElementById("guests-summary");
      if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        summary.classList.remove("active");
      }
    }
  });
  