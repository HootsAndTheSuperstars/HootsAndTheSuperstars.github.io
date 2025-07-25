export class Pause extends Phaser.Scene{

    constructor (){

        super({key: 'pause'});
    }
    init(){
        this.fastFlash = false;
        this.pauseText;
    }
    preload (){
        this.load.image('pause_background', 'assets/Pause/pause_background.png')
        this.load.spritesheet('pause_text', 'assets/Pause/pause_text.png', {frameWidth: 385, frameHeight: 94})
        this.load.audio('pause_trigger', 'assets/sounds/pause_trigger.wav');
        this.load.audio('pause_quit', 'assets/sounds/pause_quit.wav');
    }

    create ()
    {
        this.game.events.on('error', function(error) {
            console.error('Game error:', error);
            this.scene.launch('error')
        });     
        this.load.on('loaderror', function (fileObj, error) {
            console.error('Error on object:', fileObj.key, error);
            this.scene.launch('error')
        });
        this.scene.scene.events.on('error', function(scene, error) {
            console.error('Scene error:', error);
            this.scene.launch('error')
        });
        window.onerror = function(message, source, lineno, colno, error) {
            console.error('Global error:', message, source, lineno, colno, error);
            this.scene.launch('error')
        };
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sound.add('pause_trigger')
        this.sound.play('pause_trigger')
        this.sound.add('pause_quit')

        this.bg_pause = this.add.tileSprite(750, 300, 1500, 600, 'pause_background');
        this.pauseText = this.physics.add.staticGroup();

        this.anims.create({

            key: 'text_flash_pause',
            frames: this.anims.generateFrameNumbers('pause_text', {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({

            key: 'text_flash_fast_pause',
            frames: this.anims.generateFrameNumbers('pause_text', {start: 0, end: 1}),
            frameRate: 18,
            repeat: -1
        });
        this.pauseTextAnims = this.pauseText.create(750, 300, 'pause_text'),
        this.pauseTextAnims.anims.play('text_flash_pause', true);

        console.log("Created pause's text and background!")

        this.input.keyboard.on('keydown-ENTER', () =>
        {
            if(!this.fastFlash){
                this.sound.play('pause_quit')
                this.fastFlash = true
                console.log('Resuming game...')
                this.time.delayedCall(900, () => {
                    this.scene.resume('stage');
                    this.scene.stop('pause')
                })
            }
        });

    }
    update ()
    {
        if(this.fastFlash){
            this.pauseTextAnims.anims.play('text_flash_fast_pause', true)
        }
        this.bg_pause.tilePositionX -= 0.1;
        this.bg_pause.tilePositionY -= 0.1;
        if(this.keyW.isDown){
            console.log("Hiding assets...")
            this.bg_pause.setAlpha(0)
            this.pauseText.setAlpha(0.3)
    
        }
        else if(!this.keyW.isDown){
            console.log("Showing assets...")
            this.bg_pause.setAlpha(0.95)
            this.pauseText.setAlpha(1)
        }
    }


    
}