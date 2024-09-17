document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input');

    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default form submission behavior
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus(); // Move focus to the next input
                }
            }
        });
    });
});

function calc() {
    const name = document.getElementById("name").value;
    const usn = document.getElementById("usn").value;
    const a = [];
    const val = [];
    const b = [];
    let totalWeightedPoints = 0;
    const totalCredits = 19; // Total credits for all subjects combined

    const credits = [3, 4, 4, 1, 3, 1, 2, 1, 0]; // Make sure these match the subjects

    for (let i = 0; i < 9; i++) {  // Loop for 9 subjects
        a[i] = document.getElementById(i + 1).value;

        if (a[i] === '' || isNaN(a[i])) {
            alert("Please enter valid marks for all subjects");
            return;
        }

        a[i] = parseFloat(a[i]);

        if (a[i] > 100) {
            alert("Please enter valid marks\nMarks cannot be greater than 100");
            return;
        }

        if (a[i] >= 90) {
            val[i] = 10;
        } else if (a[i] >= 80) {
            val[i] = 9;
        } else if (a[i] >= 70) {
            val[i] = 8;
        } else if (a[i] >= 60) {
            val[i] = 7;
        } else if (a[i] >= 55) {
            val[i] = 6;
        } else if (a[i] >= 50) {
            val[i] = 5;
        } else if (a[i] >= 40) {
            val[i] = 4;
        } else {
            val[i] = 0;
        }

        b[i] = val[i] * credits[i];
        totalWeightedPoints += b[i];
    }

    let sgpa = totalWeightedPoints / totalCredits;
    document.getElementById("res").innerHTML = sgpa.toFixed(2);

    // Prepare data to send to the backend
    const sgpaData = {
        name: name,
        usn: usn,
        sgpa: sgpa.toFixed(2)
    };

    // Send the data to the backend using fetch API
    fetch('http://localhost:5000/api/save-sgpa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sgpaData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
