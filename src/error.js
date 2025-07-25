export class Error extends Phaser.Scene{

    constructor (){

        super({key: 'error'});
    }
    init(){
        this.fastFlash = false;
        this.errorText;
    }
    preload (){
        this.load.image('error_background', 'assets/Error/error_background.png')
        this.load.image('error_text', 'assets/Error/error_text.png')
        this.load.audio('error', 'assets/sounds/error.wav');
        this.load.image('no_way!', 'assets/Error/no_way.png');
        this.load.image('no_way!_small', 'assets/Error/no_way_small.png')

    }

    create ()
    {
        
        const musicError = this.sound.add('error')
        musicError.loop = true
        musicError.play()

        this.bg_error = this.add.tileSprite(750, 300, 1500, 600, 'error_background');
        this.noway_text1 = this.add.tileSprite(750, 50, 1500, 29, 'no_way!');
        this.noway_text2 = this.add.tileSprite(750, 550, 1500, 29, 'no_way!');
        this.noway_small_text1 = this.add.tileSprite(750, 100, 1500, 13, 'no_way!_small');
        this.noway_small_text2 = this.add.tileSprite(750, 500, 1500, 13, 'no_way!_small');

        this.add.image(750, 300, 'error_text');

        console.log("Created error's text and background!")
    }
    update ()
    {

        this.bg_error.tilePositionY -= 2;
        this.noway_text1.tilePositionX += 1.5;
        this.noway_text2.tilePositionX -= 1.5;
        this.noway_small_text1.tilePositionX += 0.5;
        this.noway_small_text2.tilePositionX -= 0.5;

    }

    
}