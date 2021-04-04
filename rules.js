var MAP_HEIGHT = 40;
var MAP_WIDTH = 40;
var FOE_NUM = 1

const tileContainer = document.querySelector(".tileContainer");

for (w = 0; w < MAP_WIDTH; w++) {
  var row = document.createElement("li");
  var rowId = "row-" + w;
  row.className = "tile";
  row.setAttribute("id", rowId);

  tileContainer.append(row);

  for (h = 0; h < MAP_HEIGHT; h++) {
    var col = document.createElement("li");
    var colId = "row-" + w + "_col-" + h;
    col.className = "tile";

    col.setAttribute("id", colId);
    row.append(col);
  }
}

// player object
function Unit(pos_x, pos_y) {
  this.pos_x = pos_x;
  this.pos_y = pos_y;
}
var player_one = new Unit(1,1);


var pPos = document.createElement('div');
pPos.setAttribute('id', 'player');

// initialize player by appending a div
document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y).appendChild(pPos);

// key presses & control
function move (x, y) {
  // need logic for blocking...
  //
  player_one.pos_x = player_one.pos_x + x;
  player_one.pos_y = player_one.pos_y + y;
  document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y).appendChild(pPos);
  
  // do position check
  check();
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
  let p = document.querySelector('#row-'+player_one.pos_x+'_col-'+player_one.pos_y);
  //console.log(p);
  console.log(p.children)
  let area = p.children;
  Array.from(area).forEach(p => {
    console.log(area);
});
  if (p.contains(monster)) {
    
  }
}

var monster = document.createElement('p');
monster.innerHtml = 'M';
monster.className = 'monster'
document.querySelector('#row-5_col-2').appendChild(monster);