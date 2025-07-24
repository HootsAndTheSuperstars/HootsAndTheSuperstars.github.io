export class GameOver extends Phaser.Scene{

    constructor (){

        super({key: 'gameover'});
    }
    init(data){
        this.score = data.score
        this.fastFlash = false;
        this.pressEnterText;
    }
    preload (){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('gameover_background', 'assets/GameOver/gameover_background.png')
        this.load.image('gameover_text', 'assets/GameOver/gameover_text.png')
        this.load.spritesheet('pressenter_text', 'assets/GameOver/pressenter_text.png', {frameWidth: 530, frameHeight: 42})
        this.load.audio('gameOver_music', 'assets/sounds/Game Over.wav');
        this.load.audio('continue', 'assets/sounds/continue.wav')
    }

    create ()
    {

        
        this.cameras.main.fadeIn(1000, 255, 255, 255)
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.bg_pause = this.add.tileSprite(750, 300, 1500, 600, 'gameover_background');
        this.pressEnterText = this.physics.add.staticGroup();

        this.add.image(750, 300, 'gameover_text'),

        this.anims.create({

            key: 'text_flash',
            frames: this.anims.generateFrameNumbers('pressenter_text', {start: 0, end: 1}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({

            key: 'text_flash_fast',
            frames: this.anims.generateFrameNumbers('pressenter_text', {start: 0, end: 2}),
            frameRate: 18,
            repeat: -1
        });

        this.pressEnterTextAnims = this.pressEnterText.create(750, 450, 'pressenter_text').setVisible(false)
        this.time.delayedCall(1300, () =>{
            this.pressEnterText.setVisible(true)
            this.pressEnterTextAnims.anims.play('text_flash')
        })
        
        this.scoreText = this.add.text(560, 370, 'SCORE: 0', { fontFamily:'HUDfont', fontSize: '46px', fill: '#fcfc00' }).setVisible(false);
        this.scoreText.setText(`YOUR SCORE: ${this.score}`).setVisible(true)
        console.log("Created game over's text and background!")

        this.sound.add('continue')
        const music = this.sound.add('gameOver_music')
        music.loop = true
        this.time.delayedCall(1000, () => {
            music.play()
            this.input.keyboard.on('keydown-ENTER', () =>
                {
                    if(!this.fastFlash){
                        this.scoreText.setVisible(false)
                        this.fastFlash = true
                        this.sound.play('continue')
                        console.log('Restarting game...')
                        music.stop()
                        this.time.delayedCall(2000, () => {
                                this.cameras.main.fadeOut(1000)
                                this.time.delayedCall(1000, () => {
                                this.scene.switch('stage')
                                this.scene.stop('gameover')
                            })
                        })
                    }
                });
        })

    }
    update ()
    {

        if(this.fastFlash){
            this.pressEnterTextAnims.anims.play('text_flash_fast', true)
        }

        this.bg_pause.tilePositionY -= 0.5;

    }


    
}