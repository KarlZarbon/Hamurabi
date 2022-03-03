/*
    Author: Karl Zarbon (March 2022)

    Hamurabi: early strategy game.

    The code is an adaptation of David Ahl original BASIC code printed in his book "BASIC Computer Games".
 
*/


const title = "HAMURABI";
const intro = "CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY\n\n\nTRY YOUR HAND AT GOVERNING ANCIENT SUMERIA\n\
FOR A TEN-YEAR TERM OF OFFICE.\n"
 
let D1=0;
let P1=0;
let Z=0;
let P=95;
let S=2800;
let H=3000;
let E=H-S;
let Y=3;
let A=H/Y;
let I=5;
let Q=1;
let D=0;

let gameOver = false;



function line900(){
    let s = "A FANTASTIC PERFORMANCE!!!  CHARLEMANGE, DISRAELI, AND\n"
    s += "JEFFERSON COMBINED COULD NOT HAVE DONE BETTER!\n"
    console.log(s);
    line990();
}

function line565(){

    let s = "DUE TO THIS EXTREME MISMANAGEMENT YOU HAVE NOT ONLY\n"
    s += "BEEN IMPEACHED AND THROWN OUT OF OFFICE BUT YOU HAVE\n"
    s += "ALSO BEEN DECLARED NATIONAL FINK!!!!\n"
    console.log(s);
    line990();
}

function line940(){
    let s = "YOUR HEAVY-HANDED PERFORMANCE SMACKS OF NERO AND IVAN IV.\n"
    s += "THE PEOPLE (REMIANING) FIND YOU AN UNPLEASANT RULER, AND,\n"
    s += "FRANKLY, HATE YOUR GUTS!!\n"
    console.log(s);
    line990();
}

function line960(){
    let s ="YOUR PERFORMANCE COULD HAVE BEEN SOMEWHAT BETTER, BUT\n"
    s += `REALLY WASN'T TOO BAD AT ALL. ${MAth.floor(P*.8*Math.random())} PEOPLE\n`
    s += "WOULD DEARLY LIKE TO SEE YOU ASSASSINATED BUT WE ALL HAVE OUR\n"
    s += "TRIVIAL PROBLEMS.\n"
    console.log(s);
    line990();

}

function line710(){
    let s = `HAMURABI:  THINK AGAIN.  YOU HAVE ONLY ${S} BUSHELS OF GRAIN.  NOW THEN,\n`;
    console.log(s);
}


function line720(){
    let s = `HAMURABI:  THINK AGAIN.  YOU OWN ONLY ${A}  ACRES.  NOW THEN,\n`;
    console.log(s);
}

function line800(){
    C=Math.floor(Math.random()*5)+1
}

function line860(){
    let s =  `IN YOUR 10-YEAR TERM OF OFFICE, ${P1} PERCENT OF THE\n`
    s+= "POPULATION STARVED PER YEAR ON THE AVERAGE, I.E. A TOTAL OF\n"
    s += `${D1} PEOPLE DIED!!\n`
    L=A/P
    s += "YOU STARTED WITH 10 ACRES PER PERSON AND ENDED WITH\n"
    s += `${L} ACRES PER PERSON.\n`
    console.log(s);
    line880();
}


function line880(){

    if(P1>33){
        line565();
    } else if (L<7) {
        line565();
    } else if (P1>10) {
        line940();
    } else if(L<9)
    {
        line940();
    } else if (P1>3){
        line960();
    } else if(L<10){
        line960();
    } else{
        line900();
    }
}


function line850(){
    let s = "HAMURABI:  I CANNOT DO WHAT YOU WISH.\nGET YOURSELF ANOTHER STEWARD!!!!!\n"
    console.log(s);
    //GOTO 990
    line990();
}

function line990(){
    // ring the bell (ascii 7) 10 times
    //990 PRINT: FOR N=1 TO 10: PRINT CHR$(7);: NEXT N
    let s = "SO LONG FOR NOW.\n";
    console.log(s);
    gameOver = true;
    return;
}


