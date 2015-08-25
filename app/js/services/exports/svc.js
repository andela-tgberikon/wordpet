module.exports = function(rootRef, $rootScope, $firebase) {
  var val;

  //move this firebase code to return, so it would be a function that takes in parameters from the frontend, or just think of a way to make the function private to the app.

  //Better idea is to send all writes to the backend, but call the firebase from the frontend to improve on client speed, the more words are searched and written to the backend, the better the user experience

  //A cheat hack or optimistation hack I'm thinking of right now is to have the app call random words from the API and save to firebase, this would happen transparently and only when there is no load on the server.

  //What this solves? 
  //It would first of all keep the app awake on heroku because of the constant calls the server would be making to the WordsAPI
  //It would build up more words in firebase so the user would eventually reduce API calls from the server.

  return {
    holdVal: function(res) {
      val = res;
    },
    getVal: function(res) {
      return val;
    }
  }
};
