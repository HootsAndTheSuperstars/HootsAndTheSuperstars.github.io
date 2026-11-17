import { InputManager } from "./globalFunctions/inputManager.js";

export class GameOver extends Phaser.Scene{

    constructor (){

        super({key: 'gameover'});
    }
    init(data){
        this.score = data.score;
        this.stageName = data.stageName;
        this.fastFlash = false;
        this.canRetry = false
        this.pressEnterText;
    }

    create ()
    {
        this.inputManager = new InputManager(this); //setup of the inputs, internally

        this.scene.stop(Phaser.Utils.String.Format('%1', [this.stageName]))
        this.cameras.main.fadeIn(1000, 255, 255, 255)
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.bg_gameover = this.add.tileSprite(450, 300, 940, 600, 'gameover_background');
        this.pressEnterText = this.physics.add.staticGroup();
        this.escReturnText = this.physics.add.staticGroup();

        this.gameOverText = this.add.image(450, 250, 'gameover_text'),

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

        this.anims.create({

            key: 'text_return_flash',
            frames: this.anims.generateFrameNumbers('returnTitle', {start: 0, end: 1}),
            frameRate: 18,
            repeat: -1
        });




        this.pressEnterTextAnims = this.pressEnterText.create(450, 400, 'pressenter_text').setVisible(false)
        this.escReturnTextAnims = this.escReturnText.create(450, 450, 'returnTitle').setVisible(false)


        this.time.delayedCall(1300, () =>{
            this.pressEnterText.setVisible(true)
            this.escReturnText.setVisible(true)
            this.pressEnterTextAnims.anims.play('text_flash')
        })
        
        this.scoreText = this.add.text(450, 350, 'SCORE: 0', { fontFamily:'HUDfont', fontSize: '46px', fill: '#fcfc00' }).setVisible(false).setOrigin(0.5, 0.5);
        this.scoreText.setText(`YOUR SCORE: ${this.score}`).setVisible(true)
        console.log("Created game over's text and background!")

        this.sound.add('continue')
        this.sound.add('hurt_shield')

        this.music = this.sound.add('gameOver')
        this.music.loop = true
        this.time.delayedCall(1000, () => {
            this.music.play()
            this.canRetry = true
        })

    }
    update ()
    {
        if(this.canRetry){
            if(this.inputManager.startINST() && !this.fastFlash){
                
                this.pressEnterTextAnims.anims.play('text_flash_fast', true)
                this.gameOverText.setVisible(false)
                this.scoreText.setVisible(false)
                this.escReturnText.setVisible(false)
                this.fastFlash = true
                this.sound.play('continue')
                this.music.stop()
                this.time.delayedCall(2000, () => {
                    this.cameras.main.fadeOut(1000)
                    this.time.delayedCall(1000, () => {
                        this.scene.switch(Phaser.Utils.String.Format('%1', [this.stageName]))
                        this.scene.stop('gameover')
                    })
                })
                
            }
            else if(this.inputManager.backINST() && !this.fastFlash){
                this.gameOverText.setVisible(false)
                this.scoreText.setVisible(false)
                this.pressEnterTextAnims.setVisible(false)
                this.escReturnTextAnims.anims.play('text_return_flash')
                this.fastFlash = true
                this.sound.play('hurt_shield')
                this.music.stop()
                this.time.delayedCall(2000, () => {
                    this.cameras.main.fadeOut(1000)
                    this.time.delayedCall(1000, () => {
                        this.scene.switch('menu')
                        this.scene.stop('gameover')
                    })
                })
                    
            }
        }
        this.bg_gameover.tilePositionY -= 0.5;

    }


    
}