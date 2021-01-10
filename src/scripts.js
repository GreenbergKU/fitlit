//const User = require("./User");

//const User = require("./User");

//const fitLitData = [userData, hydrationData, sleepData, activityData];
let user;
let repoData;

document.onload = loadFit(1);

function loadFit(id, data) {
  data = !data ? [userData, hydrationData, sleepData, activityData] : data;
  repoData = new UserRepository(data);
  user = new User(repoData, id);
  console.log("user: ", user);
  //let currSleepWeek = user.findDateSpan(user.sleep, 7);
  //let currActWeek = user.findDateSpan(user.activity, 7);
  displayUser();
  displayHydraChart(user.weekData.hydration);
  displayDayActivity(user.weekData.activity);
  user.goodSleepers = calculateSleep();
  displayFriends(findFriends());
  displayFrChallenge(user.weekData.activity); 
  //console.log('user.goodSleepers: ', user.goodSleepers);
  //console.log('user.longSleepersDay: ', user.longSleepersDay);
  console.log('user.weekData: ', user.weekData);
} 

function displayUser() {
  let userList = document.getElementsByClassName("user");
  document.querySelector(".greeting").innerText = `Welcome back, ${user.firstName()}!`;
  //let minActiveAvg = repoData.findAvg(repoData.activityData, "minutesActive");
  //let stairsAvg = repoData.findAvg(repoData.activityData, "flightsOfStairs"); 
  userList[0].innerText = user.name; //name
  userList[1].innerText = fixZip(); //address
  userList[2].innerText = user.email; //email
  userList[3].innerText = user.strideLength;
  userList[4].innerText = `${user.dailyStepGoal.toLocaleString('en')}  / ${user.avgStepGoal.toLocaleString('en')}`;  
  // userList[4].innerText = user.avgStepGoal;  
  userList[5].innerText = user.weekData.sleep[6].hoursSlept;
  userList[6].innerText = user.weekData.sleep[6].sleepQuality;
  userList[7].innerText = `${convertToHrs(user.weekData.activity[6].minutesActive)} / ${convertToHrs(user.minActiveAvg)}`;
  userList[8].innerText = `${user.weekData.activity[6].flightsOfStairs} / ${user.stairsAvg}`;
  //userList[9].innerText = repoData.findAvg(weekSleep, "hoursSlept");
  //userList[10].innerText = repoData.findAvg(weekSleep, "sleepQuality");
  userList[9].innerText = user.weekData.sleepWkAvg;
  userList[10].innerText = user.weekData.slpQtyWkAvg;
}

function convertToHrs(min) {
  // console.log('min: ', min);
  return (min / 60).toFixed(2)
}

