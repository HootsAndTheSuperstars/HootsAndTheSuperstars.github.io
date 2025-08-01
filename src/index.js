import { PreLoader } from './preloader.js'
import { ToC } from './ToC.js';
import { Game } from './script.js';
import { Pause } from './pause.js';
import { GameOver } from './gameOver.js';
import { Error } from './error.js';
import { TitleScreen } from './titleScreen.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game_container',
    width: 1500,
    height: 600,
    scene: [PreLoader, ToC, TitleScreen, Game, GameOver, Pause, Error],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

var game = new Phaser.Game(config);
game.canvas.style.cursor = 'default';
