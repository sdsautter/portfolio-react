//
//  SERVER SIDE 
// 

function timeStart(Round.timeLeft) {
    var timeLeft = 60;
    //We need to put to the database the timeLeft
    Round.timeLeft = timeLeft

    //Set a one second countdown and continuously update the database letting it know how much time is left 
    setInterval(function () {
        //if there's time left continue to update else go into the voting round
        if (timeLeft > 0) {
            timeLeft--;
            Round.startTime.put = timeLeft
        } else {
            voteRound()
        }
    }, 1000);

}

//We want the server to give them random letters on our side that they all see
function pickLetters(Round.number) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    switch (round.number) {
        case 1:
            //In the first round we want to give them 3 random letters that we push to our schema
            for (var i = 0; i < 3; i++) {
                let letterIndex = Math.floor(Math.random() * alphabet.length);
                database.letters.push(alphabet[letterIndex]);
            }
            break;
        case 2:
            for (var i = 0; i < 4; i++) {
                let letterIndex = Math.floor(Math.random() * alphabet.length);
                database.letters.push(alphabet[letterIndex]);
            }
            break;
        case 3:
            for (var i = 0; i < 5; i++) {
                let letterIndex = Math.floor(Math.random() * alphabet.length);
                database.letters.push(alphabet[letterIndex]);
            }
            break;
        case 4:
            //Here we're picking a random number between 3 and 5 in the amount of letters the will receive
            var randomLetterNumber = Math.floor((Math.random() * 5) + 3);
            for (var i = 0; i < randomLetterNumber; i++) {
                let letterIndex = Math.floor(Math.random() * alphabet.length);
                database.letters.push(alphabet[letterIndex]);
            }
            break;
        case 5:
            var randomLetterNumber = Math.floor((Math.random() * 5) + 3);
            for (var i = 0; i < randomLetterNumber; i++) {
                let letterIndex = Math.floor(Math.random() * alphabet.length);
                database.letters.push(alphabet[letterIndex]);
            }
            break;
        case 6:
            //In the final round they get 7 letters
            for (var i = 0; i < 7; i++) {
                let letterIndex = Math.floor(Math.random() * alphabet.length);
                database.letters.push(alphabet[letterIndex]);
            }
            break;
    }
}

//
// CLIENT SIDE
//

//Get the round time and letter array from the server when they update

var timeLeft = Round.get(timeLeft);
var letterArray = Round.get(letters);
var roundNumber = Round.get(roundNumber);
var scorePotential = 0


$("#answerSubmit").on("click", (event) => {
    event.preventDefault();

    var playerAnswer = $("#playerAnswer").val().trim();

    //We create an array of their answers by splitting on the spaces
    var answerArray = playerAnswer.split(" ");

    //First we'll see if there's any time left
    if (timeLeft > 0) {
        //We check to see if the answer array is the same length as the letter array
        if (answerArray.length === letterArray.length) {
            //If it is the same length then we run a for loop that is the length of the letter array
            for (var i = 0; i < letterArray.length; i++) {
                //If the first letter in the player's answer starts with the corresponding, we push that answer to the database
                if (answerArray[i].startsWith(letterArray[i])) {
                    //Run the score potential function first
                    scorePotential(roundNumber, timeLeft);

                    Round.answers.put({
                        player: localStorage.getItem(userName),
                        scorePotential: scorePotential,
                    })

                } else {
                    //If a letter doesn't start with the corresponding letter in array, return
                    alert(`Word ${i + 1} did not start with the corret letter`);
                    return;
                }
            }
        } else if (answerArray.length > letterArray.length) {
            alert("You have too many words. What are you trying to pull?");
            $("#playerAnswer").clear();
            return;
        } else if (answerArray.length < letterArray.length) {
            alert("You don't have enough words. What are you thinking?");
            $("#playerAnswer").clear();
            return;
        }
    }
});

function scorePotentialFunction(roundNumber, timeLeft) {
    if (roundNumber < 4) {
        //For the first 3 rounds the max score the can get is 300, and the minimum is 100
        //They lose potential points every second they don't answer
        return scorePotential = timeLeft(3(1/3)) + 100;
    } else if (roundNumber >= 4 && roundNumber < 6) {
        //In rounds 4, 5, and 6 the score potential doubles
        return scorePotential = 2 * (timeLeft(3(1/3)) + 100); 
        
    } else if (roundNumber === 6) {
        //In the final round the score potential is always the same no matter when it was answered
        scorePotential = 750;
    }
}

//Our voting round logic

//Create an empty array for other user's answers
var answersArray = [];
    
//I commented all of the stuff out down below because I figure there has to be 
//  an easier way on the back end to show answers where username doesn't equal
//  localStorage username, but you can see where I was going with it.

// function fillAnswerArray(Round.answers) {

//     //Loop through all of the answers
//     for (var i = 0; i < Round.answers.length; i++) {
//         //If the answer wasn't submitted by the local player, then push it to the answerArray
//         if (Round.answers.player.userName !== localStorage.getItem(userName)) {
//             answersArray.push(Round.answers[i].answer);
//         }
//     }
// }

// function displayAnswers(answerArray) {

// }

$("#answer1").on("click", function(event) {
    event.preventDefault();

    var answer = $("#answer1").val();
    Rounds.answers.set(where Round.answers.answer === answer, {
        votes: localStorage().username 
    })
});

$("#answer2").on("click", function(event) {
    event.preventDefault();

    var answer = $("#answer2").val();
    Rounds.answers.set(where Round.answers.answer === answer, {
        votes: localStorage().username 
    })
});

$("#answer3").on("click", function(event) {
    event.preventDefault();

    var answer = $("#answer3").val();
    Rounds.answers.set(where Round.answers.answer === answer, {
        votes: localStorage().username 
    })
});


$("#answer4").on("click", function(event) {
    event.preventDefault();

    var answer = $("#answer4").val();
    Rounds.answers.set(where Round.answers.answer === answer, {
        votes: localStorage().username 
    })
});

//Todo set timer for the voting round to end or condition where if everyone submits it ends
//Then multiply the score potential by votes.length, and add that score to the database

//Then we display the results