var MAP_HEIGHT = 40;
var MAP_WIDTH = 40;
var FOE_NUM = 20

const tileContainer = document.querySelector(".tileContainer");

// for x axis
for (w = 0; w < MAP_WIDTH; w++) {
  var row = document.createElement("li");
  var rowId = "row-" + w;
  row.className = "tile";
  row.setAttribute("id", rowId);

  tileContainer.append(row);

    // for y axis
    for (h = 0; h < MAP_HEIGHT; h++) {
        var col = document.createElement("li");
        var colId = "row-" + w + "_col-" + h;
        col.className = "tile";

        col.setAttribute("id", colId);
        row.append(col);
  }
}
//Random function
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor( Math.random() * (max - min) + min);
}

// Classes
class Player {
  constructor(pos_x, pos_y, name, hp, atk) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
  }
}

//initialize players 👦 
var player_one = new Player(1,1, 'player', 100, 10);

var pPos = document.createElement('div');
pPos.innerHTML = player_one.name;
pPos.setAttribute('id', 'player');

// initialize player by appending a div
document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y).appendChild(pPos);
var playerPosition = '#row-'+player_one.pos_x+'_col-'+player_one.pos_y;

//Monster Class and populator
class Monster {
  constructor(pos_x, pos_y, name, hp, atk) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
  }
  
}

//Monster names
var monsterNames = ['Mark', 'Ruben','James','Gerald','Emil','Jonas','Rascal','Rakanishu','Diablo','Enjubi','Mads','Frederik','Jasmin','Min','Haishengyi','Son Goku','Gohan','Farlig Bamse', 'Gottfred','Karl den Store','Lars','Bob'];

// populate world with angry monsters 🐉 
var monsterArray = new Monster();
for (var i = 0; i < FOE_NUM ; i++) {
  monsterArray[i] = new Monster(randomNumber(1, 39) , randomNumber(1, 39) , monsterNames[i], (randomNumber(90,110)+i*1.8), Math.floor((randomNumber(7,12)+i*1.1)));
  let populateMonster = document.createElement('p');
  populateMonster.className = 'monster';
  populateMonster.innerHTML = monsterArray[i].name;
  populateMonster.setAttribute('hp', monsterArray[i].hp );
  populateMonster.setAttribute('atk', monsterArray[i].atk );

  document.querySelector('#row-'+monsterArray[i].pos_x+'_col-'+monsterArray[i].pos_y).appendChild(populateMonster);
}


var tres = document.createElement('p');
tres.className = 'treasure'
document.querySelector('#row-5_col-2').appendChild(tres);

// key presses & control
function move (x, y) {
  player_one.pos_x = player_one.pos_x + x; //increment coordinates
  player_one.pos_y = player_one.pos_y + y;
  document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y).appendChild(pPos); //append player to new tile
  playerPosition = '#row-'+player_one.pos_x+'_col-'+player_one.pos_y;

  clearEncounters(); //clear encounters so new can come!
  check(); // do position check everytime we move
}

document.addEventListener('keydown', logKey);
function logKey(e) {
  if (e.code == 'KeyA' && player_one.pos_x != 0 ){
    move(-1,0);
  }
  else if (e.code == 'KeyD' && player_one.pos_x < MAP_WIDTH-1) {
    move(1,0);
  }
  else if (e.code == 'KeyW' && player_one.pos_y  != 0 ) {
    move(0,-1);
  }
  else if (e.code == 'KeyS' && player_one.pos_y < MAP_HEIGHT-1 ) {
    move(0,1);
  }
}
// clear encounters function
function clearEncounters() {
  let monsterArena = document.querySelector('.monster-arena');
  while (monsterArena.firstChild) {monsterArena.removeChild(monsterArena.lastChild);}
}

// position check function
function check() {
  let playerPos = document.querySelector(playerPosition);
  
  let unitArray = Array.from(playerPos.getElementsByClassName('monster') ); // get array of monsters
  if (unitArray.length > 0) { // if array length is greater than 0 (there's monsters!) fire monster encounter event.
    monsterEncounter(unitArray)
  }
}


function atkBtn(){
  clearEncounters(); //clear old instances of monsters
  check(); //get new instances of monsters

  pAtk = player_one.atk//get player attack
    //get monster HP
  //apply damage
  //counterAttack
}

// encounters
function monsterEncounter(monsters) {
  for (var i = 0; i < monsters.length; i++) {
    let monsterInstance = document.createElement("li");
    monsterInstance.className = "monster-card";
    monsterInstance.innerHTML = 
      '<div class="monster-card_info">'+monsters[i].innerHTML + "<span class='monster-info'>HP: " 
      + monsters[i].getAttribute("hp") + ' ATK: ' + monsters[i].getAttribute("atk") + '</span></div> <img style="max-width:100px;" src=1.jpg>' ;
    
    let attackBtn = document.createElement("button");
    attackBtn.className = "attackBtn";
    attackBtn.innerHTML = "attack!"
    attackBtn.addEventListener("click", function(){atkBtn()});
    monsterInstance.appendChild(attackBtn);

    document.querySelector('.monster-arena').appendChild(monsterInstance);
  }
  
}
