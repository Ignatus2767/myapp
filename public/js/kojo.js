<<<<<<< HEAD
//koj.js
=======
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.getElementById('signup-btn');
    const signinBtn = document.getElementById('signin-btn');
    const reviewBtn = document.getElementById('review-btn');
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');
<<<<<<< HEAD
    const feedbackMessage = document.getElementById('feedback-message'); // Feedback message element
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const forgotPasswordFormElement = document.getElementById('forgotPasswordForm');
    const forgotPasswordFeedback = document.getElementById('forgot-password-feedback');

    // Switch between forms
    signupBtn.addEventListener('click', function() {
        toggleActiveForm('signup');
    });

    signinBtn.addEventListener('click', function() {
        toggleActiveForm('signin');
    });

    reviewBtn.addEventListener('click', function() {
        toggleActiveForm('review');
    });

    function toggleActiveForm(activeForm) {
        // Reset all buttons
        signupBtn.classList.remove('active');
        signinBtn.classList.remove('active');
        reviewBtn.classList.remove('active');

        // Hide all forms
        signupForm.classList.add('hidden');
        signinForm.classList.add('hidden');
        reviewForm.classList.add('hidden');

        // Show the active form and button
        if (activeForm === 'signup') {
            signupBtn.classList.add('active');
            signupForm.classList.remove('hidden');
        } else if (activeForm === 'signin') {
            signinBtn.classList.add('active');
            signinForm.classList.remove('hidden');
        } else if (activeForm === 'review') {
            reviewBtn.classList.add('active');
            reviewForm.classList.remove('hidden');
        }
    }

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        forgotPasswordForm.classList.toggle('hidden');
=======

    signupBtn.addEventListener('click', function() {
        signupBtn.classList.add('active');
        signinBtn.classList.remove('active');
        reviewBtn.classList.remove('active');
        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');
        reviewForm.classList.add('hidden');
    });

    signinBtn.addEventListener('click', function() {
        signinBtn.classList.add('active');
        signupBtn.classList.remove('active');
        reviewBtn.classList.remove('active');
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        reviewForm.classList.add('hidden');
    });

    reviewBtn.addEventListener('click', function() {
        reviewBtn.classList.add('active');
        signupBtn.classList.remove('active');
        signinBtn.classList.remove('active');
        reviewForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        signinForm.classList.add('hidden');
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
    });

    // Handle form submission for signup
    const signupFormElement = document.getElementById('signupForm');
    signupFormElement.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(signupFormElement); // Get form data
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        // Validate password and confirm password
        if (password !== confirmPassword) {
<<<<<<< HEAD
            showFeedback('Passwords do not match. Please re-enter.', 'error');
=======
            alert('Passwords do not match. Please re-enter.');
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
            console.log('Passwords do not match:', password, confirmPassword);
            return;
        }

<<<<<<< HEAD
=======
        // If passwords match, proceed with fetch request
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
        fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
<<<<<<< HEAD
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Signup successful!', 'success');
                window.location.href = 'index.html'; // Redirect to signin page
            } else {
                showFeedback(data.message, 'error'); // Show specific error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
=======
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Signup failed');
            }
        })
        .then(data => {
            console.log('Signup response:', data);
            // Display success message or redirect
            alert('Signup successful!');
            window.location.href = 'index.html'; // Redirect to signin page
        })
        .catch(error => {
            console.error('Error:', error);
            
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
        });
    });

    // Handle Signin Form Submission
    document.getElementById('signinForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
<<<<<<< HEAD
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Sign-in successful!', 'success');
                window.location.href = 'https://ignatus2767.github.io/krydmal/';
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
=======
        .then(response => response.text())
        .then(data => {
            console.log('Received signin data:', data); // Log the response data
            // Handle success or redirect
            alert('Sign-in successful!, ');
            window.location.href = 'https://ignatus2767.github.io/krydmal/';
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors if any
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
        });
    });

    // Handle Review Form Submission
    document.getElementById('reviewForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        fetch('/api/reviews/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
<<<<<<< HEAD
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Review submitted successfully!', 'success');
                event.target.reset();
                fetchReviews();
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
=======
        .then(response => response.text())
        .then(data => {
            console.log(data);
            event.target.reset();
            fetchReviews();
>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
        });
    });

    // Function to fetch reviews from the server
    const fetchReviews = () => {
        fetch('/api/reviews/all')
        .then(response => response.json())
        .then(data => {
            reviewsList.innerHTML = '';
            data.forEach(review => {
                const li = document.createElement('li');
                li.textContent = `${review.username} (${new Date(review.date).toLocaleString()}): ${review.comment} - Rating: ${review.rating}`;
                reviewsList.appendChild(li);
            });
        });
    };

<<<<<<< HEAD
    // Function to display feedback messages
    const showFeedback = (message, type) => {
        feedbackMessage.textContent = message;
        feedbackMessage.className = type; // 'success' or 'error'
        feedbackMessage.style.display = 'block';
        setTimeout(() => {
            feedbackMessage.style.display = 'none';
        }, 5000);
    };

    // Initial fetch of reviews when the page loads
    fetchReviews();

    forgotPasswordFormElement.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(forgotPasswordFormElement);
        fetch('/api/users/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData.entries()))
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showFeedback('Password reset link sent to your email.', 'success');
                forgotPasswordFormElement.reset();
            } else {
                showFeedback(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFeedback('An error occurred. Please try again.', 'error');
        });
    });

    function showFeedback(message, type) {
        forgotPasswordFeedback.textContent = message;
        forgotPasswordFeedback.className = `feedback-message ${type}`; // 'success' or 'error'
        forgotPasswordFeedback.style.display = 'block';
        setTimeout(() => {
            forgotPasswordFeedback.style.display = 'none';
        }, 5000);
    }
});




=======
    // Initial fetch of reviews when the page loads
    fetchReviews();
});


>>>>>>> a2d056486d5c82c981e5a3ef97637150e89cc838
