class HydraData {
  constructor(data) {
    this.data = data;
    this.avg = this.findAvg();
    console.log('this.data: ', this.data)
  }

  getHydration(userID) {
    return this.data = this.data.filter(day => day.userID === userID);
  }
  
  findAvg() {
    let hydraSum = 0;
    this.data.forEach(day => hydraSum += day.numOunces);
    console.log('hydraSum: ', hydraSum);
    console.log('this.data.length: ', this.data.length);
    return hydraSum / this.data.length;
  }
  
}

if (typeof module !== 'undefined') {
  module.exports = HydraData;
}