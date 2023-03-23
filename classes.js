//To keep track of the different images info
class Sprite {
  //Whenever new instance of sprite, constructor called.
  /**We pass an object (in {}) to the constructor because if we
    just pass posiiton and velocity, then we have to remember the 
    position they are in when we are passing arguments
  **/
  //frames property is for the player image sprite (has 4 frames)
  //We set frames to 1 on default and that can be overriden.
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position
    /**We added image as a property because image variable wont be accesible 
     * from Headers, so we need to pass when we create a Sprite
     **/
    this.image = image
    this.frames = frames
    //this is so that we can crop our player image when it is loaded in 
    //(since the original is an image with 4 players).
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max
      this.height = this.image.height
    }

  }

  //Code to drawImage()
  draw() {
    c.drawImage(
      this.image,
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
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      //Now declaring the actual width and height that our image should be rendered out as
      this.image.width / this.frames.max,
      this.image.height,
    );
  }
}


//create an object for the collisions
class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    //Collisions were 12x12 px in Tiled but we zoomed in 400% so x4
    this.width = 48;
    this.height = 48;
  }

  //drawing the collisions on the map
  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0)';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

}