angular.module('meterQuest')
  .constant('mockUsers', [
    {
      "name":   "Thurston Wilder",
      "points": 45,
      "badges": [{ "name": "Beta User", "url": "/images/star-badge.png", "alt": "Beta User" }]
    },
    {
      "name":   "Mariana Alvarez",
      "points": 175,
      "badges": [{ "name": "Beta User", "url": "/images/star-badge.png", "alt": "Beta User" },
                 { "name": "Parking Spot Finding Novice", "url": "/images/ten-badge.png", "alt": "Found at least 10 spots" },
                 { "name": "Parking Spot Finding Journeyman", "url": "/images/twenty-five-badge.png", "alt": "Found at least 25 spots" }]
    }
  ])
