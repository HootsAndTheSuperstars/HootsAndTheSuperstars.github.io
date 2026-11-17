import { globalFunctions } from "./globalFunctions/globalFunctions.js";
import { InputManager } from "./globalFunctions/inputManager.js";

export class Menu extends Phaser.Scene{

    constructor (){

        super({key: 'menu'});
    }
    init(){
        this.menuStateStage = false
        this.menuStateChar = true
        this.arrowExpand = true
        this.arrowContract = false
        this.arrowMovementCount = 0
        this.dupPreventer = false
        this.flashing = false
        this.portraitList = [
            "controlsScreen", 
            "stage_noon", 
            "stage_doubt"
        ]
        this.portraitIndex = 1
        this.currentPortrait = this.portraitList[this.portraitIndex]
        this.charList = [
            "hoots",
            "abby"
        ]
        this.charIndex = 0
        this.currentChar = this.charList[this.charIndex]
    }
    create ()
    {
        this.selectSFX = this.sound.add('select')
        this.checkSFX = this.sound.add('check')
        this.sound.add('beep')
        //Controls
        this.globalFunctions = globalFunctions
        
        this.inputManager = new InputManager(this); //setup of the inputs, internally
        this.physics.world.setBounds(20, 0, 900, 600)


        this.mainMenuTrack = this.sound.add("mainMenu")
        this.mainMenuTrack.loop = true
        this.mainMenuTrackmusicFadeOut = this.tweens.add({
            targets:  this.mainMenuTrack,
            volume:   0,
            duration: 1000,
            paused: true
        });
        this.mainMenuTrack.play()
        
        this.cameras.main.fadeIn(1000)
        this.bg_menu = this.add.tileSprite(750, 300, 1500, 600, 'stageSelectBackground');
        this.playerColorMenu = this.add.image(3000, 300, "lineSSBackground")
        //this.playerColorMenu = this.add.image(450, 300, "lineSSBackground")
        this.selectTextTILESPRITE = this.add.tileSprite(750 , 550, 1500, 80, 'selectText')
        this.stageTextTILESPRITE = this.add.tileSprite(750 , 50, 1500, 80, 'stageText');

       // this.selectingChar = this.add.sprite(200, 300, 'menu_hoots')
        this.charSprite = this.add.sprite(450, 300, 'menu_hoots')
        
        this.portraits = this.add.sprite(3030, 300, 'stagePortraits')
        //this.portraits = this.add.sprite(630, 300, 'stagePortraits')

        //this.arrowLeft = this.add.sprite(460, 250, "arrowLeft")
        //this.arrowRight = this.add.sprite(800, 350, "arrowRight")
        this.arrowLeft = this.add.sprite(250, 250, "arrowLeft")
        this.arrowRight = this.add.sprite(700, 350, "arrowRight")



    }
    update (){  

        if(this.currentChar === "hoots"){
            this.playerColorMenu.setTint(0xd80000)
        }
        else if(this.currentChar === "abby"){
            this.playerColorMenu.setTint(0xd890d8)
        }
        else{
            this.playerColorMenu.clearTint()
        }

        if((this.inputManager.backINST() || this.inputManager.bINST()) && !this.menuCooldown){

            if(this.menuStateChar){
                if(!this.dupPreventer){
                    this.dupPreventer = true
                    this.sound.play('beep')
                    this.cameras.main.fadeOut(1000)
                    this.mainMenuTrackmusicFadeOut.play()
                    this.time.delayedCall(1500, () =>{
                        this.mainMenuTrack.pause()
                        this.scene.launch('titlescreen')
                        this.scene.stop('menu')
                        }
                    )
                } 
            }
            else if(this.menuStateStage){
                this.backToCharSelect()
            }
        
        }

        if(this.inputManager.aINST() || this.inputManager.cINST() || this.inputManager.startINST()){
            if(this.menuStateChar)
                this.charSelected()
            else if(this.menuStateStage)
                this.stageSelected()
        }
        this.charSprite.setTexture(Phaser.Utils.String.Format('menu_%1', [this.currentChar]))
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
            if(this.inputManager.leftINST()){
                this.arrowLeft.setScale(0.7).setTint(0xfcfc00)
            }
            else{
                this.arrowLeft.setScale(1).clearTint()
            }
            if(this.inputManager.rightINST()){
                this.arrowRight.setScale(0.7).setTint(0xfcfc00)
            }
            else{
                this.arrowRight.setScale(1).clearTint()
            }

            if((this.inputManager.leftINST() || this.inputManager.rightINST()) && !this.menuCooldown){
                this.menuCooldown = true
                this.selectSFX.play()

                if(this.menuStateChar){

                    if(this.inputManager.rightINST()){
                        this.charIndex++;
            
                        
                        if (this.charIndex >= this.charList.length) {
                            this.charIndex = 0;
                        }
                    }
                    else if (this.inputManager.leftINST()){
                        this.charIndex--;
            
                        if (this.charIndex < 0) {
                            this.charIndex = this.charList.length - 1;
                        }
                    }
                    this.currentChar = this.charList[this.charIndex]
                }

                else if(this.menuStateStage){
                    this.treeProb = Phaser.Math.Between(1, 50)
                    if(this.treeProb == 6 && !this.portraitList.includes("tree")){
                        this.portraitList.push("tree")
                    }

                    if(this.inputManager.rightINST()){
                        this.portraitIndex++;
            
                        
                        if (this.portraitIndex >= this.portraitList.length) {
                            this.portraitIndex = 0;
                        }
                    }
                    else if (this.inputManager.leftINST()){
                        this.portraitIndex--;
            
                        if (this.portraitIndex < 0) {
                            this.portraitIndex = this.portraitList.length - 1;
                        }
                    }
                    this.currentPortrait = this.portraitList[this.portraitIndex]
                }

                this.time.delayedCall(200, ()=>{
                    this.menuCooldown = false
                })
            }
        }


