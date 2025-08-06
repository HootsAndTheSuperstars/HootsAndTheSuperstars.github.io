export class Pause extends Phaser.Scene{

    constructor (){

        super({key: 'pause'});
    }
    init(data){
        this.fastFlash = false;
        this.pauseText;
        this.score = data.score
        this.bombLoad = data.bombLoad
        this.level = data.level
    }


    create ()
    {
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sound.add('beep')
        this.sound.play('beep')
        this.sound.add('check')

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

        this.scoreText = this.add.text(16, 16, `SCORE: ${this.score}`, { fontFamily:'HUDfont', fontSize: '32px', fill: '#fff' });
        this.levelText = this.add.text(16, 50, `LEVEL: ${this.level}`, { fontFamily:'HUDfont', fontSize: '32px', fill: '#fff' });
        this.bombLoadText = this.add.text(16, 85, `BOMB LOAD: ${this.bombLoad}`, { fontFamily:'HUDfont', fontSize: '32px', fill: '#fff' });


        this.input.keyboard.on('keydown-ENTER', () =>
        {
            if(!this.fastFlash){
                this.sound.play('check')
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
            this.scoreText.setAlpha(0.3)
            this.bombLoadText.setAlpha(0.3)
            this.levelText.setAlpha(0.3)
    
        }
        else if(!this.keyW.isDown){
            console.log("Showing assets...")
            this.bg_pause.setAlpha(0.95)
            this.pauseText.setAlpha(1)
            this.scoreText.setAlpha(1)
            this.bombLoadText.setAlpha(1)
            this.levelText.setAlpha(1)
        }
    }


    
}