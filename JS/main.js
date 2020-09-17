

//Start button function

let button = $('.btn')
button.click(function(){
  window.location.href='Gamepage/index.html';
})



// Timer function
var sec = 30;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + " secs left";
    sec--;
    if (sec == -2) {
        clearInterval(time);
        alert("Time's up! ")
        window.location.href='../Result/asiandad3.html';
    }
}

//Quiz function
var Quiz = function(){
  var self = this;
  this.init = function(){
    self._bindEvents();
  }
  
  this.correctAnswers = [ 
    { question: 1, answer: 'b' },
    { question: 2, answer: 'd' },
    { question: 3, answer: 'b' },
    { question: 4, answer: 'c' },
    { question: 5, answer: 'd' },
    { question: 6, answer: 'a' },
    { question: 7, answer: 'a' },
    { question: 8, answer: 'd' },
    { question: 9, answer: 'c' },
    { question: 10, answer: 'c' },

  ]
  
  this._pickAnswer = function($answer, $answers){ // Answer selction function
    $answers.find('.quiz-answer').removeClass('active');
    $answer.addClass('active');
  }
  this._calcResult = function(){ // Result calculation function
    var numberOfCorrectAnswers = 0;
    $('ul[data-quiz-question]').each(function(i){
      var $this = $(this),
          chosenAnswer = $this.find('.quiz-answer.active').data('quiz-answer'),
          correctAnswer;
      
      for ( var j = 0; j < self.correctAnswers.length; j++ ) {
        var a = self.correctAnswers[j];
        if ( a.question == $this.data('quiz-question') ) {
          correctAnswer = a.answer;
        }
      }
      
      if ( chosenAnswer == correctAnswer ) { 
        
        numberOfCorrectAnswers++; // if chosen answer is the same as correct answer, add to num of correct answers 
        
        
        $this.find('.quiz-answer.active').addClass('correct');// addclass new class if selected answer is correct or incorrect
      }
      else {
      
        $this.find('.quiz-answer.active').addClass('incorrect');
      } 
    }); // Results
    if ( numberOfCorrectAnswers < 10 ) {
      alert(numberOfCorrectAnswers + ' out of 10')
      window.location.href='../Result/asiandad.html'
    }
    
    else if ( numberOfCorrectAnswers == 10 ) {
      alert (numberOfCorrectAnswers + ' out of 10')
      window.location.href='../Result/asiandad2.html'
    }
  }

  this._isComplete = function(){
    var answersComplete = 0;
    $('ul[data-quiz-question]').each(function(){
      if ( $(this).find('.quiz-answer.active').length ) {
        document.getElementById('numOfQuestion').innerHTML = "Questions " + (1 + answersComplete) + " of 10" // Question count
        answersComplete++
    }
    });
    if ( answersComplete >= 10 ) {
      return true;
    }
    else {
      return false;
    }
  }
  
  this._bindEvents = function(){
    $('.quiz-answer').on('click', function(){
      var $this = $(this),
          $answers = $this.closest('ul[data-quiz-question]');
      self._pickAnswer($this, $answers);
      if ( self._isComplete() ) {
        
        self._showResult( self._calcResult() );
        $('.quiz-answer') // Show result once completed
        
      }
    });
  }
}
var quiz = new Quiz();
quiz.init();
    
