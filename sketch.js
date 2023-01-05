/*

The Game Project 4

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var collectable;
var canyon;
var trees_x;
var treePos_y;
var clouds;
var mountains;
var cameraPosX;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    
    collectable = {x_pos: 100, y_pos: floorPos_y, size: 50, isFound: false};
    
    canyon = {x_pos: 400, width: 410};
    
    trees_x = [-200, 200, 600, 750, 1000, 1400 ];
    treePos_y = floorPos_y;
    clouds = [{x_pos: 100, y_pos: 70}, {x_pos: 400, y_pos: 100}, {x_pos: 800, y_pos: 50}];
    
    mountains = [{x_pos: -300, y_pos: 200}, {x_pos: 100, y_pos: 200}, {x_pos: 700, y_pos: 200}];
    
    cameraPosX = 0;
    
    
    
}

function draw()
{
	///////////DRAWING CODE//////////

    //Backgroung movement
    cameraPosX += (gameChar_x - cameraPosX) * 0.5; 
    
	background(100,155,255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    push();
    translate(-cameraPosX + 400, 0);
    
    //clouds
    for (let i = 0; i < clouds.length; i++) {
        noStroke();
        fill(255,255,255);
        ellipse(clouds[i].x_pos, clouds[i].y_pos + 30, 60, 60);
        ellipse(clouds[i].x_pos - 40, clouds[i].y_pos + 30, 60, 40);
        ellipse(clouds[i].x_pos + 40, clouds[i].y_pos + 30, 60, 40);

    }
    
    //mountains
    for(var i=0; i < mountains.length; i++){
        noStroke();
        fill(113, 121,126);
        triangle(mountains[i].x_pos + 280, mountains[i].y_pos -20, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 480, mountains[i].y_pos + 232);
        fill(255,255,255);
        triangle(mountains[i].x_pos + 280, mountains[i].y_pos +20, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 350, mountains[i].y_pos + 232);
        fill(113, 121,126);
        triangle(mountains[i].x_pos + 200, mountains[i].y_pos +20, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 350, mountains[i].y_pos + 232);
        triangle(mountains[i].x_pos + 400, mountains[i].y_pos +30, mountains[i].x_pos + 100, mountains[i].y_pos + 232, mountains[i].x_pos + 500, mountains[i].y_pos + 232);
    }
    
    //trees
    for(var i=0; i < trees_x.length; i++){
        noStroke();
        fill(111, 78, 55);
        rect(trees_x[i], treePos_y - 142, 30, 145);
        fill(34, 139, 34);
        triangle(trees_x[i] + 15,treePos_y - 262, trees_x[i] - 40, treePos_y - 138, trees_x[i] + 70, treePos_y - 138)
        triangle(trees_x[i] + 15, treePos_y - 200, trees_x[i] - 40, treePos_y - 112, trees_x[i] + 70, treePos_y -112);
        
    }

    if(dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 25){
        collectable.isFound = true;
    }
    
    if(collectable.isFound == false){
        strokeWeight(15);
        stroke(255,215,0);
        point(collectable.x_pos + 20,collectable.y_pos);
        point(collectable.x_pos + 30,collectable.y_pos);
        point(collectable.x_pos + 40,collectable.y_pos);
        //point(collectable.x_pos + 50,collectable.y_pos);
        
    }

	//draw the canyon
    strokeWeight(50);
    stroke(176,224,230)
    line(canyon.x_pos + 8,455,canyon.width,576);
    strokeWeight(14);
    stroke(111, 78, 55);
    line(canyon.x_pos - 22,438,canyon.width - 30,576);
    line(canyon.x_pos + 38,435,canyon.width + 30,576);
    
    if(gameChar_x > canyon.x_pos - 30 && gameChar_x < canyon.width + 30 && gameChar_y >= floorPos_y){
        isPlummeting = true;
       
       }
    
    if(isPlummeting == true){
        gameChar_y += 5;
    }

    noStroke();
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        strokeWeight(1);
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x - 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 15);
        //hand
        stroke(15);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 60);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 25, gameChar_y - 60);
        //leg
         line(gameChar_x - 8, gameChar_y - 35, gameChar_x - 30, gameChar_y - 16 );
        line(gameChar_x + 7, gameChar_y - 35, gameChar_x + 30, gameChar_y -  10);
        
	}
	else if(isRight && isFalling)
	{
//        noStroke();
          strokeWeight(1);
		// add your jumping-right code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x + 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 15);
        //hand
        stroke(15);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 60);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 25, gameChar_y - 60);
        //leg
         line(gameChar_x - 8, gameChar_y - 35, gameChar_x - 30, gameChar_y - 16 );
        line(gameChar_x + 7, gameChar_y - 35, gameChar_x + 30, gameChar_y -  10);

        
	}
	else if(isLeft)
	{
        strokeWeight(1);
		// add your walking left code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x - 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 25);
        //hand
        stroke(15);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 20);
        line(gameChar_x + 8, gameChar_y -45, gameChar_x + 25, gameChar_y - 15);
        //leg
        line(gameChar_x - 8, gameChar_y - 25, gameChar_x - 20, gameChar_y + 4);
        line(gameChar_x + 7, gameChar_y - 25, gameChar_x + 8, gameChar_y + 5);
        
	}
	else if(isRight)
	{
        strokeWeight(1);
		// add your walking right code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,20,30);
        //face
        fill(0);
        ellipse(gameChar_x + 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 10, gameChar_y - 55, 9,5);
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 8, gameChar_y - 47, 15, 25);
        //hand
        stroke(15);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 20);
        line(gameChar_x + 8, gameChar_y -45, gameChar_x + 25, gameChar_y - 15);
        //leg
        line(gameChar_x - 8, gameChar_y - 25, gameChar_x - 8, gameChar_y + 4);
        line(gameChar_x + 7, gameChar_y - 25, gameChar_x + 15, gameChar_y + 5);

	}
	else if(isFalling || isPlummeting)
	{
        strokeWeight(1);
		// add your jumping facing forwards code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,30,30);
        //face
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 7,gameChar_y - 65,5,5);
        ellipse(gameChar_x, gameChar_y - 55, 15,5)
        //body
        fill(0, 0, 255);
        rect(gameChar_x - 10, gameChar_y - 47, 20, 15);
        //hand
        stroke(15);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 60);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 25, gameChar_y - 60);
        //leg
        fill(0)
        rect(gameChar_x - 9, gameChar_y - 35, 5, 15);
        rect(gameChar_x + 5, gameChar_y - 35 , 5, 15);

	}
	else
	{
        strokeWeight(1);
		// add your standing front facing code
        fill(193, 154, 107);
        ellipse(gameChar_x,gameChar_y - 60,30,30);
        //eyes
        fill(0);
        ellipse(gameChar_x - 8,gameChar_y - 65,5,5);
        ellipse(gameChar_x + 7,gameChar_y - 65,5,5);
        ellipse(gameChar_x, gameChar_y - 55, 15,5)
        fill(0, 0, 255);
        rect(gameChar_x - 10, gameChar_y - 47, 20, 25)
        //hand
        stroke(15);
        line(gameChar_x - 10, gameChar_y - 45, gameChar_x - 25, gameChar_y - 30);
        line(gameChar_x + 10, gameChar_y -45, gameChar_x + 25, gameChar_y - 30);
        //leg
        fill(0)
        rect(gameChar_x - 9, gameChar_y - 25, 5, 25);
        rect(gameChar_x + 5, gameChar_y - 25 , 5, 25);
	}
    
    pop();

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isLeft == true){
        gameChar_x -= 3;
    }
    
    if(isRight == true){
        gameChar_x += 3;
    }
   
    //adding gravity
    if(gameChar_y != floorPos_y){
        gameChar_y += 2;
        isFalling =  true;
     } 
    else {
        isFalling = false;
    }
    
}


function keyPressed()
{
    //moving left
    if(keyCode == 65) {
        isLeft = true;
        console.log('a key');
    }
    
    //moving right
    if(keyCode == 68) {
        isRight = true;
        console.log('d key');
    }
    
    //jumping code
     if(keyCode == 87) {
         gameChar_y -= 100;
         //isFalling = false;
         console.log('w key');
         if(isPlummeting == true){
            gameChar_y += 100;
         }
    }
    
    
    
	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
}

function keyReleased()
{
   
	// if statements to control the animation of the character when
	// keys are released.
    if(keyCode == 65) {
        isLeft = false;
        console.log('a key');
    }
    
    if(keyCode == 68) {
        isRight = false;
        console.log('d key');
    }

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
}
