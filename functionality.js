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
  // console.log(tiles)
  var myTiles = [...tiles]
  // console.log("my: ", myTiles)
  var tilesArr = Array.from(tiles)
  // console.log(Array.isArray(tiles))
  // console.log(tilesArr)
  var shuffledNums = shuffle([1, 2, 3, 4, 5, 6, 7, 8])
  for(let i = 0; i<8; i++){

    myTiles[i].innerHTML = shuffledNums[i].toString()
   
    // tiles.innerHTML = shuffledNums.pop().toString()
    // console.log(tile.innerHTML)
  }

}


function move(event){
  // console.log(event.target.id)
  let tile = event.target
  let strCoords = event.target.id
  let coords = [...event.target.id.split('-')].map(coord => parseInt(coord))
  // console.log(coords)

  let empty = document.getElementById("empty")
  let emptyCoords = empty.className.split(" ")[1].split("-").map(coord => parseInt(coord))
  let slidable = canMove(coords, emptyCoords)
  console.log("num to slide", slidable[2])
  if(slidable){
    let tilesToSlide = [] 
    if(slidable[2] > 1){
      tilesToSlide.push(tile)
      for(let i = 1; i < slidable[2]; i++){
        let siblingCoords = (slidable[0] === "left" || slidable[0] === "right") ? [coords[0], (coords[1] + (slidable[1]) * i)] : [(coords[0] + (slidable[1]) * i), coords[1]]
        console.log("siblingCoords: ", siblingCoords)
        siblingCoords = siblingCoords.join("-").toString()
        tilesToSlide.push(document.getElementById(siblingCoords))
      }
      console.log("TILES TO SLIDE: ", tilesToSlide)
      for(let i = tilesToSlide.length - 1; i >= 0; i--){
        move({target: tilesToSlide[i]})
      }
    }
    else updateTiles(slidable.slice(0, 2), tile, strCoords, coords, empty, emptyCoords)
  }
}

function updateTiles(slidable, tile, strCoords, coords, empty, emptyCoords){
    moveDir(...slidable, tile, strCoords)
    resetClass(...slidable, tile, coords, empty, emptyCoords)
}

function canMove(coords, emptyCoords){
  // console.log(emptyCoords)
  let y_dif = emptyCoords[0] - coords[0]
  let x_dif = emptyCoords[1] - coords[1]
  if(y_dif && x_dif){
    alert("Can't move this square")
    return false
  }
  // can move along y-axis
  else if(y_dif){
    return (y_dif < 0 ? ["up", -1, Math.abs(y_dif)] : ["down", 1, Math.abs(y_dif)])
  }
  // can move along x-axis
  else return (x_dif < 0 ? ["left", -1, Math.abs(x_dif)] : ["right", 1, Math.abs(x_dif)])
}

function moveDir(dir, inc, b, strCoords){
  console.log("MOVE ", dir)
  console.log("b", b)
  console.log("strCoords: ", strCoords)
  console.log("currTrans: ", b.style.transform)
  let currTrans = b.style.transform.split(" ")
  console.log("currTrans: ", currTrans)
  let transCoords = currTrans.map(element => parseFloat(element.match(/\-?\d+\.+\d+/g)))

  //parseFloat(b.style.transform.match(/\-?\d+\.+\d+/g)) || 0
  console.log("regex return: ", transCoords)
  let box = $("#" + strCoords);
  // console.log("box", box)
  let width = box.outerWidth(true) 
  let moveX = transCoords[0] || 0;
  let moveY = transCoords[1] || 0;


 // could set var translate to translateX or translateY 
 // and var move to distance based on dir
 // then call b.style.transform once ?

  // if(dir === "right"){
  //   move = currTrans + width
  //   b.style.transform = 'translateX(' + move + 'px)'
  // }
  // else if(dir === "left") {
  //   console.log("in left")
  //   move = currTrans - width
  //   console.log("move distance: ", move)
  //   b.style.transform = 'translateX(' + move + 'px)'
  // }


  if(dir === "right" || dir === "left"){
    moveX = dir === "right" ? (moveX + width) : (moveX - width) 
  }

  if(dir === "down" || dir === "up"){
    moveY = dir === "down" ? (moveY + width) : (moveY - width) 
  }
  console.log("TOTAL TRANS: ", 'translateX(' + moveX + 'px) translateY(' + moveY + 'px)')

  b.style.transform = 'translateX(' + moveX + 'px) translateY(' + moveY + 'px)'

//   $(function() {
// let box = $("#" + coords);
// let width = box.outerWidth(true))
//   console.log("found box: ", box)

//     box.addClass('left');
// });
}

function resetClass(dir, inc, tile, coords, empty, emptyCoords){
  if(dir === "up" || dir === "down"){
    coords[0] += inc
    emptyCoords[0] -= inc
  }

  else if(dir === "left" || dir === "right"){
    coords[1] += inc
    emptyCoords[1] -= inc
  }

  coords = coords.join("-").toString()
  emptyCoords = emptyCoords.join("-").toString()
  tile.id = coords

  empty.className = "empty " + emptyCoords
}

// might make more sense instead of converting to nums and incrementing back to string
// we could pull the class/id off the element in string format and just swap them

setTiles()