function line511(){
    line800();
    // *** A BOUNTIFUL HARVEST!
    Y=C;
    H=D*Y;
    E=0;
    line800();
    if(Math.floor(C/2)==C/2){
        // *** RATS ARE RUNNING WILD!!
        E=Math.floor(S/C)
    }
    // 530
    S=S-E+H
    line800();
    // *** LET'S HAVE SOME BABIES
    I=Math.floor(C*(20*A+S)/P/100+1)
    // *** HOW MANY PEOPLE HAD FULL TUMMIES?
    C=Math.floor(Q/20)
    // *** HORROS, A 15% CHANCE OF PLAGUE
    Q=Math.floor(10*(2*Math.random()-.3))
    if(P<C){
        D = 0;
        return;
    } 
    // *** STARVE ENOUGH FOR IMPEACHMENT?
    D=P-C
    if(D>.45*P){
        let s7 =  `\nYOU STARVED ${D} PEOPLE IN ONE YEAR!!!\n`
        console.log(s7);
        line565();
    } else{
        P1=((Z-1)*P1+D*100/P)/Z;
        P=C;
        D1=D1+D;
        return;
    } 

}

function nextYear(){
    //215
    let text = "HAMURABI:  I BEG TO REPORT TO YOU,\n";
    Z=Z+1
    text += `IN YEAR ${Z}, ${D} PEOPLE STARVED, ${I} CAME TO THE CITY,\n`
    P=P+I
    console.log(text);

    if(Q<=0){
        P=Math.floor(P/2)
        let s1 = "A HORRIBLE PLAGUE STRUCK!  HALF THE PEOPLE DIED."
        console.log(s1);
        
    }
    let s2 = `POPULATION IS NOW ${P}\nTHE CITY NOW OWNS ${A} ACRES.\nYOU HARVESTED ${Y} BUSHELS PER ACRE.\n\THE RATS ATE ${E} BUSHELS.\nYOU NOW HAVE ${S} BUSHELS IN STORE.\n`
    console.log(s2);
 
    if(Z==11){
        line860();
        return; 
    }
    else{
        let C = Math.floor(10 * Math.random());
        Y = C + 17;
        let s3 = `LAND IS TRADING AT ${Y} BUSHELS PER ACRE.\n`
        console.log(s3);
        buyBool = true;
        while (buyBool) {
            let s4 = `HOW MANY ACRES DO YOU WISH TO BUY\n`
            console.log(s4);
            const Q = +prompt("Buy land");
            if (Q < 0) {
                line850();
                return;
            }
            if (Q >= 0) {
                if (Y * Q > S) {
                    line710();
                }
                else {
                    buyBool = false;

                    if (Q != 0) {
                        A = A + Q;
                        S = S - Y * Q;
                        C = 0;
                        //GOTO 400
                    }
                    else{
                        //Q=0
                        // sell land
                        sellBool = true;
                        while (sellBool) {
        
                            let s5 =  "HOW MANY ACRES DO YOU WISH TO SELL";
                            console.log(s5);
                            const Q = prompt("Sell land");
                            if (Q < 0) {
                                line850();
                                return;
                            }
                            if(Q<A) {
                                A=A-Q;
                                S=S+Y*Q;
                                C=0;
                                sellBool = false;
                            }
                            else{
                                line720();
                            }
                        }

                    }
                }

            } 
        }
        // 400 feed people
        let feedBool = true;
        while (feedBool) {

            let s6 = "\nHOW MANY BUSHELS DO YOU WISH TO FEED YOUR PEOPLE\n";
            console.log(s6);
            Q = +prompt("feed");
            if (Q < 0) {
                line850();
                return;
            }
            //*** TRYING TO USE MORE GRAIN THAN IS IN SILOS?
            if (Q <= S) {
                //THEN 430
                S = S - Q;
                C = 1;
                feedBool = false;
            }
            else {
                line710();
            }
        }

        let seedBool = true;
        while(seedBool){
            let s7 = "HOW MANY ACRES DO YOU WISH TO PLANT WITH SEED";
            console.log(s7);
            D = +prompt("Seed");
            if (D == 0) {
                line511()
                seedBool = false;
            }
            else if (D < 0) {
                line850();
                return;
            }
            else {
                //*** TRYING TO PLANT MORE ACRES THAN YOU OWN?
                if(D <= A){
                    // *** ENOUGH GRAIN FOR SEED?
                    if(Math.floor(D/2)<=S){
                        // THEN 455
                        // *** ENOUGH PEOPLE TO TEND THE CROPS?
                        if(D<10*P){
                            //THEN 510
                            S=S-Math.floor(D/2);
                            line511();
                            seedBool = false;
                        } else{
                            let s9 = `BUT YOU HAVE ONLY ${P} PEOPLE TO TEND THE FIELDS!  NOW THEN,\n`;
                            console.log(s9);
                        }
                    }
                    else{
                        line710();
                    }
                    //THEN 450

                } else{
                    line720();
                }

            }
        }




    }

 

}


