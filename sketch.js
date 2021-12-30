var dark = false;
var bg;
var target = 0;

$(document).ready(function(){
    $("#canvas").hide(0);
    $("#welcome").hide(0).fadeIn(1000);
});

function dowload(){
    if(target != 0){
        saveCanvas(canvas, "alogithmic_lines.jpg");
    }
}

function setDark(){
    dark = !dark;
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

    if(dark){var bg = 0;}else{var bg = 255;}
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
    translate(windowWidth/2-x_cent,50);

    let count = 1;
    for (let y = 0; y < y_count; y++) {
        for (let x = 0; x < x_count; x++) {
            let d = new Drawing(x*maxDist,y*maxDist, 13, 14, 10, 10, count, true, dark);
            drawings.push(d);
            d.show();  
            count++;
        }   
    } 
    translate(-(windowWidth/2-x_cent),-50);
}

function singleDrawing(){
    let x_pos = (windowWidth/2);
    strokeWeight(10);
    translate(x_pos-((20*30)/2),50);
    let d = new Drawing(0, 0, 20, 30, 20,20, 1, true, dark);
    d.show();
    translate(-(x_pos-((20*30)/2)),-50);
}

function oneIcon(){
    let size = (windowWidth/4)*0.75
    translate(-size,-size);
    translate((windowWidth/2)-(size),(windowHeight/2)-(size));
    let d = new Drawing(0,0,size,size,4,4,1,false,dark);
    d.show();
    translate(-((windowWidth/2)-(size)),-((windowHeight/2)-(size)));
    translate(size, size);
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    canvas.parent("canvas");   
}

function mouseWheel(){
    if(target==1){
        if(dark){var bg = 0;}else{var bg = 255;}
        background(bg);
        bigGrid();
    } else if(target==4){
        if(dark){var bg = 0;}else{var bg = 255;}
        background(bg);
        oneIcon();
    }
}