var canvasWidth = 400;
var canvasHeight = 400;

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas");
}

var points = [];
var top_left_x = 100,
  top_left_y = 100;
var text_offset_x = 25, text_offset_y = 45, textbox_width = 75;

var player_size = 35;
var cells_num = 3;
var cell_width = 100,
  step = 100;
var player_x = top_left_x + 1 * cell_width,
player_y = top_left_y + 2 * cell_width;
var point_size = 20;
var visited = [{ x: player_x, y: player_y }]; // array of coordinates of correctly visited locations

// positions of 9 locations
var locations = {
  x0_y0: 'The Hill',
  x1_y0: 'The Camp',
  x2_y0: 'The Cave',
  x0_y1: 'The Blacksmith',
  x1_y1: 'The Town Square',
  x2_y1: 'The Forest',
  x0_y2: 'The Tavern',
  x1_y2: 'Starting Point',
  x2_y2: 'The Market'
}

// note that Town Square is not part of the order
var order = [[1,2],[0,1],[2,1],[0,2],[2,2],[2,0],[1,0],[0,0]];


var progress = 0; // index of current position in order array


// populate points
for (let i = 0; i < cells_num; i++) {
  for (let j = 0; j < cells_num; j++) {
    points.push([top_left_x + cell_width * i, top_left_y + cell_width * j]);
  }
}

// console.log(points);

function draw() {
  background(0);
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];
    let x_next = top_left_x + cell_width * order[progress][0]; // x value of the next position to be visited in order
    let y_next = top_left_y + cell_width * order[progress][1]; // y value of the next position to be visited in order
    let coordinates_att = 'x'+ ((x-top_left_x)/cell_width).toString()+'_'+'y'+((y-top_left_y)/cell_width).toString();
    let location_name = locations[coordinates_att];

    if (player_x == x_next && player_y == y_next) { // if player reaches the next location in the order to be visited
      progress += 1; // update progress
      updateVisitedArray(); // update visited array
      console.log("Correct location visited!!!!");
    }
    if ((visited.some((pos) => pos.x === x && pos.y === y))){ // if this location has been visited in the correct order
      fill("red");
    } else {
      noFill();
      stroke('white');
    }
    text(location_name, x-text_offset_x, y-text_offset_y, textbox_width);
    ellipse(x, y, point_size, point_size);
  }
  fill("purple");
  ellipse(player_x, player_y, player_size);
}

function updateVisitedArray() {
  if (!visited.some((pos) => pos.x === player_x && pos.y === player_y)) {
    visited.push({ x: player_x, y: player_y });
  }
}

function control() {
  let left_arrow = document.getElementById("left");
  let right_arrow = document.getElementById("right");
  let up_arrow = document.getElementById("up");
  let down_arrow = document.getElementById("down");

  left_arrow.addEventListener("click", () => {
    if (player_x > top_left_x) player_x -= step;
  });
  right_arrow.addEventListener("click", () => {
    if (player_x < top_left_x + cell_width * (cells_num - 1)) player_x += step;
  });
  up_arrow.addEventListener("click", () => {
    if (player_y > top_left_y) player_y -= step;
  });
  down_arrow.addEventListener("click", () => {
    if (player_y < top_left_y + cell_width * (cells_num - 1)) player_y += step;
  });
}

let dialogues = [];
for (let i = 0; i < 20; i++) {
    let audio = {
        file: new Audio("dialogues/r"+1+".m4a"),
        played: false
    };
    dialogues.push(audio);
}

let bgSounds = {
    start: new Audio("sounds/2_1.ogg"),
    blacksmith: new Audio("sounds/1_0.ogg"),
    forest: new Audio("sounds/1_2.ogg")
}

let dialogueCounter = 0;

function playBgSound() {
    let x = (player_x - top_left_x)/cell_width;
    let y = (player_y - top_left_y) / cell_width;
    if (x == 0 && y == 0) {
        // todo
        
    } else if (x == 0 && y == 1) {
        // todo
        bgSounds.blacksmith.play();
    } else if (x == 0 && y == 2) {
        // todo
    } else if (x == 1 && y == 0) {
        // todo
        
    } else if (x == 1 && y == 1) {
        // todo
    } else if (x == 1 && y == 2) {
        // todo
        bgSounds.start.play();
    } else if (x == 2 && y == 0) {
        // todo
    } else if (x == 2 && y == 1) {
        // todo
        bgSounds.forest.play();
        
    } else if (x == 2 && y == 2) {
        // todo
    }
}

// function changeDialogue(dialogue) {
//     console.log("here");
//     let box = document.querySelector(".dialogue");
//     box.innerText = dialogue;  
//     box.classList.add("reveal");
//     // setTimeout(() => {
          
//     // }, 1000);
//     userDialogueCounter++;
// }

let gameEnded = false;

function fadeOut(element) {
    element.classList.remove("reveal");
    element.style.pointerEvents = "none";
    setTimeout(() => {
        element.remove();
    }, 1000);
}

