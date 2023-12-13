document.addEventListener('DOMContentLoaded', function () {
    particlesJS('fireworks-container', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800,
                },
            },
            color: {
                value: '#ffffff',
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000',
                },
                polygon: {
                    nb_sides: 5,
                },
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                },
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse',
                },
                onclick: {
                    enable: true,
                    mode: 'push',
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    });

    // Function to update date and time
    function updateDateTime() {
        // Get the current date
        const currentDate = new Date();

        // Format the date and time (adjust the format according to your needs)
        // Display the date and time in the element with the ID "dateTime"
        document.getElementById('dateTime').textContent = currentDate.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    }

    // Update initial date and time
    updateDateTime();

    // Update date and time every second (1000 milliseconds)
    setInterval(updateDateTime, 1000);

    // Function to add a new habit
    function addHabit() {
        const habitName = document.getElementById('habitName').value;

        // Check if the habitName is not empty
        if (!habitName.trim()) {
            alert('Please enter a habit name.');
            return;
        }

        // Send habit data to the server
        fetch('/add_habit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'habitName=' + encodeURIComponent(habitName),
        })
        .then(response => response.json())
        .then(() => {
            location.reload(); // Refresh the page to see the updated habits
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Get all spans containing habit names
    const habitSpans = document.querySelectorAll('span');

    // Add blur event listener to each span for disabling content editing
    habitSpans.forEach(function (span) {
        span.addEventListener('blur', function () {
            // Disable content editing when focus is lost
            this.contentEditable = 'false';
        });
    });

    // Get all buttons with class 'editBtn'
    const editButtons = document.querySelectorAll('.editBtn');

    // Add click event listener to each 'Edit' button
    editButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Find the span associated with the clicked 'Edit' button
            const habitSpan = this.parentNode.querySelector('span');

            // Enable content editing on the span and set focus
            habitSpan.contentEditable = 'true';
            habitSpan.focus();
        });
    });

    // Function to delete a habit
    function deleteHabit(habit) {
        fetch('/delete_habit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'habitName=' + encodeURIComponent(habit),
        })
        .then(response => response.json())
        .then(() => {
            location.reload(); // Refresh the page to see the updated habits
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const storedBackgroundColor = localStorage.getItem('backgroundColor');
    if (storedBackgroundColor) {
        document.body.style.backgroundColor = storedBackgroundColor;
    }

    // Function to apply customization
    function applyCustomization() {
        const newBackgroundColor = document.getElementById('backgroundColor').value;
        document.body.style.backgroundColor = newBackgroundColor;
        localStorage.setItem('backgroundColor', newBackgroundColor);
    }

    // Add event listener for customization form
    document.getElementById('applyCustomizationBtn').addEventListener('click', applyCustomization);

    // Add event listener for Enter key
    document.getElementById('habitName').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addHabit();
        }
    });

    // Add event listeners
    document.getElementById('addHabitBtn').addEventListener('click', addHabit);

    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const habit = this.parentNode.querySelector('span').textContent;
            deleteHabit(habit);
        });
    });

});
