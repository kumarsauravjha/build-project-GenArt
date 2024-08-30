let pallete = ["#D8EC12","#EC9696","#FD3F04","#29B4F3","#32C338","#D8AD2E"]
let spaceSlider;
function setup() {
  createCanvas(500, 500);
  // noLoop();
  spaceSlider = createSlider(20,150,10)

}

function draw() {
  background("#F9F9F9");
  frameRate(3);
  
  //this creates a grid
  // space = 50
  let rez = 20;
  let t = 10;
  for(x=0;x<=width; x += spaceSlider.value()){
    for(y=0;y<=height; y += spaceSlider.value()){
        c = random(0,4);
        n = noise(x * rez, y * rez, t);
        stroke(pallete[floor(c)])
        if(n<0.5){
          // strokeWeight(n*10)
          line(x,y,x+spaceSlider.value(),y+spaceSlider.value())
        }
      else {
        // strokeWeight(n*15)
        line(x,y+spaceSlider.value(),x+spaceSlider.value(),y)
      }
      // else if(n<3){
      //   line(x,y,x,y+space)
      // }
      // else if(n<4){
      //   line(x,y,x+space,y)
      // }
      
      
      strokeWeight(5)
      //     // line(x,y,x+space,y);
      //     // line(x,y,x,y+space);
      // square(x+13,y+13,5);
      
      
      
      
      //   let distance = dist(mouseX, mouseY, i, j)
      //   let size1 = (distance/40)*10;
      //   // let color = random(pallete)
      //   let color = pallete[(i+j)%4];
      //   fill(color)
      //  square(i ,j,size1) 
      // // circle(10,j,15)
    }
    
  }
}