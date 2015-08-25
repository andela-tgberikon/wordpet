module.exports = function(rootRef, $rootScope, $firebase) {
  var val;
  
  return {
    holdVal: function(res) {
      rootRef.child('words').push(res);
      val = res;
    },
    getVal: function(res) {
      saveToFirebase();
      return val;
  }
};
