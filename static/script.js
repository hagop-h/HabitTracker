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

    // Function to add a new habit
    function addHabit() {
        var habitName = document.getElementById('habitName').value;

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
        .then(data => {
          //  alert(data.message);
            location.reload(); // Refresh the page to see the updated habits
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to delete a habit
    function deleteHabit(habit) {
        // Confirm deletion
        //var confirmDelete = confirm('Are you sure you want to delete this habit?');

        //if (confirmDelete) {
            // Send delete request to the server
            fetch('/delete_habit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'habitName=' + encodeURIComponent(habit),
            })
            .then(response => response.json())
            .then(data => {
          //      alert(data.message);
                location.reload(); // Refresh the page to see the updated habits
            })
            .catch(error => {
                console.error('Error:', error);
            });
        //}
    }

    // Add event listeners
    document.getElementById('addHabitBtn').addEventListener('click', addHabit);

    var deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var habit = this.parentNode.querySelector('span').textContent;
            deleteHabit(habit);
        });
    });
});