function calculateSleep(date) {  
  let sleeper, goodSleepers = [], daySleepersAll = [];
  date = user.validateDate(repoData.sleepData, 1, date);
  repoData.data.forEach(userData => {
    sleeper = new User(repoData, userData.id).weekData;
    //console.log('sleeper: ', sleeper);
    daySleepersAll.push(sleeper.sleep.slice(-1)[0]);
    sleeper.sleepWkAvg > 3 ? goodSleepers.push([userData.id, date, sleeper.sleepWkAvg]) : null;  
  })
  //console.log('daySleepersAll: ', daySleepersAll);
  //console.log('user.findAll(daySleepersAll, "hoursSlept"): ', user.findAll(daySleepersAll, "hoursSlept"));
  user.longSleepersDay = findLongestSleep(user.findAll(daySleepersAll, "hoursSlept"));
  displayWkSleepChart(user.weekData.sleep);
  return goodSleepers
}

  /*
    repoData.data.forEach(userData => {
      slpData = user.filterUserID(repoData.sleepData, userData.id);
      allSleepers.push(user.findDateSpan(slpData, 1, date)[0].hoursSlept);       
      slpWk = user.findDateSpan(slpData, 7, date);
      qtyAvg = repoData.findAvg(slpWk, "sleepQuality");
      qtyAvg > 3 ? goodSleepers.push([userData.id, slpWk[0].date, qtyAvg]) : null;  
    })
    user.longSleepers = findLongestSleep(allSleepers);
  */

 function displayWkSleepChart(data) {
  data.forEach(day => day.date = removeYear(day.date));
  anychart.onDocumentReady(function () {
    // create data set on our data
    var dataSet = anychart.data.set(getData());
    // map data for the first series
    var firstSeriesData = dataSet.mapAs({
      x: 0,
      value: 2
    });
    // map data for the second series
    var secondSeriesData = dataSet.mapAs({
      x: 0,
      value: 1
    });
    // create line chart
    let chart = anychart.column();
    // turn on chart animation
    chart.animation(true);
    chart.padding(0, 5, 10, 5);
    // disable Y axis
    chart.yAxis(false);
    // set X axis title
    chart.xAxis().title(false).stroke('black', 2);
    chart.xAxis().ticks().enabled(false);
    // force chart to stack values by Y scale
    chart.yScale().stackMode('value');
    // set chart title
    chart.title('Weekly Sleep Chart');
    // create data-area and set background settings
    chart
      .dataArea()
      .background()
      .enabled(true)
      .fill('#456')
      .corners(15, 15, 0, 0);
    // set grid settings
    chart
      .xGrid()
      .stroke('#fff .1')
      .isMinor(true)
      .drawFirstLine(false)
      .drawLastLine(false);
    chart
      .yGrid()
      .stroke('#fff .1')
      .isMinor(true)
      .drawFirstLine(false)
      .drawLastLine(false);
    // create first series with mapped data
    var firstSeries = chart.column(firstSeriesData);
    firstSeries.name('Total Sleep (hrs)');
    // create second series with mapped data
    var secondSeries = chart.line(secondSeriesData);
    secondSeries.name('Quality Sleep (hrs)');
    // turn the legend on
    chart
      .legend()
      .enabled(true)
      .fontSize(8)
      .fontColor('white')
      .positionMode('inside')
      .margin({ top: 0 });
    // set container id for the chart
    chart.container('container');
    let sleepContainer = document.getElementById('sleep-container');  
    sleepContainer.innerHTML = "";
    // draw
    chart.container("sleep-container");
    // initiate chart drawing
    chart.draw();
  })
  function getData() {
    return [
      [`${data[0].date}`, `${data[0].sleepQuality}`, `${data[0].hoursSlept}`],
      [`${data[1].date}`, `${data[1].sleepQuality}`, `${data[1].hoursSlept}`],
      [`${data[2].date}`, `${data[2].sleepQuality}`, `${data[2].hoursSlept}`],
      [`${data[3].date}`, `${data[3].sleepQuality}`, `${data[3].hoursSlept}`],
      [`${data[4].date}`, `${data[4].sleepQuality}`, `${data[4].hoursSlept}`],
      [`${data[5].date}`, `${data[5].sleepQuality}`, `${data[5].hoursSlept}`],
      [`${data[6].date}`, `${data[6].sleepQuality}`, `${data[6].hoursSlept}`]
    ]
  }
}

  /*
  anychart.onDocumentReady(function () {
  
  // create data set on our data
  var dataSet = anychart.data.set(getData());

  // map data for the first series
  var firstSeriesData = dataSet.mapAs({
    x: 0,
    value: 1
  });

  // map data for the second series
  var secondSeriesData = dataSet.mapAs({
    x: 0,
    value: 2
  });

  // create line chart
  var chart = anychart.column();

  // turn on chart animation
  chart.animation(true);

  chart.padding(10);

  // disable Y axis
  chart.yAxis(false);

  // set X axis title
  chart.xAxis().title('Year').stroke('black', 2);

  chart.xAxis().ticks().enabled(false);

  // force chart to stack values by Y scale
  chart.yScale().stackMode('value');

  // set chart title
  chart.title('Total number of websites on the internet (2000-2015)');

  // create data-area and set background settings
  chart
    .dataArea()
    .background()
    .enabled(true)
    .fill('#456')
    .corners(25, 25, 0, 0);

  // set grid settings
  chart
    .xGrid()
    .stroke('#fff .1')
    .isMinor(true)
    .drawFirstLine(false)
    .drawLastLine(false);

  chart
    .yGrid()
    .stroke('#fff .1')
    .isMinor(true)
    .drawFirstLine(false)
    .drawLastLine(false);

  // create first series with mapped data
  var firstSeries = chart.column(firstSeriesData);
  firstSeries.name('Websites');

  // create second series with mapped data
  var secondSeries = chart.column(secondSeriesData);
  secondSeries.name('Internet Users');

  // turn the legend on
  chart
    .legend()
    .enabled(true)
    .fontSize(13)
    .fontColor('white')
    .positionMode('inside')
    .margin({ top: 15 });

  // set container id for the chart
  chart.container('container');

  // initiate chart drawing
  chart.draw();
});

function getData() {
  return [
    ['2000', 17087182, 413425190],
    ['2001', 29254370, 500609240],
    ['2002', 38760373, 662663600],
    ['2003', 40912332, 778555680],
    ['2004', 51611646, 910060180],
    ['2005', 64780617, 1027580990],
    ['2006', 85507314, 1160335280],
    ['2007', 121892559, 1373327790],
    ['2008', 172338726, 1571601630],
    ['2009', 238027855, 1766206240],
    ['2010', 206956723, 2045865660],
    ['2011', 346004403, 2282955130],
    ['2012', 697089489, 2518453530],
    ['2013', 672985183, 2756198420],
    ['2014', 968882453, 2925249355],
    ['2015', 863105652, 3185996155]
  ];
}

    // anychart.bar = 
    // HI = function (a) {
    //     var b = new EI;
    //     b.ua.defaultSeriesType = 'bar';
    //     b.R = 'bar';
    //     b.va(!0, $.km('bar'));
    //     for (var c = 0, d = arguments.length; c < d; c++) b.bar(arguments[c]);
    //     return b
    //   }
    
    // anychart.line = 
    // MI = function (a) {
    //   var b = new EI;
    //   b.ua.defaultSeriesType = 'line';
    //   b.R = 'line';
    //   b.va(!0, $.km('line'));
    //   for (var c = 0, d = arguments.length; c <
    //   d; c++) b.line(arguments[c]);
    //   return b
    // },
  */    


