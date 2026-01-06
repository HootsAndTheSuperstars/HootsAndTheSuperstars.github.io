export class ObjPlayer extends Phaser.Physics.Arcade.Sprite {
    init(){
        //this are the character states (ex. walking, facing left... right... etc)
        //This is especially for flipping the sprites, DO NOT REMOVE
        this.facingRight = true;
        this.facingLeft = false;

        //char check
        this.Char1 = true;
        this.Char2 = false;
        this.CharChange = false;

        //background
        //movement spud
        this.charstateWalk = false;
        this.charstateIdle = true;
        this.charstateJump = false;
        this.charstateAbility = false;
        this.charstateFall = false;
        this.charstateHurt = false;
        this.upStun = false;
        this.charstateDead = false;
        this.charstateRun = false;
        this.charstateSkidd = false;
        this.invAfterHit = false;
        this.checkforpreventingSkiddafterStun = false
    }

    constructor (scene, x, y)
    {
        super(scene, x, y, "hoots");
        this.init()
        scene.add.existing(this);
        scene.physics.add.existing(this);
        console.log("Player Created!");
        this.body.setSize(16, 38);
        this.body.setOffset(25, 14);
        console.log("The player's hitbox should be mesured to fit the sprites");
        //  Player physics properties. Give the little guy a slight bounce.
        this.setBounce(0);
        this.body.setGravityY(600);
        this.setCollideWorldBounds(true);
        this.debugBodyColor = 0x9048fc;
        console.log("Player's MISC configs should work now...");
        //  Our player animations, turning, walking left and walking right

    }
    update (cursors, keyA, keyS, keyD, keySPACEBAR, key2, skiddSound, jumpSound, activeStomp, gameOver, time){
        //Updates
        
        //hitbox handler

        if(!this.charstateAbility){
            this.body.setSize(16, 38);
            //this.body.setOffset(25, 14);
        }
        else if (this.charstateAbility){
            this.body.setSize(46, 38);
            //this.body.setOffset(30, 14);
        }

        if(key2.isDown && this.CharChange == false){
            this.CharChange = true
            if(this.Char1){
                this.Char2 = true
                this.Char1 = false
                console.warn('Changing to char2...')
            }
            else if(this.Char2){
                this.Char2 = false
                this.Char1 = true
                console.warn('Changing to char1...')
            }
            time.delayedCall(1000, () =>{
                this.CharChange = false
            })
        }
        //char starts here
        if(!this.charstateDead)
        {
        //states for flipping the char
            if(!this.charstateSkidd){
                if(this.facingLeft == true){
                    this.setFlipX(true);
                    console.log("Fliping player anims to the Left")
                }
                else if(this.facingRight == true){
                    this.setFlipX(false);
                    console.log("Fliping player anims to the Right")
                }
            }

            if(!this.charstateHurt && !this.charstateSkidd){
                if(cursors.left.isDown && !cursors.right.isDown && this.body.velocity.x >= 0){
                    this.facingLeft = true;
                    this.facingRight = false;
                }
                else if(cursors.right.isDown && !cursors.left.isDown && this.body.velocity.x <= 0){
                    this.facingLeft = false;
                    this.facingRight = true;
                }
            else if((cursors.left.isDown && cursors.right.isDown || cursors.left.isDown && cursors.right.isDown)){
                if(this.body.velocity.x > 0){
                    this.facingLeft = false;
                    this.facingRight = true;
                }
                else if(this.body.velocity.x < 0){
                    this.facingLeft = true;
                    this.facingRight = false;
                }
            }

        }

        //now this is where things get spicy

        //states for movement
            if(!this.charstateHurt){
                if(this.charstateWalk && !this.charstateRun && !this.charstateSkidd){
                    console.log("State: Walking");
                    if(this.facingLeft){
                        this.setVelocityX(-160);
                        console.log("Left, normal speed");
                    }
                    else if(this.facingRight){
                        this.setVelocityX(160);
                        console.log("Right, normal speed");                
                    }
                }
                else if(this.charstateRun && this.charstateWalk && !this.charstateSkidd){
                    console.log("State: Running");
                    if(this.facingLeft){
                        this.setVelocityX(-300);
                        console.log("Left, fast speed");
                    }
                    else if(this.facingRight){
                        this.setVelocityX(300);
                        console.log("Right, fast speed");                
                    }
                }
                else if(this.charstateSkidd){
                    console.log("State: Skidding")
                    if(!skiddSound.isPlaying && this.body.onFloor()){
                        skiddSound.play()
                    }
                    else if(!this.body.onFloor()){
                        skiddSound.stop()
                    }
                    if(!this.charstateIdle){
                        if(cursors.left.isDown){
                            this.setAccelerationX(-350);
                            console.log("Pushing right");
                        }
                        else if(cursors.right.isDown){
                            this.setAccelerationX(350);
                            console.log("Pushing left");                
                        }
                    }    
                    else if(this.charstateIdle){
                        if(this.facingLeft){
                            this.setAccelerationX(350);
                            console.log("Pushing right");
                        }
                        else if(this.facingRight){
                            this.setAccelerationX(-350);
                            console.log("Pushing left");                
                        }
                    }             
                }
                else if(this.charstateIdle){
                    this.setAccelerationX(0);
                    this.setAccelerationY(0);
                    this.setVelocityX(0);
                    console.log("State: idle");
                }

                if(this.charstateJump && !this.charstateFall){
                    this.setVelocityY(-490);
                    console.log("State: Jumping");
                }
                else if(this.charstateFall && !this.charstateJump){
                    this.setAccelerationY(900);
                    console.log("State: Falling");
                }
                else if(this.charstateFall && this.charstateJump){
                    this.setAccelerationY(0);
                    console.log("State: Maintaining jump");
                }
                else if(this.charstateAbility){
                    this.setVelocityX(0);
                    this.setVelocityY(1500)
                    console.log("State: Stomp")
                }
            }
            else if(this.charstateHurt){

                console.log("State: Hurt");
                
                if(this.facingLeft){
                    this.setVelocityX(180);
                    console.log("Pushed right");
                }
                else if(this.facingRight){
                    this.setVelocityX(-180);
                    console.log("Pushed left");                
                }
            }
            if (this.upStun){
                this.body.setVelocityY(-200)
                this.charstateHurt = true;
                time.delayedCall(100, () => {
                    this.upStun = false
                })
            }
        }
        else if(this.charstateDead){
            this.setVelocityX(0);
            console.log("State: Dead")
        }
 

        //Keybinds
        if(!this.charstateHurt){
            //general walk
            if(cursors.left.isDown || cursors.right.isDown){
                    this.charstateWalk = true
                if(keyS.isDown && this.body.onFloor()){
                    this.charstateRun = true
                    if((cursors.left.isDown && this.body.velocity.x > 160) || (cursors.right.isDown && this.body.velocity.x < -160)){
                        this.charstateSkidd = true
                    }
                    else if((cursors.left.isDown && this.body.velocity.x < 160) || (cursors.right.isDown && this.body.velocity.x > -160)){
                        this.charstateSkidd = false
                    }
                }
                else if(!keyS.isDown || !this.body.onFloor()){
                    this.charstateRun = false
                    this.charstateSkidd = false
                }
                
            }
            //jumping and falling
            if((cursors.up.isDown || keyD.isDown || keySPACEBAR.isDown) && this.body.onFloor()){
                if(!jumpSound.isPlaying){
                    jumpSound.play()
                }
                this.charstateJump = true;
                this.charstateFall = false;
                this.charstateSkidd = false
            }
            else if(!keyA.isDown && !cursors.down.isDown){
                if((cursors.up.isDown || keyD.isDown || keySPACEBAR.isDown) && !this.body.onFloor() && this.body.velocity.y < -1){
                    this.charstateJump = true;
                    this.charstateFall = true 
                }
                else if(!this.body.onFloor() && (this.body.velocity.y >= -1 && (cursors.up.isDown || keyD.isDown || keySPACEBAR.isDown) || (!cursors.up.isDown || !keyD.isDown || keySPACEBAR.isDown))){
                    this.charstateJump = false;
                    this.charstateFall = true;
                    this.charstateSkidd = false
                }
            }
            else if(!this.body.onFloor() && (keyA.isDown || cursors.down.isDown)){
                if(!this.charstateAbility && this.Char1){
                    this.charstateAbility = true;
                    if(!activeStomp.isPlaying){
                        activeStomp.play()
                    }
                    this.charstateJump = false;
                    this.charstateFall = false;
    
                }

            }
        }

        else if(this.body.onFloor()){
            this.charstateHurt = false;
            time.delayedCall(300, () =>{
                this.checkforpreventingSkiddafterStun = false
            })
        };

        if(!this.charstateHurt){
            if((this.body.onFloor() && (!cursors.up.isDown && !keyD.isDown || keySPACEBAR.isDown)|| !this.body.onFloor()) && (!cursors.left.isDown && !cursors.right.isDown || cursors.left.isDown && cursors.right.isDown) || (this.body.velocity.x == 0 && (this.body.touching.left || this.body.touching.right))){
                if((this.body.velocity.x >= 160 || this.body.velocity.x <= -160) && !this.checkforpreventingSkiddafterStun){
                    if(this.charstateRun){
                        this.charstateSkidd = true
                    }
                    this.charstateIdle = true
                }
                else if(this.body.velocity.x < 160 && this.body.velocity.x > -160 || this.checkforpreventingSkiddafterStun){
                    this.charstateIdle = true
                    this.charstateSkidd = false
                }
            }
            else if (keyA.isDown || cursors.down.isDown || keyD.isDown || keySPACEBAR.isDown || cursors.up.isDown  || cursors.left.isDown || cursors.right.isDown){
                this.charstateIdle = false
            }

            if(this.body.onFloor()){
                this.charstateFall = false;
                this.charstateAbility = false;

            };

            if(this.charstateIdle){
                this.charstateWalk = false;
                
            }

        }
            //gameover ig
            if (gameOver)
            {
                this.charstateDead = true;
            }
            if(this.charstateHurt){
                this.checkforpreventingSkiddafterStun = true
            }
        
    

            if(!this.charstateDead && !this.charstateHurt){
                if (this.charstateWalk && this.body.onFloor() && !this.charstateJump)
                {
                    if(!this.charstateSkidd && this.body.velocity.y == 0){
                        if((this.body.velocity.x < 0 && this.body.velocity.x > -199) || (this.body.velocity.x > 0 && this.body.velocity.x < 199)){
                            this.play(Phaser.Utils.String.Format('%1_walk', [this.CharKey]), true);
                        }
                        else if(this.body.velocity.x <= -200 || this.body.velocity.x >= 200){
                            this.play(Phaser.Utils.String.Format('%1_run', [this.CharKey]), true);
                        }
                    }
                        else if(this.charstateSkidd){
                        this.play(Phaser.Utils.String.Format('%1_skidd', [this.CharKey]), true);
                    }
                
                }

                else if (this.charstateJump && this.body.velocity.y <= -1){
                    this.play(Phaser.Utils.String.Format('%1_jump', [this.CharKey]), true);
                }
                else if (this.charstateFall && this.body.velocity.y >= 1){
                    this.play(Phaser.Utils.String.Format('%1_fall', [this.CharKey]), true)
                }
                else if(this.charstateAbility && !this.body.onFloor() && !this.charstateFall){
                    this.play(Phaser.Utils.String.Format('%1_stomp', [this.CharKey]), true)
                }

                else if(this.charstateIdle && this.body.onFloor())
                {
                    if(this.charstateSkidd){
                        this.play(Phaser.Utils.String.Format('%1_skidd', [this.CharKey]), true);
                    }
                    else{
                        this.play(Phaser.Utils.String.Format('%1_turn', [this.CharKey]), true);
                    }
                }

            }
            else if(this.charstateDead){
                this.play(Phaser.Utils.String.Format('%1_dead', [this.CharKey]), true)
            }
            else if (this.charstateHurt && !this.body.onFloor()){
                this.play(Phaser.Utils.String.Format('%1_hurt', [this.CharKey]), true)
            }

        

        if(this.Char1){
            this.CharKey = "hoots"
        }
        if(this.Char2){
            this.CharKey = "hoots2"
        }
    }


}


