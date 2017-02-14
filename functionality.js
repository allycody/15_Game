// find target
// find empty
// compare target to empty
//

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

// function move(event){
//   console.log(event.target.id)
//   var box = event.target
//   var strCoords = event.target.id
//   var coords = [...event.target.id.split('-')].map(coord => parseInt(coord))
//   console.log(coords)
//   var slidable = canMove(coords)
//   console.log("slidable", slidable)
//   if(slidable){
//     //moveRight(box, strCoords)
//   }
// }


function move(event){
  console.log(event.target.id)
  let tile = event.target
  let strCoords = event.target.id
  let coords = [...event.target.id.split('-')].map(coord => parseInt(coord))
  console.log(coords)

  let empty = document.getElementById("empty")
  let emptyCoords = empty.className.split(" ")[1].split("-").map(coord => parseInt(coord))
  let slidable = canMove(coords, emptyCoords)
  console.log("slidable", slidable)
  if(slidable){
    moveRight(...slidable, tile, strCoords)
    resetClass(...slidable, tile, coords)
  }
}

function canMove(coords, emptyCoords){
  console.log(emptyCoords)
  let y_dif = emptyCoords[0] - coords[0]
  let x_dif = emptyCoords[1] - coords[1]
  if(y_dif && x_dif){
    alert("Can't move this square")
    return false
  }
  // can move along y-axis
  else if(y_dif){
    return (y_dif < 0 ? ["up", y_dif] : ["down", y_dif])
  }
  // can move along x-axis
  else return (x_dif < 0 ? ["left", x_dif] : ["right", x_dif])
}

function moveRight(dir, inc, b, strCoords){
  console.log("b", b)
  console.log("strCoords: ", strCoords)
  console.log(b.style)
  console.log("width: ", b.offsetWidth)
  let box = $("#" + strCoords);
  console.log("box", box)
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

function resetClass(dir, inc, tile, coords){
  if(dir === "up" || dir === "down"){
    coords[0] += inc
  }

  else if(dir === "left" || dir === "right"){
    coords[1] += inc
  }

  coords = coords.join("-").toString()
  tile.id = coords
}

setTiles()


