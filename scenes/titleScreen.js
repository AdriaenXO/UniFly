import gameOptions from "../gameOptions.js";
import playGame from "./playGame.js";

class titleScreen extends Phaser.Scene {

    constructor() {
        super('titleScreen');
    }

    init() {

    };

    preload() {
        this.load.image('header', 'assets/header.png');
        this.load.image('background_menu', 'assets/background_menu.png');
        //this.scene.add('playGame', new playGame());
    }

    create() {
        this.add.image(gameOptions.width * 0.5, gameOptions.height * 0.5, 'background_menu');

        this.add.image(gameOptions.width / 2, gameOptions.height / 4, 'header');

        let startGameText = this.add.text(0, gameOptions.height / 2, 'Start Game', { fontFamily: gameOptions.fontName, fontSize: 72, color: '#000000' , fontStyle: 'bold'});
        startGameText.setInteractive({ useHandCursor: true });
        startGameText.x = gameOptions.width * 0.5 - startGameText.width * 0.5;
        startGameText.on('pointerdown', () => this.scene.start('playGame'));

        let soundStatusText = this.add.text(0, gameOptions.height / 2, 'Sound On', { fontFamily: gameOptions.fontName, fontSize: 50, color: '#000000' , fontStyle: 'bold'});
        soundStatusText.setInteractive({ useHandCursor: true });
        soundStatusText.x = gameOptions.width * 0.5 - soundStatusText.width * 0.5;
        soundStatusText.y = startGameText.y + 100;
        soundStatusText.on('pointerdown', function () {
            this.game.sound.mute = !this.sound.mute;
            if (this.game.sound.mute === true) {
                soundStatusText.text = 'Sound On';
            } else {
                soundStatusText.text = 'Sound Off';
            }
        }, this);

        let quitGameText = this.add.text(0, gameOptions.height / 2, 'Quit Game', { fontFamily: gameOptions.fontName, fontSize: 50, color: '#000000', fontStyle: 'bold'});
        quitGameText.setInteractive({ useHandCursor: true });
        quitGameText.x = gameOptions.width * 0.5 - quitGameText.width * 0.5;
        quitGameText.y = soundStatusText.y + (soundStatusText.y - startGameText.y);
        quitGameText.on('pointerdown', () => window.close());

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

export default titleScreen;