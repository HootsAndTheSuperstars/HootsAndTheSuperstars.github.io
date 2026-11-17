import { globalFunctions } from "../globalFunctions/globalFunctions.js";
import { InputManager } from "../globalFunctions/inputManager.js";
import { CharacterRegistry } from "../objects/characters/characterManager.js";


export class treeStar extends Phaser.Scene{

    constructor (){

        super({key: 'tree'});
    }
    init(data){
        this.selectedChar = data.selectedChar
    }
    create(){

        this.globalFunctions = globalFunctions
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
        this.inputManager = new InputManager(this); //setup of the inputs, internally
        this.gameOver = false
        this.cameras.main.fadeIn(500)

        this.ominousMusic = this.sound.add('tree')
        this.ominousMusic.loop = true
        
        
 
        this.ominousMusic.play()
        
        //background
        this.background = this.add.tileSprite(750, 200, 1500, 586, 'background_doubt').setTint(0x90006c);
        this.collect = this.physics.add.staticGroup()

        this.collectEgg = this.collect.create(580, 480, 'star')
        //Sounds
        
        this.jumpSound = this.sound.add('jump')
        this.skiddSound = this.sound.add('skidd')
        this.activeStomp = this.sound.add('stomp_activate')
        this.starSound = this.sound.add('star_get')

        //Controls


        this.invisiblePlatform = this.physics.add.staticGroup()

        this.invisiblePlatformHandler = this.invisiblePlatform.create(450, 500, 'aPixelOfNothing')

        this.invisiblePlatformHandler.setSize(1000, 16)
        //player info and allat
        this.bombs = this.physics.add.group()

        //player info and allat
        const startingChar = CharacterRegistry[this.selectedChar]
        if (startingChar) {
            this.player = new startingChar(this, 30, 450, this.selectedChar);
        }

         this.bombPlayerCollider = this.physics.add.overlap(this.player, this.bombs, (player, bomb) => { 
            globalFunctions.hitBomb(this, this.player, bomb)
            this.player.smashBomb(this)
        }, null, this);

        this.physics.add.collider(this.player, this.invisiblePlatform)
        this.add.image(600, 308, 'tree')

        this.physics.add.overlap(this.player, this.collectEgg, ()=>{ this.collected() }, null, this)

       
    }
    update(){
        this.background.tilePositionX += 0.2
        this.background.tilePositionY -= 0.2
        
        if(this.player.x < -3){
            this.player.x = 930
        }

        if (this.player.x > 935){
            this.player.x = 3 
        }
        this.physics.world.wrap(this.player, 600)
        if(this.player.y > 520){
            this.player.y = 490
            this.player.charstateAbility = false
        }
        this.player.update(this);

    }
    collected(){
        this.collectEgg.destroy()
        this.starSound.play()
        this.ominousMusic.stop()
        this.time.delayedCall(300, ()=>{
            this.physics.pause()
            this.gameOver = true
            this.cameras.main.fadeOut(0, 0, 0, 0x000000)
            this.time.delayedCall(1800, ()=>{
                this.scene.launch('menu')
                this.scene.stop('tree')
            })
        })

    }
}