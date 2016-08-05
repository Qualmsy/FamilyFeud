if (Meteor.isClient) {
  //var questions = $("#test");
  //console.log(questions);
  //var el = document.getElementById('questionswithfouranswers');
  var tbodies = document.getElementsByTagName('tbody');
  var questions;
  var questionList = [];
  var parse = function () {
      questions = tbodies[0].children;
      console.log(questions.length);
          for (var i = questions.length - 1; i >= 0; i--) {
            var obj = {};
            if (questions[i].children[1]) {obj.question = questions[i].children[1].innerHTML;}
            if (questions[i].children[2]) {obj.answer1 = questions[i].children[2].innerHTML;}
            if (questions[i].children[4]) {obj.answer2 = questions[i].children[4].innerHTML;}
            if (questions[i].children[6]) {obj.answer3 = questions[i].children[6].innerHTML;}
            if (questions[i].children[8]) {obj.answer4 = questions[i].children[8].innerHTML;}
            if (questions[i].children[10]) {obj.answer5 = questions[i].children[10].innerHTML;}
            if (questions[i].children[3]) {obj.percentAnswer1 = questions[i].children[3].innerHTML;}
            if (questions[i].children[5]) {obj.percentAnswer2 = questions[i].children[5].innerHTML;}
            if (questions[i].children[7]) {obj.percentAnswer3 = questions[i].children[7].innerHTML;}
            if (questions[i].children[9]) {obj.percentAnswer4 = questions[i].children[9].innerHTML;}
            if (questions[i].children[11]) {obj.percentAnswer5 = questions[i].children[11].innerHTML;}
            questionList.push(obj);
            questions[i].parentNode.removeChild(questions[i]);
          };        
    };
  
  Meteor.setTimeout(parse, 1000);

  Template.landing.viewmodel('familyfeud',{
    threeXvisible: false,
    twoXvisible: false,
    oneXvisible: false,
    buttonsvisible: true,
    blueanswer: '',
    redanswer: '',
    showThreeXs: function () {
      this.threeXvisible(true);
      this.twoXvisible(false);
      this.oneXvisible(false);
      this.buttonsvisible(false);
      var self = this;
      Meteor.setTimeout(function () { 
        self.threeXvisible(false);
        self.buttonsvisible(true);
      }, 1000);
    },
    showTwoXs: function () {
      this.threeXvisible(false);
      this.twoXvisible(true);
      this.oneXvisible(false);
      this.buttonsvisible(false);
      var self = this;
      Meteor.setTimeout(function () { 
        self.twoXvisible(false);
        self.buttonsvisible(true);
      }, 1000);
    },
    showOneX: function () {
      this.threeXvisible(false);
      this.twoXvisible(false);
      this.oneXvisible(true);
      this.buttonsvisible(false);
      var self = this;
      Meteor.setTimeout(function () { 
        self.oneXvisible(false);
        self.buttonsvisible(true);
      }, 1000);
    },
    randomQuestion: '',
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    percentAnswer1: '',
    percentAnswer2: '',
    percentAnswer3: '',
    percentAnswer4: '',
    percentAnswer5: '',

    newquestion: function () {
      var r = Math.floor(Math.random() * 1219);
      var rq = questionList[r];
      if (rq === undefined) 
        {return this.question("No question found")}
      this.question(rq.question);
      
      if (rq.answer1) this.answer1(rq.answer1);
      else this.answer1('');
      if (rq.answer2) this.answer2(rq.answer2);
      else this.answer2('');
      if (rq.answer3) this.answer3(rq.answer3);
      else this.answer3('');
      if (rq.answer4) this.answer4(rq.answer4);
      else this.answer4('');
      if (rq.answer5) this.answer5(rq.answer5);
      else this.answer5('');

      if (rq.percentAnswer1) this.percentAnswer1(rq.percentAnswer1);
      else this.percentAnswer1(0);
      if (rq.percentAnswer2) this.percentAnswer2(rq.percentAnswer2);
      else this.percentAnswer2(0);
      if (rq.percentAnswer3) this.percentAnswer3(rq.percentAnswer3);
      else this.percentAnswer3(0);
      if (rq.percentAnswer4) this.percentAnswer4(rq.percentAnswer4);
      else this.percentAnswer4(0);
      if (rq.percentAnswer5) this.percentAnswer5(rq.percentAnswer5);
      else this.percentAnswer5(0);

    },
    bluepoints: 0,
    redpoints: 0,
    test: function (answer) {
      var a1 = this.answer1().toString().trim().toLowerCase();
      var a2 = this.answer2().toString().trim().toLowerCase();
      var a3 = this.answer3().toString().trim().toLowerCase();
      var a4 = this.answer4().toString().trim().toLowerCase();
      var a5 = this.answer5().toString().trim().toLowerCase();
      //var answers = answer.split(' ');
      var s = new RegExp(answer);
      if (!$('#answer1-3d').hasClass("show-top")) {
        if (a1.match(s)) {
          $('#answer1-3d').toggleClass("show-top");
          return Number(this.percentAnswer1());
        }
      }
      if (!$('#answer2-3d').hasClass("show-top")) {
        if (a2.match(s)) {
          $('#answer2-3d').toggleClass("show-top");
          return Number(this.percentAnswer2());
        }
      }
      if (!$('#answer3-3d').hasClass("show-top")) {
        if (a3.match(s)) {
          $('#answer3-3d').toggleClass("show-top");
          return Number(this.percentAnswer3());
        }
      }
      if (!$('#answer4-3d').hasClass("show-top")) {
        if (a4.match(s)) {
          $('#answer4-3d').toggleClass("show-top");
          return Number(this.percentAnswer4());
        }
      } 
    },
    testblue: function () {
      var answer = this.blueanswer().toString().trim().toLowerCase();
      if (!answer) return 0;
      var points = this.test(answer);
      if (!points) return 0;
      this.bluepoints(Number(this.bluepoints())+points);
    },
    testred: function () {
      var answer = this.redanswer().toString().trim().toLowerCase();
      if (!answer) return 0;
      var points = this.test(answer);
      if (!points) return 0;
      this.redpoints(Number(this.redpoints())+points);
    }
  }, ['randomQuestion'])

  Template.landing.helpers({

  });

  Template.landing.events({

  });






  $(document).ready(function() { 
  
 $("#show-front").click(function() { 
  
   $(".answer").toggleClass("show-top");
 });  
  

})
}

if (Meteor.isServer) {
  Meteor.startup(function () {
 
    // code to run on server at startup
  });
}
