const Vote = require('./model');

exports.submitVote = async(round, player, answer) => {
  const newVote = await new Vote({
    round,
    player,
    answer,
  }).save();
  return newVote;
};

exports.findVotesByAnswer = async(answer) => {
  const vote = await Vote.find({
    answer,
  });
  if (vote.length === 0) return false;
  return vote;
};

exports.findVotesByRound = async(round) => {
  const vote = await Vote.find({
    round,
  });
  if (vote.length === 0) return false;
  return vote;
};

exports.findVotesByRoundAndPlayer = async(round, player) => {
  const vote = await Vote.find({
    round,
    player,
  });
  if (vote.length === 0) return false;
  return vote;
};
