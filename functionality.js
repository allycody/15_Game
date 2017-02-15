// find target
// find empty
// compare target to empty
//

let rows = 3
let boardSize = 9
let sizeClass = 3

function setBoardSize(size){
  rows = size;
  boardSize = size * size;

  setTiles()
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

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


// Modify this later to allow for different board sizes
// Initialize board
function setTiles(){
  let nums = [...Array(boardSize).keys()].slice(1)

  let board = document.getElementById("board")
  
  // Get all tiles
  for(let i = 1; i <= rows; i++){
    for(let j = 1; j <= rows; j++){
      if(i === rows && j === rows) break;
      let square = document.createElement("DIV")
      square.setAttribute("id",  i + '-' + j)
      square.setAttribute("class", `${rows} square`)
      square.addEventListener("click", move)
      board.appendChild(square)
    } 
  }
  let empty = document.createElement("DIV")
  empty.setAttribute("id", "empty")
  empty.setAttribute("class", "empty " + rows + "-" + rows)
  board.appendChild(empty)
  console.log("CONTAINER INNER HTML: ", board.innerHTML)
  let tiles = document.getElementsByClassName("square")
  let myTiles = [...tiles]

  // Randomize the numbers to assign to tiles
  let shuffledNums = shuffle(nums)

  // Assign numbers to tiles
  myTiles = myTiles.forEach(tile => tile.innerHTML = shuffledNums.pop().toString())

}

// When a tile is clicked, call "move"
function move(event){

  let tile = event.target
  let strCoords = event.target.id
  let coords = [...event.target.id.split('-')].map(coord => parseInt(coord))


  let empty = document.getElementById("empty")
  let emptyCoords = empty.className.split(" ")[1].split("-").map(coord => parseInt(coord))

  // Check if a tile can be moved and in which direction
  let slidable = canMove(coords, emptyCoords)
  console.log("num to slide", slidable[2])

  if(slidable){
    // Initialize array for sliding multiple tiles at once
    let tilesToSlide = []
    let dir = slidable[0]
    let dirVector = slidable[1]
    let numSlide = slidable[2]

    if(numSlide > 1){
      // Add tile that was clicked on
      tilesToSlide.push(tile)
      for(let i = 1; i < numSlide; i++){

        // Find coordinates of other tiles that need to be moved
        let siblingCoords = (dir === "left" || dir === "right") ? [coords[0], (coords[1] + (dirVector * i))] : [(coords[0] + (dirVector * i)), coords[1]]
        //console.log("siblingCoords: ", siblingCoords)
        siblingCoords = siblingCoords.join("-").toString()

        // Find sibling tile and add to tilesToSlide
        tilesToSlide.push(document.getElementById(siblingCoords))
      }

      // console.log("TILES TO SLIDE: ", tilesToSlide)

      // Work backwards through tilesToSlide so that we do not have an infinite loop
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
  // Can move along y-axis
  else if(y_dif){
    // If y_dif is less than 0, tile can move up (in negative direction)
    return (y_dif < 0 ? ["up", -1, Math.abs(y_dif)] : ["down", 1, Math.abs(y_dif)])
  }
  // Can move along x-axis
  // If x_dif is less than 0 tile cab move left (in negative direction)
  else return (x_dif < 0 ? ["left", -1, Math.abs(x_dif)] : ["right", 1, Math.abs(x_dif)])
}

function moveDir(dir, inc, b, strCoords){

  // Find the tile using its id 
  let tile = $("#" + strCoords);
  // Find the tiles total width including margin
  let width = tile.outerWidth(true) 

  // Get the x and y coordinates currently applied to the div
  let currTrans = b.style.transform.split(" ")

  // Convert the current coordinates to an array of floats
  let transCoords = currTrans.map(element => parseFloat(element.match(/\-?\d+\.+\d+/g)))

  // Initilialize translated coordinates to 0 if not currently set
  let moveX = transCoords[0] || 0;
  let moveY = transCoords[1] || 0;


  if(dir === "right" || dir === "left"){
    moveX = dir === "right" ? (moveX + width) : (moveX - width) 
  }

  if(dir === "down" || dir === "up"){
    moveY = dir === "down" ? (moveY + width) : (moveY - width) 
  }
  console.log("TOTAL TRANS: ", 'translateX(' + moveX + 'px) translateY(' + moveY + 'px)')

  b.style.transform = 'translateX(' + moveX + 'px) translateY(' + moveY + 'px)'

}

// Helper function to reset the id on the moved tile and the class on the empty square
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


// Set up board
setTiles()