function findLongestSleep(nums) {
  // console.log("numbers: ", nums);
  return repoData.sleepData.filter(data => data.hoursSlept === Math.max(...nums));
  //return Math.max(...nums);
}

function displayHydraChart(data) {
  // console.log('data[0].date: ', removeYear(data[0].date));
  data.forEach(day => day.date = removeYear(day.date));
  // data = weekHydra
  anychart.onDocumentReady(function() {
    // set the data
    let hydraChartData = {
      // header: ["Day", "Hydration number"],
      rows: [
        [`${data[0].date}`, `${data[0].numOunces}`],
        [`${data[1].date}`, `${data[1].numOunces}`],
        [`${data[2].date}`, `${data[2].numOunces}`],
        [`${data[3].date}`, `${data[3].numOunces}`],
        [`${data[4].date}`, `${data[4].numOunces}`],
        [`${data[5].date}`, `${data[5].numOunces}`],
        [`${data[6].date}`, `${data[6].numOunces}`]
      ]};
    // create the chart
    let hydraChart = anychart.line();
    // add data
    hydraChart.data(hydraChartData);
    // set the chart title
    hydraChart.title("WEEKLY HYDRATION");
    let hydraContainer = document.getElementById('hydra-container');  
    hydraContainer.innerHTML = "";
    // draw
    hydraChart.container("hydra-container");
    hydraChart.draw();
  });
}

function displayDayActivity(weekData) {
  // console.log('weekData: ', weekData);
  let actDay = document.getElementsByClassName('actDay-user');
  //let percent = user.compareStepData(weekData[6].numSteps >= user.dailyStepGoal) ? 100 : user.findStepPercentage(weekData[6]);
  let percent = weekData[6].numSteps >= user.dailyStepGoal ? 100 : user.findStepPercentage(weekData[6]);
  actDay[0].style.backgroundImage = createBorder(percent);
  actDay[1].innerText = weekData[6].numSteps.toLocaleString('en');
  //actDay[2].innerText = user.findDistance(weekData.slice(-1));
  actDay[2].innerText = user.findDistance([weekData[6]]);
  chartWeekActivity(weekData);
}
 
