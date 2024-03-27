document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault(); 
      const confirmationNumber = Math.floor(Math.random() * 100000000);
      window.location.href = `confirmation.html?confirmationNumber=${confirmationNumber}`;
    });
  });