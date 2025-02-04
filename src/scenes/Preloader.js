import { Scene } from 'phaser';

export class Preload extends Scene {
    constructor() {
        super('Preload');
    }


    Environment() {
        this.add.image(500, 400, 'sky').setScale(1.5);
        var platforms = this.physics.add.staticGroup();
        platforms.create(500, 668, 'ground').setScale(3).refreshBody();
        platforms.create(550, 530, 'ground');
        platforms.create(100, 400, 'ground');
        platforms.create(900, 250, 'ground');
        platforms.create(-40, 150, 'ground');
        platforms.create(450, 240, 'ground').setScale(0.4).refreshBody();
    }

    preload() {
        this.load.image('sky', '/assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }


    create() {
        this.Environment();
        const centerX= this.cameras.main.width / 2 ;
        const centerY = this.cameras.main.height / 2;
        var scoreText= this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
        this.add.text(centerX, centerY, 'Press Space To Start the Game ', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);
     
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Game')
        })
    }
}
