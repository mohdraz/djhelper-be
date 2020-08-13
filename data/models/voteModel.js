/* eslint-disable no-use-before-define */
const db = require('../db-config');

module.exports = {
  getVoteByTrackId,
  getVoteByPlaylistId,
  addVote,
  deleteVote,
  checkIfVoteExists
};

function getVoteByTrackId(trackId) {
  return db('votes')
    .count('isvoted')
    .where('track_id', trackId)
    .first();
}

function getVoteByPlaylistId(playlistId) {
  return db('votes')
    .count('isVoted')
    .where('playlist_id', playlistId);
}
async function addVote(djId, trackId) {
  console.log('being inserted: ', djId);

  const [id] = await db('votes')
    .returning('id')
    .insert({
      dj_id: djId,
      track_id: trackId,
      isvoted: 'yes'
    });

  return getVoteByTrackId(trackId);
}

// function addVote(djId, trackId) {
//   console.log('being inserted: ', djId);
//   return db('votes').insert({
//     dj_id: djId,
//     track_id: trackId,
//     isVoted: 'yes'
//   });
// }

function deleteVote(djId, trackId) {
  return db('votes')
    .where('dj_id', djId)
    .andWhere('track_id', trackId)
    .del();
}

// check if vote already exists

function checkIfVoteExists(djId, trackId) {
  return db('votes')
    .where('dj_id', djId)
    .andWhere('track_id', trackId)
    .first();
}