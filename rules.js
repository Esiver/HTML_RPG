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

// Classes
class Player {
  constructor(pos_x, pos_y, name) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.name = name;
  }
}

//initialize players 👦 
var player_one = new Player(1,1, 'player');

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
  monsterArray[i] = new Monster(Math.floor(i*1.3) , Math.floor(i*1.4) , monsterNames[i], 100, 10);
  let populateMonster = document.createElement('p');
  populateMonster.className = 'monster';
  populateMonster.innerHTML = monsterArray[i].name;
  populateMonster.setAttribute('hp', monsterArray[i].hp );
  populateMonster.setAttribute('atk', monsterArray[i].atk );

  document.querySelector('#row-'+monsterArray[i].pos_x+'_col-'+monsterArray[i].pos_y).appendChild(populateMonster);
}

var monster = document.createElement('p');
monster.className = 'monster'
monster.innerHTML = 'KASPER';
monster.setAttribute('hp', 150); 
document.querySelector('#row-5_col-2').appendChild(monster);

var moo = document.createElement('p');
moo.className = 'monster';
moo.setAttribute('hp', 100); 
moo.innerHTML = 'BOB';
document.querySelector('#row-5_col-2').appendChild(moo);

var tres = document.createElement('p');
tres.className = 'treasure'
document.querySelector('#row-5_col-2').appendChild(tres);

// key presses & control
function move (x, y) {
  player_one.pos_x = player_one.pos_x + x; //increment coordinates
  player_one.pos_y = player_one.pos_y + y;
  document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y).appendChild(pPos);
  playerPosition = '#row-'+player_one.pos_x+'_col-'+player_one.pos_y;
  clearEncounters(); //clear encounters so new can come!
  check(); // do position check everytime we move
  

    // Todo: need logic for blocking...
}

document.addEventListener('keydown', logKey);
function logKey(e) {
  if (e.code == 'KeyA'){
    move(-1,0);
  }
  else if (e.code == 'KeyD') {
    move(1,0);
  }
  else if (e.code == 'KeyW') {
    move(0,-1);
  }
  else if (e.code == 'KeyS') {
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

// encounters
function monsterEncounter(monsters) {
  for (var i = 0; i < monsters.length; i++) {
    let monsterInstance = document.createElement("li");
    monsterInstance.className = "monster-card";
    monsterInstance.innerHTML = monsters[i].innerHTML + " " + monsters[i].getAttribute("hp");

    document.querySelector('.monster-arena').appendChild(monsterInstance);
  }
  
}

