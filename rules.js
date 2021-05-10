var MAP_HEIGHT = 40;
var MAP_WIDTH = 40;
var FOE_NUM = 20

var PLAYER_HP = 100;
var PLAYER_ATK = 10;
var PLAYER_DEF = 0;

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
  return Math.floor(Math.random() * (max - min) + min);
}

//consolelog!
function status(message) {
  document.getElementById('console').innerHTML = 'Log (<strong>' + playerPosition.substring(0) + '</strong>): <br>' + message
  return message;
}

// Classes
class Player {
  constructor(pos_x, pos_y, name, hp, atk, def) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
  }

}

//initialize players 👦 
var player_one = new Player(0, 0, 'player', PLAYER_HP, PLAYER_ATK, PLAYER_DEF);
var pouch = document.createElement('li');
pouch.className = "gold";
document.querySelector('#inventory').appendChild(pouch);
handleInventory()

var pPos = document.createElement('div');
pPos.innerHTML = player_one.name;
pPos.setAttribute('id', 'player');
pPos.setAttribute('hp', player_one.hp)
pPos.setAttribute('atk', player_one.atk)
pPos.setAttribute('def', player_one.def)

// initialize player by appending a div
document.querySelector('#row-' + player_one.pos_x + '_col-' + player_one.pos_y).appendChild(pPos);
var playerPosition = '#row-' + player_one.pos_x + '_col-' + player_one.pos_y;
// cards at position 
const cardAtPosition = () => {
  return playerPosition + '-card'
} //get card id
const monsterAtPosition = () => {
  return Array.from(document.querySelector(playerPosition).getElementsByClassName('monster'))
} //get array of monsters

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
var monsterNames = ['Mark', 'Ruben', 'James', 'Gerald', 'Emil', 'Jonas', 'Rascal', 'Rakanishu', 'Diablo', 'Enjubi', 'Mads', 'Frederik', 'Jasmin', 'Min', 'Haishengyi', 'Son Goku', 'Gohan', 'Farlig Bamse', 'Gottfred', 'Karl den Store', 'Lars', 'Bob'];

//Loot Class
var weaponNames = ['Sword of Truths', 'Sword of a Thousand Truths', 'Mace', 'Broken Mace', 'Knife', 'Dull Knife', 'Morning Star', 'Stick', 'Sharp Stone', 'Broken Bottle', 'Wand', 'Excallibur'];
var bodyNamesLow = ['Ragged Shirt', 'T-shirt', 'Tunica', 'Polo']

class weapon { // todo: also create classes for other equipment + trash.
  constructor(type, dmg, title, slot) {
    this.type = type;
    this.dmg = dmg;
    this.title = title;
    this.slot = slot;
  }
  static quantity = 1;
  createWeapon() {
    let outputWeapon = document.createElement('BUTTON');
    outputWeapon.className = 'loot';
    outputWeapon.setAttribute('type', this.type)
    outputWeapon.setAttribute('slot', this.slot)
    outputWeapon.setAttribute('dmg', randomNumber(15, 20))
    outputWeapon.innerHTML = weaponNames[randomNumber(0, weaponNames.length)]

    return outputWeapon;
  }
}

class armor {
  constructor(type, def, slot, grade, multip) {
    this.type = type;
    this.def = def;
    this.slot = slot;
    this.grade = grade;
    this.multip = multip;
  }
  static quantity = 1;
  createItem() { //maaske lav flere function for rare items, normal items, etc...
    let outputItem = document.createElement('BUTTON');
    outputItem.className = 'loot';
    outputItem.setAttribute('type', this.type);
    outputItem.setAttribute('def', this.multip * this.def);
    outputItem.setAttribute('slot', this.slot);

    let prefix = 'Regular';
    if (this.multip > 1 && this.multip < 2) {
      prefix = 'Reinforced '
    } else if (this.multip > 2) {
      prefix = 'Elite '
    } // giv item et sejt navn hvis bonus multipel er god.

    if (this.slot == 'body') {
      if (this.grade == 'low') {
        outputItem.innerHTML = prefix + bodyNamesLow[randomNumber(0, bodyNamesLow.length)]
      } else if (this.grade == 'med') {
        outputItem.innerHTML = prefix + 'nice'
      }
    } else if (this.slot == 'legs') {
      outputItem.innerHTML = 'Jeans'
    } else {
      outputItem.innerHTML = 'FEJL!'
    }
    return outputItem;
  }
}

