import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { Preload } from './scenes/Preloader';


const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
  
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Preload,
        Game,
        GameOver
    ]
};

export default new Phaser.Game(config);