function chartWeekActivity(weekData) { 
  let percent, index = 0, 
  wkActGrid = document.getElementById('wk-act-grid'),
  cir7 = document.getElementById('wkAct-7');
  weekData[6].date != user.activity.slice(-1)[0].date ?   
    cir7.classList.remove('hidden') : wkActGrid.style.gridTemplateColumns = "repeat(6, auto)";  
  Array.from(document.getElementsByClassName('act-c-bor')).forEach(function(border) {
    percent = user.compareStepData(weekData[index].numSteps, user.dailyStepGoal) ? 100 : user.findStepPercentage(weekData[index]);
    border.style.background = createBorder(percent);
    border.nextElementSibling.innerText = removeYear(weekData[index].date);
    fillActText(weekData[index], border.firstElementChild.children);
    index++;
  });
}

function fillActText(data, element) { 
  element[0].firstElementChild.innerText = data.numSteps.toLocaleString('en');
  element[1].firstElementChild.children[0].innerText = user.findDistance([data]);
}  

function createBorder(percent) {
  let color1, color2, color3, color4, degrees;
  percent <= 50 ? (
    color1 = "grey",
    color2 = "transparent",
    degrees = 90 + (percent * 3.6),
    color3 = "red",
    color4 = color1
  ) : (
    color1 = "transparent",
    color2 = "red",
    degrees = 90 + ((percent-50) * 3.6), 
    color3 = "grey",
    color4 = color2
  );
  let background = `
    linear-gradient(90deg, ${color1} 50%, ${color2} 50%),
    linear-gradient(${degrees}deg, ${color3} 50%, ${color4} 50%)
  `;
  return percent >= 100 ? "green" : background;
}
 
//// ADD TO TESTS!!!
/*
let findFriends = [];
user.friendsData.forEach(friend => findFriends.push(friend.data.id));
console.log(user.friends.join(" ") === findFriends.join(" "));

console.log('findFriends: ', findFriends);
console.log('user.friends: ', user.friends);
*/
//// ^^^^^^^^^^^^^^

/*
1√. Design a step challenge between friends. 
Assign your user a few friends from the user data file.

  - Add the methods you need and a display on the dashboard to see their friends step count for a whole week

  - then show who had the most steps for that week.
*/

function findFriends() {
  // console.log('/* @createFriends */');   
  user.friends.forEach(function(friendID) {
    let friend = new User(repoData, friendID);
    user.addFriendData(friend);
  });
  //return user.friendsData;
  console.log('user.friendsData: ', user.friendsData);
}

function displayFriends() {
  let friends = user.friendsData; 
  let friendsDiv = document.getElementById("friendsId");
  friendsDiv.innerHTML = "";
  friends.forEach(function(friend) {    
    let friendHTML = `
      <div id="frID-${friend.id}" class="friend" number="${friend.id}">
        <button id="frID-${friend.id}-btn" class="friendBtn">
          ${friend.name.toUpperCase()}
        </button>
        <h4 id="steps-${friend.id}" class="wk-steps-txt frCh-txt">WEEKLY STEP TOTAL:
          <p id="numSteps-${friend.id}" class="wk-steps-num frCh-num">
            ${friend.weekData.actWkSum.toLocaleString('en')} steps 
          </p>
        </h4>
        <h4 id="dist-${friend.id}" class="wk-steps-txt frCh-txt">WEEKLY DISTANCE:
          <p id="numDist-${friend.id}" class="wk-steps-num frCh-num">
            ${user.convertToMiles(friend.weekData.actWkSum)} miles 
          </p>
        </h4>
      </div>
    `;
    friendsDiv.insertAdjacentHTML("beforeend", friendHTML); 
    // console.log('friend.weekData.actWkSum: ', friend.weekData.actWkSum);  
  });
  activateFriendBtns();
}

function activateFriendBtns() {
  let friendBtns = document.getElementsByClassName('friendBtn');
  let i = friendBtns.length - 1;
  while(i >= 0) { 
    friendBtns[i].addEventListener('click', loadFriend);
    i--;
  };
}

