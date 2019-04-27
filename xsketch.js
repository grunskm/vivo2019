var maskX = [];
var maskY = [];
var maskW = [];
var stripe = [];
var stripeVert = [];
var x;
var y;
const num = 10;
var w = 30;

function setup(){
	frameRate(30);
	noCursor();
	canvas = createCanvas(windowWidth, windowHeight);
	for(q=0;q<num;q++){
	stripe[q] = new Stripe(random(0,255),random(0,255),random(0,255));
	stripeVert[q] = new StripeVert(random(0,255),random(0,255),random(0,255));
	}
}

function draw(){

	for(q=0;q<num;q++){
		stripe[q].display();
		stripeVert[q].display();
	}
	for(i=0;i<(maskX.length-1);i++){
		push();
		stroke(0);
		strokeWeight(maskW[i]);
		line(maskX[i],maskY[i],maskX[i+1],maskY[i+1]);
	}
	push();
	noFill();
	stroke(255);
	strokeWeight(1);
	ellipse(mouseX,mouseY,w);
	pop();
}

function mousePressed(){
		maskX.push(mouseX);
		maskY.push(mouseY);
		maskW.push(w);
}

function keyPressed(){
		if(keyCode==LEFT_ARROW && w>0){	
			w-=5;
		}else if(keyCode==RIGHT_ARROW){
			w+=5;
		}else if(keyCode==UP_ARROW){
			maskW[maskW.length-1] = w;
		}else if(keyCode==SHIFT){
	 		maskX.push(undefined);
 			maskY.push(undefined);
 			maskW.push(w);
		}else if(keyCode==DOWN_ARROW){
			maskX.pop();
			maskY.pop();
			maskW.pop();
		}
}


function Stripe(r,g,b){
	this.x;
	this.y = random(-10,height-10);
	this.col = [r,g,b];
	this.speed = random(0.1,2);

	this.display = function(){
		push();
		this.y+= this.speed;
		if(this.y>height){
			this.y = -10;
		}
		strokeWeight(1);
		stroke(this.col[0],this.col[1],this.col[2]);
		line(0,this.y,width,this.y);
		pop();
	}
}

function StripeVert(r,g,b){
	this.x = random(-10,width-10);;
	this.col = [r,g,b];
	this.speed = random(0.2,1);

	this.display = function(){
		push();
		this.x+= this.speed;
		if(this.x>width){
			this.x = -10;
		}
		strokeWeight(1);
		stroke(this.col[0],this.col[1],this.col[2]);
		line(this.x,0,this.x,height);
		pop();
	}
}