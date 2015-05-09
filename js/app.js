

// set Up the variables that I will need later


var BOARDHEIGHT = 400;
var BOARDWIDTH = 400;
var XPLAYERSTART = 200;
var YPLAYERSTART = 400;


var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    //Where the enemy starts.  Assign a random x and y value.   - kp
    
    this.x = Math.random() * 505;
    this.y = 63 + (Math.round(Math.random() * 3) * 83);
    this.velocity = (Math.random() * 50);  
  
     
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // this.

  // Move the enemy - kp
  this.x = this.x + (this.velocity*dt);
     
  //If enemy is off screen, rest to beginning and randomly start 
  //on a row of stone blocks. - need to redo
  if( this.x >= 505) {
        this.y = 63 + (Math.round(Math.random() * 3) * 83);
        this.x = -101;        
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var player = function(){

    this.sprite = 'images/char-boy.png';
    
//Where the Player starts - kp
    this.x = XPLAYERSTART;
    this.y = YPLAYERSTART;
    this.keypress='';
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.update = function() {

   checkForWin(player); 
   checkCollisions(player);
};

function checkForWin(player)
{
  if (player.y < 0)
    {
        player.x = XPLAYERSTART;
        player.y = YPLAYERSTART;
    }
}

function checkCollisions(player){
  
    for(var i=0; i < allEnemies.length; i++) 
        {
            if (player.x < allEnemies[i].x + 50 && player.x + 50 > allEnemies[i].x && player.y < allEnemies[i].y + 30 && player.y + 30 > allEnemies[i].y) {
                player.x = XPLAYERSTART;
                player.y = YPLAYERSTART;
            }    
        }
}

player.prototype.handleInput = function(keypress) {
     
      if (keypress == 'up' && this.y > 0) {
      this.y = this.y-85;
      }
      if (keypress == 'down' && this.y < BOARDHEIGHT) {
      this.y = this.y+85;
      }
      if (keypress == 'left' && this.x > 0) {
      this.x = this.x-100;
      }
      if (keypress == 'right' && this.x < BOARDWIDTH) {
      this.x = this.x+100;
      }
      
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

for (var index=0; index < 4; index++){
        var enemyObj = new Enemy();
        allEnemies.push(enemyObj);
       
}

var player = new player();    


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