function displayFrChallenge() {
  // console.log('user.friendsData: ', user.friendsData);
  //user.actWkSum = user.findSum(user.findAll(weekActivity, "numSteps"));
  //user.actWkSum = user.findSum(user.findAll(weekActivity, "numSteps"));
  document.getElementById('usrCh-stepsNum').innerText = `${user.weekData.actWkSum.toLocaleString('en')} steps`;
  document.getElementById('usrCh-distNum').innerText = `${user.convertToMiles(user.weekData.actWkSum)} miles`;
  let stepSums = user.findAll(user.findAll(user.friendsData, "weekData"), "actWkSum")
  .sort()
  .reverse();
  graphFrChallenge(stepSums);
}

function graphFrChallenge(numbers) {
  let winNum = numbers.slice(0, 1);
  let index = 1;
  numbers.forEach(function(num) {    
    let percent = user.findPercentage(num, winNum);    
    let challenger = document.getElementById(`frCh-${index}`);
    challenger.parentNode.classList.add('white');
    challenger.classList.add('grey');
    challenger.style.background = createBorder(percent); 
    index++;
  });
  let winner = user.friendsData.filter(obj => obj.weekData.actWkSum == winNum[0])[0];
  document.getElementById('frCh-win-name').innerText = `${winner.name.toUpperCase()} !`;  
}

function loadFriend(event) {
  console.log(
    'event.target: ', event.target, 
    'event.target.parentNode.id: ', event.target.parentNode.id,
    'event.target.id.split("-")[1]: ', event.target.id.split("-")[1],
  );
  let id = Number(event.target.id.split("-")[1]);
  loadFit(id);
}

function removeYear(date) {
  return date.split("/").slice(1).join("/");
}

function fixZip() {
  let fullZip = user.address.split(" ").pop();
  let splitZip = user.address.split(" ").pop().split("-");
  user.address = user.address.replace(fullZip, splitZip[0]);
  return user.address;
}



  /*
  let index = 5;
  Array.from(document.getElementsByClassName('act-c-bor')).forEach(function(border) {
    console.log('border: ', border);
    let percent = user.compareStepData(weekData[index]) ? 100 : user.findStepPercentage(weekData[index]);
    border.style.background = createBorder(percent);  
    border.nextElementSibling.innerText = removeYear(weekData[index].date);
    fillActText(weekData[index], border.firstElementChild.children);
    index--;
  });
  */ 

/*
ITERATION 5 - Trends and Challenges

1√. Design a step challenge between friends. Assign your user a few friends from the user data file. Add the methods you need and a display on the dashboard to see their friends step count for a whole week, and then show who had the most steps for that week.

2. Calculate and display this trend: for a user, what days had increasing steps for 3 or more days?
3. Think of your own trend for one user or many users. Document it, calculate it, and display it.


ITERATION 4 - ACTIVITY

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
* For a user, a weekly view of their step count, flights of stairs climbed, and minutes active

iteration 3: sleep

**Dashboard:**
Items to add to the dashboard:

* For a user, their sleep data for the latest day (hours slept and quality of sleep)
* For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
* For a user, their all-time average sleep quality and all-time average number of hours slept

*/

// //////// NOTES ////////////

//function displayUser(weekHydra, weekSleep, weekActivity) {  
  //let dayActivity = weekActivity.slice(-1);
  //console.log('weekActivity.slice(-1): ', weekActivity.slice(-1));
  //console.log('weekActivity: ', weekActivity);
  //console.log('weekActivity[6]: ', weekActivity[6]);

  //userList[3].innerText = weekActivity[6].numSteps
  //userList[4].innerText = user.findDistance(weekActivity.slice(-1)); 
  //userList[8].innerText = weekHydra[6].numOunces;
  //userList[11].innerText = repoData.findAvg(repoData.activityData, "numSteps");
  //userList[11].innerText = user.findDistance(user.findDateSpan(user.activity, 1));
  //console.log('userList[11].innerText: ', userList[11].innerText);
  // userList[11].innerText = 
  // user.findDistance(dayActivity);
  //console.log('userList[11].innerText: ', userList[11].innerText);
