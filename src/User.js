class User {
  constructor(data, numID) {
    console.log("data.findUser(numID)[0]: ", data.findUser(numID)[0]); 
    this.userData = data.findUser(numID)[0]; 
    this.id = this.userData.id;
    this.name = this.userData.name;
    this.address = this.userData.address;
    this.email = this.userData.email;
    this.strideLength = this.userData.strideLength;
    this.avgStepGoal = data.findAvg(data.data, "dailyStepGoal");
    this.dailyStepGoal = this.userData.dailyStepGoal;
    this.friends = this.userData.friends || [];
    this.friendsData = this.userData.friendsData || [];
    this.hydration = this.filterUserID(data.hydrationData);
    this.sleep = this.filterUserID(data.sleepData);
    this.sleepAvgHrs = data.findAvg(this.sleep, "hoursSlept");
    this.sleepQtyAvg = data.findAvg(this.sleep, "sleepQuality");

    console.log('findDateSpan(...sleep): ', this.findDateSpan(this.sleep, 7, "2019/09/16"));
    
    console.log('findEachDay(sleep): ', this.findEachDay(this.findDateSpan(this.sleep, 7, "2019/09/16"), "sleepQuality"));

    this.activity = this.filterUserID(data.activityData);
  };
  //};

  firstName() {
    return this.name.split(" ")[0];
  }

  filterUserID(data) {
    return data = data.filter(user => user.userID === this.id);
  }

  // findPastData(data, dayNum) {
  //   console.log('@filterData: ');
  //   console.log('userData: ', data);    
  //   console.log('dayNum: ', dayNum);
  //   return data.slice(`-${dayNum}`);
  // }

  findDateSpan(data, dayNum, date) {
    console.log('date(before): ', date);
    console.log('data.slice(-1)[0].date: ', data.slice(-1)[0].date);
    console.log('date ? : ', date ? true : false);

    date = this.validateDate(data, dayNum, date);
    
    console.log('date(after): ', date);

    let dateIndex = data.findIndex(day => day.date === date);
    console.log('dateIndex: ', dateIndex);
    return data.slice(dateIndex, dateIndex + dayNum);
  }

  validateDate(data, dayNum, date) {
    return !date ? dayNum > 1 ? 
    data.slice(`-${dayNum}`, `-${dayNum - 1}`)[0].date 
    : data.slice(`-${dayNum}`)[0].date
    : date;
  }

  findEachDay(data, property) {
    let allDays = [];
    data.forEach(day => allDays.push(day[property]));
    return allDays;
  }

}


if (typeof module !== 'undefined') {
  module.exports = User;
}  

  
/*
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