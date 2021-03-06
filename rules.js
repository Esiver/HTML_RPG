var MAP_HEIGHT = 70;
var MAP_WIDTH = 40;
// sizes set in .css file, but could be done here as well (global css variable --square)

var TIME_STEP = 550 // ms

var FOE_NUM = 20

var PLAYER_HP = 100;
var PLAYER_ATK = 10;
var PLAYER_DEF = 5;

const tileContainer = document.querySelector(".tileContainer");

// for x axis
for (w = 0; w < MAP_WIDTH; w++) {
  var row = document.createElement("li");
  while ((w + '').length < 3) {
    w = "0" + w
  }
  var rowId = "row-" + w;
  row.className = "tile";
  row.setAttribute("id", rowId);
  tileContainer.append(row);

  // for y axis
  for (h = 0; h < MAP_HEIGHT; h++) {
    var col = document.createElement("li");
    while ((h + '').length < 3) {
      h = "0" + h
    }
    var colId = "row-" + w + "_col-" + h;
    col.className = "tile";

    col.setAttribute("id", colId);
    row.append(col);
  }
}

//utility functions

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const digitsToPosition = (oox, ooy) => {
  final_x = ('000' + (oox)).substr(-3);
  final_y = ('000' + (ooy)).substr(-3);
  return '#row-' + final_x + '_col-' + final_y
}

const getUnitPosition = (unit) => {
  // console.log('unit.parentNode.className', unit.parentNode.className)
  var parent = unit.parentNode;
  if (parent.className === 'village'){
   
    
  } else {
    pos0 = unit.parentNode.getAttribute('id')
    
    console.log('else')
  }
  x = Number(pos0.charAt(4) + pos0.charAt(5) + pos0.charAt(6));
  y = Number(pos0.charAt(12) + pos0.charAt(13) + pos0.charAt(14));
  return [x,y]
}

function status(message) {
  document.getElementById('console').innerHTML = 'Log (<strong>' + playerPosition.substring(0) + '</strong>): <br>' + message
  return message;
}

const randomResource = () => {
  resourceList = ['fur', 'wood', 'stone', 'gem']
  return resourceList[Math.floor(Math.random() * resourceList.length)]
}

const merchantAtPosition = () => {
  return Array.from(document.querySelector(playerPosition).getElementsByClassName('merchant'))
}



const getCityByName = (searchName) => {
  let foundCity = allCities.filter((city) => {
    return city.getAttribute('name') == searchName
  })
  return foundCity
}

// -------------------------------------------------------------
// Classes
class Player {
  constructor(pos_x, pos_y, name, hp, atk, def) {
    this.pos_x = pos_x //('000' + pos_x).substr(-3)
    this.pos_y = pos_y //('000' + pos_y).substr(-3)
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
  }

}

//initialize players ???? 
var player_one = new Player('001', '001', 'player', PLAYER_HP, PLAYER_ATK, PLAYER_DEF);
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
// cards at player position 
const cardAtPosition = (position) => {
  return position + '-card'
} //get card id
const monsterAtPosition = () => {
  return Array.from(document.querySelector(playerPosition).getElementsByClassName('monster'))
} //get array of monsters

//Monster Class and populator
class Monster {
  constructor(alive, pos_x, pos_y, name, hp, atk) {
    this.alive = alive;
    this.pos_x = ('000' + pos_x).substr(-3)
    this.pos_y = ('000' + pos_y).substr(-3)

    this.name = name;
    this.hp = hp;
    this.atk = atk;
  }
}

//cities
var cities = [{
    "pos": [7, 7],
    "name": "Dogos",
    "population": 1521,
    "owner": "Robert",
    "wealth": 3000,
    "resources": [388, 321, 23, 12] //1: fur, 2: wood, 3: stone, 4:gem
  },
  {
    "pos": [30, 7],
    "name": "Fargarth",
    "population": 421,
    "owner": "Bob",
    "wealth": 1200,
    "resources": [223, 421, 23, 12] //1: fur, 2: wood, 3: stone, 4:gem
  },
  {
    "pos": [20, 17],
    "name": "Helbreth",
    "population": 2321,
    "owner": "Bob",
    "wealth": 1000,
    "resources": [341, 151, 23, 12] //1: fur, 2: wood, 3: stone, 4:gem
  },
  {
    "pos": [08, 37],
    "name": "Bootboot",
    "population": 5321,
    "owner": "Diablo",
    "wealth": 1500,
    "resources": [141, 221, 23, 12] //1: fur, 2: wood, 3: stone, 4:gem
  }
]

