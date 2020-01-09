import gameOptions from "../gameOptions.js";

class playGame extends Phaser.Scene {
    constructor() {
        super('playGame');
    }
    preload() {
        this.load.image('pipe', 'assets/pipe.png');
        this.load.image('background_game', 'assets/background_game.png');
        this.load.audio('jump', 'assets/jump.mp3');
    }
    create() {
        this.add.image(gameOptions.width * 0.5, gameOptions.height * 0.5, 'background_game');

        this.pipeGroup = this.physics.add.group();
        this.pipePool = [];
        for(let i = 0; i < 4; i++) { //?4
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.placePipes(false);
        }
        this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);

        if (this.game.global.animation) {
            this.bird = this.physics.add.sprite(80, gameOptions.height / 2, 'unicorn');
            this.anims.create({
                key: 'unicorn',
                frames: this.anims.generateFrameNumbers('unicorn', { start: 0, end: 17 }),
                frameRate: 10,
                repeat: -1
            });
            this.bird.play('unicorn');
        } else {
            this.bird = this.physics.add.sprite(80, gameOptions.height / 2, 'bird');
        }
        this.bird.body.gravity.y = gameOptions.birdGravity;
        this.input.on('pointerdown', this.flap, this);

        this.input.keyboard.on('keydown-SPACE', this.flap, this);

        this.jumpSound = this.sound.add('jump');
        this.jumpSound.volume = gameOptions.soundVolume;

        this.score = 0;
        this.scoreText = this.add.text(10, 10, '', { fontFamily: gameOptions.fontName, fontSize: 64, color: '#ffffff' });
        this.scorePopup = this.add.text(gameOptions.width / 2, gameOptions.height / 2, '0', { fontFamily: gameOptions.fontName, fontSize: 400, color: '#000000' });
        this.updateScore(this.score);
    }
    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = 'Score: ' + this.score;
        this.scoreText.x = gameOptions.width * 0.5 - this.scoreText.width * 0.5;

        this.scorePopup.text = this.score;
        this.scorePopup.x = gameOptions.width * 0.5 - this.scorePopup.width * 0.5;
        this.scorePopup.y = gameOptions.height * 0.5 - this.scorePopup.height * 0.5;
        this.tweens.add({
            targets: this.scorePopup,
            alpha: { start: 1, from: 1, to: 0 },
            repeat: 0,
        });
    }
    placePipes(addScore) {
        let rightmost = this.getRightmostPipe();
        let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0], gameOptions.pipeHole[1]);
        let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, gameOptions.height - gameOptions.minPipeHeight - pipeHoleHeight / 2);
        this.pipePool[0].x = rightmost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
        this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
        this.pipePool[0].setOrigin(0, 1);
        this.pipePool[1].x = this.pipePool[0].x;
        this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
        this.pipePool[1].setOrigin(0, 0);
        this.pipePool = [];
        if (addScore) {
            this.updateScore(1);
        }
    }
    flap() {
        this.bird.body.velocity.y = -gameOptions.birdFlapPower;
        //this.add.tween(this.bird).to({angle: -gameOptions.birdAngle}, 100).start();
        this.tweens.add({
            targets: this.bird,
            angle: { value: -gameOptions.birdAngle, duration: 100 },
            repeat: 0,
        });
        this.jumpSound.play();
    }
    getRightmostPipe() {
        let rightmostPipe = 0;
        this.pipeGroup.getChildren().forEach(function(pipe) {
            rightmostPipe = Math.max(rightmostPipe, pipe.x);
        });
        return rightmostPipe;
    }
    update() {
        if (this.bird.angle < gameOptions.birdAngle)
            this.bird.angle += 1;

        this.physics.world.collide(this.bird, this.pipeGroup, function() {
            this.die();
        }, null, this);
        if(this.bird.y > gameOptions.height || this.bird.y < 0) {
            this.die();
        }

        this.pipeGroup.getChildren().forEach(function(pipe) {
            if(pipe.getBounds().right < 0){
                this.pipePool.push(pipe);
                if(this.pipePool.length === 2){
                    this.placePipes(true);
                }
            }
        }, this)
    }
    die() {
        this.scene.start('gameOver', { score: this.score });
    }
}

export default playGame;