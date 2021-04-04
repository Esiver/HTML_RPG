var MAP_HEIGHT = 40;
var MAP_WIDTH = 40;
var FOE_NUM = 1

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

// unit objects
function Unit(pos_x, pos_y, name) {
  this.pos_x = pos_x;
  this.pos_y = pos_y;
  this.name = name;
}

//initialize players 👦 
var player_one = new Unit(1,1, 'player');

var pPos = document.createElement('div');
pPos.innerHTML = player_one.name;
pPos.setAttribute('id', 'player');

// initialize player by appending a div
document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y).appendChild(pPos);

//monster
var monster = document.createElement('p');
monster.className = 'monster'
document.querySelector('#row-5_col-2').appendChild(monster);

var moo = document.createElement('p');
moo.className = 'monster'
//document.querySelector('#row-5_col-2').appendChild(moo);

// key presses & control
function move (x, y) {
  player_one.pos_x = player_one.pos_x + x; //increment coordinates
  player_one.pos_y = player_one.pos_y + y;
  document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y).appendChild(pPos);
  
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

// position check function
function check() {
  let playerPos = document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y);
  
  let ms = playerPos.getElementsByClassName('monster');
  console.table(ms);
  
  
  if (playerPos.contains(monster)) {
      monsterEncounter()
  }
}


// encounters
function monsterEncounter() {
    console.log('rawr')
}