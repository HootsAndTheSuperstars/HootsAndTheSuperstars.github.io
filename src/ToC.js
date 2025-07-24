export class ToC extends Phaser.Scene{

    constructor (){

        super({key: 'ToC'});
    }
    init(){
        this.fastFlash = false;
        this.errorText;
    }
    preload (){
        this.load.image('ToC', 'assets/ToC.png')
        this.load.audio('accept', 'assets/sounds/continue.wav')
    }

    create ()
    {
        console.log("The ToC right now is not available...")
        this.add.image(750, 300, 'ToC')
        this.input.once('pointerdown', function()
        {
            this.sound.add('accept')
            this.sound.play('accept')
            this.time.delayedCall(2000, () =>{
                this.cameras.main.fadeOut(1000)
                this.time.delayedCall(1000, () => {
                    this.scene.switch('stage')
                })
            })
                
        }, this); 

    
    }

}