//Peasent class
class Peasant {
  constructor(stead, trade, wealth) {
    this.stead = stead;
    this.trade = trade;
    this.wealth = wealth;
    this.belief = "nothing";
  }
}
const peasantAtPosition = (position=playerPosition) => {
  return Array.from(document.querySelector(position).firstChild.getElementsByClassName('peasant'))
}

const peasantsInDOM = (villageDOM) => { // todo
  return villageDOM.getElementsByClassName('peasant');
}

function createPeasant(village, x, y, id, quantity) {
  var peasentArray = new Peasant;
  for (p = 0; p < quantity; p++) {
    peasentArray[p] = new Peasant(village.innerHTML, 'fur', 100)
    populatePeasant = document.createElement('div')
    populatePeasant.className = 'peasant';
    populatePeasant.setAttribute('city', id)
    populatePeasant.setAttribute('todo', 'farm')
    populatePeasant.innerHTML = 'Peasant to '+id
    populatePeasant.setAttribute('trade', randomResource()) //maybe let peasant trade depend on surroundings? later!
    village.append(populatePeasant);
  }
}

const allPeasants = document.getElementsByClassName('peasant');

function peasantBehavior(peasant) {



  var tradingPeasants = Array.from(allPeasants).filter(peasant => peasant.getAttribute('todo') == 'trade' )
  tradingPeasants.forEach((peasant)=>{
    if (peasant.parentElement.childNodes == "city") { // TODO
      console.log('big city lights')
    } else {
      towards = allCities.filter(city => {
        return city.getAttribute('name') === peasant.getAttribute('city')
      })
      moveUnitTowards(peasant, towards[0])
    }
  })
  // Array.from(peasants).forEach((peasant) => {
  //   if (peasant.getAttribute('todo') == 'farm') {
  //    } else if (peasant.getAttribute('todo') == 'trade') {
  //      console.log(peasant)
  //    }
  // })
 }

//the peasents live in villages!
class Village {
  constructor(name, wealth, product) {
    this.name = name;
    this.wealth = wealth;
    this.product = product
  }
}

const getAllVillages = () => {
  return Array.from(document.getElementsByClassName('village'))
}

function villageYield(){
  // first get all villages in the world.
  getAllVillages().forEach((village) => {
    let peasantsInVillage = Array.from(peasantsInDOM(village));
    let chosenOne = peasantsInVillage[randomNumber(0, peasantsInVillage.length)];
    let peasantDestination = chosenOne.getAttribute('city');
    // console.log(peasantDestination)
    // moveUnitTowards(chosenOne, getCityByName(peasantDestination)[0] )
    chosenOne.setAttribute('todo', 'trade')
  })
  
}
//make cities
for (c = 0; c < cities.length; c++) {
  x = cities[c].pos[0];
  y = cities[c].pos[1];
  x_cord = ('000' + (x)).substr(-3);
  y_cord = ('000' + (y)).substr(-3);
  var city = document.createElement('div');
  city.setAttribute('owner', cities[c].owner)
  city.setAttribute('population', cities[c].population)
  city.setAttribute('wealth', cities[c].wealth)
  city.innerHTML = cities[c].name
  city.setAttribute('name', cities[c].name)
  city.className = 'city'
  // make surrounding villages
  for (amountOfVillages = 0; amountOfVillages < 5; amountOfVillages++) {
    vil_x = x + randomNumber(-5, 5)
    vil_y = y + randomNumber(-5, 5)
    //village_x = x 
    if (randomNumber(0, 20) > 10) {
      vil_x = x + randomNumber(6, 9);
    } else if (randomNumber(0, 20) < 10) {
      vil_x = x + randomNumber(-9, -6);
    }

    if (randomNumber(0, 20) > 10) {
      vil_y = y + randomNumber(6, 9)
    } else {
      vil_y = y + randomNumber(-6, 9)
    }

    if (vil_x > MAP_WIDTH) {
      vil_x = MAP_WIDTH
    }
    if (vil_x < 0) {
      vil_x = 0
    }
    if (vil_y < 0) {
      vil_y = (y + randomNumber(0, 5))
    }

    vil_x_cord = ('000' + (vil_x)).substr(-3);
    vil_y_cord = ('000' + (vil_y)).substr(-3);

    village = document.createElement('div')
    village.className = 'village'
    village.setAttribute('city', cities[c].name)
    village.setAttribute('wealth', randomNumber(0,250))
    village.innerHTML = 'village' //cities[c].name

    document.querySelector('#row-' + vil_x_cord + '_col-' + vil_y_cord).append(village)
    createPeasant(village, vil_x_cord, vil_y_cord, cities[c].name, randomNumber(10, 15))
  }

  
  //storage?
  var furStore = document.createElement('div');
  furStore.innerHTML = 'fur'
  furStore.setAttribute('quantity', cities[c].resources[1])
  furStore.setAttribute('id', furStore.innerHTML)
  furStore.className = 'storage'

  var stoneStore = document.createElement('div');
  
  stoneStore.setAttribute('quantity', cities[c].resources[3])
  stoneStore.innerHTML = 'stone';
  stoneStore.setAttribute('id', stoneStore.innerHTML)
  stoneStore.className = 'storage'

  city.append(furStore)
  city.append(stoneStore)
  document.querySelector('#row-' + x_cord + '_col-' + y_cord).append(city)
}
function cityRent (){
  cities= Array.from(document.getElementsByClassName('city'))
  for(c=0 ; c< cities.length ; c++){
    rent = 1
    totalRent = Number(cities[c].getAttribute('population')) * rent
    cities[c].setAttribute('wealth', Number(cities[c].getAttribute('wealth'))+totalRent)
  }
}
//all cities for convenience
const allCities = Array.from(document.getElementsByClassName('city'))

