angular.module('meterQuest')
  .service('userSvc', function($log, mockUsers) {
    $log.debug("userSvc initialized with " + mockUsers.length + " mock users.");
    var currentUser = 0;

    return {
      mockUsers: mockUsers,
      getUser: function() {
        return mockUsers[currentUser];
      },
      // It's kind of like log-in / log-out...
      toggleUser: function() {
        $log.debug("currentUser at index: " + currentUser);
        if (currentUser === 0) {
          currentUser = 1;
        } else {
          currentUser = 0;
        }
      }
    };
  });