        if (this.flashing){
            if(this.flashOn){
                this.flashOn = false
                this.charSprite.setAlpha(0)
                this.time.delayedCall(50, ()=>{
                    this.charSprite.setAlpha(1)
                    this.time.delayedCall(50, ()=>{
                        this.flashOn = true
                    })
                })
            }
        }
        else if(!this.flashing)
            this.charSprite.setAlpha(1);

        if(this.menuStateChar)
            this.stageTextTILESPRITE.setTexture('characterText')
        else if(this.menuStateStage)
            this.stageTextTILESPRITE.setTexture('stageText')
    }

    stageSelected(){
        if(!this.dupPreventer){
                this.dupPreventer = true
                this.mainMenuTrack.stop()
                this.checkSFX.play()
                this.cameras.main.fadeOut(1000)
                this.time.delayedCall(1500, () =>{
                    this.scene.launch(Phaser.Utils.String.Format('%1', [this.currentPortrait]), {
                        selectedChar: this.currentChar
                    })
                    this.scene.stop('menu')
                    }
                )
            }
    }
    charSelected(){

        // tweens
        if(!this.dupPreventer){
            this.dupPreventer = true
            this.moveCharSelect = this.tweens.add({
                targets: this.charSprite,
                x: 200,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
            });

            this.movePlayercolorHere = this.tweens.add({
                targets: this.playerColorMenu,
                x: 450,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
            });

            this.moveStagePortraitsHere = this.tweens.add({
                targets: this.portraits,
                x: 630,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
                onComplete: () =>{
                    this.menuCooldown = false
                    this.dupPreventer = false
                }
            });
            this.moveArrowLeft = this.tweens.add({
                targets: this.arrowLeft,
                x: 460,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
                
            });
            this.moveArrowRight = this.tweens.add({
                targets: this.arrowRight,
                x: 800,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
                
            });

            
            //the movement and allat
            this.flashing = true
            this.flashOn = true
            this.menuCooldown = true
            this.checkSFX.play()
            this.time.delayedCall(500, ()=>{
                this.moveArrowLeft.play()
                this.moveArrowRight.play()
                this.moveCharSelect.play()
                this.movePlayercolorHere.play()
                this.flashing = false
                this.menuStateChar = false
                this.menuStateStage = true
                this.time.delayedCall(100, ()=>{
                    this.moveStagePortraitsHere.play()
                })

            })
        }
    }
    backToCharSelect(){
        //tweens
        if(!this.dupPreventer){
            this.sound.play('beep')
            this.dupPreventer = true
            this.moveCharBack = this.tweens.add({
                targets: this.charSprite,
                x: 450,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
            });

            this.movePlayercolorOutside = this.tweens.add({
                targets: this.playerColorMenu,
                x: 3000,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
            });
            this.moveStagePortraitsOut = this.tweens.add({
                targets: this.portraits,
                x: 3030,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
                
            });

            this.moveArrowLeft = this.tweens.add({
                targets: this.arrowLeft,
                x: 250,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,

                
            });
            this.moveArrowRight = this.tweens.add({
                targets: this.arrowRight,
                x: 700,
                duration: 1000, 
                ease: 'Power2', 
                paused: true,
                onComplete: () =>{
                    this.menuCooldown = false
                    this.dupPreventer = false
                }
                
            });
            //allat
            this.menuCooldown = true
            this.moveCharBack.play()
            this.movePlayercolorOutside.play()
            this.moveStagePortraitsOut.play()
            this.moveArrowLeft.play()
            this.moveArrowRight.play()
            this.menuStateChar = true
            
        }
    }
}