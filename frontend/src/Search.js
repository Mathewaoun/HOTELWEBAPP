document.addEventListener('DOMContentLoaded', () => {
  const selectButtons = document.querySelectorAll('.select-button');

  selectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const hotelName = button.closest('.hotel-option').querySelector('.hotel-details h2').textContent;
      window.location.href = button.getAttribute('href'); 
    });
  });
});
