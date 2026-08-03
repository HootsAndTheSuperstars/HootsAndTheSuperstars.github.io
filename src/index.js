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
    type: Phaser.AUTO,
    scale: {
		mode: Phaser.Scale.FIT,
		parent: 'game_container',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 900,
        height: 600,
	},
    pixelArt: true,

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
