
(function() {
  function Message($firebaseArray) {
    var Message = {};
      
    var messageRef = firebase.database().ref().child("messages");
    var messages = $firebaseArray(messageRef);
    
    Message.getByRoomId = function(roomId) {
        return $firebaseArray(messageRef.orderByChild('roomId').equalTo(roomId));
    }
    
    Message.send = function(newMessage){
        messages.$add({
            username: newMessage.username,
            content: newMessage.content,
            sentAt: Date.now(),
            roomId: newMessage.roomId
        });
    }
      
    return Message; 
    
  }

  angular
    .module('blocChat')
    .factory('Message', ['$firebaseArray', Message]);
})();