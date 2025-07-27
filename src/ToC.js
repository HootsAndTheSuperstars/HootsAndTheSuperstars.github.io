export class ToC extends Phaser.Scene{

    constructor (){

        super({key: 'ToC'});
    }
    init(){
        this.fastFlash = false;
        this.errorText;
        this.desktopCheck = false
        this.checkForBoot = false
    }
    preload (){
        this.load.image('ToC', 'assets/ToC/ToC.png')
        this.load.spritesheet('ToC_button', 'assets/ToC/ToC_button.png', {frameWidth: 278, frameHeight: 70})
        this.load.audio('accept', 'assets/sounds/continue.wav')
    }

    create ()
    {
        console.log("The ToC right now is not available...")
        this.add.image(750, 300, 'ToC')

        this.anims.create({
            key: 'button_flash',
            frames: this.anims.generateFrameNumbers('ToC_button', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'button_color1',
            frames: [ { key: 'ToC_button', frame: 0 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'button_color2',
            frames: [ { key: 'ToC_button', frame: 1 } ],
            frameRate: 10,
            repeat: -1
        });

        this.tocButton = this.physics.add.staticGroup()


        this.tocButtonAnims = this.tocButton.create(750, 490, 'ToC_button').setVisible(false)
        this.tocButtonAnims.setInteractive()
        this.time.delayedCall(1300, () =>{
            this.tocButtonAnims.setVisible(true)
        })

        
        this.tocButtonAnims.on('pointerover', () => {
            if(!this.fastFlash){
                this.tocButtonAnims.anims.play('button_color2')
                this.game.canvas.style.cursor = 'pointer'
            }
        })
        this.tocButtonAnims.on('pointerout', () => {
            if(!this.fastFlash){
                this.tocButtonAnims.anims.play('button_color1')
                this.game.canvas.style.cursor = 'default'
            }
        })
        

        


        this.tocButtonAnims.once('pointerdown', function()
        {
            console.log('Click! you have accepted the ToC')
            this.game.canvas.style.cursor = 'default'
            this.fastFlash = true
            this.tocButtonAnims.input.useHandCursor = false
            this.sound.add('accept')
            this.sound.play('accept')
            this.tocButtonAnims.anims.play('button_flash')
            this.time.delayedCall(2000, () =>{
                this.cameras.main.fadeOut(1000)
                this.time.delayedCall(1000, () => {
                    if(this.game.device.os.desktop && !this.checkForBoot){
                        this.checkForBoot = true
                        this.scene.switch('titlescreen')
                    }
                    else if(!this.game.device.os.desktop){
                        if(this.desktopCheck){
                            this.desktopCheck = true
                            this.scene.launch('error', {
                                desktopCheck: this.desktopCheck,
                            })
                            this.scene.stop('ToC')
                        }
                    }
                })
            })
                
        }, this); 
        console.log('Boot screen created\n This should make the audio actually play when you click the button')
    
    }

}