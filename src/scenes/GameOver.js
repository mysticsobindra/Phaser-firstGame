import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.add.image(500, 400, 'sky').setScale(1.5);
        var platforms = this.physics.add.staticGroup();
        platforms.create(500, 668, 'ground').setScale(3).refreshBody();
        platforms.create(550, 530, 'ground');
        platforms.create(100, 400, 'ground');
        platforms.create(900, 250, 'ground');
        platforms.create(-40, 150, 'ground');
        platforms.create(450, 240, 'ground').setScale(0.4).refreshBody();
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.add.text(centerX, centerY, 'Game Over ! Press Space to Restart ', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Game')
        })
    }
}
