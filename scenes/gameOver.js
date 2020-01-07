import gameOptions from "../gameOptions.js";
import playGame from "./playGame.js";

class gameOver extends Phaser.Scene {

    constructor() {
        super('gameOver');
    }

    init(data) {
        this.score = data.score;
    };

    preload() {

    }

    create() {
        this.add.image(gameOptions.width * 0.5, gameOptions.height * 0.5, 'background_menu');

        this.add.image(gameOptions.width / 2, gameOptions.height / 4, 'header');

        let ohNoesText = this.add.text(0, gameOptions.height / 2 - 100, 'Oh noes!', { fontFamily: gameOptions.fontName, fontSize: 100, color: '#000000', fontStyle: 'bold'});
        ohNoesText.x = gameOptions.width * 0.5 - ohNoesText.width * 0.5;

        let yourScoreText = this.add.text(0, 0, 'Your score:', { fontFamily: gameOptions.fontName, fontSize: 50, color: '#000000', fontStyle: 'bold'});
        yourScoreText.x = gameOptions.width * 0.5 - yourScoreText.width * 0.5;
        yourScoreText.y = ohNoesText.y + 100;

        let scoreText = this.add.text(0, 0, this.score, { fontFamily: gameOptions.fontName, fontSize: 100, color: '#ffffff', fontStyle: 'bold'});
        scoreText.x = gameOptions.width * 0.5 - scoreText.width * 0.5;
        scoreText.y = yourScoreText.y + 50;

        let startGameText = this.add.text(0, gameOptions.height * 0.7, 'Play again', { fontFamily: gameOptions.fontName, fontSize: 72, color: '#000000' , fontStyle: 'bold'});
        startGameText.setInteractive({ useHandCursor: true });
        startGameText.x = gameOptions.width * 0.5 - startGameText.width * 0.5;
        startGameText.on('pointerdown', () => this.scene.start('playGame'));

        let backToMainMenuText = this.add.text(0, gameOptions.height / 2, 'Back to main menu', { fontFamily: gameOptions.fontName, fontSize: 50, color: '#000000', fontStyle: 'bold'});
        backToMainMenuText.setInteractive({ useHandCursor: true });
        backToMainMenuText.x = gameOptions.width * 0.5 - backToMainMenuText.width * 0.5;
        backToMainMenuText.y = startGameText.y + 100;
        backToMainMenuText.on('pointerdown', () => this.scene.start('titleScreen'));

        let gitHubLinkText = this.add.text(0, gameOptions.height - 30, 'Github.com/AdriaenXO/UniFly', { fontFamily: gameOptions.fontName, fontSize: 25, color: '#ffffff' , fontStyle: 'bold'});
        gitHubLinkText.x = gameOptions.width * 0.5 - gitHubLinkText.width * 0.5;
        gitHubLinkText.setInteractive({ useHandCursor: true });
        gitHubLinkText.on('pointerdown', () => window.open('https://github.com/AdriaenXO/UniFly', '_blank'));
    }

    update() {

    }


    end() {

    }

}

export default gameOver;