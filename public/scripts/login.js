document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('registrationForm');

    async function submitForm(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.redirected) {
               
                window.location.href = response.url;
            } else {
                const data = await response.json();

                if (response.ok) {

                    const cookies = document.cookie.split(';');
                    const hasAccessToken = cookies.some(cookie => cookie.trim().startsWith('access_token='));

                    if (hasAccessToken) {
                        window.location.href = '/home'; 
                    } 
    
                    
                } else {
                    alert(`Login failed: ${data.message}`);
                }
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    }

    loginForm.addEventListener('submit', submitForm);
});
