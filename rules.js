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
  constructor(alive, pos_x, pos_y, name, hp, atk) {
    this.alive = alive;
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
  }
  
}

//Monster names
var monsterNames = ['Mark', 'Ruben','James','Gerald','Emil','Jonas','Rascal','Rakanishu','Diablo','Enjubi','Mads','Frederik','Jasmin','Min','Haishengyi','Son Goku','Gohan','Farlig Bamse', 'Gottfred','Karl den Store','Lars','Bob'];

//Loot Class

var lootBox = []
// populate world with angry monsters 🐉 and gold 💰 
var monsterArray = new Monster();
for (var i = 0; i < FOE_NUM ; i++) {
  monsterArray[i] = new Monster(true, randomNumber(1, 10) , randomNumber(1,10) , monsterNames[i], (randomNumber(90,110)+i*1.8), Math.floor((randomNumber(7,12)+i*1.1)));
  let populateMonster = document.createElement('p');
  populateMonster.className = 'monster';
  populateMonster.innerHTML = monsterArray[i].name;
  populateMonster.setAttribute('alive', 'true');
  populateMonster.setAttribute('hp', monsterArray[i].hp );
  populateMonster.setAttribute('atk', monsterArray[i].atk );

  document.querySelector('#row-'+monsterArray[i].pos_x+'_col-'+monsterArray[i].pos_y).appendChild(populateMonster);

  //Make loot for monster
  let loot = document.createElement('DIV');
  lootChance = randomNumber(1,100);
  if(lootChance > 50) {
    loot.className = 'loot';
    loot.setAttribute('quantity', 100)
    loot.innerHTML = 'gold';
  } else {
    loot.className = 'loot';
    loot.setAttribute('quantity', 1)
    loot.innerHTML = 'trash';
  }
  

  populateMonster.appendChild(loot);
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

// position CHECK function
function check() {
  let playerPos = document.querySelector(playerPosition);
  
  let unitArray = Array.from(playerPos.getElementsByClassName('monster') ); // get array of monsters
  
  // if monster health is 0 or below call it Dead and show loot

  unitArray.forEach((unitCard) => { 
    if(unitCard.getAttribute('hp') <= 0) {
      unitCard.setAttribute('alive', 'false');
      //unitCard.innerHTML = unitCard.innerHTML+' (DEAD)';
      let unitLoot= unitCard.getElementsByClassName('loot').item('li')
      unitLoot.style.display = 'flex';
    
      grabLoot(playerPosition);
    } 
  });
  


  if (unitArray.length > 0) { // if array length is greater than 0 (there's monsters!) fire monster encounter event.
    monsterEncounter(unitArray)
    
  }
}


function atkBtn(opponent){
  clearEncounters(); //clear old instances of monsters
  
  
  pAtk = player_one.atk + 100//get player attack
  
  opponent.setAttribute("hp", Math.floor(opponent.getAttribute("hp")-pAtk));
  
  //opponent.hp - player_one.atk//get monster HP
  //apply damage
  //counterAttack

  check(); //get new instances of monsters
}

// encounters
function monsterEncounter(monsters) {
  for (var i = 0; i < monsters.length; i++) {
    let monsterI = monsters[i];
    let monsterInstance = document.createElement("li");
    monsterInstance.className = "monster-card";
    monsterInstance.setAttribute('id', 'card-'+playerPosition.substring(1));
    hp = monsters[i].getAttribute("hp")
    atk = monsters[i].getAttribute("atk")
    monsterInstance.innerHTML = '<div class="monster-card_info">'+ monsters[i].innerHTML + "<span class='monster-info'>HP: " + hp + ' ATK: ' + atk + '</span></div> <img style="max-width:100px;" src=1.jpg>' ;
    
    let attackBtn = document.createElement("button");
    attackBtn.className = "attackBtn";
    attackBtn.innerHTML = "attack!"
    attackBtn.addEventListener("click", function(){atkBtn(monsterI)});
    monsterInstance.appendChild(attackBtn);

    document.querySelector('.monster-arena').appendChild(monsterInstance);

    if (monsters[i].getAttribute('alive') == 'false') {
      console.log('here is your free loot')
      console.log(document.querySelector('#card-'+playerPosition.substring(1)).getElementsByClassName('loot')[0])
    }
    //console.log(document.querySelector('#card-'+playerPosition.substring(1)))
    //return monsterInstance    
  }
}

// looting 
function grabLoot(playerPosition){
  //console.log(document.getElementById('card-'+playerPosition))
  //document.getElementById('card-'+playerPosition.substring(1)).style.backgroundColor = 'green'
  console.log('#card-'+playerPosition.substring(1))

  //document.querySelector('#card-row-1_col-1').style.backgroundColor='green'
}


//equip