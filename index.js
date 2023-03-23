//Selecting the object from html and putting it in our js file.
const canvas = document.querySelector("canvas");

//Referencing the canvas api so that we can use everything that the api has to offer.
//the parameter would be 2D since we are trying to do a 2D game
const c = canvas.getContext('2d');

//Variable to store the 2d version of the collisions array
const collisionsMap = [];

//Populating the 2d collisions array (we chose 70 because thats
//the width of the game canvas)
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i));
}

const boundaries = []

//Since the map was positioned with a certain offset, we have to apply to boundaries as well.
const offset = {
  x: -735,
  y: -650
}

//Populating our boundaries array (anything in our collisionsMap with 1025)
collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    //checking to see if what we are pushing to boundaries array is 1025 (aka collisions)
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
    }
  })
})

//Making sure that we have collisions array
console.log(collisionsMap);

//Setting the size of our canvas. We can do this in css as well
canvas.width = 1024;
canvas.height = 576;

//Changing the color of the canvas.
c.fillStyle = 'white';

//Drawing a rectangle our of the canvas context
//The first param is the x position. The second param is the y position.
//The third param is the width. The fourth param is the height.
c.fillRect(0, 0, canvas.width, canvas.height);

//Rendering the map and player
const image = new Image();
image.src = "./img/learnMap.png";
const playerImage = new Image();
playerImage.src = "./img/playerDown.png";
const foregroundImage = new Image();
foregroundImage.src = "./img/foregroundObjects.png"

const player = new Sprite({
  position: {
    //Getting the player to be in front of the door
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 //- 68 / 2
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

const background = new Sprite({
  //we are going to pass an obj for position because it includes x and y coords.
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  //we are going to pass an obj for position because it includes x and y coords.
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})

//Keeping track of which keys were pressed with a keys object
const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

//These are things that move when we control the character 
//(remember that the character doesnt move, the map moves to give illusion that the character is moving)
//The ... just means unpacking the boundaries array
const movables = [background, ...boundaries, foreground]

//Test if 2 things are colliding with one another.
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    //Detecting if the player is touching the collision object(left, right, bottom, top of boundary)
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )

}

//Animation loop 
function animate() {
  window.requestAnimationFrame(animate)
  console.log('animate')
  background.draw()
  //Drawing the boundaries
  boundaries.forEach(boundary => {
    boundary.draw();
  })
  //player should always be on top of boundaries so draw it after boudaries
  player.draw();
  foreground.draw();

  let moving = true;
  //Repositioning the background image whenever the keys are pressed
  if (keys.w.pressed && lastKey == 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          //The ... here creates a clone of boundary
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              //predicting in the future if we are about to collide with something
              y: boundary.position.y + 3
            }
          }
        })
      ) {
        console.log('colliding');
        //if we are about to collide into something, set moving to false
        moving = false;
        //As soon as a collision is detected, break
        break;
      }
    }
    if (moving) {
      //since w is the down key, we will only change the y coord
      movables.forEach((movable) => {
        movable.position.y += 3;
      })
    }

  }
  else if (keys.a.pressed && lastKey == 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          //The ... here creates a clone of boundary
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              //predicting in the future if we are about to collide with something
              y: boundary.position.y
            }
          }
        })
      ) {
        console.log('colliding');
        //if we are about to collide into something, set moving to false
        moving = false;
        //As soon as a collision is detected, break
        break;
      }
    }
    if (moving) {
      //since w is the down key, we will only change the y coord
      movables.forEach((movable) => {
        movable.position.x += 3;
      })
    }
  }
  else if (keys.s.pressed && lastKey == 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          //The ... here creates a clone of boundary
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              //predicting in the future if we are about to collide with something
              y: boundary.position.y - 3
            }
          }
        })
      ) {
        console.log(boundaries);
        //if we are about to collide into something, set moving to false
        moving = false;
        //As soon as a collision is detected, break
        break;
      }
    }
    if (moving) {
      //since w is the down key, we will only change the y coord
      movables.forEach((movable) => {
        movable.position.y -= 3;
      })
    }

  }
  else if (keys.d.pressed && lastKey == 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          //The ... here creates a clone of boundary
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              //predicting in the future if we are about to collide with something
              y: boundary.position.y
            }
          }
        })
      ) {
        console.log('colliding');
        //if we are about to collide into something, set moving to false
        moving = false;
        //As soon as a collision is detected, break
        break;
      }
    }
    if (moving) {
      //since w is the down key, we will only change the y coord
      movables.forEach((movable) => {
        movable.position.x -= 3;
      })
    }
  }

}

animate();

//If the player pressed down on 2 keys, then character will go in direction of last key
let lastKey = '';

//Listening for the keydown events
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w'
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a'
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's'
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd'
      break;

  }
  console.log(keys);
})

//Listening for the keyup events
window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;

  }
  console.log(keys);
})