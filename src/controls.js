import { ObjPlayer } from "./objects/player.js";

export class controlsScreen extends Phaser.Scene{

    constructor (){

        super({key: 'controlsScreen'});
    }
    create(){
        this.cameras.main.fadeIn(500)

        this.controlRoomMusic = this.sound.add('controlsRoom')
        this.controlRoomMusic.loop = true
        this.controlRoomMusicIntro = this.sound.add('controlsRoomIntro')
        this.controlRoomMusicIntro.play()
        
        this.controlRoomMusicIntro.on('complete', () => {
            this.controlRoomMusic.play() // Play again
        });


        this.input.keyboard.on('keydown-ENTER', () =>
        {
            this.controlRoomMusicIntro.stop()
            this.controlRoomMusic.stop()
            this.scene.stop('controlsScreen')
            this.scene.launch('menu')

        });
        //background
        this.background = this.add.tileSprite(750, 300, 1500, 600, 'pause_background');

        //Sounds
        this.jumpSound = this.sound.add('jump')
        this.skiddSound = this.sound.add('skidd')
        this.activeStomp = this.sound.add('stomp_activate')

        //Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);



        this.keysHUD = this.physics.add.staticGroup()

        this.HUDkeyS = this.keysHUD.create(180, 200, 'keys').anims.play('keyS_up')
        this.HUDkeyD = this.keysHUD.create(260, 200, 'keys').anims.play('keyD_up')
        this.HUDkeySpace = this.keysHUD.create(450, 200, 'keySpace').anims.play('keySpace_up')
        this.HUDcursorLeft = this.keysHUD.create (640, 200, 'keys').anims.play('cursorLeft_up')
        this.HUDcursorUp = this.keysHUD.create (720, 150, 'keys').anims.play('cursorUp_up')
        this.HUDcursorDown = this.keysHUD.create (720, 200, 'keys').anims.play('cursorDown_up')
        this.HUDcursorRight = this.keysHUD.create (800, 200, 'keys').anims.play('cursorRight_up')

        this.invisiblePlatform = this.physics.add.staticGroup()

        this.invisiblePlatformHandler = this.invisiblePlatform.create(450, 500, 'aPixelOfNothing')

        this.invisiblePlatformHandler.setSize(1000, 16)


        this.add.image(180, 110, 'holdToRun')
        this.jump1 = this.add.sprite(280, 130, 'jump')
        this.jump2 = this.add.sprite(500, 130, 'jump')
        this.add.image(750, 90, 'move')
        
        


        this.time.delayedCall(1000, ()=>{
            this.add.image(450, 320, 'tutorial')
        })
        this.player = new ObjPlayer(this, 450, 450);
        this.time.delayedCall(10000, ()=>{
            this.add.image(450, 530, 'enterToPlay')
        })
        this.physics.add.collider(this.player, this.invisiblePlatform)

        this.input.keyboard.on('keydown-S', ()=>{
            this.HUDkeyS.anims.play('keyS_down', true)
        })
        this.input.keyboard.on('keyup-S', ()=>{
            this.HUDkeyS.anims.play('keyS_up', true)
        });

        this.input.keyboard.on('keydown-D', ()=>{
            this.HUDkeyD.anims.play('keyD_down', true)
        })
        this.input.keyboard.on('keyup-D', ()=>{
            this.HUDkeyD.anims.play('keyD_up', true)
        });

        this.input.keyboard.on('keydown-SPACE', ()=>{
            this.HUDkeySpace.anims.play('keySpace_down', true)
        })
        this.input.keyboard.on('keyup-SPACE', ()=>{
            this.HUDkeySpace.anims.play('keySpace_up', true)
        });

        this.input.keyboard.on('keydown-LEFT', ()=>{
            this.HUDcursorLeft.anims.play('cursorLeft_down', true)
        })
        this.input.keyboard.on('keyup-LEFT', ()=>{
            this.HUDcursorLeft.anims.play('cursorLeft_up', true)
        });

        this.input.keyboard.on('keydown-UP', ()=>{
            this.HUDcursorUp.anims.play('cursorUp_down', true)
        })
        this.input.keyboard.on('keyup-UP', ()=>{
            this.HUDcursorUp.anims.play('cursorUp_up', true)
        });

        this.input.keyboard.on('keydown-RIGHT', ()=>{
            this.HUDcursorRight.anims.play('cursorRight_down', true)
        })
        this.input.keyboard.on('keyup-RIGHT', ()=>{
            this.HUDcursorRight.anims.play('cursorRight_up', true)
        });
        this.input.keyboard.on('keydown-DOWN', ()=>{
            this.HUDcursorDown.anims.play('cursorDown_down', true)
        })
        this.input.keyboard.on('keyup-DOWN', ()=>{
            this.HUDcursorDown.anims.play('cursorDown_up', true)
        });
    }
    update(){
        /*
        if(this.keyA.isDown)
            if(!this.player.body.onFloor()){
                    this.HUDkeyA.anims.play('keyA_down', true)
            }
            else{
                this.HUDkeyA.anims.play('keyANA_down', true)
            }
        
        else if(!this.keyA.isDown){
            if(!this.player.body.onFloor()){
                this.HUDkeyA.anims.play('keyA_up', true)
            }
            else{
                this.HUDkeyA.anims.play('keyANA_up', true)
            }
        };

        if(this.cursors.down.isDown)
            if(!this.player.body.onFloor()){
                    this.HUDcursorDown.anims.play('cursorDown_down', true)
            }
            else{
                this.HUDcursorDown.anims.play('cursorDownNA_down', true)
            }
        
        else if(!this.cursors.down.isDown){
            if(!this.player.body.onFloor()){
                this.HUDcursorDown.anims.play('cursorDown_up', true)
            }
            else{
                this.HUDcursorDown.anims.play('cursorDownNA_up', true)
            }
        };
        */

        if(!this.player.body.onFloor()){
            this.jump1.setTexture('ability')
            this.jump2.setTexture('ability')
        }
        else{
            this.jump1.setTexture('jump')
            this.jump2.setTexture('jump')
        }

        if(this.player.charstateAbility){
            this.HUDkeyD.setTint(0x48486c)
            this.HUDkeySpace.setTint(0x48486c)
            this.HUDcursorLeft.setTint(0x48486c)
            this.HUDcursorUp.setTint(0x48486c)
            this.HUDcursorDown.setTint(0x48486c)
            this.HUDcursorRight.setTint(0x48486c)
        }
        else{
            if(this.player.jumpFatigue){
                this.HUDkeyD.setTint(0x48486c)
                this.HUDkeySpace.setTint(0x48486c)
            }
            else{
                this.HUDkeyD.clearTint()
                this.HUDkeySpace.clearTint()
            }
            if(this.player.body.onFloor()){
                this.HUDcursorLeft.clearTint()
                this.HUDcursorUp.clearTint()
                this.HUDcursorDown.clearTint()
                this.HUDcursorRight.clearTint()
            }
        }
        this.background.tilePositionX += 0.2
        this.background.tilePositionY += 0.2
        
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
}