// universal event listener
document.addEventListener('DOMContentLoaded', () => {
    let intro = document.querySelector(".intro");
    let canvas = document.getElementById("canvas");
    let controls = document.querySelector(".controls");
    let ud = document.querySelectorAll(".dialogue p");
    let udCounter = 0;

    // main intro cover title
    intro.addEventListener('click', () => {
        // remove the title cover
        intro.classList.add("fade");
        setTimeout(() => {
            intro.remove();
        }, 1000);

        // bsmtih has our canvas, so reveal it
        // making sure that it only plays once even when clicked multiple times
        if (!dialogues[dialogueCounter].played) {
            // playing the first dialogue
            // Narrator/Spirit: The Capital...broom poking someone)
            dialogues[dialogueCounter].file.play();
            dialogues[dialogueCounter].file.addEventListener("ended", () => {
                dialogueCounter++;
                // User: Please, sir, you have to help me-- our kingdom is in danger. I need to collect the three ancient gemstones!
                ud[udCounter].classList.add("reveal");
                ud[udCounter].addEventListener('click', () => {
                    fadeOut(ud[udCounter]);
                    udCounter++;
                    // Stranger: Rough night? Been there. Alright, just go home.
                    dialogues[dialogueCounter].file.play();
                    dialogues[dialogueCounter].file.addEventListener("ended", () => {
                        dialogueCounter++;
                        // User: I have to procure a weapon. The kingdom is in danger!
                        ud[udCounter].classList.add("reveal");
                        ud[udCounter].addEventListener('click', () => {
                            fadeOut(ud[udCounter]);
                            udCounter++;
                            // Stranger: Something's definitely off with your head. I heard the Blacksmith has really good hangover cures though.
                            dialogues[dialogueCounter].file.play();
                            dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                dialogueCounter++;
                                // User: Yes! A blacksmith! Show me the way!
                                ud[udCounter].classList.add("reveal");
                                ud[udCounter].addEventListener('click', () => {
                                    fadeOut(ud[udCounter]);
                                    udCounter++;
                                    // Stranger: Go north, to the town square, and then turn left.
                                    dialogues[dialogueCounter].file.play();
                                    dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                        dialogueCounter++;
                                        // show popup here
                                        console.log("Find the Blacksmith");
                                        controls.classList.add("reveal");
                                        canvas.classList.add("reveal");
                                        
                                    })
                                })
                            })
                        })
                    })
                })
            })
            
        }

        let controlButtons = document.querySelectorAll(".controls div");
        controlButtons.forEach(btn  => {
            // the first interaction happens outside this "loop"
            
            btn.addEventListener("click", () => {
                if (!gameEnded) {
                    let x = player_x / 100 - 1;
                    let y = player_y / 100 - 1;
                    // console.log(order[progress]);
                    if (progress <= 7) {
                        if (order[progress][0] == x && order[progress][1] == y) {
                            // 2,1 not here because we already covered the start story before
                            controls.classList.remove("reveal");
                            canvas.classList.remove("reveal");
                            if (x == 0 && y == 0) {
                                // The Hill
                                console.log("hill");
                                
                            } else if (x == 1 && y == 0) {
                                // The Camp
                                console.log("camp");
                                
                            } else if (x == 2 && y == 0) {
                                // The Cave
                                console.log("cave");
                                
                            } else if (x == 0 && y == 1) {
                                // The BlackSmith
                                if (!dialogues[dialogueCounter].played) {
                                    // Stranger 2: Welcome to the Blacksmith, traveller. How can I help you?
                                    dialogues[dialogueCounter].file.play();
                                    dialogues[dialogueCounter].file.addEventListener("ended", () => {
                                        dialogueCounter++;
                                        // User: Blacksmith, forge me a magical weapon to defeat the forces of darkness.
                                        ud[udCounter].classList.add("reveal");
                                        ud[udCounter].addEventListener('click', () => {
                                            fadeOut(ud[udCounter]);
                                            udCounter++;
                                            // Stranger 2: Ah, yeah... I'm actually not the Blacksmith, sorry... Are you okay, dude? You seem beaten up.
                                            dialogues[dialogueCounter].file.play();
                                            dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                dialogueCounter++;
                                                // User: User: Direct me to the Blacksmith, at once!
                                                ud[udCounter].classList.add("reveal");
                                                ud[udCounter].addEventListener('click', () => {
                                                    fadeOut(ud[udCounter]);
                                                    udCounter++;
                                                    // Stranger: Go north, to the town square, and then turn left.
                                                    dialogues[dialogueCounter].file.play();
                                                    dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                        // show popup here
                                                        console.log("Find the forest");
                                                        controls.classList.add("reveal");
                                                        canvas.classList.add("reveal");
                                                        
                                                    })
                                                })
                                            })
                                        })
                                    })
                                }
                                // console.log("bsmith");
                                
                            } else if (x == 1 && y == 1) {
                                // The Town Square
                                console.log("ts");
                                
                            } else if (x == 2 && y == 1) {
                                // The Forest
                                console.log("forest");
                                
                            } else if (x == 0 && y == 2) {
                                // The Tavern
                                console.log("tavern");
                                
                            } else if (x == 2 && y == 2) {
                                // The Market
                                console.log("market");
                                
                            }
                        } else {
                            console.log("not here");
                            playBgSound();
                        }
                    } else {
                        console.log("story over");
                    }
                }
            })
        })
    })    

    control();

});
