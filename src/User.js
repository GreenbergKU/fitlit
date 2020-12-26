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

  // filterUserID(data) {
  //   return data = data.filter(user => user.userID === this.id);
  // }

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

if (typeof module !== 'undefined') {
  module.exports = User;
}