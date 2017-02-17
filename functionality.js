let rows = 3
let boardSize = 9
let sizeClass = 3
let nums = [...Array(boardSize).keys()].slice(1)
nums.push(0)
let shuffledNums = nums.slice(0)
let emptyI = nums.indexOf(0)

function setBoardSize(size){

  // Only reset size and recreate board if the number of rows changes
  if(rows !== size){
    rows = size;
    boardSize = size * size;
    nums = [...Array(boardSize).keys()].slice(1)
    nums.push(0)
    shuffledNums = nums.slice(0)
    emptyI = nums.indexOf(0)

    document.getElementById("board").innerHTML = null

    setTiles()
  }
}

function makeMove(neighbors){
  let legitimateNeighbors = neighbors.filter(element => (element >= 0 && element < boardSize))
  let dir = Math.floor(Math.random() * 4)
  let tileInd = legitimateNeighbors[Math.floor(Math.random() * legitimateNeighbors.length)]
  let spacesMoved = tileInd - emptyI


  let valA = shuffledNums[tileInd]
  shuffledNums[tileInd] = shuffledNums[emptyI]
  shuffledNums[emptyI] = valA
  console.log("unsaved shuffle: ", shuffledNums)
  neighbors.forEach((element, i) => {neighbors[i] = neighbors[i] + spacesMoved})
  emptyI += spacesMoved
  //console.log("updated emptyI: ", emptyI)
  //console.log("NEIGHBORS UPDATED: ", neighbors)


  // switch(dir){
  //   case 0:
  //     // move up
  //     let valA = array[tileInd]
  //     array[tileInd] = array[tileInd - rows]
  //     array[tileInd - rows] = valA
  //     break;

  //   case 1:
  //     // move down
  //     let valA = array[tileInd]
  //     array[tileInd] = array[tileInd + rows]
  //     array[tileInd + rows] = valA

  //   case 2:
  //     // move left
  //     let valA = array[tileInd]
  //     array[tileInd] = array[tileInd - 1]
  //     array[tileInd - 1] = valA

  //   case 3:
  //     // move right
  //     let valA = array[tileInd]
  //     array[tileInd] = array[tileInd + 1]
  //     array[tileInd + 1] = valA
  // }

}

function neighborsOfEmpty(){
  let emptyI = nums.indexOf(0)
  console.log("empty index", emptyI)
  let neighbors = [emptyI + 1, emptyI - 1, emptyI + rows, emptyI - rows]
  return neighbors
}

function shuffle(numTimes = 30){
  //let neighbors = neighborsOfEmpty()
  
  console.log("empty index", emptyI)
  let neighbors = [emptyI + 1, emptyI - 1, emptyI + rows, emptyI - rows]
  console.log("NEIGHBS: ", neighbors)
  //console.log("LEGIT: ", legitimateNeighbors)
  while(numTimes > 0){
    console.log("updated emptyI: ", emptyI)
    console.log("NEIGHBORS UPDATED: ", neighbors)
    makeMove(neighbors)
    numTimes -- 
  }

  console.log("SHUFFLED?", shuffledNums)

  return shuffledNums
}

// function shuffle(array) {

//   let currentIndex = array.length, temporaryValue, randomIndex;

//   // If the number of rows is even and the empty square is in the last row
//   // the number of swaps we make in the array must be even
//   // but array.length is odd when rows is even
//   if(!rows%2) {
//     console.log("ROWS: ", rows)
//     currentIndex ++
//   }
  
//   let inversions = 0;
//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {
//     inversions++
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//   console.log("INV: ", inversions)

//   return array;
// }


// Modify this later to allow for different board sizes
// Initialize board
function setTiles(){

  console.log("NUMS ARR: ", nums, Array.isArray(nums))
  // Randomize the numbers to assign to tiles
  let shuffledNums = shuffle()
  console.log("SUFFLED: ", shuffledNums)

  let board = document.getElementById("board")
  
  // Get all tiles
  for(let i = 0; i < rows; i++){
    for(let j = 0; j < rows; j++){

      let square = document.createElement("DIV")
      let num = shuffledNums[(j%rows) + (i*rows)]
      let board = document.getElementById("board")
      let width = parseFloat(window.getComputedStyle(board).width)/rows

      console.log("NUM: ", num)
      if(num){
        square.setAttribute("id",  `${i}-${j}`)
        square.setAttribute("class", `${rows} square`)
        square.setAttribute("style", `top: ${(i * width)}px; left: ${(j * width)}px;`)
        square.addEventListener("click", move)
        square.innerHTML = num;
      }

      else{
        square.setAttribute("id", "empty")
        square.setAttribute("class", `empty ${i}-${j} ${rows}`)
      }

      board.appendChild(square)
    } 
  }

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
  console.log("empty coords: ", emptyCoords)
  console.log("coords: ", coords)
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
  let tile = document.getElementById(strCoords)


  // Find the tiles total width and height including margin
  let style = window.getComputedStyle(tile)
  let width = parseFloat(style.width) + (2 * parseFloat(style.marginRight))
  let height = parseFloat(style.height) + (2 * parseFloat(style.marginTop))

  console.log("WIDTH: ", width)

  // Get the x and y coordinates currently applied to the div
  let currTrans = b.style.transform.split(" ")


  // Convert the current coordinates to an array of floats
  let transCoords = currTrans.map(element => parseFloat(element.match(/\-?\d+\.?\d+/g)))


  // Initilialize translated coordinates to 0 if not currently set
  let moveX = transCoords[0] || 0;
  let moveY = transCoords[1] || 0;


  if(dir === "right" || dir === "left"){
    moveX = dir === "right" ? (moveX + width) : (moveX - width) 
  }

  if(dir === "down" || dir === "up"){
    moveY = dir === "down" ? (moveY + height) : (moveY - height) 
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


