class User {
  constructor(usersData, numID) {
    this.data = usersData.findUser(numID);   
    this.id = this.data[0].id;
    this.name = this.data[0].name;
    this.address = this.data[0].address;
    this.email = this.data[0].email;
    this.strideLength = this.data[0].strideLength;
    this.dailyStepGoal = this.data[0].dailyStepGoal;  
    this.friends = this.data[0].friends || [];   
    this.friendsData = [];
    this.avgStepGoal = usersData.avgStepGoal;

    this.hydration = this.filterUserID(usersData.hydrationData, this.id);
    this.sleep = this.filterUserID(usersData.sleepData, this.id);
    this.activity = this.filterUserID(usersData.activityData, this.id);
    
    this.data = {
      hydration: this.filterUserID(usersData.hydrationData, this.id), 
      sleep: this.filterUserID(usersData.sleepData, this.id), 
      activity: this.filterUserID(usersData.activityData, this.id)
    };
    //this.data.sleep.sleepAvgHrs = usersData.findAvg(this.sleep, "hoursSlept");
    //this.data.sleep.sleepQtyAvg = usersData.findAvg(this.sleep, "sleepQuality");
    //this.minActiveAvg = usersData.findAvg(repoData.activityData, "minutesActive");
    //this.stairsAvg = usersData.findAvg(repoData.activityData, "flightsOfStairs"); 
    
    this.weekData = {
      hydration: this.findDateSpan(this.data.hydration, 7),
      sleep: this.findDateSpan(this.data.sleep, 7), 
      activity: this.findDateSpan(this.data.activity, 7),
    };
    this.findWkAvgs(usersData);
    
    /*
      {
        hydration: this.findDateSpan(this.hydration, 7),
        sleep: this.findDateSpan(this.sleep, 7), 
        activity: this.findDateSpan(this.activity, 7)
      }
    */
    
  }

  findWkAvgs(usersData) {
    this.avgStepGoal = usersData.findAvg(usersData.data, "dailyStepGoal");   
    this.sleepAvgHrs = usersData.findAvg(usersData.sleepData, "hoursSlept");
    this.sleepQtyAvg = usersData.findAvg(usersData.sleepData, "sleepQuality");
    this.weekData.sleepWkAvg = usersData.findAvg(this.weekData.sleep, "hoursSlept");
    this.weekData.slpQtyWkAvg = usersData.findAvg(this.weekData.sleep, "sleepQuality");
    this.weekData.actWkSum =  this.findSum(this.findAll(this.weekData.activity, "numSteps"));
    this.minActiveAvg = usersData.findAvg(usersData.activityData, "minutesActive");
    this.stairsAvg = usersData.findAvg(usersData.activityData, "flightsOfStairs"); 
  }

  firstName() {
    return this.name.split(" ")[0];
  }

  filterUserID(data, id) {
    return data.filter(user => user.userID === id);
  }

  filterProperty(data, property, value) {
    return data.filter(obj => obj[property] === value);
  }

  addFriendData(friendData) {
    this.friendsData.push(friendData);
  }

  findDateSpan(data, dayNum, date) { 
    date = this.validateDate(data, dayNum, date);       
    let dateIndex = data.findIndex(day => day.date === date);
    // console.log("data", data);
    return data.slice(dateIndex, dateIndex + dayNum);
  }

  validateDate(data, dayNum, date) {
    let week = data.slice(`-${dayNum}`, `-${dayNum - 1}`);
    return !date ? dayNum > 1 && week.length === 7 ? week[0].date 
    : data.slice(`-${dayNum}`)[0].date
    : date;
  }

  findAll(data, property) {  
    // console.log('property: ', property);
    // console.log('data: ', data);
    let allDays = [];
    data.forEach(obj => allDays.push(obj[property]));
    return allDays;
  }

  findSum(numbers) {
    let sum = 0;
    numbers.forEach(num => sum += num);
    return sum;
  }

  findDistance(data) {
    let sum = 0;
    data.forEach(day => sum += day.numSteps);
    // console.log('sum:', sum, 'strideLength: ', this.strideLength);
    return (sum * this.strideLength / 5280).toFixed(2);
  }

  convertToMiles(num) {
    return (num * this.strideLength / 5280).toFixed(2);
  }

  compareStepData(property1, property2) {
    // console.log('properties(1, 2): ', property1, property2);
    return property1 >= property2;   
  }

  compareStepData(data) {
    data.numSteps >= this.dailyStepGoal
  }

  findStepPercentage(dayData) {
    return dayData.numSteps / user.dailyStepGoal * 100;
  }

  findPercentage(property1, property2) {
    return property1 / property2 * 100;
  }
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

////// NOTES - taken from w/i code above (newest at top)



//FROM CONSTRUCTOR METHODS...
  //console.log('findDateSpan(...sleep): ', this.findDateSpan(this.sleep, 7, "2019/09/16"));

  //console.log('findEachDay(sleep): ', this.findEachDay(this.findDateSpan(this.sleep, 7, "2019/09/16"), "sleepQuality"));

  //console.log('findDateSpan(...activity): ', this.findDateSpan(this.activity, 1));

  //this.mustStep = this.activity.numSteps < this.userData.dailyStepsGoal;

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