// populate world with angry monsters 🐉 and gold 💰 
var monsterArray = new Monster();
for (var i = 0; i < FOE_NUM; i++) {
  monsterArray[i] = new Monster(true, randomNumber(1, 6), randomNumber(1, 6), monsterNames[i], (randomNumber(90, 110) + i * 1.8), Math.floor((randomNumber(7, 12) + i * 1.1)));
  let populateMonster = document.createElement('p');
  populateMonster.className = 'monster';
  populateMonster.innerHTML = monsterArray[i].name;
  populateMonster.setAttribute('alive', 'true');
  populateMonster.setAttribute('hp', monsterArray[i].hp);
  populateMonster.setAttribute('atk', monsterArray[i].atk);

  document.querySelector('#row-' + monsterArray[i].pos_x + '_col-' + monsterArray[i].pos_y).appendChild(populateMonster);

  //Make loot for monster
  let loot = document.createElement('BUTTON');
  loot.className = "loot"
  lootChance = randomNumber(1, 100);

  if (lootChance > 99 && lootChance < 100) { //todo: create loot-type functions/classes
    loot.setAttribute('quantity', randomNumber(1, 30));
    loot.setAttribute('type', 'gold')
    loot.innerHTML = 'Coin 💰';
  } else if (lootChance > 97 && lootChance < 98) {
    loot.setAttribute('quantity', 1)
    loot.setAttribute('type', 'trash')
    loot.innerHTML = 'trash';
  } else if (lootChance < 97.33) {
    loot.setAttribute('quantity', 1)
    let subChance = randomNumber(1, 100);
    if (subChance > 50) {
      let randomBody = new armor('wear', 30, 'body', 'low', 3)
      loot = randomBody.createItem()
    } else {
      let randomWeapon = new weapon('wear', randomNumber(15, 20), weaponNames[randomNumber(0, weaponNames.length)], 'lhand')
      loot = randomWeapon.createWeapon();
    }
  }

  loot.onclick = function () {
    grabLoot(playerPosition);
  }
  populateMonster.appendChild(loot);
}

// key presses & control
function move(x, y) {
  player_one.pos_x = player_one.pos_x + x; //increment coordinates
  player_one.pos_y = player_one.pos_y + y;
  document.querySelector('#row-' + player_one.pos_x + '_col-' + player_one.pos_y).appendChild(pPos); //append player to new tile
  playerPosition = '#row-' + player_one.pos_x + '_col-' + player_one.pos_y;

  clearEncounters(); //clear encounters so new can come!
  check(); // do position check everytime we move
}

document.addEventListener('keydown', logKey);

function logKey(e) {
  if (e.code == 'KeyA' && player_one.pos_x != 0) {
    move(-1, 0);
  } else if (e.code == 'KeyD' && player_one.pos_x < MAP_WIDTH - 1) {
    move(1, 0);
  } else if (e.code == 'KeyW' && player_one.pos_y != 0) {
    move(0, -1);
  } else if (e.code == 'KeyS' && player_one.pos_y < MAP_HEIGHT - 1) {
    move(0, 1);
  }
}

function clearEncounters() { // clears all monsters from Encounters-section 
  let monsterArena = document.querySelector('.monster-arena');
  while (monsterArena.firstChild) {
    monsterArena.removeChild(monsterArena.lastChild);
  }
}

// position CHECK function, updates cards according to map units. 
function check() {
  monsterAtPosition().forEach((unit) => { //check all, if monster health is 0 or below call it Dead
    if (unit.getAttribute('hp') <= 0) {
      unit.setAttribute('alive', 'false');
    }
  });
  if (monsterAtPosition().length > 0) { // if monster array length is greater than 0 (there's monsters!) fire monster encounter event.
    monsterEncounter(monsterAtPosition())
  }
  
  document.getElementById('player_atk').innerHTML = pPos.getAttribute('atk');
  document.getElementById('player_def').innerHTML = pPos.getAttribute('def');
}

