// Questions Array
const questions = [
    { question: 'Enter Your Frist Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create A Password', type:'password'}
];

// Transition Times
const shakeTime = 100; // Transition shakeTime
const switchTime = 200; // Transition Between Questions

// Init position at first Question
let position = 0;

// Init the DOM elemnts
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');

// Events

// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextBtn.addEventListener('click', validate);

// Functions

// Get Question From Array & Add To Markup
function getQuestion() {
    // Get Current Question
    inputLabel.innerHTML = questions[position].question;
    // Get Current Type
    inputField.setAttribute('type', questions[position].type || 'text');
    // Get Current Answer
    inputField.value = questions[position].answer || '';
    // Focus On Element
    inputField.focus();
    // Set Progress Width  - Variable To The question length
    progressBar.style.width = (position * 100) / questions.length + '%';

    // Add User Icon Or Back Arrow Depending On Question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user'; 
    
    // ShowQ() it's a function to show questions
    showQuestion();
}

// Display Question To User
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputField.style.transition = '';
    inputProgress.style.width = '100%';
}

// Hide Question From User
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputField.style.transition = 'none';
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputGroup.style.border = null;
}

// Transform To Create A Shake Motion
function Transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate Field
function validate() {
    // Make Sure Pattern Matches If There Is One
    if(!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// Validate By Enter Click
inputField.addEventListener('keyup', e => {
  if(e.keyCode == 13){
      validate();
  }
});
// Field Input Fail
function inputFail() {
    formBox.className = 'error';
    for(i = 0; i < 6; i++) {
        setTimeout(Transform, shakeTime * i ,((i % 2) * 2 - 1) * 20,0);
        setTimeout(Transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}
// Fiel Input Pass
function inputPass() {
    formBox.className = '';
    setTimeout(Transform, shakeTime * 0, 0, 10);
    setTimeout(Transform, shakeTime * 1, 0, 0);

    // Store Answer In Array
    questions[position].answer = inputField.value;

    // Increment Position
    position++;

    // If New Question, Hide Current And Get Next
    if(questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove If No More Question
        hideQuestion();
        formBox.className = 'close';
        progressBar.style.width = '100%';

        // Form Complet
        formComplet();
    }

}

// All Fields Complete - Show h1 end.
function formComplet() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`You're Welcome ${questions[1].answer} !!`)
    );
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}