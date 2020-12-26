//const HydraData = require("./HydraData");

class UserRepository {
  constructor(userData, hydrationData, sleepData, activityData) {
    this.data = userData;
    this.avgStepGoalAll = this.findAvgStepGoal();
    //this.data.hydration = hydrationData;
    //this.data.sleep = sleepData;
    //this.data.activity = activityData;
    //console.log('this.stepAvg: ', this.stepAvg);
  }

  findUser(id) {
    return this.data.filter(user => user.id === id)[0];
  }

  findAvgStepGoal() {
    let stepGoalSum = 0;
    this.data.forEach(user => stepGoalSum += user.dailyStepGoal);
    return stepGoalSum / this.data.length;
  }

  // findAvg(data, property) {
  //   let sum = 0;
  //   data.forEach( user => (sum += user[property], console.log(user[property])) );
  //   return sum / data.length
  // }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}