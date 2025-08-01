export class TitleScreen extends Phaser.Scene{

    constructor (){

        super({key: 'titlescreen'});
    }
    init(){
        this.fastFlash = false;
        
    }


    create ()
    {
        this.loopTitleMusic = this.sound.add('title')

        this.loopTitleMusic.addMarker({
            name: 'loopPoint',
            start: 3.994, // Start playing from 5 seconds
            config: {
                loop: true // Automatically loop within the marker
            }
        });

        this.loopTitleMusic.play()
        
        this.loopTitleMusic.on('complete', () => {
            this.loopTitleMusic.play('loopPoint'); // Play again
        });

        //3.994
        this.cameras.main.fadeOut(1)
        this.time.delayedCall(3994, () =>{
            this.cameras.main.fadeIn(1)
            this.cameras.main.flash(800)
        })
            
        
        this.bg_tts = this.add.tileSprite(750, 300, 1500, 600, 'title_background');
        this.titleHoots = this.add.image(750, 250, 'titleHoots')
        this.pressEnterTextTTS = this.physics.add.staticGroup();

        this.anims.create({

            key: 'text_tts_flash',
            frames: this.anims.generateFrameNumbers('enter_text_tts', {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({

            key: 'text_tts_flash_fast',
            frames: this.anims.generateFrameNumbers('enter_text_tts', {start: 0, end: 1}),
            frameRate: 18,
            repeat: -1
        });


        this.pressEnterTextTTSAnims = this.pressEnterTextTTS.create(750, 520, 'enter_text_tts').setVisible(false)
        
        this.sound.add('continue')
        console.log('Hey, welcome!\n Title screen assets created!')

        this.time.delayedCall(100, () =>{
            this.pressEnterTextTTSAnims.setVisible(true)
            this.pressEnterTextTTSAnims.anims.play('text_tts_flash')
                this.input.keyboard.on('keydown-ENTER', () =>
                {
                if(!this.fastFlash){
                    this.loopTitleMusic.stop()
                    console.log('Enter pressed! Starting game...')
                    this.fastFlash = true
                    this.pressEnterTextTTSAnims.anims.play('text_tts_flash_fast')
                    this.sound.play('continue')
                    this.time.delayedCall(2000, () => {
                            this.cameras.main.fadeOut(1000)
                            this.time.delayedCall(1000, () => {
                                console.log('Switching to stage...\n Prepare for console.log caos')
                                this.scene.switch('stage')
                                this.scene.stop('titlescreen')
                        })
                    })
                }
            });
        
        })

    }
    update (){
        this.bg_tts.tilePositionX += 1
        this.bg_tts.tilePositionY -= 1
    }

}