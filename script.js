const questions = [
  {
    question:
      "Which Track is the best Track in start ng?",
    correct_answer: "Frontend",
    incorrect_answers: ["Mobile", "Design", "Backend"],
  },
  {
    question:
      "Who won the NS10v10 between Wizkid and Vybz Kartel?",
    correct_answer: "Wizkid",
    incorrect_answers: ["Vybz Kartel", "Nigeria", "Jamaica"],
  },
  {
    question: "All but one of the following is not crucial in this pandemic?",
    correct_answer: "Condom",
    incorrect_answers: [" Face masks", "Hand gloves", "Sanitizers"],
  },
  {
    question: "How much is Nigeria paying her citizens as pandemic relief?",
    correct_answer: " Vibes",
    incorrect_answers: ["1,200", "Insha Allah", "30,000"],
  },
  {
    question:
      "Which of the following statement is true?",
    correct_answer: "Gbolahan is a Professional",
    incorrect_answers: ["Gbolahan is a Novice", "Gbolahan is a Beginner", "Gbolahan is an Expert"],
  },
];

let currentIndex = 0;
let numberOfCorrect = 0; 
let questionsLeft = 5; 
let selectedAnswer, correctAnswer, answerElement;
let answered = false;

//displays the current question
function displayQuestion(obj, index) {
  let answers = document.getElementById("answers");
  let questionContainer = document.getElementById("Currentquestion");
  answers.innerHTML = "";
  let shuffledAnswers = shuffle(obj, index);
  let answerText = displayAnswers(shuffledAnswers);
  answers.innerHTML = answerText;
  answerText = "";
  questionContainer.textContent = obj[index].question;
}

//shuffles the position of the correct answer
function shuffle(obj, index) {
  let array = [...obj[index].incorrect_answers, obj[index].correct_answer];
  const length = array.length;
  if (!length) {
    return [];
  }
  let i = -1;
  const lastIndex = length - 1;
  const result = [...array];
  while (++i < length) {
    const rand = i + Math.floor(Math.random() * (lastIndex - i + 1));
    const value = result[rand];
    result[rand] = result[i];
    result[i] = value;
  }
  return result;
}

//gets the correct answer from the question object
function getCorrectAnswer(obj, index) {
  return obj[index].correct_answer;
}

//displays the list of options
function displayAnswers(arr) {
  let answerText = "";
  for (let item of arr) {
    answerText += `<li onclick="getAnswer()">${item}</li>`;
  }
  return answerText;
}

//gets the element the player selected
function selectAnswer() {
  let answersArr = [...document.getElementsByTagName("li")];
  for (let item of answersArr) {
    if ([...item.classList].includes("selected")) {
      item.classList.remove("selected");
    }
  }
  event.target.classList.add("selected");
  return event.target;
}

//display the correct answer
function displayCorrectAnswer(correctAnswer) {
  let answersArr = [...document.getElementsByTagName("li")];
  for (let item of answersArr) {
    if (item.textContent === correctAnswer) {
      item.classList.add("correct");
    }
  }
}

//gets the answer the player selected
function getAnswer() {
  submitAnswer.classList.remove("disabled");
  answerElement = selectAnswer();
  selectedAnswer = answerElement.textContent;
}

//reset game and display player score
function resetgame() {
  correctDisplay.textContent = numberOfCorrect;
  modal.style.display = "block";
  modalContent.textContent = `You Score: ${numberOfCorrect}`;
  currentIndex = 0;
  numberOfCorrect = 0;
  questionsLeft = 5;
  correctDisplay.textContent = numberOfCorrect;
  numOfQuestions.textContent = questionsLeft;
}


let next = document.getElementById("next"); //next button selector
let submitAnswer = document.getElementById("submit"); //submit button selector
let numOfQuestions = document.getElementById("numOfQuestion"); //number of questions span selector
let correctDisplay = document.getElementById("counter"); // number of correct answer span selector
let span = document.getElementsByClassName("close")[0]; //modal close button selector
let modal = document.getElementById("myModal"); // modal elemnent selector
let modalContent = document.getElementById("modalContent"); //modal content selectore
correctAnswer = getCorrectAnswer(questions, currentIndex); //stores the current questions correct answer
displayQuestion(questions, currentIndex); //displays the first question
numOfQuestions.textContent = questionsLeft; //displayes the questions left
span.onclick = function () {
modal.style.display = "none";
                }
                
next.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (answered) {
                        questionsLeft--
                        numOfQuestions.textContent = questionsLeft
                        next.classList.add('disabled')
                        submitAnswer.classList.add('disabled')
                        currentIndex++;
                        if (currentIndex >= questions.length) {
                            resetgame()
                        }
                        displayQuestion(questions, currentIndex);
                        correctAnswer = getCorrectAnswer(questions, currentIndex);
                        answered = false;
                    }
        
                })
        
                submitAnswer.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (selectedAnswer) {
                        next.classList.remove('disabled')
                        if (selectedAnswer === correctAnswer) {
                            numberOfCorrect++
                            correctDisplay.textContent = numberOfCorrect;
                        } else {
                            answerElement.classList.add('incorrect')
                        }
                        displayCorrectAnswer(correctAnswer)
                        answered = true;
                        selectedAnswer = false;
                    }
                })
        


// ==================For the timer=============


function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  
  
  return {
    'total': t,
    
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  
  
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    
    
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 200);
initializeClock('clockdiv', deadline);
