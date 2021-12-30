var dark = false;
var bg;
var fg;
var target = 0;
var seedVis = false;

function dowload(){
    if(target != 0){
        saveCanvas(canvas, "alogithmic_lines.jpg");
    }
}

function showSeed(){
    seedVis = !seedVis;
    if(target == 4){
        setTarget(target);   
    } 
}

function seedToDrawing(seed){
    for (let i = 0; i < seed.length; i++) {
        seed[i] = parseInt(seed[i],2);
    }
    return(seed)
}

function setDark(){
    dark = !dark;
    if(dark){bg = 0;}else{bg = 255;}
    fg = 255 - bg;
    setTarget(target);

    if(dark){
        $("#welcome").css("color", "white");
        $("body").css("background-color","black");
        $("#darkModeButton").val("💡");

        let buttons = document.getElementsByClassName('menuButton');
        for(let b of buttons){
            b.classList.add("menuButtonDark");
            b.classList.remove("menuButtonLight");
         }
    }else{
        $("#welcome").css("color", "black");
        $("body").css("background-color","white");
        $("#darkModeButton").val("🌑");
        
        let buttons = document.getElementsByClassName('menuButton');
        for(let b of buttons){
            b.classList.remove("menuButtonDark");
            b.classList.add("menuButtonLight");
         }
    }
}

function setTarget(val){

    function reset(){
        clear();
        $("#canvas").show();
        $("#welcome").hide(0);
    }
    
    target = val;

    if(target==0){
        $("#canvas").hide(0);
        $("#welcome").hide(0).fadeIn(500);
    }
    else if(target==1){
        reset();
        background(bg);
        bigGrid();
    }else if(target == 2){
        reset();
        background(bg);
        qaud();
    }else if(target == 3){
        reset();
        background(bg);
        singleDrawing();
    }else if(target == 4){
        reset();
        background(bg);
        oneIcon();
    }
}

function bigGrid(){
    pixelDensity(3.0);
    let drawings = []
    let maxDist = 50;
    strokeWeight(5)
    let x_size = Math.floor(windowWidth/50);
    let y_size = Math.floor(windowHeight/50);
    let count = 1;
    for (let x = 0; x < x_size; x++) {
        for (let y = 0; y < y_size; y++) {
            let d = new Drawing(x*maxDist,y*maxDist, 10, 10, 4, 4, count, false, dark);
            drawings.push(d);
            d.show();  
            count++;
        }   
    } 
}

function qaud(){
    pixelDensity(1.5);
    let drawings = [];
    let maxDist = 135;
    let x_count = Math.floor(windowWidth/(14*10));
    let y_count = Math.floor(windowHeight/(14*10));
    
    if(x_count>4){x_count = 4;}
    if(y_count>4){y_count = 4;}

    let x_cent = (x_count*(14*10))/2;
    let y_cent = (y_count*(14*10))/2;
    translate(windowWidth/2-x_cent,windowHeight/2-y_cent);

    let count = 1;
    for (let y = 0; y < y_count; y++) {
        for (let x = 0; x < x_count; x++) {
            let d = new Drawing(x*maxDist,y*maxDist, 13, 14, 10, 10, count, true, dark);
            drawings.push(d);
            d.show();  
            count++;
        }   
    } 
    translate(-(windowWidth/2-x_cent),-(windowHeight/2-y_cent));
}

function singleDrawing(){
    let x_pos = windowWidth/2;
    let y_pos = windowHeight/2
    strokeWeight(10);
    translate(x_pos-((20*30)/2),y_pos-((20*30)/2));
    let d = new Drawing(0, 0, 20, 30, 20,20, 1, true, dark);
    d.show();
    translate(-(x_pos-((20*30)/2)),-(y_pos-((20*30)/2)));
}

function oneIcon(){
    let size = (windowWidth/4)*0.75
    translate(-size,-size);
    translate((windowWidth/2)-(size),(windowHeight/2)-(size));
    let d = new Drawing(0,0,size,size,4,4,1,false,dark);
    d.show();
    translate(-((windowWidth/2)-(size)),-((windowHeight/2)-(size)));
    translate(size, size);
    if(seedVis){
        strokeWeight(0);
        fill(fg);
        textAlign(CENTER);
        textSize(15);
        textStyle(NORMAL);
        textFont('Roboto');
        text(d.seedArr.toString(), width/2,100);
    }
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    canvas.parent("canvas");   
    setDark();
}

function mouseWheel(){
    if(target == 1 | target == 4){
        setTarget(target);
    }
}

function mouseClicked(){
    setTarget(target);
}

function keyPressed() {
    if (keyCode === ENTER && target != 0) {
        setTarget(target);
    }
}