//traded goods
const createGoods = (type, amount = 1) => {
  let goods = document.createElement('p')
  goods.className = 'loot'
  goods.innerHTML = type
  return goods
}

//NPC:merchant class
class merchant {
  constructor(wealth, name, trade) {
    this.wealth = wealth
    this.name = name
    this.trade = trade
  }
  //rolll inventory
  rollInventory() {
    let howMany = randomNumber(10, 10); //how many of that resource should the merchant carry?
    let items = []
    for (i = 0; i < howMany; i++) {
      items[i] = createGoods(this.trade)
    }
    return items
  }
  createMerchant() {
    let m = document.createElement('div')
    let nameSpan = document.createElement('span')
    nameSpan.innerHTML =this.name
    m.appendChild(nameSpan)
    m.setAttribute('wealth', this.wealth)
    m.setAttribute('trade', this.trade)
    m.setAttribute('todo', 'sell')
    m.className = 'merchant'
    m.setAttribute('towards', cities[randomNumber(0,4)].name)

    return m
  }
}
var SmithNPC = new merchant(500, 'Confucius', 'stone')
var WoolNPC = new merchant(500, 'Adam Smith', 'fur')
var WoodNPC = new merchant(400, 'Lumberjack Jim', 'wood')

let Confucius = SmithNPC.createMerchant()
let Adam = WoolNPC.createMerchant()
let Jim = WoodNPC.createMerchant()

Adam.append(...WoolNPC.rollInventory())
Confucius.append(...SmithNPC.rollInventory())
Jim.append(...WoodNPC.rollInventory())

document.querySelector('#row-020_col-020').append(Confucius) //todo: figure out how to deploy & properly generate merchants. Not sure if manually?
document.querySelector('#row-030_col-030').append(Adam)
document.querySelector('#row-001_col-000').append(Jim)
// get every merchant
const allMerchants = Array.from(document.getElementsByClassName('merchant'));
//merhchant behavior
function merchantBehavior(merchant) {
  if (merchant.parentNode.firstChild.innerHTML == 'player'){
    Game = false; // Pause
    createUnitCard(merchant, 10, 10, 'merchant', merchant.parentNode.getAttribute('id'))
  }
  else if (merchant.parentNode.firstChild.getAttribute('name') == merchant.getAttribute('towards') ) {
      setTimeout(conductBusiness(merchant, merchant.getAttribute('todo')),5000);
      if ( merchant.getAttribute('todo')=='sell'){
        merchant.setAttribute('todo', 'buy');
      } else {merchant.setAttribute('todo', 'sell')}
      let newRoute = cities[randomNumber(0,4)].getAttribute('name');
      merchant.setAttribute('towards', newRoute);
    }
    else if (merchant.getAttribute('towards') != '' ){
      ccc = Array.from(document.getElementsByClassName('city'))
      towards = ccc.filter(city => {
        return city.getAttribute('name') === merchant.getAttribute('towards')
      })
      moveUnitTowards(merchant, towards[0])
    }
    
  //let obj = cities.find(obj => obj.name == "Bootboot"); FINDS CITY WITH NAME
}

