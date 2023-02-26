class Player {

    constructor() {
        this.name = "";
        this.choice = "";
        this.win = 0;
        this.loss = 0;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setChoice(choice) {
        this.choice = choice;
    }

    getChoice() {
        return this.choice;
    }

    setWin() {
        this.win += 1;
    }

    getWin() {
        return this.win;
    }

    setLoss() {
        this.loss += 1;
    }

    getLoss() {
        return this.loss;
    }
}

module.exports = {
    Player
}
