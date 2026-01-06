import { PreLoader } from './preloader.js'
import { ToC } from './ToC.js';
import { Game } from './script.js';
import { Pause } from './pause.js';
import { GameOver } from './gameOver.js';
import { Error } from './error.js';
import { TitleScreen } from './titleScreen.js';
import { Menu } from './menu.js';
import { TestStage } from './testzone.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game_container',
    width: 1500,
    height: 600,
    scene: [PreLoader, ToC, TitleScreen, Menu, Game, TestStage, /*unmovable*/  Pause, GameOver, Error],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
};

var game = new Phaser.Game(config);
game.canvas.style.cursor = 'default';
