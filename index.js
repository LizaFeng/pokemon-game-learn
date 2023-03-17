//Selecting the object from html and putting it in our js file.
const canvas = document.querySelector("canvas");

//Referencing the canvas api so that we can use everything that the api has to offer.
//the parameter would be 2D since we are trying to do a 2D game
const c = canvas.getContext('2d');

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

//To keep track of the different images info
class Sprite {
  //Whenever new instance of sprite, constructor called.
  /**We pass an object (in {}) to the constructor because if we
    just pass posiiton and velocity, then we have to remember the 
    position they are in when we are passing arguments
  **/
  constructor({ position, velocity, image }) {
    this.position = position
    /**We added image as a property because image variable wont be accesible 
     * from Headers, so we need to pass when we create a Sprite
     **/
    this.image = image
  }

  //Code to drawImage()
  draw() {
    //1st param: image itsel. 2nd param: x position. 3rd param: y position.
    c.drawImage(this.image, -925, -400)
  }
}

const background = new Sprite({
  //we are going to pass an obj for position because it includes x and y coords.
  position: {
    x: -925,
    y: -400
  },
  image: image
})

//Animation loop 
function animate() {
  window.requestAnimationFrame(animate)
  console.log('animate')
  background.draw()
  //We put the drawingImage() for the player in here because it ensures that the 
  //player image will be drawn after the map is drawn  (player on top of map).
  c.drawImage(playerImage,
    /**Since we are using a sprite with four images in row, we want to crop the 
      image. The 1st param after this message is the starting x coordinate.
      The 2nd param after this message is the starting y coordinate.
      The 3rd param after this message is the ending x coorindate (we divide by
      4 because there are 4 images and we want to crop equally between them).
      The 4th param after this messsage is the ending y coord (we want full 
      height of image).
    **/
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    //Getting the player to be in front of the door
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2,
    //Now declaring the actual width and height that our image should be rendered out as
    playerImage.width / 4,
    playerImage.height,
  );
}

animate()

//Listening for the keydown events to move player image and add animation
window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w':
      console.log('pressed w key');
      break;
    case 'a':
      console.log('pressed a key');
      break;
    case 's':
      console.log('pressed s key');
      break;
    case 'd':
      console.log('pressed d key');
      break;

  }
})