//}

//function displayDayActivity(weekData) {    
  //let dayStepPercentage = user.compareStepData(dayData[0]) ? 100 : user.findStepPercentage(dayData[0]);
  //console.log('weekData: ', weekData);
  //let percent = user.compareStepData(weekData[0]) ? 100 : user.findStepPercentage(weekData[6]);
  //border.style.background = createBorder(percent);
  //console.log("stepPercentage", dayStepPercentage);
  //.log('user.mustStep: ', user.mustStep);
  //console.log("percent: ", percent);  
  //let allCBs = document.getElementsByClassName('circle-border');  
  //wkActs.push(wkAct[0], wkAct[1], wkAct[2], wkAct[3], wkAct[4], wkAct[5]);
  //console.log('circleBorders: ', circleBorders);
  //console.log("index:", index, border.id, "weekData[i].date: ", weekData[index].date);
//}

//function fillActText(dayData, element) {
  // `  
  //   linear-gradient(270deg, ${borderColor} ${first50}%, transparent 50%), 
  //   linear-gradient(0deg, ${borderColor} 75%, lightgray 25%)
  // `;

  /* FROM CODEPEN MYCHART
    var inners = document.getElementsByClassName("inner");

    var day1 = document.getElementById("day1");

    let dataBlue = ["80", "90", "60", "50", "80", "90", "60"];

    let dataPurple = ["30", "40", "15", "25", "30", "25", "35"]

    inners[0].style.height = "50%";
    inners[1].style.height = "40%";

    day1.firstElementChild.style.height=`${dataBlue[0]}%`;
    let purple0 = 
        `${dataPurple[0]}` / `${dataBlue[0]}` * 100;
    day1.firstElementChild.firstElementChild.style.height = `${purple0}%`;

    console.log(purple0)
    */
//}


//   //let hydraData = new HydraData(data);
//   //hydraData.getHydration(user.id);
//   let hydraDay = user.findPastData(user.hydration, 1);
    
//   let numOunces = user.findNumOunces(user.findPastData(user.hydration, 7));
//   //let hydraAvg = hydraData.findAvg();
//     // console.log('hydraData.data.length: ', hydraData.data.length);
//     // console.log('hydraDay: ', hydraDay);
//     // console.log('hydraWeek: ', hydraWeek);
//     // console.log('numOunces: ', numOunces);
//     // console.log('hydraAvg: ', hydraAvg, hydraData.avg);
//   let allHydraData = [hydraDay, hydraWeek]
    
// function displayHydra(hydraData) {
//   console.log('hydraData: ', hydraData);
//   document.getElementById('dayHydraID').innerText = hydraData[0].numOunces;
//   displayHydraChart(user.hydration);
// }

//hydraData.findHydrationData(user.id);
// console.log(
//   'hydraData.findHydrationData(id): ', hydraData.findHydrationData(user.id));
// console.log('hydraData: ', hydraData.data);

//create hydraDataSamples:
/*
let hydraDataSamples = hydrationData.filter(day => 
  day.userID === 1 || day.userID === 2 || day.userID === 3 || day.userID === 4
);
console.log('hydraDataSamples: ', hydraDataSamples);
let userHydraData = hydraDataSamples.filter(day => day.userID === user.id);
console.log('userHydraData: ', userHydraData);
let hydrationDay = userHydraData.slice(-1);
console.log('hydrationDay: ', hydrationDay);
let hydrationWeek = userHydraData.slice(-7);
console.log('hydrationWeek: ', hydrationWeek);
*/

/*
function getHydrationSamples(...users) {
  let userHydrationSamples, hydrationDataSamples = [];
  users.forEach(user => (    
    userHydrationSamples = hydrationData.filter(day => day.userID === user),
    userHydrationSamples.forEach(day => hydrationDataSamples.push(day))
  ));
  return hydrationDataSamples 
}

let hydrationDataSamples = getHydrationSamples([1, 2, 3, 4]);
console.log('hydrationDataSamples: ', hydrationDataSamples);
*/
