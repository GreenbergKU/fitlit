class UserRepository {
  constructor(data) {
    // data = [userData, hydrationData, sleepData, activityData];
    this.data = data[0];
    // this.avgStepGoal = this.findAvg(data[0], "dailyStepGoal");
    this.hydrationData = data[1];
    this.sleepData = data[2];
    // this.avgSleepQtyAll = this.findAvg(data[2], "sleepQuality"); 
    this.activityData = data[3];
  }

  findUser(id) {
    return this.data.filter(user => user.id === id);
  }

  findAvg(data, property) {  
    console.log('data: ', data);
    console.log('property: ', property);
    console.log('data: ', data[0][property]);
    let sum = 0;
    data.forEach(user => sum += user[property]);
    return sum / data.length;
  }
}  
/*
iteration 3: sleep

const sleepData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "hoursSlept": 6.1,
    "sleepQuality": 2.2
  }
]

* For all users, the average sleep quality
* Find all users who average a sleep quality greater than `3` for a given week (7 days) - you should be able to calculate this for any week, not just the latest week

* For a given day (identified by the date), find the users who slept the most number of hours (one or more if they tied)

* Make a metric of your own! Document it, calculate it, and display it.


* For a user (identified by their `userID`), the average number of hours slept per day
* For a user, their average sleep quality per day over all time
* For a user, how many hours they slept for a specific day (identified by a date)
* For a user, their sleep quality for a specific day (identified by a date)
* For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
* For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week


**Dashboard:**
Items to add to the dashboard:

* For a user, their sleep data for the latest day (hours slept and quality of sleep)
* For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
* For a user, their all-time average sleep quality and all-time average number of hours slept

*/
