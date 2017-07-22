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
  const answer = await Answer.find({
    round,
  });

  if (answer.length === 0) return false;
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