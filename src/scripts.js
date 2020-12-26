let user;
let repoData;

function loadFit(data, id) {
  console.log('@loadFit(data):');
  repoData = new UserRepository(data);
  user = new User(repoData.findUser(id));
  displayUser();
  console.log('getHydraData(hydraDataSamples): ', getHydraData(hydraDataSamples));
  displayUserHydra(getHydraData(hydrationData));
}

function displayUser() {
  document.querySelector(".greeting").innerText = `Welcome back, ${user.firstName()}!`;
  let userList = document.getElementsByClassName("user");
  userList[0].innerText = user.name;
  userList[1].innerText = user.address;
  userList[2].innerText = user.email;
  userList[3].innerText = user.dailyStepGoal;
  userList[4].innerText = repoData.findAvgStepGoal();
  userList[5].innerText = user.strideLength;
  displayFriends(findFriends());
  activateFriendBtns();
}

function findFriends() {
  // console.log('@createFriends(user):');
  // console.log("user.friends: ", user.friends);
  // console.log('user.friendsData: ', user.friendsData);
  user.friends.forEach(function(friendID) {
    let friend = {};     
    friend.id = `friend${(user.friends.indexOf(friendID) + 1)}`;
    friend.data = repoData.findUser(friendID);
    user.friendsData.unshift(friend);
  });  
  // console.log('/* @createFriends */');  
  // console.log('user.friendsData: ', user.friendsData);
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
    let friendHTML = `
      <div id="divID${friend.data.id}" class="friend" number="${friend.id}">
        <button id="${friend.data.id}" class="friendBtn" name="${friend.id}">
          ${friend.data.name}
        </button>
      </div>
    `;
    friendsDiv.insertAdjacentHTML("afterbegin", friendHTML);   
  });
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
  console.log('userData: ', userData);
  loadFit(userData, id)  
}

function getHydraData(data) {
  let hydraData = new HydraData(data);
  hydraData.getHydration(user.id);
  let hydraDay = user.findPastData(hydraData.data, 1);
  let hydraWeek = user.findPastData(hydraData.data, 7);
  let numOunces = user.findNumOunces(user.findPastData(hydraData.data, 7));
  let hydraAvg = hydraData.findAvg();
    // console.log('hydraData.data.length: ', hydraData.data.length);
    // console.log('hydraDay: ', hydraDay);
    // console.log('hydraWeek: ', hydraWeek);
    // console.log('numOunces: ', numOunces);
    // console.log('hydraAvg: ', hydraAvg, hydraData.avg);
  let allHydraData = [hydraData, hydraDay, hydraWeek]
  return allHydraData;
}

function displayUserHydra(data) {
  // console.log('...data: ', data);
  document.getElementById('dayHydraID').innerText = data[1][0].numOunces;
  displayHydraChart(data[2]);
}

function displayHydraChart(data) {
  anychart.onDocumentReady(function() {
    // console.log("hydraWeek:", data[0].date, data[0].numOunces);
    // set the data
    var hydraChartData = {
      // header: ["Day", "Hydration number"],
      rows: [
        [`${data[6].date}`, `${data[6].numOunces}`],
        [`${data[5].date}`, `${data[5].numOunces}`],
        [`${data[4].date}`, `${data[4].numOunces}`],
        [`${data[3].date}`, `${data[3].numOunces}`],
        [`${data[2].date}`, `${data[2].numOunces}`],
        [`${data[1].date}`, `${data[1].numOunces}`],
        [`${data[0].date}`, `${data[0].numOunces}`]
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

loadFit(userData, 1);


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
