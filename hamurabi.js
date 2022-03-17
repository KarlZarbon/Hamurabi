/*
    Author: Karl Zarbon (March 2022)

    Hamurabi: early strategy game.

    The code is an adaptation of David Ahl original BASIC code printed in his book "BASIC Computer Games".
 
*/


const title = "HAMURABI";
const intro1 = "CREATIVE COMPUTING  MORRISTOWN, NEW JERSEY"
const intro2 = "TRY YOUR HAND AT GOVERNING ANCIENT SUMERIA"
const intro3 = "FOR A TEN-YEAR TERM OF OFFICE."

const States = {
    StartYear: 'StartYear',
    BuyLandQuestion: 'BuyLandQuestion',
    BuyLandFunction: 'BuyLandFunction',
    SellLandQuestion: 'SellLandQuestion',
    SellLandFunction: 'SellLandFunction',
    FeedPeopleQuestion: 'FeedPeopleQuestion',
    FeedPeopleFunction: 'FeedPeopleFunction',
    SeedLandQuestion: 'SeedLandQuestion',
    SeedLandFunction: 'SeedLandFunction',
    Inputs: 'Inputs',
    Exit: 'Exit'
};



class Hamurabi {

    constructor() {

        this.D1 = 0;
        this.P1 = 0;
        this.Z = 0;
        this.P = 95;
        this.S = 2800;
        this.H = 3000;
        this.E = this.H - this.S;
        this.Y = 3;
        this.A = this.H / this.Y;
        this.I = 5;
        this.Q = 1;
        this.D = 0;
        this.gameOver = false;


        this.state = States.StartYear;
        this.nextState = States.Exit;
        this.userInput = ""
        this.userQuantity = -1



    }





    nextYear(term) {

        
        if (this.gameOver)
            return;

        switch (this.state) {

            case States.StartYear:
                //215
                let text = "HAMURABI:  I BEG TO REPORT TO YOU,";
                term.addText(text)
                this.Z = this.Z + 1
                text = `IN YEAR ${this.Z}, ${this.D} PEOPLE STARVED, ${this.I} CAME TO THE CITY,`
                this.P = this.P + this.I

                term.addText(text)

                if (this.Q <= 0) {
                    this.P = Math.floor(this.P / 2)
                    let s1 = "A HORRIBLE PLAGUE STRUCK!  HALF THE PEOPLE DIED."
                    term.addText(s1)


                }
                let s2 = `POPULATION IS NOW ${this.P}`
                term.addText(s2)
                s2 = `THE CITY NOW OWNS ${this.A} ACRES.`
                term.addText(s2)
                s2 = `YOU HARVESTED ${this.Y} BUSHELS PER ACRE.`
                term.addText(s2)
                s2 = `THE RATS ATE ${this.E} BUSHELS.`
                term.addText(s2)
                s2 = `YOU NOW HAVE ${this.S} BUSHELS IN STORE.`
                term.addText(s2)

                if (this.Z == 11) {
                    this.line860(term);
                    return;
                }

                let C = Math.floor(10 * Math.random());
                this.Y = C + 17;
                let s3 = `LAND IS TRADING AT ${this.Y} BUSHELS PER ACRE.`

                term.addText(s3)

                this.state = States.BuyLandQuestion


                break;
            case States.BuyLandQuestion:
                let s4 = `HOW MANY ACRES DO YOU WISH TO BUY`
                term.addText(s4);
                this.state = States.Inputs
                this.nextState = States.BuyLandFunction
                break;
            case States.BuyLandFunction:

                [this.state, this.nextState] = this.buyLand(this.userQuantity, term)

                break;
            case States.SellLandQuestion:
                let s5 = "HOW MANY ACRES DO YOU WISH TO SELL";
                term.addText(s5)

                this.state = States.Inputs
                this.nextState = States.SellLandFunction
                break;
            case States.SellLandFunction:

                [this.state, this.nextState] = this.sellLand(this.userQuantity, term)

                
                break;

            case States.FeedPeopleQuestion:
                let s6 = "HOW MANY BUSHELS DO YOU WISH TO FEED YOUR PEOPLE";
                // console.log(s6);
                term.addText(s6)
                this.state = States.Inputs
                this.nextState = States.FeedPeopleFunction
                break;

            case States.FeedPeopleFunction:

                [this.state, this.nextState] = this.feedPeople(this.userQuantity, term)

                break;


            case States.SeedLandQuestion:
                let s7 = "HOW MANY ACRES DO YOU WISH TO PLANT WITH SEED";
                // console.log(s7);
                term.addText(s7)

                this.state = States.Inputs
                this.nextState = States.SeedLandFunction
                break;

            case States.SeedLandFunction:

                [this.state, this.nextState] = this.seedLand(this.userQuantity, term)

                break;

            case States.Inputs:
                //wait for inputs
                if (term.isReturn()) {
                    this.userInput = term.getInput();
                    this.userQuantity = parseInt(this.userInput)
                    this.state = this.nextState
 
                }

                break;

            case States.Exit:
                return;
            default:
                console.log('Should not come here');
            
        }



    }




