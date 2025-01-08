

const gradePoints = {
    O: 10,
    'A+': 9,
    A: 8,
    'B+': 7,
    B: 6,
    C: 5,
    D: 4,
    E: 0,
    F: 0,
};

function getGrade(marks) {
    if (marks >= 90) return 'O';
    if (marks >= 80) return 'A+';
    if (marks >= 70) return 'A';
    if (marks >= 60) return 'B+';
    if (marks >= 50) return 'B';
    if (marks >= 45) return 'C';
    if (marks >= 40) return 'D';
    if (marks < 40) return 'E';
}

function saveToLocalStorage() {
    const subjectsDiv = document.getElementById('subjects');
    const inputs = subjectsDiv.getElementsByTagName('input');
    const marks = [];

    for (const input of inputs) {
        marks.push(input.value);
    }

    localStorage.setItem('subjectMarks', JSON.stringify(marks));
}

function loadFromLocalStorage() {
    const marks = JSON.parse(localStorage.getItem('subjectMarks')) || [];

    for (let i = 0; i < marks.length; i++) {
        addSubject(marks[i]);
    }
}

function addSubject(value = '') {
    const subjectsDiv = document.getElementById('subjects');
    const subjectCount = subjectsDiv.children.length;

    if (subjectCount >= 10) {
        alert('Maximum of 10 subjects allowed.');
        return;
    }

    const subjectDiv = document.createElement('div');
    subjectDiv.className = 'subject';
    subjectDiv.innerHTML = `
        <label for="subject${subjectCount + 1}">Subject ${subjectCount + 1} Marks:</label>
        <input type="number" id="subject${subjectCount + 1}" min="0" max="100" placeholder="Enter marks out of 100" value="${value}" oninput="saveToLocalStorage()" />
        <button type="button" class="remove-btn" onclick="removeSubject(this)">Remove</button>
    `;
    subjectsDiv.appendChild(subjectDiv);
}

function calculateTGPA() {
    const subjectsDiv = document.getElementById('subjects');
    const inputs = subjectsDiv.getElementsByTagName('input');

    if (inputs.length === 0) {
        alert('Please add at least one subject.');
        return;
    }

    let totalGradePoints = 0;
    let totalSubjects = 0;
    let resultHTML = '<h3>Results:</h3><ul>';

    for (const input of inputs) {
        const marks = parseFloat(input.value);

        if (isNaN(marks) || marks < 0 || marks > 100) {
            alert('Please enter valid marks between 0 and 100.');
            return;
        }

        const grade = getGrade(marks);
        const gradePoint = gradePoints[grade];

        resultHTML += `<li>Marks: ${marks}, Grade: ${grade}, Grade Points: ${gradePoint}</li>`;

        totalGradePoints += gradePoint;
        totalSubjects++;
    }

    const tgpa = (totalGradePoints / totalSubjects).toFixed(2);

    resultHTML += `</ul><p><strong>TGPA: ${tgpa}</strong></p>`;

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = resultHTML;
}

function removeSubject(button) {
    const subjectDiv = button.parentElement; 
    subjectDiv.remove();  
    resyncSubjects();  
}

function resyncSubjects() {
    const subjectsDiv = document.getElementById('subjects');
    const subjectDivs = subjectsDiv.getElementsByClassName('subject');

    Array.from(subjectDivs).forEach((subjectDiv, index) => {
        const label = subjectDiv.querySelector('label');
        label.textContent = `Subject ${index + 1} Marks:`;
    });
}

window.onload = loadFromLocalStorage;