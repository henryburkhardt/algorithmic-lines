class Drawing{
    constructor(_x, _y, _minScale, _maxScale, _gridSizeX, _gridSizeY, _name, _showText, _darkMode){
        this.position = createVector(_x, _y);
        this.maxScale = _maxScale;
        this.minScale = _minScale;
        this.gridSize = createVector(_gridSizeX, _gridSizeY);
        this.name = str("("+ _name + ")");
        this.showText = _showText;
        this.darkMode = _darkMode;
        this.seedArr = [];

        if(this.darkMode){
            this.fg = 255; 
            this.bg = 0;
        }else{
            this.fg = 0; 
            this.bg = 255;
        }
    }

    
    show(){
        translate(this.position.x, this.position.y);
        var dots = [];
        for (let x = 1; x < this.gridSize.x; x++) {
            for (let y = 1; y < this.gridSize.y; y++) {
                let randomScale = random(this.minScale,this.maxScale);
                let x_pos = x*(randomScale);
                let y_pos = y*(randomScale);
                let dot = new Dot();
                dot.position.x = x_pos;
                dot.position.y = y_pos;
                dots.push(dot);
                dot.show();
            } 
        }

        stroke(this.fg);
        strokeWeight(1);
    
        for(let dot of dots){
            let index = Math.floor(Math.random()*dots.length)
            let to = dots[index]
            if (to != dot){
                line(dot.position.x, dot.position.y, to.position.x, to.position.y);
            }

            dot.connection = index;
            this.seedArr.push((dot.connection >>> 0).toString(2));
        }

        if(this.showText){
            fill(this.fg);
            textSize(11);
            strokeWeight(0);
            textAlign(CENTER);
            textStyle(ITALIC);
            textFont('Georgia');
            text(this.name, (this.maxScale*this.gridSize.x)/2, this.maxScale*this.gridSize.y);
        }
        translate(-this.position.x, -this.position.y);

    }
}