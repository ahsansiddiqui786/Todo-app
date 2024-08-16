document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('todo-app');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    
    // Check if user is logged in
    if (!localStorage.getItem('loggedInUser')) {
        if (app) {
            window.location.href = 'signin.html';
        }
    }

    if (addTaskButton) {
        addTaskButton.addEventListener('click', function() {
            const taskText = newTaskInput.value.trim();
            if (taskText === '') return;

            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                taskList.removeChild(listItem);
            });

            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);

            newTaskInput.value = '';
        });
    }

    // Sign up logic
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;

            // Store user credentials (in real apps, use a secure method)
            localStorage.setItem('user', JSON.stringify({ username, password }));
            alert('Sign Up Successful');
            window.location.href = 'signin.html';
        });
    }

    // Sign in logic
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('signin-username').value;
            const password = document.getElementById('signin-password').value;
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && user.username === username && user.password === password) {
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }
});