    buyLand(input, term) {

        if (isNaN(input)) {

            return [States.BuyLandQuestion,
                undefined,
            ];
        }
        this.Q = input

        if (this.Q == 0) {
            return [
                States.SellLandQuestion,
                undefined,
            ];
        } else if (this.Q < 0) {
            this.line850(term);
            return [
                States.Exit,
                undefined,
            ];

        } else if (this.Q > 0) {

            if (this.Y * this.Q > this.S) {
                this.line710(term);
                return [
                    States.BuyLandQuestion,
                    undefined,
                ];
            }
            else {
                // if (Q != 0) {
                this.A = this.A + this.Q;
                this.S = this.S - this.Y * this.Q;
                this.C = 0;
                //GOTO 400
                return [
                    States.FeedPeopleQuestion,
                    undefined,
                ];
            }
        }


    }


    line710(term) {
        let s = `HAMURABI:  THINK AGAIN.  YOU HAVE ONLY ${this.S} BUSHELS OF GRAIN.  NOW THEN,`;
        term.addText(s)
    }




    sellLand(input, term) {

        if (isNaN(input)) {

            return [States.SellLandQuestion,
                undefined,
            ];
        }
        this.Q = input


        if (this.Q < 0) {
            this.line850(term);
            return [
                States.Exit,
                undefined,
            ];

        } else if (this.Q < this.A) {
            this.A = this.A - this.Q;
            this.S = this.S + this.Y * this.Q;
            this.C = 0;
            return [
                States.FeedPeopleQuestion,
                undefined,
            ];

        }
        else {
            this.line720(term);
            return [
                States.SellLandQuestion,
                undefined,
            ];

        }


    }

    line720(term) {
        let s = `HAMURABI:  THINK AGAIN.  YOU OWN ONLY ${this.A}  ACRES.  NOW THEN,`;
        term.addText(s)
    }


    feedPeople(input, term) {



        if (isNaN(input)) {

            return [States.FeedPeopleQuestion,
                undefined,
            ];
        }
        this.Q = input


        if (this.Q < 0) {
            this.line850(term);
            return [
                States.Exit,
                undefined,
            ];

        } else   //*** TRYING TO USE MORE GRAIN THAN IS IN SILOS?
            if (this.Q <= this.S) {
                //THEN 430
                this.S = this.S - this.Q;
                this.C = 1;
                return [
                    States.SeedLandQuestion,
                    undefined,
                ];

            }
            else {
                this.line710(term);
                return [
                    States.FeedPeopleQuestion,
                    undefined,
                ];

            }

    }


    seedLand(input, term) {


        if (isNaN(input)) {

            return [States.SeedLandQuestion,
                undefined,
            ];
        }
        this.D = input

        if (this.D == 0) {
            this.line511(term)
            return [
                States.StartYear,
                undefined,
            ];

        }
        else if (this.D < 0) {
            this.line850(term);
            return [
                States.Exit,
                undefined,
            ];
        }
        else {
            //*** TRYING TO PLANT MORE ACRES THAN YOU OWN?
            if (this.D <= this.A) {
                // *** ENOUGH GRAIN FOR SEED?
                if (Math.floor(this.D / 2) <= this.S) {
                    // THEN 455
                    // *** ENOUGH PEOPLE TO TEND THE CROPS?
                    if (this.D < 10 * this.P) {
                        //THEN 510
                        this.S = this.S - Math.floor(this.D / 2);
                        this.line511(term);
                        return [
                            States.StartYear,
                            undefined,
                        ];
                    } else {
                        let s9 = `BUT YOU HAVE ONLY ${this.P} PEOPLE TO TEND THE FIELDS!  NOW THEN,`;
                        term.addText(s9)
                        return [
                            States.SeedLandQuestion,
                            undefined,
                        ];

                    }
                }
                else {
                    this.line710(term);
                    return [
                        States.SeedLandQuestion,
                        undefined,
                    ];

                }

            } else {
                this.line720(term);
                return [
                    States.SeedLandQuestion,
                    undefined,
                ];

            }

        }

    }




