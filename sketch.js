var shapeX = [];
var shapeY = [];
var shapes = 0;
var painting = 0;
var timer;


var img = [];

var stripe = [];
var stripeVert = [];

var oldX;
var oldY;

var solid = false;
var cross = true;


const paintings = 11;
const numHorz = 10;
const numVert = 5;

function preload(){
  for(i=0;i<paintings;i++){
  img[i] = loadImage("assets/image"+i+".jpg");
  }
}

function setup(){
	noCursor();
	frameRate(30);
	canvas = createCanvas(windowWidth, windowHeight);
	resetShape();
	
	for(q=0;q<numHorz;q++){
	stripe[q] = new Stripe(random(0,255),random(0,200),random(0,255));
	}
	
	for(q=0;q<numVert;q++){
	stripeVert[q] = new StripeVert(random(0,255),random(0,200),random(0,255));
	}
	
	timer = new Timer(2000);
}

function draw(){
///////draw pattern
	for(q=0;q<numHorz;q++){
	stripe[q].display();
	}
	
	for(q=0;q<numVert;q++){
	stripeVert[q].display();
	}

///////draw mask
	if(solid==false){
		noFill();
		background(255);
	}else{fill(0);}
	for(i=0;i<(shapeX.length);i++){
		beginShape();
		for(e=0;e<shapeX[i].length;e++){
		push();
		vertex(shapeX[i][e],shapeY[i][e]);
		pop();
		}
		endShape();
	}
	if(cross==true){
	push();
	stroke(255,0,0);
	strokeWeight(1);
	line(oldX,oldY,mouseX,mouseY);
	line(mouseX,mouseY+20,mouseX,mouseY-20);
	line(mouseX-20,mouseY,mouseX+20,mouseY);
	pop();
	}
	
	timer.add();
}

function mousePressed(){
	if(shapeX.length>0){
	shapeX[shapeX.length-1].push(mouseX);
	shapeY[shapeY.length-1].push(mouseY);
	oldX = mouseX;
	oldY = mouseY;
	}
	
}

function keyPressed(){
		if(keyCode==LEFT_ARROW){
			print("left arrow");
			shapeX[shapes].pop();
			shapeY[shapes].pop();
			
			oldX = shapeX[shapes][shapeX[shapes].length-1];
			
			
			print(shapeX[shapes][shapeX[shapes].length-1]);
			oldY = shapeY[shapes][shapeY[shapes].length-1];
		}else if(keyCode==RIGHT_ARROW){
			print("right arrow");
			if(cross==true){
			print("cross = false");
				cross = false;
			}else{cross = true;
				  print("cross = true");
			}
		}else if(keyCode==UP_ARROW){
			print("up arrow");
			shapeX.push([]);
			shapeY.push([]);
			shapes++;
			oldX = undefined;
			oldY = undefined;
		}else if(keyCode==SHIFT){
			print("shift");
			if(solid==false){
				solid = true;
			}else{solid = false;}

		}else if(keyCode==DOWN_ARROW){
			print("down arrow");
			shapeX.pop();
			shapeY.pop();
			shapes--;
			oldX = undefined;
			oldY = undefined;
		}else if(keyCode==ENTER){
			print("enter");
			resetShape();
		}
}

function Stripe(r,g,b){
	this.samplex = random(1,img[painting].width-1);
	this.sampley = random(1,img[painting].height-1);
	
	this.x;
	this.y = random(-10,height-10);
	this.col = img[painting].get(this.samplex, this.sampley);
	this.trans = random(25,240);
	this.speed = random(0.3,1.2);

	this.display = function(){
	
		push();
		this.y+= this.speed;
		if(this.y>=height || this.y<=0){
			this.bounce();
		}
		strokeWeight(1);
		stroke(this.col);
		line(0,this.y,width,this.y);
		pop();
	}
	
	this.bounce = function(){
		if(this.speed>=1){
			if(this.y>=height){
				this.speed = -0.5
			}else if(this.y<=0){
				this.speed*=-0.5;
			}
		}else{
			this.speed*=random(-1.05,-1.8);
		}
		
		if(this.y>height){
			this.y = height;
		}else if(this.y<0){
			this.y = 0;
		}
		
		this.samplex = random(1,img[painting].width-1);
		this.sampley = random(1,img[painting].height-1);
		this.col = img[painting].get(this.samplex, this.sampley);
	}
}

function StripeVert(r,g,b){

	this.samplex = random(1,img[painting].width-1);
	this.sampley = random(1,img[painting].height-1);
	
	this.x = random(-10,width-10);;
	this.col = img[painting].get(this.samplex, this.sampley);
	this.trans = random(25,240);
	this.speed = random(0.2,1.1);

	this.display = function(){
		push();
		this.x += this.speed;
		if(this.x>=width || this.x<=0){
			this.bounce();
		}
		strokeWeight(1);
		stroke(this.col);
		line(this.x,0,this.x,height);
		pop();
	}
	
	this.bounce = function(){
		if(this.speed>=1){
			if(this.x>=width){
				this.speed = -0.5
			}else if(this.x<=0){
				this.speed*=-0.5;
			}
		}else{
			this.speed*=random(-1.05,-1.8);
		}

		if(this.x>width){
			this.x = width;
		}else if(this.x<0){
			this.x = 0;
		}
		this.samplex = random(1,img[painting].width-1);
		this.sampley = random(1,img[painting].height-1);
		this.col = img[painting].get(this.samplex, this.sampley);
	}
}

function Timer(L){
	this.limit = L;
	this.count = 0;
	
	this.add = function(){
		this.count++;
		if(this.count%100==0){
		print(this.count);
		}
		
		if(this.count>=this.limit){
			this.restart();
		}
	}
	
	this.restart = function(){
		this.count = 0;
		painting = floor(random(0,paintings));
		if(painting>=paintings){
			painting = 0;
		}
		print("timer reset - painting #"+painting+" currently being sampled");
	}
}

function resetShape(){
	shapeX = [[0,width,width,0]];
	shapeY = [[0,0,height,height]];
	oldX = 0;
	oldY = height;
}







