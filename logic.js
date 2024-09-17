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
    const a = [];
    const val = [];
    const b = [];
    let totalWeightedPoints = 0;
    const totalCredits = 19; // Total credits for all subjects combined

    // Credits for each subject
    const credits = [3, 4, 4, 1, 3, 3, 1, 0]; // Update based on your specific credit distribution

    for (let i = 0; i < 8; i++) {
        a[i] = document.getElementById(i + 1).value;

        // Validate input and convert to grade points
        if (a[i] === '' || isNaN(a[i])) {
            alert("Please enter valid marks for all subjects");
            return;
        }
        
        a[i] = parseFloat(a[i]);

        if (a[i] > 100) {
            alert("Please enter valid marks\nMarks cannot be greater than 100");
            return;
        }

        // Convert marks to grade points
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

        // Calculate weighted points based on credits
        b[i] = val[i] * credits[i];
        totalWeightedPoints += b[i];
    }

    // Calculate SGPA
    let sgpa = totalWeightedPoints / totalCredits;
    document.getElementById("res").innerHTML = sgpa.toFixed(2);
}
