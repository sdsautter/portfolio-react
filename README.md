# Acro

A game about acronyms

# Gameplay

5 Rounds plus a final round

# Round 1
3 letters

60 seconds

Scoring: 300 points max potential, and 100 point minimum

After every second your potential score goes down by 3.3333 points, and you get that potential score for every vote you get.

          Ex: Submitting with 60 seconds left ((60 * 3.33333) + 100) = 300 points per vote. 

          Submitting with 40 seconds left ((40 * 3.3333) + 100) = 233 points per vote.
              
# Round 2

4 letters

60 seconds

Scoring the same as Round 1

# Round 3

5 letters

60 seconds

Scoring the same as Round 1 and 2

# Rounds 4 and 5

Randomly selects between 3 and 5 letters

60 seconds

Score doubles

# Final Round

7 letters

90 seconds

Each vote is 1000 points no matter when it was submitted

# API 

## Routes
GET /api/games/:id
* Get the game and round information per the Schema

POST /api/games/:id
* During the answer phase accepts an answer from body.answer
* During the voting phase accepts an answer from body.vote

## Schema
    gameInstance: {
      gameInstanceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameInstance',
      },
      state: String,
      players: [{
        username: String,
        points: {
          type: Number,
          default: 0,
        },
      }],
    },
    ActiveRound: {
      number: Number,
      timeLeft: Number,
      state: String,
      userSubmitted: [{
        username: String,
        submitted: Boolean,
      }],
      userAnswers: [{
        answer: String,
        answerId: mongoose.Schema.Types.ObjectId,
      }],
      userScores: [{
        username: String,
        userScoreForRound: Number,
      }],
    }

