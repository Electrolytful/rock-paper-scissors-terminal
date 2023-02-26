const playerClass = require('./Player.js');
const prompt = require('prompt-sync')({sigint: true});
const c = require('ansi-colors');

const choices = ["rock", "paper", "scissors"];
const player = new playerClass.Player();
const comp = new playerClass.Player();


class Game {

    constructor() {

    }

    setupGame() {
        const name = prompt("Please enter your name: ");
        player.setName(name);

        comp.setName("Computer");
    }

    welcome() {
        console.log(`\nWelcome to Rock Paper Scissors ${c.blue(player.getName())}\nThe game is simple. You must beat the computer by choosing one of the three afromentioned choices: Rock, Paper or Scissors\nRock ${c.red("beats")} Scissors\nScissors ${c.red("beats")} Paper\nPaper ${c.red("beats")} Rock\nThe same choices ${c.yellow("tie")}!\nUse ^C to exit the game`);
        
    }

    printStats() {
        console.log(`\nThe stats are currently: \n${c.blue(player.getName())}: Wins - ${c.green(player.getWin())} Losses - ${c.red(player.getLoss())}\n${c.blue(comp.getName())}: Wins - ${c.green(comp.getWin())} Losses - ${c.red(comp.getLoss())}`);
    }

    getChoice() {
        while(player.getChoice() === "") {
            const choice = prompt(console.log("Rock? Paper? Scissors?\n")).toLocaleLowerCase();
            choice === "rock" || choice === "paper" || choice === "scissors" ? player.setChoice(choice) : console.log("Please select a valid choice...");
        }

        comp.setChoice(choices[Math.floor(Math.random() * 3)]);

    }

    resetChoices() {
        player.setChoice("");
        comp.setChoice("");
    }

    getWinner() {
        if((player.getChoice() === "rock" && comp.getChoice() === "scissors") || (player.getChoice() === "paper" && comp.getChoice() === "rock") || (player.getChoice() === "scissors" && comp.getChoice() === "paper")) {
            player.setWin();
            comp.setLoss();
            return player.getName();
        }
        else if((player.getChoice() === "rock" && comp.getChoice() === "paper") || (player.getChoice() === "paper" && comp.getChoice() === "scissors") || (player.getChoice() === "scissors" && comp.getChoice() === "rock")) {
            comp.setWin();
            player.setLoss();
            return comp.getName();
        }
        else {
            return "tie";
        }
    }

    declareWinner() {
        let winner = c.green(this.getWinner());

        console.log(`\n${c.blue(player.getName())} chose ${c.red(player.getChoice())}`);
        console.log(`\n${c.blue(comp.getName())} chose ${c.red(comp.getChoice())}`);

        if(winner === "tie") {
            console.log(`\n${c.yellow("It's a tie")}!`);
        }
        else {
            console.log(`\nThe winner is ${c.green(winner)}`);
        }
    }
}


const game = new Game();
game.setupGame();
game.welcome();


while(true) {
    game.printStats();
    game.getChoice();
    game.declareWinner();
    game.resetChoices();
}