// Selling stuff
function conductBusiness(seller, todo = 'sell') {
  let merchantInventory = seller.children
  let sellAmount = 5 //merchantInventory.length // needs smarter algo for determining how many to sell.
  if (todo == 'sell') {
    if (sellAmount > 0) {

      for (s = 0; s < 10; s++) {
        if (merchantInventory.length > 0) {
          trade('sell', seller, seller.parentNode.querySelector("#" + seller.getAttribute('trade')))
        }
      }
    } else if (sellAmount == 0) {
      console.log('not enough goods')
    }
  } else if (todo = 'buy') {

    for (b = 0; b < 10; b++) {
      trade('buy', seller, seller.parentNode.querySelector("#" + seller.getAttribute('trade')))
    }
  }
}

const trade = (action, seller, tradedGood) => { //traded good is the OBJECT wished traded, stored in the city.
  if (action == 'sell') {

    price = calculatePrice(tradedGood.innerHTML)
    seller.setAttribute('wealth', Number(seller.getAttribute('wealth')) + price)
    seller.removeChild(seller.children[0])
    tradedGood.setAttribute('quantity', Number(tradedGood.getAttribute('quantity')) + 1)
    tradedGood.parentNode.setAttribute('wealth', Number(tradedGood.parentNode.getAttribute("wealth")) - price)
  } else if (action == 'buy') {

    price = calculatePrice(tradedGood.innerHTML, 5)
    seller.setAttribute('wealth', Number(seller.getAttribute('wealth')) - price)
    seller.append(createGoods(tradedGood.innerHTML)) // give product to merchant
    tradedGood.setAttribute('quantity', Number(tradedGood.getAttribute('quantity')) - 1);
    tradedGood.parentNode.setAttribute('wealth', Number(tradedGood.parentNode.getAttribute("wealth")) + price)
  }
}

const calculatePrice = (itemName, bargain = 0) => {
  if (itemName == "fur") {
    return 39 - bargain //price fixed for now...
  } else if (itemName == "stone") {
    return 25 - bargain
  }
}



//Monster names
var monsterNames = ['Mark', 'Ruben', 'James', 'Gerald', 'Emil', 'Jonas', 'Rascal', 'Rakanishu', 'Diablo', 'Enjubi', 'Mads', 'Frederik', 'Jasmin', 'Min', 'Haishengyi', 'Son Goku', 'Gohan', 'Farlig Bamse', 'Gottfred', 'Karl den Store', 'Lars', 'Bob'];


//Loot Quality Roll
function QualityRoll() {
  return 'low'
}

//Loot Class
var weaponNames = ['Sword of Truths', 'Sword of a Thousand Truths', 'Mace', 'Broken Mace', 'Knife', 'Dull Knife', 'Morning Star', 'Stick', 'Sharp Stone', 'Broken Bottle', 'Wand', 'Excallibur'];
var bodyNamesLow = ['Ragged Shirt', 'T-shirt', 'Tunica', 'Polo', 'Dress']

class weapon { // todo: also create classes for other equipment + trash.

  constructor(type, dmg, title, slot) {
    this.type = type;
    this.dmg = dmg;
    this.title = title;
    this.slot = slot;
    this.grade = QualityRoll();
  }
  static quantity = 1;
  createWeapon() {
    let outputWeapon = document.createElement('BUTTON');
    outputWeapon.className = 'loot';
    outputWeapon.setAttribute('type', this.type)
    outputWeapon.setAttribute('slot', this.slot)
    outputWeapon.setAttribute('dmg', randomNumber(15, 20))
    outputWeapon.setAttribute('grade', this.grade)
    outputWeapon.innerHTML = weaponNames[randomNumber(0, weaponNames.length)]

    return outputWeapon;
  }
}

