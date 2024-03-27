document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        const employeeId = document.getElementById('employeeId').value;
        
        console.log('Employee ID submitted:', employeeId);
        window.location.href = 'LoggedIn.html';
    });
});
