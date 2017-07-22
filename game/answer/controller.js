const Answer = require('./model');

exports.createAnswer = async(round, player, answer, scorePotential) => {
  const newAnswer = await new Answer({
    round,
    player,
    answer,
    scorePotential,
  }).save();
  return newAnswer;
};

exports.findAnswerByRound = async(round) => {
  let answerArray = [];
  const answer = await Answer.find({
    round,
  });

  console.log(`found answer: ${answer}`);
  console.log(`${answer} is an array: ${Array.isArray(answer)}`);
  if (answer.length === 0) {
    console.log('answer length is 0, returning false');
    return false;
  }

  if (!Array.isArray(answer)) {
    console.log('answer isnt an array, casting as array and returning');

    answerArray.push(answer);
    return answerArray;
  }
  console.log('answer is an array, returning');
  return answer;
};

exports.findAnswerByRoundAndPlayer = async(round, player) => {
  const answer = await Answer.find({
    round,
    player,
  });

  if (answer.length === 0) return false;
  return answer;
};

exports.findById = async(id) => {
  const answer = await Answer.findById(id);

  if (answer.length === 0) return false;
  return answer;
};