class armor {
  constructor(type, def, slot, grade, multip) {
    this.type = type;
    this.def = def;
    this.slot = slot;
    this.grade = QualityRoll();
    this.multip = multip;
  }
  static quantity = 1;
  createItem() { //maaske lav flere function for rare items, normal items, etc...
    let outputItem = document.createElement('BUTTON');
    outputItem.className = 'loot';
    outputItem.setAttribute('type', this.type);
    outputItem.setAttribute('def', this.multip * this.def);
    outputItem.setAttribute('slot', this.slot);
    outputItem.setAttribute('grade', this.grade)
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

// populate world with angry monsters ???? and gold ???? 
var monsterArray = new Monster();
for (var i = 0; i < FOE_NUM; i++) {
  monsterArray[i] = new Monster(true, randomNumber(1, 6), randomNumber(1, 6), monsterNames[i], (randomNumber(90, 110) + i * 1.8), Math.floor((randomNumber(7, 12) + i * 1.1)));
  let populateMonster = document.createElement('p');
  populateMonster.className = 'monster';
  populateMonster.innerHTML = monsterArray[i].name;
  populateMonster.setAttribute('alive', 'true');
  populateMonster.setAttribute('hp', monsterArray[i].hp);
  populateMonster.setAttribute('atk', monsterArray[i].atk);

  populateMonster.addEventListener('click', function () {
    moveUnitPosition(0, populateMonster, 20, 5)
  })
  document.querySelector('#row-' + monsterArray[i].pos_x + '_col-' + monsterArray[i].pos_y).appendChild(populateMonster);

  //Make loot for monster
  let loot = document.createElement('BUTTON');
  loot.className = "loot"
  lootChance = randomNumber(1, 100);

  if (lootChance > 99 && lootChance < 100) { //todo: create loot-type functions/classes
    loot.setAttribute('quantity', randomNumber(1, 30));
    loot.setAttribute('type', 'gold')
    loot.innerHTML = 'Coin ????';
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

function behavior(unit) {
  //if merchant
  if (unit.getAttribute('class') == 'merchant') { 
    merchantBehavior(unit)
  } else if (unit.getAttribute('class') == 'monster') {
    monsterBehavior(unit)
  }
}

function moveUnitTowards(unit, endDOM){

  x0 = getUnitPosition(unit)[0]; y0 = getUnitPosition(unit)[1];
  x1 = getUnitPosition(endDOM)[0]; y1 = getUnitPosition(endDOM)[1];

  if (x0 < x1) { // if current x is smaller than goal x
    vx = x0 + 1; // increment x by speed 1
  } else if (x0 > x1) { // else if we're more right on the x-axis, 
    vx = x0 - 1 // increment position by speed -1
  } else {
    vx = x0;
  } // else we just put our self at endpoint to make sure :D
  
    if (y0 < y1) {
    vy = y0 + 1;
  } else if (y0 > y1) {
    vy = y0 - 1
  } else {
    vy = y0
  }
  vx = ('000' + (vx)).substr(-3);
  vy = ('000' + (vy)).substr(-3);
  pos1 = 'row-' + vx + '_col-' + vy;

  document.querySelector('#' + pos1).append(unit)
}

function moveUnitPosition(index, unit, x1, y1, doSth = false) {

  pos0 = unit.parentNode.getAttribute('id')
  x0 = Number(pos0.charAt(4) + pos0.charAt(5) + pos0.charAt(6));
  y0 = Number(pos0.charAt(12) + pos0.charAt(13) + pos0.charAt(14));
  if (index == 0) {
    dist = Math.round(Math.sqrt(((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0))))
  }

  if (index > dist + 5) {

    x1 = ('000' + (x1)).substr(-3);
    y1 = ('000' + (y1)).substr(-3);
    pos1 = 'row-' + x1 + '_col-' + y1;
    document.querySelector(digitsToPosition(x1, y1)).append(unit)
    if (doSth == true) { 
      behavior(unit)
    } else {
      console.log('hej')
    }


    return true;
  }

  //simple linear movement logic
  if (x0 < x1) { // if current x is smaller than goal x
    vx = x0 + 1; // increment x by speed 1
  } else if (x0 > x1) { // else if we're more right on the x-axis, 
    vx = x0 - 1 // increment position by speed -1
  } else {
    vx = x0;
  } // else we just put our self at endpoint 

  if (y0 < y1) {
    vy = y0 + 1;
  } else if (y0 > y1) {
    vy = y0 - 1
  } else {
    vy = y0
  }

  vx = ('000' + (vx)).substr(-3);
  vy = ('000' + (vy)).substr(-3);

  // formulate string for position id and append.
  pos1 = 'row-' + vx + '_col-' + vy;

  document.querySelector('#' + pos1).append(unit)

  index += 1;

  move(0, 0)
  setTimeout(moveUnitPosition.bind({}, index, unit, x1, y1, doSth), TIME_STEP);
}

function moveUnitDistance(index, unit, vx, vy) {

  if (index == 0) {
    // distance, rounding upwards for fun. otherwise Math.round
    dist = Math.ceil(Math.sqrt((vx * vx) + (vy * vy)))
    y1 = y0
  }
  if (index >= dist) {
    return true;
  }
  //starting position
  pos0 = unit.parentNode.getAttribute('id')

  // make number from three digits
  x0 = Number(pos0.charAt(4) + pos0.charAt(5) + pos0.charAt(6));
  y0 = Number(pos0.charAt(12) + pos0.charAt(13) + pos0.charAt(14));

  // logic for direction vector. If positive number, move in positive numbers and decrease vector...
  if (vy > 0) {
    y1 = y0 + 1
    vy = vy - 1
  } else if (vy < 0) { // and if negative number, move in negativesm and reduce vector with positive number. 
    y1 = y0 - 1
    vy = vy + 1
  }
  if (vx > 0) {
    x1 = x0 + 1
    vx = vx - 1
  } else if (vx < 0) {
    x1 = x0 - 1
    vx = vx + 1
  }

  // make sure we're not out of bounds on the map.
  if (x1 < 0) {
    x1 = 0
  } else if (x1 > MAP_WIDTH) {
    x1 = MAP_WIDTH
  }
  if (y1 < 0) {
    y1 = 0
  } else if (y1 > MAP_HEIGHT) {
    y1 = MAP_HEIGHT
  }

  // Make coordinates into 3-digit map coordinates.
  x1 = ('000' + (x1)).substr(-3);
  y1 = ('000' + (y1)).substr(-3);

  // formulate string for position id and append.
  pos1 = 'row-' + x1 + '_col-' + y1;
  document.querySelector('#' + pos1).append(unit)

  index += 1;

  move(0, 0)
  setTimeout(moveUnitDistance.bind({}, index, unit, vx, vy), 150);
}

// key presses & control
function move(x, y) {
  if (!Game){ //if for some reason game paused, resume game. 
    Game = true;
    GameCycle();
  }
  
  // ('000' + pos_y).substr(-3)
  x = Number(x)

  player_one.pos_x = (('000' + (Number(player_one.pos_x) + x)).substr(-3)); //increment coordinates
  player_one.pos_y = (('000' + (Number(player_one.pos_y) + y)).substr(-3));

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
  peasantAtPosition().forEach((unit) => {
    console.log('i scanned a peasent.', unit.getAttribute('trade'))
  });
  merchantAtPosition().forEach((unit) => {
    console.log('theres a merchant')
  });

  if (monsterAtPosition().length > 0) { // if monster array length is greater than 0 (there's monsters!) fire monster encounter event.
    monsterEncounter(monsterAtPosition())
  }
  if (peasantAtPosition().length > 0) {
    unitEncounter(peasantAtPosition());
  }
  if (merchantAtPosition().length > 0) {
    merchantEncounter(merchantAtPosition());
  };
}

function checkStats() {
  document.getElementById('player_atk').innerHTML = pPos.getAttribute('atk');
  document.getElementById('player_def').innerHTML = pPos.getAttribute('def');
  document.getElementById('player_hp').innerHTML = pPos.getAttribute('hp');
}

function atkBtn(opponent) {
  clearEncounters(); //clear old instances of monsters

  handleDmg(player_one.name, opponent, player_one.atk, 'normal') // Attack chosen monster
  handleCombat(monsterAtPosition(), pPos); //ALL monsters retaliate and counter-attacks the player! oh no!

  check(); //get new instances of monsters
}

function handleCombat(monsters, player) {
  monsters.forEach((monster) => {
    handleDmg(monster, player, monster.getAttribute('atk'), 'normal') // each monster retaliates
  })
  checkStats();
}

function handleDmg(giver, receiver, amount, type) {
  receiver.setAttribute("hp", Math.floor(receiver.getAttribute("hp") - amount * 5));
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
  if (classType == 'merchant') {
    status("you have met merchant "+mapHTML.firstChild.textContent);
    cardDOM.innerHTML = '<div class=' + classType + '_info"> <name>' + mapHTML.firstChild.textContent + "</name><span class=" + classType + "-info'>HP: " + hp + ' ATK: ' + atk + '</span></div> <img style="max-width:100px;" src='+mapHTML.firstChild.innerHTML+'.jpg>';
    document.querySelector('.monster-arena').appendChild(cardDOM)
    // 
    // document.querySelector('.monster-arena').appendChild(cardDOM)
    // for(c = 0 ; c < mapHTML.children.length ; c++) {
    //   createMerchantShop(mapHTML.children[c] , cardDOM);
    // }
  }
  if (classType == 'peasant') {
    console.log("You've met a peasant.")
    
  }
  return cardDOM
}

function createMerchantShop (item, merchantCard){
  console.log(item, merchantCard);
  shopItem = document.createElement('button');
  shopItem.innerHTML = item.innerHTML + ' | ' +calculatePrice(item.innerHTML);
  shopItem.className = 'shop-item';
  shopItem.setAttribute('type', 'goods');
  
  merchantCard.appendChild(shopItem)
  shopItem.addEventListener('click' , function(){
    grabLoot(shopItem);
  });
}

function merchantEncounter(merchants) {
  for( m = 0 ; m< merchants.length; m++){
    let merchantDOM = createUnitCard(merchants[m], 10, 10, 'merchant', merchants[m].parentNode.getAttribute('id'))
    for(i = 0 ; i < merchants[m].children.length ; i++) {
      createMerchantShop(merchants[m].children[i] , merchantDOM);
    }
  }
}

function unitEncounter(units){
  for (var u = 0 ; u < units.length; u++) {
    console.log(units, 'EMIL HERE') // EMIL HERE
    createUnitCard(units[u], 10, 10, 'merchant', units[u].parentNode.getAttribute('id'))
  }
}


function monsterEncounter(monsters) { // takes array of monsters
  for (var i = 0; i < monsters.length; i++) {
    let monsterDOM = createUnitCard(monsters[i].innerHTML, monsters[i].getAttribute('hp'), monsters[i].getAttribute('atk'), 'monster', playerPosition.substring(1) + '-card-' + i)
    createAttackBtn(monsters[i], monsterDOM);
    if (monsters[i].getAttribute('alive') == 'false') { //do something if monster dead.
      lootBoxes = document.querySelector('#' + monsters[i].parentNode.getAttribute('id') + '-card-' + i).getElementsByClassName('loot');
      Array.from(lootBoxes).forEach(function (ele) {
        ele.style.display = 'flex';
        console.log(ele);

        ele.addEventListener('click', function () {
          grabLoot(ele, ele.getAttribute('quantity'))
        })
      })

    }
  }
}

// looting 
function grabLoot(lootElement, quantity) {

  console.log(' : grab loot', );
  let grabbedLoot = document.createElement('li')

  if (lootElement.getAttribute('type') == 'gold') {
    grabbedLoot.className = 'gold'
    grabbedLoot.setAttribute('quantity', lootElement.getAttribute('quantity'))
  }
  if (lootElement.getAttribute('type') == 'goods') {
    grabbedLoot.className = 'loot'

    let equipBtn = document.createElement('button');
      equipBtn.className = 'equipBtn';
      equipBtn.innerHTML = 'Equip ';

      grabbedLoot.innerHTML = lootElement.textContent
      grabbedLoot.setAttribute('slot', lootElement.getAttribute('slot'))
      grabbedLoot.append(equipBtn)
      grabbedLoot.className = 'weapon';
      grabbedLoot.setAttribute('grade', lootElement.getAttribute('grade'))
      grabbedLoot.setAttribute('dmg', lootElement.getAttribute('dmg'));

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
    
  }
  if (lootElement.getAttribute('type') == 'trash') {
    let equipBtn 
  }
  if (lootElement.getAttribute('type') == 'wear') {
    if (lootElement.getAttribute('slot') == 'lhand') {
      let equipBtn = document.createElement('button');
      equipBtn.className = 'equipBtn';
      equipBtn.innerHTML = 'Equip ';

      grabbedLoot.innerHTML = lootElement.textContent
      grabbedLoot.setAttribute('slot', lootElement.getAttribute('slot'))
      grabbedLoot.append(equipBtn)
      grabbedLoot.className = 'weapon';
      grabbedLoot.setAttribute('grade', lootElement.getAttribute('grade'))
      grabbedLoot.setAttribute('dmg', lootElement.getAttribute('dmg'));

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
    status('Equipped ' + grabbedLoot.className + " '" + grabbedLoot.firstChild.wholeText + "' for ")
    if (grabbedLoot.className == 'weapon') {
      player_one.atk = grabbedLoot.getAttribute('dmg');
      pPos.setAttribute('atk', grabbedLoot.getAttribute('dmg'));
    } else if (grabbedLoot.className == 'armor') {
      pPos.setAttribute('def', grabbedLoot.getAttribute('def'))
      player_one.def = grabbedLoot.getAttribute('def')
    }
  }
  checkStats();
}

function unequip(grabbedLoot) {
  grabbedLoot.getElementsByClassName('equipBtn')[0].innerHTML = 'Equip'
  let equipSlot = document.getElementById('equip-' + grabbedLoot.getAttribute('slot'));
  equipSlot.classList.toggle('equipped')
  equipSlot.innerHTML = '';

  if (grabbedLoot.className = 'weapon') {
    player_one.atk = PLAYER_ATK;
    pPos.setAttribute('atk', PLAYER_ATK)
  }
  if (grabbedLoot.className = 'armor') {
    player_one.def = PLAYER_DEF;
    pPos.setAttribute('def', PLAYER_DEF)
  }

  checkStats();
}

function seasonsChange() {
  var cosmos = document.getElementById('cosmos');
  var seasonMeter = document.getElementById('season-bar');
  var seasonValue = seasonMeter.getAttribute('date');
  
  if (seasonValue > 200){
    seasonValue = 0;
    seasonMeter.setAttribute('date', 0)
  } 
  else if (seasonValue == 50) {
    cosmos.innerHTML = 'Spring'
    cosmos.style.backgroundImage = 'url(spring.jpg)'
    villageYield();
  } else if (seasonValue == 95) {
    cosmos.innerText =  'Summer'
    cosmos.style.backgroundImage = 'url(summer.jpg)'
    if (cityRentOn){
        cityRent();
    }
  } else if (seasonValue == 130) {
    villageYield();
    cosmos.innerText =  'Autumn'
    cosmos.style.backgroundImage = 'url(autumn.jpg)'
  } else if (seasonValue == 185) {
    cosmos.innerText =  'Winter';
    cosmos.style.backgroundImage = 'url(winter.jpg)'
    if (cityRentOn){
      cityRent();
    }
  }
  seasonMeter.style.width = seasonValue/2 +'%';
  seasonMeter.innerHTML = seasonValue;
  seasonMeter.setAttribute('date', Number(seasonValue)+1);

  return true
}

//Game
function GameCycle() {
  
  if (Game == true){
    if (seasonsChangeOn){
      seasonsChange();
    }
    // merchantBehavior(...allMerchants)
    if (merchantBehaviorOn){
      merchantBehavior(Adam)
      merchantBehavior(Confucius)
    }

    if (peasantBehaviorOn){
      peasantBehavior()
    }
    

    checkStats();
    setTimeout(GameCycle.bind({}), TIME_STEP*0.1)
  }
}

// Start Game
check();
cityRent(); // for some reason this needs to run once / initialize or else crash??
//peasantInVillage()
let peasantBehaviorOn = true;
let Game = false  ;
let cityRentOn = true;
let merchantBehaviorOn = true;
let seasonsChangeOn = true;
GameCycle();


// Admin stuff
merchantBehaviorBtn = document.getElementById('ADMIN_merchantBehavior')
peasantBehaviorBtn = document.getElementById('ADMIN_peasantBehavior')
peasantBehaviorBtn.addEventListener('click', function () {
  peasantBehaviorToggle()}
  );
function peasantBehaviorToggle () {
  peasantBehaviorOn = !peasantBehaviorOn; 
  console.log(' :', peasantBehaviorOn);
}
merchantBehaviorBtn.addEventListener('click', function () {
  merchantBehaviorToggle()}
  );
function merchantBehaviorToggle () {
  merchantBehaviorOn = !merchantBehaviorOn; 
  console.log(' :', merchantBehaviorOn);
}
//