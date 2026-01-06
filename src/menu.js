export class Menu extends Phaser.Scene{

    constructor (){

        super({key: 'menu'});
    }
    init(){
        this.singlePlayerSel = false
        this.multiPlayerSel = false
        this.optionsSel = false
        this.tutorialSel = false
        this.buttonCooldownX = false
        this.buttonCooldownY = false
        this.buttonLock = true
        this.continuePlayed = false
        this.invalidPlayed = false
        this.dupPreventer = false
    }
    create ()
    {
        this.mainMenuTrack = this.sound.add("mainMenu")
        this.mainMenuTrack.loop = true
        this.mainMenuTrackmusicFadeOut = this.tweens.add({
            targets:  this.mainMenuTrack,
            volume:   0,
            duration: 1000,
            paused: true
        });
        this.input.keyboard.on('keydown-S', () =>
        {
            if(!this.dupPreventer){
                console.log("Leaving so soon?\n Going back to the title screen")
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
                    console.log("Use the S key brub\n Going back to the title screen")
                    this.mainMenuTrack.pause()
                    this.dupPreventer = true
                    this.scene.launch('titlescreen')
                    this.scene.stop('menu')
                    }
                )
            }
                
        })
        this.cameras.main.fadeIn(1000)
        this.bg_menu = this.add.tileSprite(750, 300, 1500, 600, 'menu_background');
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
        console.log("Keybinds created spud!")
        this.selecting = this.sound.add('select')
        this.sound.add('continue')
        this.sound.add('invalid')
        this.sound.add('beep')
        

        this.anims.create({
            key: 'button_flash',
            frames: this.anims.generateFrameNumbers('ToC_button', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'button_1',
            frames: [ { key: 'menu_buttons', frame: 0 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'button_2',
            frames: [ { key: 'menu_buttons', frame: 1 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'button_3',
            frames: [ { key: 'menu_buttons', frame: 2 } ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'button_4',
            frames: [ { key: 'menu_buttons', frame: 3 } ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'selecter_flash',
            frames: this.anims.generateFrameNumbers('menu_selecter', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'selecter',
            frames: this.anims.generateFrameNumbers('menu_selecter', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        this.arrowLeft = this.add.tileSprite(750, 50, 1500, 48, 'menu_arrowH').setFlipX(true);
        this.arrowRight = this.add.tileSprite(750, 550, 1500, 48, 'menu_arrowH');

        
        this.arrowDown = this.add.tileSprite(50, 300, 48, 600, 'menu_arrow');
        this.arrowUp = this.add.tileSprite(1450, 300, 48, 600, 'menu_arrow').setFlipY(true);





        this.Buttons = this.physics.add.staticGroup().setVisible(false)


        this.singlePlayerButton = this.Buttons.create(594, 249, 'menu_buttons')
        this.optionsButton = this.Buttons.create(594, 349, 'menu_buttons')
        this.multiPlayerButton = this.Buttons.create(904, 249, 'menu_buttons')
        this.tutorialButton = this.Buttons.create(904, 349, 'menu_buttons')


        //this.singlePlayerButton this.multiPlayerButton this.optionsButton this.tutorialButton


        this.singlePlayerButton.setInteractive() 
        this.multiPlayerButton.setInteractive() 
        this.optionsButton.setInteractive() 
        this.tutorialButton.setInteractive() 

        this.singlePlayerButton.anims.play('button_1')
        this.multiPlayerButton.anims.play('button_2')
        this.optionsButton.anims.play('button_3')
        this.tutorialButton.anims.play('button_4')


        this.selectorPhysics = this.physics.add.group();

        this.selector = this.selectorPhysics.create(0, 0, 'selecter').setVisible(false)


        this.time.delayedCall(1300, () =>{
            this.mainMenuTrack.play()
            this.Buttons.setVisible(true)
            this.time.delayedCall(500, () =>{
                this.singlePlayerSel = true
                this.selector.anims.play('selecter').setVisible(true)
                this.buttonLock = false
                this.sound.play('beep')
                console.log("You should see the buttons and the selector now...")
            })
        })
        


        this.hopOnAnim = this.add.image(750, -270, 'hopon_dev')

        this.hopOnUp = this.tweens.add({
            targets: this.hopOnAnim,
            y: '+=570',
            ease: 'Power2',
            paused: true
        });

        this.hopOnOut = this.tweens.add({
            targets: this.hopOnAnim,
            y: '-=570',
            ease: 'Power2',
            paused: true
        });


        console.log('Main Menu created!')
    
    }
    update (){


        this.arrowDown.tilePositionY -= 1;
        this.arrowUp.tilePositionY -= 1;

        this.arrowLeft.tilePositionX -= 1;
        this.arrowRight.tilePositionX -= 1;

        this.bg_menu.tilePositionX -= 0.2;

        if(this.hopOnExecute){
            this.hopOnUp.play()
            this.hopOnExecute = false
            this.buttonLock = true
            this.time.delayedCall(2500, () =>{
                this.hopOnUp.stop()
                this.hopOnOut.play()
                this.buttonLock = false
                this.invalidPlayed = false
            })
        }
        if(!this.buttonLock){

            if((this.keyENTER.isDown || this.keyD.isDown || this.keySPACE.isDown) && !this.dupPreventer){
                if(this.singlePlayerSel){
                    this.dupPreventer = true
                    if(this.mainMenuTrack.isPlaying){
                        this.mainMenuTrack.stop()
                        console.log("Singleplayer will be!\n Starting main game...")
                    }
                    this.selector.anims.play('selecter_flash')
                    if(!this.continuePlayed){
                        this.continuePlayed = true
                        this.sound.play('continue')
                    }
                    this.time.delayedCall(1000, () =>{
                        this.cameras.main.fadeOut(1000)
                        this.time.delayedCall(2000, ()=>{
                            this.scene.launch('stage')
                            this.scene.stop('menu')
                        })
                    })
                }
                else{
                    this.hopOnExecute = true
                    if(!this.invalidPlayed){
                        console.warn("The developer has a nap. Hold out! developer!\n This will be available in the future")
                        this.invalidPlayed = true
                        this.sound.play('invalid')
                    }
                }
            }

            if((this.cursors.left.isDown || this.cursors.right.isDown) && !this.buttonCooldownX){
                this.buttonCooldownX = true
                if(this.singlePlayerSel){
                    this.multiPlayerSel = true
                    this.singlePlayerSel = false
                }
                else if(this.multiPlayerSel){
                    this.singlePlayerSel = true
                    this.multiPlayerSel = false
                }
                else if(this.optionsSel){
                    this.tutorialSel = true
                    this.optionsSel = false
                }
                else if(this.tutorialSel){
                    this.tutorialSel = false
                    this.optionsSel = true
                }
                if(!this.selecting.isPlaying){
                    this.selecting.play()
                }
                else if(this.selecting.isPlaying){
                    this.selecting.stop()
                    this.selecting.play()
                }
                this.time.delayedCall(300, () =>{
                    this.buttonCooldownX = false
                })
            }

            if((this.cursors.up.isDown || this.cursors.down.isDown) && !this.buttonCooldownY){
                this.buttonCooldownY = true
                if(this.singlePlayerSel){
                    this.optionsSel = true
                    this.singlePlayerSel = false
                }
                else if(this.multiPlayerSel){
                    this.tutorialSel = true
                    this.multiPlayerSel = false
                }
                else if(this.optionsSel){
                    this.singlePlayerSel = true
                    this.optionsSel = false
                }
                else if(this.tutorialSel){
                    this.tutorialSel = false
                    this.multiPlayerSel = true
                }
                if(!this.selecting.isPlaying){
                    this.selecting.play()
                }
                else if(this.selecting.isPlaying){
                    this.selecting.stop()
                    this.selecting.play()
                }
                this.time.delayedCall(300, () =>{
                    this.buttonCooldownY = false
                })
            }
        }

        if(this.singlePlayerSel){
            Phaser.Display.Align.In.Center(this.selector, this.singlePlayerButton)
            console.log("Cursor on Singleplayer")
        }
        else if(this.multiPlayerSel){
            Phaser.Display.Align.In.Center(this.selector, this.multiPlayerButton)
            console.log("Cursor on Multiplayer")
        }
        else if(this.optionsSel){
            Phaser.Display.Align.In.Center(this.selector, this.optionsButton)
            console.log("Cursor on Options")
        }
        else if(this.tutorialSel){
            Phaser.Display.Align.In.Center(this.selector, this.tutorialButton)
            console.log("Cursor on Tutorial")
        }

    }
}