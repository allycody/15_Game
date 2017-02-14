

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function setTiles(){
  var tiles = document.getElementsByClassName("square")
  console.log(tiles)
  var myTiles = [...tiles]
  console.log("my: ", myTiles)
  var tilesArr = Array.from(tiles)
  console.log(Array.isArray(tiles))
  console.log(tilesArr)
  var shuffledNums = shuffle([1, 2, 3, 4, 5, 6, 7, 8])
  for(let i = 0; i<8; i++){

    myTiles[i].innerHTML = shuffledNums[i].toString()
   
    // tiles.innerHTML = shuffledNums.pop().toString()
    // console.log(tile.innerHTML)
  }

}

function move(event){
  console.log(event.target.id)
  var box = event.target
  var strCoords = event.target.id
  var coords = [...event.target.id.split('-')].map(coord => parseInt(coord))
  console.log(coords)
  var slidable = canMove(coords)
  console.log("slidable", slidable)
  if(slidable){
    moveRight(box, strCoords)
  }
}

function canMove(coords){
  var empty = document.getElementById("empty")
  console.log("empty", empty)
  console.log(typeof empty.className)
  var emptyCoords = empty.className.split(" ")[1].split("-").map(coord => parseInt(coord))
  console.log(emptyCoords)
  let y_dif = coords[0] - emptyCoords[0]
  let x_dif = coords[1] - emptyCoords[1]
  if(y_dif && x_dif){
    alert("Can't move this square")
    return false
  }
  return true
}

function moveRight(b, coords){
  console.log("box", b)
  console.log("coords: ", coords)
  console.log(b.style)
  console.log("width: ", b.offsetWidth)
  let box = $("#" + coords);
  let width = box.outerWidth(true)
  b.style.transform = 'translateX(' + width + 'px)'
  document.getElementById("empty").className = "empty 3-2"
  console.log("class: ", document.getElementById("empty").className)

//   $(function() {
// let box = $("#" + coords);
// let width = box.outerWidth(true))
//   console.log("found box: ", box)

//     box.addClass('left');
// });
}

setTiles()


