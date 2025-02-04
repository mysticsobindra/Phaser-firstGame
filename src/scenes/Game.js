import { LEFT, Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        var score = 0;

        this.add.image(500, 400, 'sky').setScale(1.5);
        var platforms = this.physics.add.staticGroup();
        platforms.create(500, 668, 'ground').setScale(3).refreshBody();
        platforms.create(550, 530, 'ground');
        platforms.create(100, 400, 'ground');
        platforms.create(900, 250, 'ground');
        platforms.create(-40, 150, 'ground');
        platforms.create(450, 240, 'ground').setScale(0.4).refreshBody();
        var scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

        var player = this.physics.add.sprite(150, 450, 'dude');
        player.body.setGravityY(800)
        player.setBounce(0.1);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(player, platforms);
        player.anims.play('turn', true);

        this.input.keyboard.on('keydown-D', () => {
            player.setVelocityX(260);
            player.anims.play('right', true);
        });

        this.input.keyboard.on('keyup-D', () => {
            player.setVelocityX(0);
            player.anims.stop('right', true);
            player.anims.play('turn', true);
        });

        this.input.keyboard.on('keydown-A', () => {
            player.setVelocityX(-260);
            player.anims.play('left', true);
        });

        this.input.keyboard.on('keyup-A', () => {
            player.setVelocityX(0);
            player.anims.stop('left', true);
            player.anims.play('turn', true);
        });


        this.input.keyboard.on('keydown-SPACE', () => {
            if (player.body.touching.down) {
                player.setVelocityY(-600);
            }
        });

        const stars = this.physics.add.group({
            key: 'star',
            repeat: 13,
            setXY: {
                x: 20,
                y: 20,
                stepX: 70
            }
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.8));
        });

        const bombs = this.physics.add.group();

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

        function hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.scene.start('GameOver')
        }

        function collectStar(player, star) {
            star.disableBody(true, true);
            score += 10;
            scoreText.setText('Score: ' + score);

            if (stars.countActive(true) === 0) {
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            }
        }
    }
}
