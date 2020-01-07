import playGame from "./scenes/playGame.js";
import titleScreen from "./scenes/titleScreen.js";
import gameOver from "./scenes/gameOver.js";
import gameOptions from "./gameOptions.js";

let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: gameOptions.backgroundColor,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: gameOptions.container,
        width: gameOptions.width,
        height: gameOptions.height
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
};
let game = new Phaser.Game(gameConfig);

game.scene.add('playGame', new playGame());
game.scene.add('titleScreen', new titleScreen());
game.scene.add('gameOver', new gameOver());
game.scene.start('titleScreen');
window.focus();

