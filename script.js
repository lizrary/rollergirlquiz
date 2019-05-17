'use strict';



let questionNumber = 0;
let score = 0;




function startQuiz () {
    $('.start-quiz').on('click', '.start-button', function(event) {
        $('.start-quiz').remove();
        $('.questionAnswerForm').css('display', 'block');
        $('.questionNumber').text(1);
    })
}

function generateQuestion () {
    if (questionNumber < STORE.length) {
        return `
        <form class="question-form">
         <fieldset>
         <legend><h2>${STORE[questionNumber].question}</h2></legend>
            <div class="radioChoices">
            <label class="answerOption">
            <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[0]}" required checked>
            ${STORE[questionNumber].answers[0]}
            </label><br>
            <label class="answerOption">
            <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[1]}" required>
            ${STORE[questionNumber].answers[1]}
            </label><br>
            <label class="answerOption">
            <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[2]}" required>
            ${STORE[questionNumber].answers[2]}
            </label><br>
            <label class="answerOption">
            <input id ="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNumber].answers[3]}" required>
            ${STORE[questionNumber].answers[3]}
            </label>
            </div>
            <button type="button" class="submitQuestion">SUBMIT</button>
        </fieldset>
      </form>
    </div>
        `
    }
    else {
        renderResults();
        restartQuiz()
        $('.questionNumber').text(10);
    }
}



function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
  }
 

function changeQuestionNumber () {
    questionNumber ++;
    $('.questionNumber').text(questionNumber + 1)
}

function changeScore () {
    score ++;
}



function userSelectAnswer () {
    $('form').on('click', '.submitQuestion', function(event) {
      event.preventDefault();
      let selected = $('input:checked');
      let answer = selected.val();
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      if (answer === correctAnswer) {
        ifAnswerIsCorrect();
      }
      else {
        ifAnswerIsWrong();
      }
    });
  }



  function ifAnswerIsCorrect () {
    userAnswerFeedbackCorrect();
    updateScore();
  }

  function ifAnswerIsWrong() {
    userAnswerFeedbackWrong();
  }

function userAnswerFeedbackCorrect () {
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      $('.questionAnswerForm').html(`
      <div class="correctFeedback">
       </div>
       <header>JAM ON!</header>
       <button type="button" class="nextButton">NEXT</button>
       </div>`);
  }
  


  function userAnswerFeedbackWrong () {
      let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
      $('.questionAnswerForm').html(`
      <div class="wrongFeedback">
    
        <p>YOU FELL DOWN!</p>
        <p>THE CORRECT ANSWER IS: <span>"${correctAnswer}"</span></p>
        <button type="button" class="nextButton">NEXT</button>
        </div>`);
  }


  function updateScore () {
      changeScore ();
      $('.score').text(score);
      }



function renderResults () {
$('.questionAnswerForm').html(`
  <p>YOUR FINAL SCORE:
  <br>
  ${score} OUT OF 7</p>
  <button type="button" class="restartButton">Get back up and try again?</button>
 </div>
`
);
}

function renderNextQuestion () {
    $('main').on('click', '.nextButton', function(event) {
      changeQuestionNumber();
      renderQuestion();
      userSelectAnswer();
    });
  }
  
  function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();

    });
  }

  

  function createQuiz () {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
  }
 
  
  $(createQuiz);
  
