export class PreLoader extends Phaser.Scene{
    constructor (){

        super({key: 'preloader'});
    }
    preload (){


        //TOC
        this.load.image('ToC', 'assets/ToC/ToC.png')
        this.load.spritesheet('ToC_button', 'assets/ToC/ToC_buttons.png', {frameWidth: 280, frameHeight: 70})
        this.load.audio('hurt_dev', 'assets/sounds/hurt_shield.wav')
        
        //title screen
        this.load.image('titleHoots', 'assets/Title Screen/hoots_titlescreen.png')
        this.load.image('title_background', 'assets/Title Screen/tts_background.png')
        this.load.spritesheet('enter_text_tts', 'assets/Title Screen/pressenter_text_tts.png', {frameWidth: 274, frameHeight: 42})

        //main game
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.image('sky', 'assets/background/noon_background.png');
        this.load.image('sky_nearestClouds', 'assets/background/noon_nearestClouds.png');
        this.load.image('sky_middleClouds', 'assets/background/noon_middleClouds.png');
        this.load.image('sky_farestClouds', 'assets/background/noon_farestClouds.png');
        this.load.image('platform_0x02', 'assets/platforms/platform_02.png');
        this.load.image('platform_0x01', 'assets/platforms/platform_01.png');
        this.load.image('platform_0x00', 'assets/platforms/platform_main.png');


        this.load.spritesheet('star', 'assets/misc/star.png', {frameWidth: 25, frameHeight: 24});
        this.load.spritesheet('starGet', 'assets/misc/star_explosion.png', {frameWidth: 25, frameHeight: 73});
        this.load.spritesheet('boom', 'assets/misc/bomb_explosion.png', {frameWidth: 56, frameHeight: 56});
        this.load.spritesheet('bomb', 'assets/misc/bomb.png', {frameWidth: 28, frameHeight: 28});
        this.load.spritesheet('dude', 'assets/hoots/hoots.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('boxes', 'assets/misc/power_boxes.png', {frameWidth: 30, frameHeight: 30});

        this.load.spritesheet('shield', 'assets/misc/shield/shield.png', {frameWidth: 48, frameHeight: 42});
        this.load.pack('music_json', 'src/json/sounds.json')

        //gameOver
        this.load.image('gameover_background', 'assets/GameOver/gameover_background.png')
        this.load.image('gameover_text', 'assets/GameOver/gameover_text.png')
        this.load.spritesheet('pressenter_text', 'assets/GameOver/pressenter_text.png', {frameWidth: 530, frameHeight: 42})
        this.load.spritesheet('returnTitle', 'assets/GameOver/returnTitle.png', {frameWidth: 436, frameHeight: 26})

        //Error
        this.load.image('error_background', 'assets/Error/error_background.png')
        this.load.image('error_text', 'assets/Error/error_text.png')
        this.load.image('no_way!', 'assets/Error/no_way.png');
        this.load.image('desktop_only', 'assets/Error/desktop_only.png');
        this.load.image('no_way!_small', 'assets/Error/no_way_small.png')

        //pause
        this.load.image('pause_background', 'assets/Pause/pause_background.png')
        this.load.spritesheet('pause_text', 'assets/Pause/pause_text.png', {frameWidth: 385, frameHeight: 94})        
    }

    create (){
        this.scene.launch('ToC')
    }
}