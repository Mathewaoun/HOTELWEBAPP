document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('search-btn');
  const inputs = document.querySelectorAll('input[type="text"], input[type="date"], input[type="number"]');
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  const select = document.getElementById('hotel-chain');
  const checkInInput = document.getElementById('checkin');
  const checkOutInput = document.getElementById('checkout');

  function validateFields() {
    const allFieldsFilled = Array.from(inputs).every(input => input.value.trim() !== '');
    if (!allFieldsFilled) {
      alert('Please fill in all the text, date, and number fields.');
      return false;
    }

    const selectFieldFilled = select.value !== '';
    if (!selectFieldFilled) {
      alert('Please select a hotel chain from the dropdown menu.');
      return false;
    }

    const radioGroupChecked = Array.from(radioButtons).some(radio => radio.checked);
    if (!radioGroupChecked) {
      alert('Please select a star rating.');
      return false;
    }

    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);

    if (!(checkInDate < checkOutDate)) {
      alert('The check-in date must be before the check-out date.');
      return false;
    }

    return true;
  }

  searchButton.addEventListener('click', function(event) {
    if (!validateFields()) {
      event.preventDefault();
    } else {
      window.location.href = 'Search.html'; 
    }
  });
});
