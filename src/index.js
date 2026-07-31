import { PreLoader } from './preloader.js'
import { ToC } from './ToC.js';
import { Game } from './stages/stage_noon.js';
import { Pause } from './pause.js';
import { GameOver } from './gameOver.js';
import { Error } from './error.js';
import { TitleScreen } from './titleScreen.js';
import { controlsScreen } from './controls.js';



const config = {
    type: Phaser.WEBGL,
    parent: 'game_container',
    width: 900,
    //pixelArt: true,
    height: 600,
    scene: [PreLoader, ToC, TitleScreen, Game, controlsScreen, /*unmovable*/  Pause, GameOver, Error],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

var game = new Phaser.Game(config);
game.canvas.style.cursor = 'default';
