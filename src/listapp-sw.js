import localforage from 'localforage';
import firebase from './firebase';

self.addEventListener('sync', function(event) {
  if (event.tag === 'updateNewItemFlip') {
    event.waitUntil(sendAddedItemToFlip());
  }
  if (event.tag === 'updateNewItemVote') {
    event.waitUntil(sendAddedItemToVote());
    event.waitUntil(sendNewStatusToVote());
  }
});

const sendAddedItemToFlip = () => {
  localforage.getItem('group-flip').then(flipInfo=>{
    localforage.getItem('group-flip-newItem')
    .then(value=>{
      value && firebase.database().ref(`/flipLists/${flipInfo.groupId}/items`).set(value)
    })
    .catch(e => console.log(e.message))
  })
  .then(()=> localforage.removeItem('group-flip-newItem'))
  .catch(e=>console.log(e.message))
}

const sendAddedItemToVote = () => {
  localforage.getItem('group-vote').then(voteInfo=>{
    localforage.getItem('group-vote-newItem')
    .then(value=>{
      value && firebase.database().ref(`/voteLists/${voteInfo.groupId}/items`).set(value)
    })
    .catch(e => console.log(e.message))
  })
  .then(()=> localforage.removeItem('group-vote-newItem'))
  .catch(e=>console.log(e.message))
}

const sendNewStatusToVote = () => {
  localforage.getItem('group-vote').then(voteInfo=>{
    firebase.database().ref(`/voteLists/${voteInfo.groupId}`).set(voteInfo)
  })
  .catch(e=>console.log(e.message))
}