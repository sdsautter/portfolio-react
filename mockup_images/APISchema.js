const APISchema = {
  gameInstance: {
    gameInstanceId,
    state, // waiting, playing, complete
    players: { // display at all times and during the round results state
      username,
      points,
    },
  },
  activeRound: {
    number,
    timeLeft,
    state, // playing, voting, results, complete
    userSubmitted: [{ // sent during the playing state to determine which users have submitted an answer
      username,
      submitted, // true false
    }],
    userAnswers: [{ // sent during the voting state 
      answer,
      answerId,
    }],
    userScore: [{ // sent during the results state
      username,
      userScoreForRound,
    }],
  },
};
