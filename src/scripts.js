let data = [userData, hydrationData, sleepData, activityData];
console.log('data: ', data.length);
let user;
let repoData;
/*
// let repo = new UserRepository(userData, hydrationData, sleepData, activityData);
// let userRepoData = repo.findUser(1);
// new User(repo, userRepoData[0]);
*/

function loadFit(data, id) {
  console.log('@loadFit(data):');
  //data = (userData, hydrationData, sleepData, activityData);
  repoData = new UserRepository(data);
  user = new User(repoData, id);
  displayUser();
  let hydraWeek = user.findPastData(user.hydration, 7)
  displayHydraChart(hydraWeek);
}
  //console.log('getHydraData(hydraDataSamples): ', getHydraData(hydraDataSamples));
  //displayHydra(getHydration());
  //data.push(dataUser, dataHydration, dataSleep, dataActivity);
  //repoData = new UserRepository(data);

function displayUser() {
  document.querySelector(".greeting").innerText = `Welcome back, ${user.firstName()}!`;
  let userList = document.getElementsByClassName("user");
  console.log('userList: ', userList);
  userList[0].innerText = user.name;
  userList[1].innerText = user.address;
  userList[2].innerText = user.email;
  userList[3].innerText = user.dailyStepGoal;
  userList[4].innerText = repoData.avgStepGoal;
  userList[5].innerText = user.strideLength;
  userList[6].innerText = user.findPastData(user.hydration, 1)[0].numOunces;
  displayFriends(findFriends());
}

function findFriends() {
  console.log('@createFriends(user):');
  console.log("user.friends: ", user.friends);
  // console.log('user.friendsData: ', user.friendsData);
  user.friends.forEach(function(friendID) {
    let friend = {};     
    friend.id = `friend${(user.friends.indexOf(friendID) + 1)}`;
    friend.data = repoData.findUser(friendID);
    user.friendsData.unshift(friend);
  });  
  console.log('/* @createFriends */');  
  console.log('user.friendsData: ', user.friendsData);
  return user.friendsData;
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

function displayFriends(friends) {
  // console.log('friends: ', friends);
  let friendsDiv = document.getElementById("friendsId");
  // console.log("friendsDiv.innerHTML: ", friendsDiv.innerHTML);
  friendsDiv.innerHTML = "";
  // console.log("friendsDiv: ", friendsDiv.innerHTML);
  friends.forEach(function(friend) {
    console.log('friend: ', friend.data[0].id, friend.id);

    let friendHTML = `
      <div id="divID${friend.data[0].id}" class="friend" number="${friend.id}">
        <button id="${friend.data[0].id}" class="friendBtn" name="${friend.id}">
          ${friend.data[0].name}
        </button>
      </div>
    `;
    friendsDiv.insertAdjacentHTML("afterbegin", friendHTML);   
  });
  activateFriendBtns();
}

function activateFriendBtns() {
  let friendBtns = document.getElementsByClassName('friendBtn');
  console.log('friendBtns: ', friendBtns);
  let i = friendBtns.length - 1;
  while(i >= 0) { 
    console.log(friendBtns[i].id);
    friendBtns[i].addEventListener('click', loadFriend);
    i--;
  };
}

function loadFriend(event) {
  console.log(repoData.data.length);
  console.log("event.target", event.target);
  console.log('event.target.id: ', event.target.id);
  let id = Number(event.target.id);
  console.log('id: ', id);
  
  if(repoData.data.length < 6) {
    console.log("userSampleFriends", userSampleFriends);
    loadFit(userSampleFriends, id)
  } else 
  //console.log('userData: ', userData);
  loadFit(data, id)  
}

function findHydration(date) {
  let hydraWeek = user.findPastData(user.hydration, 7);
  return hydraWeek;
}

function displayHydraChart(data) {
  anychart.onDocumentReady(function() {
    // console.log("hydraWeek:", data[0].date, data[0].numOunces);
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
    let hydraChart = anychart.bar();
    // add data
    hydraChart.data(hydraChartData);
    // set the chart title
    hydraChart.title("WEEKLY HYDRATION");
    let hydraContainer = document.getElementById('hydra-container');
    
    hydraContainer.innerHTML = "";
    console.log('hydraContainer: ', hydraContainer.innerHTML);
    // draw
    hydraChart.container("hydra-container");
    console.log('hydraContainer: ', hydraContainer.innerHTML);
    
    hydraChart.draw();
  });
}

loadFit(data, 1);


/*
iteration 3: sleep

**Dashboard:**
Items to add to the dashboard:

* For a user, their sleep data for the latest day (hours slept and quality of sleep)
* For a user, their sleep data over the course of the latest week (hours slept and quality of sleep)
* For a user, their all-time average sleep quality and all-time average number of hours slept

*/

// //////// NOTES ////////////

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
