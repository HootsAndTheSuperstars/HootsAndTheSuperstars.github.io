export class Menu extends Phaser.Scene{

    constructor (){

        super({key: 'menu'});
    }
    init(){
        this.arrowExpand = true
        this.arrowContract = false
        this.arrowMovementCount = 0
        this.dupPreventer = false
        this.portraitList = [
            "controlsScreen", 
            "stage_noon", 
            "stage_doubt"
        ]
        this.portraitIndex = 1
        this.currentPortrait = this.portraitList[this.portraitIndex]
    }
    create ()
    {
        this.selectSFX = this.sound.add('select')
        this.checkSFX = this.sound.add('check')
        //Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);


        this.mainMenuTrack = this.sound.add("mainMenu")
        this.mainMenuTrack.loop = true
        this.mainMenuTrackmusicFadeOut = this.tweens.add({
            targets:  this.mainMenuTrack,
            volume:   0,
            duration: 1000,
            paused: true
        });
        this.mainMenuTrack.play()
        this.input.keyboard.on('keydown-S', () =>
        {
            if(!this.dupPreventer){
                this.cameras.main.fadeOut(1000)
                this.mainMenuTrackmusicFadeOut.play()
                this.time.delayedCall(1500, () =>{
                    this.mainMenuTrack.pause()
                    this.dupPreventer = true
                    this.scene.launch('titlescreen')
                    this.scene.stop('menu')
                    }
                )
            }
                
        })
        this.input.keyboard.on('keydown-ESC', () =>
        {
            if(!this.dupPreventer){
                this.cameras.main.fadeOut(1000)
                this.mainMenuTrackmusicFadeOut.play()
                this.time.delayedCall(1500, () =>{
                    this.mainMenuTrack.pause()
                    this.dupPreventer = true
                    this.scene.launch('titlescreen')
                    this.scene.stop('menu')
                    }
                )
            }
                
        })

        this.input.keyboard.on('keydown-ENTER', () =>
        {
            this.stageSelected()
                
        })
        this.input.keyboard.on('keydown-SPACE', () =>
        {
            this.stageSelected()
                
        })
        this.input.keyboard.on('keydown-D', () =>
        {
            this.stageSelected()
                
        })
        this.cameras.main.fadeIn(1000)
        this.bg_menu = this.add.tileSprite(750, 300, 1500, 600, 'stageSelectBackground');
        this.playerColorMenu = this.add.image(450, 300, "lineSSBackground")
        this.playerColorMenu.setTint(0xd80000)
        this.selectTextTILESPRITE = this.add.tileSprite(750 , 550, 1500, 80, 'selectText')
        this.stageTextTILESPRITE = this.add.tileSprite(750 , 50, 1500, 80, 'stageText');

        this.add.image(200, 300, 'hootsBig')

        
        this.portraits = this.add.sprite(630, 300, 'stagePortraits')

        this.arrowLeft = this.add.sprite(460, 250, "arrowLeft")
        this.arrowRight = this.add.sprite(800, 350, "arrowRight")

    }
    update (){

        this.portraits.anims.play(Phaser.Utils.String.Format('%1', [this.currentPortrait]))

        this.bg_menu.tilePositionX += 0.1
        this.selectTextTILESPRITE.tilePositionX += 0.8
        this.stageTextTILESPRITE.tilePositionX -= 0.8
        if(!this.dupPreventer){
            if(this.arrowExpand){
                if(this.arrowMovementCount < 8){
                    this.arrowMovementCount += 0.2
                    this.arrowLeft.x += 0.2
                    this.arrowRight.x -= 0.2
                }
                else if(this.arrowMovementCount >= 8){
                    this.arrowExpand = false
                    
                    this.arrowContract = true
                    
                }
            }
            else if(this.arrowContract){
                if(this.arrowMovementCount > 0){
                    this.arrowMovementCount -= 0.2
                    this.arrowLeft.x -= 0.2
                    this.arrowRight.x += 0.2
                }
                else if(this.arrowMovementCount <= 0){
                    this.arrowContract = false
                    this.arrowExpand = true
                    
                }
            }
            if(this.cursors.left.isDown){
                this.arrowLeft.setScale(0.7).setTint(0xfcfc00)
            }
            else{
                this.arrowLeft.setScale(1).clearTint()
            }
            if(this.cursors.right.isDown){
                this.arrowRight.setScale(0.7).setTint(0xfcfc00)
            }
            else{
                this.arrowRight.setScale(1).clearTint()
            }

            if((this.cursors.left.isDown || this.cursors.right.isDown) && !this.menuCooldown){
                this.menuCooldown = true
                this.selectSFX.play()
                this.treeProb = Phaser.Math.Between(1, 10000)
                if(this.treeProb == 66 && !this.portraitList.includes("tree")){
                    this.portraitList.push("tree")
                }

                if(this.cursors.right.isDown){
                    this.portraitIndex++;
        
                    
                    if (this.portraitIndex >= this.portraitList.length) {
                        this.portraitIndex = 0;
                    }
                }
                else if (this.cursors.left.isDown){
                    this.portraitIndex--;
        
                    if (this.portraitIndex < 0) {
                        this.portraitIndex = this.portraitList.length - 1;
                    }
                }
                this.currentPortrait = this.portraitList[this.portraitIndex]
                this.time.delayedCall(200, ()=>{
                    this.menuCooldown = false
                })
            }
        }
    }

    stageSelected(){
        if(!this.dupPreventer){
                this.dupPreventer = true
                this.mainMenuTrack.stop()
                this.checkSFX.play()
                this.cameras.main.fadeOut(1000)
                this.time.delayedCall(1500, () =>{
                    this.scene.launch(Phaser.Utils.String.Format('%1', [this.currentPortrait]))
                    this.scene.stop('menu')
                    }
                )
            }
    }
}