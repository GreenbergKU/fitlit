/*
class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.email = data.email;
    this.strideLength = data.strideLength;
    this.dailyStepGoal = data.dailyStepGoal;
    this.friends = data.friends || [];
    this.friendsData = [];
    //this.hydration = ;
    //this.sleep = this.filterUserID(newSleep);
    //this.activity = this.filterUserID(newActivity);
  }
  
  firstName() {
    return this.name.split(" ")[0];
  }

  filterUserID(data) {
    return data = data.filter(user => user.userID === this.id);
  }

  findPastData(userData, dayNum) {
    console.log('@filterData: ');
    console.log('userData: ', userData);    
    console.log('dayNum: ', dayNum);
    return userData.slice(`-${dayNum}`);
  }

  // findUserAvg(userData) {
  //   let sum = 0;
  //   userData.forEach(day => sum += day.numOunces);
  //   return sum / userData.length
  // }

  findDate(userData, date) {
    console.log('userData: ', userData);
    console.log('date: ', date);
    return userData.filter(data => data.date === date)[0].numOunces
  }

  findNumOunces(userData) {
    let numOunces = [];
    userData.forEach(day => numOunces.push(day.numOunces));
    return numOunces;
  }
}

*/

class User {
  /*
  constructor(data, user) {
    this.userData = user;    
    this.id = user.id;
    this.name = this.userData.name;
    this.address = this.userData.address;
    this.email = this.userData.email;
    this.strideLength = this.userData.strideLength;
    this.dailyStepGoal = this.userData.dailyStepGoal;
    this.friends = this.userData.friends || [];
    this.friendsData = this.userData.friendsData || [];
    this.hydration = this.filterUserID(data.hydrationData);
    this.sleep = this.filterUserID(data.sleepData);
    this.activity = this.filterUserID(data.activityData);
  }
  */
  constructor(data, numID) {
    this.userData = data.findUser(numID)[0];    
    this.id = this.userData.id;
    this.name = this.userData.name;
    this.address = this.userData.address;
    this.email = this.userData.email;
    this.strideLength = this.userData.strideLength;
    this.dailyStepGoal = this.userData.dailyStepGoal;
    this.friends = this.userData.friends || [];
    this.friendsData = this.userData.friendsData || [];
    this.hydration = this.filterUserID(data.hydrationData);
    this.sleep = this.filterUserID(data.sleepData);
    this.activity = this.filterUserID(data.activityData);
  };
    
  firstName() {
    return this.name.split(" ")[0];
  }

  filterUserID(data) {
    return data = data.filter(user => user.userID === this.id);
  }

  findPastData(data, dayNum) {
    console.log('@filterData: ');
    console.log('userData: ', data);    
    console.log('dayNum: ', dayNum);
    return data.slice(`-${dayNum}`);
  }

  findDate(data, date) {
    date = date || data.slice(-7, 1)[0].date;
    console.log('date: ', data);
    console.log('date: ', date);
    let hydraWeek = data.slice(data.findIndex(data => data.date === date), -7);
    return hydraWeek;
  }

  findNumOunces(userData) {
    let numOunces = [];
    userData.forEach(day => numOunces.push(day.numOunces));
    return numOunces;
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}


//let repo = new UserRepository(userData, hydrationData, sleepData, activityData);
//let userRepoData = repo.findUser(1);
//new User(repo, userRepoData[0]);