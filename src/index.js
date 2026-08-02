import { PreLoader } from './preloader.js'
import { ToC } from './ToC.js';
import { StageNoon } from './stages/stage_noon.js';
import { StageDoubt } from './stages/stage_doubt.js';
import { Pause } from './pause.js';
import { GameOver } from './gameOver.js';
import { Error } from './error.js';
import { TitleScreen } from './titleScreen.js';
import { controlsScreen } from './controls.js';
import { Menu } from './menu.js';
import { treeStar } from './stages/tree.js';



const config = {
    type: Phaser.WEBGL,
    parent: 'game_container',
    width: 900,
    pixelArt: true,
    height: 600,
    scene: [PreLoader, ToC, TitleScreen, StageNoon, StageDoubt, controlsScreen, treeStar, /*unmovable*/  Pause, GameOver, Error, Menu],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

var game = new Phaser.Game(config);
game.canvas.style.cursor = 'default';
