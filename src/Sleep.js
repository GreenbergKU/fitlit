class Sleep {
  constructor(data) {
    this.data = data;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}

/*

iteration3: sleep

* For a user (identified by their `userID`), the average number of hours slept per day
* For a user, their average sleep quality per day over all time
* For a user, how many hours they slept for a specific day (identified by a date)
* For a user, their sleep quality for a specific day (identified by a date)
* For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
* For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
* For all users, the average sleep quality
* Find all users who average a sleep quality greater than `3` for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
* For a given day (identified by the date), find the users who slept the most number of hours (one or more if they tied)
* Make a metric of your own! Document it, calculate it, and display it.

**Dashboard:**
Items to add to the dashboard:

* For a user, their sleep data for the latest day (hours slept and quality of sleep)
* For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
* For a user, their all-time average sleep quality and all-time average number of hours slept


* For all users, the average sleep quality
* Find all users who average a sleep quality greater than `3` for a given week (7 days) - you should be able to calculate this for any week, not just the latest week
*/