
export class ObjPlayer extends Phaser.Physics.Arcade.Sprite {
    init(){
        //this are the character states (ex. walking, facing left... right... etc)
        //This is especially for flipping the sprites, DO NOT REMOVE
        this.facingRight = true;
        this.facingLeft = false;
        this.charstateUp = false
        this.charstateDown = false

        //char check
        this.Char1 = true;
        this.Char2 = false;
        this.CharChange = false;

        //background
        //movement spud
        this.abilityCooldown = false
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
        this.charstateThroughPlatform = false
        this.onLadder = false
        this.charstateClimb = false
        this.climbDisabling = false
        
    }

    constructor (scene, x, y)
    {
        super(scene, x, y, "hoots");
        this.init()
        scene.add.existing(this);
        scene.physics.add.existing(this);
        console.log("Player Created!");
        this.body.setOffset(25, 14);
        this.body.setGravityY(600)
        console.log("The player's hitbox should be mesured to fit the sprites");
        //  Player physics properties. Give the little guy a slight bounce.
        this.setBounce(0);
        this.debugBodyColor = 0xffffff;
        console.log("Player's MISC configs should work now...");
        
    }
    update (scene){
        
        if(this.invAfterHit){
            scene.bombPlayerCollider.active = false
            this.setAlpha(0.7)
            if(this.body.onFloor()){
                scene.time.delayedCall(3000, () =>{
                    if(this.invAfterHit){
                        this.setTint(0xfcfcfc).setTintMode(Phaser.TintModes.FILL)
                    }
                })
                scene.time.delayedCall(3500, () =>{
                    if(this.invAfterHit){
                        this.setAlpha(1)
                        this.clearTint()
                        this.invAfterHit = false
                        scene.bombPlayerCollider.active = true
                    }
                })
            }
        }
        
        //special sound handler
        if(!scene.gameOver){
            if(this.body.onFloor()){
                scene.jumpSound.stop()
                scene.activeStomp.stop()
            }
            if(!this.charstateAbility && scene.activeStomp.isPlaying){
                scene.activeStomp.stop()
            }
        }




        //hitbox handler

        if(!this.charstateAbility){
            this.body.setSize(16, 38);
            //this.body.setOffset(25, 14);
        }
        else if (this.charstateAbility){
            this.body.setSize(46, 38);
            //this.body.setOffset(30, 14);
        }
        /*
        if(this.charstateThroughPlatform){
            console.log("Not Trough platform")
        }
        else if(!this.charstateThroughPlatform){
            console.log("Through platform")
        }
        */

        if(this.body.velocity.y > -1 && !this.charstateClimb){
            this.charstateThroughPlatform = true
            
        }
        else if (this.body.velocity.y <= 0 || this.charstateClimb){
            this.charstateThroughPlatform = false
        }

        if(scene.key2.isDown && this.CharChange == false){
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
            scene.time.delayedCall(1000, () =>{
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
                    //console.log("Fliping player anims to the Left")
                }
                else if(this.facingRight == true){
                    this.setFlipX(false);
                    //console.log("Fliping player anims to the Right")
                }
            }

            if(!this.charstateHurt && !this.charstateSkidd){
                if(scene.cursors.left.isDown && !scene.cursors.right.isDown && this.body.velocity.x >= 0){
                    this.facingLeft = true;
                    this.facingRight = false;
                }
                else if(scene.cursors.right.isDown && !scene.cursors.left.isDown && this.body.velocity.x <= 0){
                    this.facingLeft = false;
                    this.facingRight = true;
                }
            else if((scene.cursors.left.isDown && scene.cursors.right.isDown || scene.cursors.left.isDown && scene.cursors.right.isDown)){
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
                    //console.log("State: Walking");
                    if(this.facingLeft){
                        this.setVelocityX(-160);
                        ////console.log("Left, normal speed");
                    }
                    else if(this.facingRight){
                        this.setVelocityX(160);
                        //console.log("Right, normal speed");                
                    }
                }
                else if(this.charstateRun && this.charstateWalk && !this.charstateSkidd){
                    //console.log("State: Running");
                    if(this.facingLeft){
                        this.setVelocityX(-300);
                        //console.log("Left, fast speed");
                    }
                    else if(this.facingRight){
                        this.setVelocityX(300);
                        //console.log("Right, fast speed");                
                    }
                }
                else if(this.charstateSkidd){
                    //console.log("State: Skidding")
                    if(!scene.skiddSound.isPlaying && this.body.onFloor()){
                        scene.skiddSound.play()
                    }
                    else if(!this.body.onFloor()){
                        scene.skiddSound.stop()
                    }
                    if(!this.charstateIdle){
                        if(scene.cursors.left.isDown){
                            this.setAccelerationX(-350);
                            //console.log("Pushing right");
                        }
                        else if(scene.cursors.right.isDown){
                            this.setAccelerationX(350);
                            //console.log("Pushing left");                
                        }
                    }    
                    else if(this.charstateIdle){
                        if(this.facingLeft){
                            this.setAccelerationX(350);
                            //console.log("Pushing right");
                        }
                        else if(this.facingRight){
                            this.setAccelerationX(-350);
                            //console.log("Pushing left");                
                        }
                    }             
                }
                else if(this.charstateIdle){
                    this.setAccelerationX(0);
                    this.setAccelerationY(0);
                    this.setVelocityX(0);

                    if(this.charstateClimb && !(this.charstateUp && this.charstateDown)){
                            this.setVelocityY(0)
                        }
                    //console.log("State: idle");
                }

                //climb

                if(this.charstateClimb){
                    if(this.charstateUp){
                        this.setVelocityY(-150)
                    }
                    else if(this.charstateDown){
                        this.setVelocityY(300)
                    }
                    else{
                        this.setVelocityY(0)
                    }
                }

                if(this.charstateJump && !this.charstateFall){
                    this.setVelocityY(-490);
                    //console.log("State: Jumping");
                }
                else if(this.charstateFall && !this.charstateJump){
                    this.setAccelerationY(900);
                    //console.log("State: Falling");
                }
                else if(this.charstateFall && this.charstateJump){
                    this.setAccelerationY(0);
                    //console.log("State: Maintaining jump");
                }
                else if(this.charstateAbility){
                    this.setVelocityX(0);
                    this.setVelocityY(900)
                    //console.log("State: Stomp")
                }
            }
            else if(this.charstateHurt){

                //console.log("State: Hurt");
                
                if(this.facingLeft){
                    this.setVelocityX(180);
                    //console.log("Pushed right");
                }
                else if(this.facingRight){
                    this.setVelocityX(-180);
                    //console.log("Pushed left");                
                }
            }
            if (this.upStun){
                this.body.setVelocityY(-200)
                this.charstateHurt = true;
                scene.time.delayedCall(100, () => {
                    this.upStun = false
                })
            }

            
        }
        else if(this.charstateDead){
            this.setVelocityX(0);
            //console.log("State: Dead")
        }
 

        //Keybinds
        //climb stuff
        if(this.onLadder && scene.cursors.up.isDown && !this.charstateClimb){
            this.charstateClimb = true
            this.charstateFall = false
            this.charstateJump = false
            this.climbDisabling = true
            scene.time.delayedCall(100, ()=>{
                this.climbDisabling = false
            })
        }
        else if(!this.onLadder && this.charstateClimb && !this.climbDisabling){
            this.charstateClimb = false
            this.charstateFall = true
        }

        if(this.charstateClimb){
            if(scene.cursors.up.isDown && !scene.cursors.down.isDown){
                this.charstateUp = true
                this.charstateDown = false
            }
            else if(!scene.cursors.up.isDown && scene.cursors.down.isDown){
                this.charstateUp = false
                this.charstateDown = true
            }
            else if(!scene.cursors.up.isDown && !scene.cursors.down.isDown){
                this.charstateUp = false
                this.charstateDown = false
            }
        }
        else if(!this.charstateClimb){
            this.charstateUp = false
            this.charstateDown = false
        }


        //coyote time (aka, an extension of the platform you might be standing on)
        if(this.coyoteTime && !this.body.onFloor()){
            scene.time.delayedCall(50,() => {
                if(!this.body.onFloor()){
                    this.coyoteTime = false
                    if(!this.charstateClimb){
                        this.charstateFall = true
                    }
                }
            })
        }
        if(!this.charstateHurt && !scene.gameOver){
            //general walk
            if(scene.cursors.left.isDown || scene.cursors.right.isDown){
                    this.charstateWalk = true
                if(scene.keyS.isDown && this.body.onFloor() && !this.charstateClimb){
                    this.charstateRun = true
                    if((scene.cursors.left.isDown && this.body.velocity.x > 160) || (scene.cursors.right.isDown && this.body.velocity.x < -160)){
                        this.charstateSkidd = true
                    }
                    else if((scene.cursors.left.isDown && this.body.velocity.x < 160) || (scene.cursors.right.isDown && this.body.velocity.x > -160)){
                        this.charstateSkidd = false
                    }
                }
                else if(!scene.keyS.isDown || (!this.body.onFloor() && !this.coyoteTime)){
                    this.charstateRun = false
                    this.charstateSkidd = false
                }
                
            }
            //jumping and falling
            if(!this.jumpFatigue && !this.charstateAbility && (scene.keyD.isDown || scene.keySPACEBAR.isDown) && ((this.body.onFloor() || this.charstateClimb) || this.coyoteTime)){
                if(!scene.jumpSound.isPlaying){
                    scene.jumpSound.play()
                }
                this.coyoteTime = false
                this.onLadder = false
                this.charstateClimb = false
                this.abilityCooldown = true
                this.charstateJump = true
                this.charstateSkidd = false

            }
            else if(!scene.cursors.down.isDown && !this.charstateClimb){
                    if((scene.keyD.isDown || scene.keySPACEBAR.isDown) && !this.body.onFloor() && this.body.velocity.y < -1 && !this.coyoteTime){
                        this.charstateJump = true;
                        this.charstateFall = true
                    }
                    else if(!this.body.onFloor() && (this.body.velocity.y >= -1 && (scene.keyD.isDown || scene.keySPACEBAR.isDown) || !(scene.keyD.isDown || scene.keySPACEBAR.isDown))){
                        
                        if(this.charstateJump){
                            this.charstateJump = false;
                            this.charstateFall = true;
                            this.charstateAbility = false
                            this.charstateSkidd = false

                            if(!(scene.keyD.isDown || scene.keySPACEBAR.isDown)){
                                this.abilityCooldown = false
                            }
                        }
                    }
                }

            if(!this.body.onFloor() && (scene.keyD.isDown || scene.keySPACEBAR.isDown) && !this.abilityCooldown && !this.coyoteTime && !this.charstateClimb){
                if(!this.charstateAbility && this.Char1){
                    this.charstateJump = false;
                    this.charstateFall = false;
                    //this.charstateWalk = false
                    this.charstateAbility = true;
                    this.jumpFatigue = true
                    if(!scene.activeStomp.isPlaying && this.charstateAbility){
                        scene.activeStomp.play()
                    }
                    
    
                }

            }
        }

        else if(this.body.onFloor()){
            this.charstateHurt = false;
            scene.time.delayedCall(300, () =>{
                this.checkforpreventingSkiddafterStun = false
            })
        };


        //this is for the jump fatigue, to avoid a jump after ability for Hoots
        if(this.body.onFloor() && this.jumpFatigue){
            if(scene.keyD.isDown || scene.keySPACEBAR.isDown){
                scene.time.delayedCall(50, ()=>{
                    this.jumpFatigue = false
                })
            }
            else{
                this.jumpFatigue = false
            }
            
        }

        if(!this.charstateHurt){
            if((this.body.onFloor() && ( !scene.keyD.isDown || scene.keySPACEBAR.isDown)|| !this.body.onFloor()) && (!scene.cursors.left.isDown && !scene.cursors.right.isDown || scene.cursors.left.isDown && scene.cursors.right.isDown) || (this.body.velocity.x == 0 && (this.body.touching.left || this.body.touching.right))){
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
            else if ((scene.keyD.isDown && this.charstateAbility && !this.body.onFloor()) || !(this.jumpFatigue && this.body.onFloor() && scene.keyD.isDown)  || scene.keySPACEBAR.isDown || (this.charstateClimb && (scene.cursors.up.isDown || scene.cursors.down.isDown))  || scene.cursors.left.isDown || scene.cursors.right.isDown){
                this.charstateIdle = false
            }

            if(this.body.onFloor()){
                this.charstateFall = false;
                this.charstateAbility = false;
                this.coyoteTime = true;

            };

            if(this.charstateIdle){
                this.charstateWalk = false;
                
            }

        }
            //gameOver
            if (scene.gameOver)
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
                else if(this.charstateClimb){
                    if(this.body.velocity.x == 0 && this.body.velocity.y == 0){
                        this.play(Phaser.Utils.String.Format('%1_climb', [this.CharKey]), false)
                    }
                    else{
                        this.play(Phaser.Utils.String.Format('%1_climb', [this.CharKey]), true)
  
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

        //sound handler

        if(this.charstateClimb && (!this.charstateIdle || this.charstateUp || this.charstateDown)){
            if(!scene.vineClimbSFX.isPlaying && !this.vineClimbSFXPlay){
                    this.vineClimbSFXPlay = true
                    this.pitch = Phaser.Math.FloatBetween(-200, 200)
                    scene.vineClimbSFX.detune = this.pitch
                    
                    scene.vineClimbSFX.play()

                    scene.time.delayedCall(100, ()=>{
                        this.vineClimbSFXPlay = false
                        
                    })
                }
            }
    }


}


