// TODO add support for game over and restart game
// TODO terminal add wait to prevent input


import Terminal from "./terminal/terminal-min.js"

let myp5 = new p5((sketch) => {

    let term;
    let i = 0;
    let hm;
  

    sketch.setup = () => {

        sketch.createCanvas(800, 600);
        sketch.background(111)
    
        term = new Terminal(sketch, 0, 300, 800, 300, 0, 20)
        term.addText(title)
        term.addText(intro1)
        term.addText(intro2)
        term.addText(intro3)

        hm = new Hamurabi();
};

sketch.draw = () => {

    term.show(sketch);
 
    hm.nextYear(term);

};

sketch.keyPressed = () => {

    term.processKeyPressed(sketch, sketch.key, sketch.keyCode)
  
  };

});