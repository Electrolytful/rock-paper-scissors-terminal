const playerClass = require("./Player.js");
const prompt = require("prompt-sync")({ sigint: true });
const c = require("ansi-colors");

// allows for a lot more exstensibility,
// basically we can use more weapons depending on what we want to add c:

const weapons = {
  rock: { weakTo: ["paper"], strongTo: ["scissors"] },
  paper: { weakTo: ["scissors"], strongTo: ["rock"] },
  scissors: { weakTo: ["rock"], strongTo: ["paper"] },
  catapult: { weakTo: [], strongTo: ["paper", "scissors", "rock"] },
};

const player = new playerClass.Player();
const comp = new playerClass.Player();

class Game {
  constructor() {
    // if the weapons have the choice in it, this will return true.
    this.choices = Object.keys(weapons);
  }

  setupGame() {
    const name = prompt("Please enter your name: ");
    player.setName(name);

    comp.setName("Computer");
  }

  welcome() {
    const options = Object.entries(weapons);

    console.log(
      `\nWelcome to Rock Paper Scissors ${c.blue(
        player.getName()
      )}\nThe game is simple. You must beat the computer by choosing one of the many weapons.`
    );

    options.forEach((option) => {
      const name = option[0];
      const { strongTo, weakTo } = option[1];
      console.log(
        `${name} ${c.red("strong to")} ${strongTo}, ${c.blue("weak to")} ${weakTo || c.bgRedBright.black('NOTHING!!!')}`
      );
    });

    console.log("use ^C to exit game.");
  }

  printStats() {
    console.log(
      `\nThe stats are currently: \n${c.blue(
        player.getName()
      )}: Wins - ${c.green(player.getWin())} Losses - ${c.red(
        player.getLoss()
      )}\n${c.blue(comp.getName())}: Wins - ${c.green(
        comp.getWin()
      )} Losses - ${c.red(comp.getLoss())}`
    );
  }

  getChoice() {
    while (player.getChoice() === "") {
      const choice = prompt(
        console.log("Make your choice\n")
      ).toLocaleLowerCase();

      // check the constructor
      if (this.choices.includes(choice)) {
        player.setChoice(choice);
      } else {
        console.log("Please select a valid choice...");
      }
    }

    comp.setChoice(
      this.choices[Math.floor(Math.random() * this.choices.length)]
    );
  }

  resetChoices() {
    player.setChoice("");
    comp.setChoice("");
  }

  getWinner() {
    // for extendability,
    // using this object syntax for your comparing is probably better
    if (player.getChoice() === comp.getChoice()) return "draw";

    if (weapons[player.getChoice()].strongTo.includes(comp.getChoice())) {
      player.setWin();
      comp.setLoss();
      return "player";
    }

    if (weapons[player.getChoice()].weakTo.includes(comp.getChoice())) {
      comp.setWin();
      player.setLoss();
      return "bot";
    }
  }

  declareWinner() {
    let color;
    let winner = c.green(this.getWinner());

    console.log(
      `\n${c.blue(player.getName())} chose ${c.red(player.getChoice())}`
    );
    console.log(`\n${c.blue(comp.getName())} chose ${c.red(comp.getChoice())}`);

    if (winner === "tie") {
      color = c.yellow;
      console.log(`\n${color("It's a tie")}!`);
    } else {
      color = c.green;
      console.log(`\nThe winner is ${color(winner)}`);
    }
  }
}

// bro this part of the code is so clean i love it.
const game = new Game();
game.setupGame();
game.welcome();

while (true) {
  game.printStats();
  game.getChoice();
  game.declareWinner();
  game.resetChoices();
}