function atkBtn(opponent) {
  clearEncounters(); //clear old instances of monsters

  handleDmg(player_one.name, opponent, player_one.atk, 'normal')
  //opponent.hp - player_one.atk//get monster HP
  //apply damage
  //counterAttack
  handleCombat(monsterAtPosition(), pPos); //monsters retaliate and counter-attacks the player! oh no!

  check(); //get new instances of monsters
}

function handleCombat( monsters, player) {
  console.log('---')
  monsters.forEach((monster) => {
    // monster attacks
    console.log(monster);
    console.log(player)
    handleDmg(monster, player, 10, 'normal')
  })
}

function handleDmg(giver, receiver, amount, type) {
  receiver.setAttribute("hp", Math.floor(receiver.getAttribute("hp") - amount ));
  status(giver + ' attacks ' + receiver.innerHTML + ' for ' + amount + ' ' + type + ' damage.')
}

function createAttackBtn(target, targetDOM) {
  let attackBtn = document.createElement("BUTTON");
  attackBtn.className = "attackBtn";
  attackBtn.innerHTML = "Attack!"
  attackBtn.addEventListener("click", function () {
    atkBtn(target)
  });
  targetDOM.appendChild(attackBtn);
}

function createUnitCard(mapHTML, hp, atk, classType, id) {
  let cardDOM = document.createElement("li");
  cardDOM.className = classType + '-card';
  cardDOM.setAttribute('id', id);
  cardDOM.innerHTML = '<div class=' + classType + '_info"> <name>' + mapHTML + "</name><span class=" + classType + "-info'>HP: " + hp + ' ATK: ' + atk + '</span></div> <img style="max-width:100px;" src=1.jpg>';

  // only allow attacking if monster--- Maybe change in future?
  if (classType == 'monster') {
    document.querySelector('.monster-arena').appendChild(cardDOM);

  }
  if (classType == 'trader') {
    console.log("You've met a trader.")
  }
  return cardDOM
}

function monsterEncounter(monsters) { // takes array of monsters
  for (var i = 0; i < monsters.length; i++) {
    let monsterDOM = createUnitCard(monsters[i].innerHTML, monsters[i].getAttribute('hp'), monsters[i].getAttribute('atk'), 'monster', playerPosition.substring(1) + '-card-' + i)
    createAttackBtn(monsters[i], monsterDOM);
    if (monsters[i].getAttribute('alive') == 'false') { //do something if monster dead.
      lootBoxes = document.querySelector('#' + monsters[i].parentNode.getAttribute('id') + '-card-' + i).getElementsByClassName('loot');
      Array.from(lootBoxes).forEach(function (ele) {
        ele.style.display = 'flex';

        ele.addEventListener('click', function () {
          grabLoot(ele, ele.getAttribute('quantity'))
        })
      })

    }
  }
}

