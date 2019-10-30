var mth = ["ربيع الثاني", "جمادى الأول", "جمادى الآخر", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة", "محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأول"];
var dates = [];
var i = 0; var j = 0;
var even = 0
function preload(){
  //Reading text, applies the assignment after function end
  //Data from https://www.islamicfinder.org/prayer-times/print-yearly-prayers/?timeInterval=year&calendarType=Gregorian&year=2019
  loadStrings("dates.txt", function(text){dates = text});
}

function setup() {
  //Setting up
  createCanvas(800, 800);
  
  
  //Defining the cirlce object
  Circle = {
  xPos : width/2,
  yPos : height/2,
  diameter : width*0.8,
  radius : width*0.4
  }

  
  
  //Speed slider
  speed = createSlider(0, 50, 0, 0.001);
  colorIntensity = createSlider(0, 200, 0, 0.1)
}

function draw() {
  //Background
  background(
    seasons('red'),
    seasons('green'),
    seasons('blue'));
  
  //Drawing the circle
  stroke('black');strokeWeight(10);
  fill('black')
  circle(Circle.xPos, Circle.yPos, Circle.diameter);
  
  //Drawing the hands of the clock
  drawHands();
  
  //How fast the drawing moves
  if(i>363){i=0; console.log("RESET")}
  else if (even>=speed.value()){i++; even = 0}
  else {even+=1}
  
  //Creating texts
  createTexts();
}

function toCart(theta, xy){
  /*Takes in a theta and outputs the x component or the y component of the line assuming the magnitude is the circle's radius and theta starts from the vertical*/
  if (xy=="x"){
    return Circle.radius*sin(theta)+Circle.xPos}
  else{
    return -Circle.radius*cos(theta)+Circle.yPos}
}

function lineMaker(theta){
  /* Takes a theta and draws a line from the origin, like the hands of a clock*/
  
  line(Circle.xPos, Circle.yPos,             
    toCart(theta, "x"),
    toCart(theta, "y"));
}

function timeToAngle(time){
  let hour, minute
  if(time.indexOf(":")==1){
  hour=parseInt(time.substr(0,1), 10)
  minute=parseInt(time.substr(2,3), 10)
  }
  else{
  hour=parseInt(time.substr(0,2), 10)
  minute=parseInt(time.substr(3,4), 10)
  

  }
  
  return norm(hour*30+minute*0.5, 0, 360)*TAU
}

function seasons(clr){
  crntDay = dates[i].split(",")[0] 
  intensity = colorIntensity.value()
  if (clr=='red'){ 
  return redValue(crntDay) + intensity;
  }
  else if (clr=='green'){
  return greenValue(crntDay) + intensity;
  }
  else if (clr=='blue'){
  return  blueValue(crntDay) + intensity;
  }
  
}

function createTexts(){
//Creating the clock numbers
  textFont("sans-serif", 30);textAlign(CENTER, CENTER);
  fill('white')
  noStroke()
  text("3", width/2+Circle.radius + 20, height/2 + 0)
  text("9", width/2-Circle.radius - 20, height/2 + 0)
  text("6", width/2 + 0, height/2 + Circle.radius + 25)
  text("12", width/2 + 0, height/2 - Circle.radius - 20)
  fill('yellow'); text('فجر', width -20, 20)
  fill('orange'); text('ظهر', width -28, 50)
  fill('red'); text('عصر', width -30, 80)
  fill('cyan'); text('مغرب', width -40, 110)
  fill('blue'); text('عشاء', width -30, 140)
  
  //Writing the month of the year
  
  //Note on bad code: we can optimize this since the day count is moving linearly by not checking weather the day is at the first month, the checking for the second and so on. if the day count is on the eighth month then we need not check for the first seven on the next check since it cant go from month eight to month one, or three (and we can further optimize this on later months for example month 10, 11 or 12 if we're on month 8). But alas that optimization takes time and is not very useful in a short project like his one.
//Calendar for 1440 - 1441: https://datehijri.com/gregoriancalendar.html
  
  
  textAlign(LEFT, TOP)
  if (dates[i].split(",")[0]<7){j=0;} //Check if in first month
  else if (dates[i].split(",")[0]<37){j=1;} //second
  else if (dates[i].split(",")[0]<67){j=2;} //third
  else if (dates[i].split(",")[0]<96){j=3;} //...
  else if (dates[i].split(",")[0]<126){j=4;}
  else if (dates[i].split(",")[0]<155){j=5;}
  else if (dates[i].split(",")[0]<185){j=6;}
  else if (dates[i].split(",")[0]<214){j=7;}
  else if (dates[i].split(",")[0]<242){j=8;}
  else if (dates[i].split(",")[0]<273){j=9;}
  else if (dates[i].split(",")[0]<302){j=10;}
  else if (dates[i].split(",")[0]<332){j=11;}//...
  else if (dates[i].split(",")[0]<361){j=12;} //twelveth
  else {j=0;}// first again
  noStroke();
  fill(textValue(dates[i].split(",")[0]));
  text(mth[j], 10, 10)
  text(dates[i].split(",")[0], 10, 50)
  
}

function drawHands(){
stroke('yellow');strokeWeight(width/100);
  lineMaker(timeToAngle(dates[i].split(",")[1]));stroke('orange');
  lineMaker(timeToAngle(dates[i].split(",")[3]));stroke('red');
  lineMaker(timeToAngle(dates[i].split(",")[4]));stroke('cyan');
  lineMaker(timeToAngle(dates[i].split(",")[5]));stroke('blue');
  lineMaker(timeToAngle(dates[i].split(",")[6]));
}

function redValue(crntDay){
  return -pow((crntDay-210), 2)/(150)+100
}
function greenValue(crntDay){
  return -pow((crntDay-210), 2)/(800)+30;
}
function blueValue(crntDay){
  if (crntDay < 200){
  return -pow(crntDay, 2)/(80)+100
  }
  else{
  return -pow(crntDay-365, 2)/(80)+100
  }
}
function textValue(crntDay){
  return -sin((crntDay)/(90)+100)*300+300
}