    line511(term) {
        this.C = line800();
        // *** A BOUNTIFUL HARVEST!
        this.Y = this.C;
        this.H = this.D * this.Y;
        this.E = 0;
        this.C = line800();
        if (Math.floor(this.C / 2) == this.C / 2) {
            // *** RATS ARE RUNNING WILD!!
            this.E = Math.floor(this.S / this.C)
        }
        // 530
        this.S = this.S - this.E + this.H
        this.C = line800();
        // *** LET'S HAVE SOME BABIES
        this.I = Math.floor(this.C * (20 * this.A + this.S) / this.P / 100 + 1)
        // *** HOW MANY PEOPLE HAD FULL TUMMIES?
        this.C = Math.floor(this.Q / 20)
        // *** HORROS, A 15% CHANCE OF PLAGUE
        this.Q = Math.floor(10 * (2 * Math.random() - .3))
        if (this.P < this.C) {
            this.D = 0;
            return;
        }
        // *** STARVE ENOUGH FOR IMPEACHMENT?
        this.D = this.P - this.C
        if (this.D > .45 * this.P) {
            let s7 = `YOU STARVED ${this.D} PEOPLE IN ONE YEAR!!!`
            term.addText(s7);
            this.line565(term);
        } else {
            this.P1 = ((this.Z - 1) * this.P1 + this.D * 100 / this.P) / this.Z;
            this.P = this.C;
            this.D1 = this.D1 + this.D;
            return;
        }

    }



    line900(term) {
        let s = "A FANTASTIC PERFORMANCE!!!  CHARLEMANGE, DISRAELI, AND"
        term.addText(s)

        s = "JEFFERSON COMBINED COULD NOT HAVE DONE BETTER!"
        term.addText(s)
        this.line990(term);
    }

    line565(term) {

        let s = "DUE TO THIS EXTREME MISMANAGEMENT YOU HAVE NOT ONLY"
        term.addText(s)

        s = "BEEN IMPEACHED AND THROWN OUT OF OFFICE BUT YOU HAVE"
        term.addText(s)
        s = "ALSO BEEN DECLARED NATIONAL FINK!!!!"
        term.addText(s)
        this.line990(term);
    }

    line940(term) {
        let s = "YOUR HEAVY-HANDED PERFORMANCE SMACKS OF NERO AND IVAN IV."
        term.addText(s)
        s = "THE PEOPLE (REMAINING) FIND YOU AN UNPLEASANT RULER, AND,"
        term.addText(s)
        s = "FRANKLY, HATE YOUR GUTS!!"
        term.addText(s)
        this.line990(term);
    }

    line960(term) {
        let s = "YOUR PERFORMANCE COULD HAVE BEEN SOMEWHAT BETTER, BUT"
        term.addText(s)
        s = `REALLY WASN'T TOO BAD AT ALL. ${Math.floor(this.P * .8 * Math.random())} PEOPLE`
        term.addText(s)
        s = "WOULD DEARLY LIKE TO SEE YOU ASSASSINATED BUT WE ALL HAVE OUR"
        term.addText(s)
        s = "TRIVIAL PROBLEMS."
        term.addText(s)
        this.line990(term);

    }



    line850(term) {
        let s = "HAMURABI:  I CANNOT DO WHAT YOU WISH."

        term.addText(s)
        s = "GET YOURSELF ANOTHER STEWARD!!!!!"
        term.addText(s)
        this.line990(term);
    }




    line990(term) {
        // ring the bell (ascii 7) 10 times
        //990 PRINT: FOR N=1 TO 10: PRINT CHR$(7);: NEXT N
        let s = "SO LONG FOR NOW.";
        term.addText(s)
        this.gameOver = true;
        return;
    }


    line880(term) {

        if (this.P1 > 33) {
            this.line565(term);
        } else if (this.L < 7) {
            this.line565(term);
        } else if (this.P1 > 10) {
            this.line940(term);
        } else if (this.L < 9) {
            this.line940(term);
        } else if (this.P1 > 3) {
            this.line960(term);
        } else if (this.L < 10) {
            this.line960(term);
        } else {
            this.line900(term);
        }
    }



    line860(term) {
        let s = `IN YOUR 10-YEAR TERM OF OFFICE, ${this.P1} PERCENT OF THE`
        term.addText(s)

        s = "POPULATION STARVED PER YEAR ON THE AVERAGE, I.E. A TOTAL OF"
        term.addText(s)
        s = `${this.D1} PEOPLE DIED!!`
        term.addText(s)
        this.L = this.A / this.P
        s = "YOU STARTED WITH 10 ACRES PER PERSON AND ENDED WITH"
        term.addText(s)
        s = `${this.L} ACRES PER PERSON.`
        term.addText(s)
        this.line880(term);
    }

};



function line800() {
    return Math.floor(Math.random() * 5) + 1
}