// looting 
function grabLoot(lootElement, quantity) {
  let grabbedLoot = document.createElement('li')



  if (lootElement.getAttribute('type') == 'gold') {
    console.log('jubii')
    grabbedLoot.className = 'gold'
    grabbedLoot.setAttribute('quantity', lootElement.getAttribute('quantity'))
  }
  if (lootElement.getAttribute('type') == 'trash') {
    grabbedLoot.className = 'trash'
  }
  if (lootElement.getAttribute('type') == 'trash') {
    grabbedLoot.className = 'trash'
  }
  if (lootElement.getAttribute('type') == 'wear') {
    if (lootElement.getAttribute('slot') == 'lhand') {
      grabbedLoot.className = 'weapon';
      grabbedLoot.setAttribute('grade', lootElement.getAttribute('grade'))
      grabbedLoot.setAttribute('dmg', lootElement.getAttribute('dmg'));


      let equipBtn = document.createElement('button');
      equipBtn.className = 'equipBtn';
      equipBtn.innerHTML = 'Equip ';

      grabbedLoot.innerHTML = lootElement.textContent
      grabbedLoot.setAttribute('slot', lootElement.getAttribute('slot'))
      grabbedLoot.append(equipBtn)



      //create stored weapon info 
      atkInfo = document.createElement('li')
      atkInfo.innerHTML = 'Attack: ' + grabbedLoot.getAttribute('dmg')
      slotInfo = document.createElement('li')
      slotInfo.innerHTML = 'Slot: ' + grabbedLoot.getAttribute('slot')

      grabbedLoot.append(atkInfo, slotInfo)

      document.querySelector('#inventory').appendChild(grabbedLoot)

      equipBtn.addEventListener('click', function () {
        equip(grabbedLoot)
      })


    } else if (lootElement.getAttribute('slot') == 'body') {
      grabbedLoot.className = 'armor';
      grabbedLoot.setAttribute('def', lootElement.getAttribute('def'));


      let equipBtn = document.createElement('button');
      equipBtn.className = 'equipBtn';
      equipBtn.innerHTML = 'Equip ';

      grabbedLoot.innerHTML = lootElement.textContent
      grabbedLoot.setAttribute('slot', lootElement.getAttribute('slot'))
      grabbedLoot.append(equipBtn)

      //create stored weapon info 
      atkInfo = document.createElement('li')
      atkInfo.innerHTML = 'Defence: ' + grabbedLoot.getAttribute('def')
      slotInfo = document.createElement('li')
      slotInfo.innerHTML = 'Slot: ' + grabbedLoot.getAttribute('slot')

      grabbedLoot.append(atkInfo, slotInfo)

      document.querySelector('#inventory').appendChild(grabbedLoot)

      equipBtn.addEventListener('click', function () {
        equip(grabbedLoot)
      })
    }


    // create 'throw' button
    let throwBtn = document.createElement('BUTTON');
    throwBtn.innerHTML = 'Throw';
    throwBtn.className = 'throwBtn'

    grabbedLoot.append(throwBtn);
    throwBtn.addEventListener('click', function () {
      throwLoot(this)
    });
  }



  lootElement.remove() //remove loot from monster card
  document.querySelector(playerPosition).getElementsByClassName('loot')[0].remove() //remove loot from map & monster

  handleInventory()
}

function throwLoot(item) {
  item.parentNode.remove();
}

function handleInventory() { //sort inventory, stack coins, etc.
  let inventory = document.querySelector('#inventory'); //get inventory
  let goldArray = inventory.getElementsByClassName('gold'); // get new gold in inventory
  //let weaponArray = Array.from(inventory.getElementsByClassName('wear'));

  if (goldArray.length > 1) {
    goldArray[0].setAttribute('quantity', Math.floor(goldArray[0].getAttribute('quantity')) + Math.floor(goldArray[1].getAttribute('quantity')))
    goldArray[1].remove()
    goldArray[0].innerHTML = goldArray[0].getAttribute('quantity') + ' coins'
  }
}

function equip(grabbedLoot) {
  let equipSlot = document.getElementById('equip-' + grabbedLoot.getAttribute('slot'));

  if (equipSlot.classList.contains('equipped')) {
    status("Can not equip. Please un-equip first.");
  } else {
    equipSlot.classList.toggle('equipped')
    grabbedLoot.getElementsByClassName('equipBtn')[0].innerHTML = 'Equipped'
    let equipment = document.createElement('img')
    equipment.src = '1.jpg';
    equipment.style.height = '30px';
    equipment.style.width = '30px';
    equipment.addEventListener('click', function () {
      unequip(grabbedLoot)
    })
    equipSlot.append(equipment)

    if (grabbedLoot.className == 'weapon') {
      player_one.atk = grabbedLoot.getAttribute('dmg');
    } else if (grabbedLoot.className == 'armor') {
      player_one.def = grabbedLoot.getAttribute('def')
    }
  }
  check();
}

function unequip(grabbedLoot) {
  grabbedLoot.getElementsByClassName('equipBtn')[0].innerHTML = 'Equip'
  let equipSlot = document.getElementById('equip-' + grabbedLoot.getAttribute('slot'));
  equipSlot.classList.toggle('equipped')
  equipSlot.innerHTML = '';

  if (grabbedLoot.className = 'weapon') {
    player_one.atk = PLAYER_ATK;
  }
  if (grabbedLoot.className = 'armor') {
    player_one.def = PLAYER_DEF;
  }

  check();
}


// Start Game
check();