class User {
  constructor(data, numID) {
    console.log('@USER: ', 'data: ', data);
    console.log("data.findUser(numID)[0]: ", data.findUser(numID)[0]); 
    
    this.userData = data.findUser(numID)[0]; 
    this.id = this.userData.id;
    this.name = this.userData.name;
    this.address = this.userData.address;
    this.email = this.userData.email;
    this.strideLength = this.userData.strideLength;
    this.avgStepGoal = data.avgStepGoal;
    //data.findAvg(data.data, "dailyStepGoal");
    this.dailyStepGoal = this.userData.dailyStepGoal;
    this.friends = this.userData.friends || [];
    this.friendsData = this.userData.friendsData || [];
    this.hydration = this.filterUserID(data.hydrationData);
    this.sleep = this.filterUserID(data.sleepData);
    this.sleepAvgHrs = data.findAvg(this.sleep, "hoursSlept");
    this.sleepQtyAvg = data.findAvg(this.sleep, "sleepQuality");
    //console.log('findDateSpan(...sleep): ', this.findDateSpan(this.sleep, 7, "2019/09/16"));
    //console.log('findEachDay(sleep): ', this.findEachDay(this.findDateSpan(this.sleep, 7, "2019/09/16"), "sleepQuality"));
    this.activity = this.filterUserID(data.activityData);
    //console.log('findDateSpan(...activity): ', this.findDateSpan(this.activity, 1));
    //this.mustStep = this.activity.numSteps < this.userData.dailyStepsGoal;
  }

  firstName() {
    return this.name.split(" ")[0];
  }

  filterUserID(data) {
    return data = data.filter(user => user.userID === this.id);
  }

  findDateSpan(data, dayNum, date) { 
 
    date = this.validateDate(data, dayNum, date);   
    
    let dateIndex = data.findIndex(day => day.date === date);
    return data.slice(dateIndex, dateIndex + dayNum);
  }

  validateDate(data, dayNum, date) {
    return !date ? dayNum > 1 ? 
    data.slice(`-${dayNum}`, `-${dayNum - 1}`)[0].date 
    : data.slice(`-${dayNum}`)[0].date
    : date;
  }

  findEachDay(daysData, property) {
    let allDays = [];
    daysData.forEach(day => allDays.push(day[property]));
    return allDays;
  }

  findDistance(data) {
    let sum = 0;
    //sum = data.length === 1 ? data.numSteps : 
    data.forEach(day => sum += day.numSteps);
    console.log('sum:', sum, 'strideLength: ', this.strideLength);
    return (sum * this.strideLength / 5280).toFixed(2)
  }

  compareStepData(dayData) { 
    console.log('dayData.numSteps: ', dayData.numSteps);
    console.log('this.dailyStepGoal: ', this.dailyStepGoal);
    return dayData.numSteps >= this.dailyStepGoal;   
  }

  findStepPercentage(dayData) {
    return dayData.numSteps / user.dailyStepGoal * 100;
  }
  // DASHBOARD
}



if (typeof module !== 'undefined') {
  module.exports = User;
}  

  
/*

ITERATION 4 - ACTIVITY

const activityData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "numSteps": 3577,
    "minutesActive": 140,
    "flightsOfStairs": 16
  }, 
  ...all Data
]
DATA

x For a specific day (specified by a date), return the miles a user has walked based on their number of steps (use their `strideLength` to help calculate this)
x For a user, (identified by their `userID`) how many minutes were they active for a given day (specified by a date)?
* For a user, how many minutes active did they average for a given week (7 days)?
* For a user, did they reach their step goal for a given day (specified by a date)?
* For a user, find all the days where they exceeded their step goal
* For a user, find their all-time stair climbing record

* Make a metric of your own! Document it, calculate it, and display it.

DASHBOARD
Items to add to the dashboard:

x For a user, the number of steps for the latest day
x For a user, the number minutes active for the latest day
x For a user, the distance they have walked (in miles) for the latest day based on their step count
x How their number of steps, minutes active, and flights of stairs climbed compares to all users for the latest day

  // by DAY, compare all users to user:
  // **** How their ** number of steps **, ** minutes active **, and ** flights of stairs ** climbed 
  // userDay: this.activity.numSteps, this.activity.minutesActive, this.activity.flightsOfStairs  
  // usersDay: data.findAvg(data.activityData, "numSteps" );
  //             data.findAvg(data.activityData, "minutesActive"); 
  //             data.findAvg(data.activityData, "flightsOfStars");

* For a user, a weekly view of their step count, flights of stairs climbed, and minutes active




ITERATION 3: sleep
const sleepData = [
  {
    "userID": 1,
    "date": "2019/06/15",
    "hoursSlept": 6.1,
    "sleepQuality": 2.2
  }
]

  x For a user (identified by their `userID`), the average number of hours slept per day
  x For a user, their average sleep quality per day over all time
  x For a user, how many hours they slept for a specific day (identified by a date)
  x For a user, their sleep quality for a specific day (identified by a date)
  x For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week
  x For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week  

*/

  // findPastData(data, dayNum) {
  //   console.log('@filterData: ');
  //   console.log('userData: ', data);    
  //   console.log('dayNum: ', dayNum);
  //   return data.slice(`-${dayNum}`);
  // }

  // findDate(data, date) {
  //   console.log('date: ', data);
  //   console.log('date: ', date);    
  //   return data.filter(day => day.date === date)[0];
  // }  

  
  //date = date || data.slice(-7, 1)[0].date;

    //let hydraWeek = data.slice(data.findIndex(data => data.date === date), -7);
    //return hydraWeek;


  // findNumOunces(userData) {
  //   let numOunces = [];
  //   userData.forEach(day => numOunces.push(day.numOunces));
  //   return numOunces;
  // }

//let repo = new UserRepository(userData, hydrationData, sleepData, activityData);
//let userRepoData = repo.findUser(1);
//new User(repo, userRepoData[0]);