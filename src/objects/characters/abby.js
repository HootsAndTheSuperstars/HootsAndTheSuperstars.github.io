
export class CHAR_abby extends Phaser.Physics.Arcade.Sprite {
    init(){
        //this are the character states (ex. walking, facing left... right... etc)
        //This is especially for flipping the sprites, DO NOT REMOVE
        this.facingRight = true;
        this.facingLeft = false;
        this.charstateUp = false
        this.charstateDown = false
        this.canjumpLadder = true
        
        //movement spud
        this.abilityCooldown = false
        this.charstateWalk = false;
        this.charstateIdle = true;
        this.charstateJump = false;
        this.charstateAbility = false;


        this.abilitySwing = false;
        this.swingSide = false;
        this.swingUp = false
        this.SwingDown = false


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
        super(scene, x, y, "abby");
        this.init()
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(12, 26);
        this.body.setGravityY(600)
        //  Player physics properties. Give the little guy a slight bounce.
        this.setBounce(0);
        this.debugBodyColor = 0xffffff;
        this.explodeHitbox = scene.add.zone(0, 0, 50, 50);
        scene.physics.add.existing(this.explodeHitbox); 
        this.explodeHitbox.body.setImmovable(true);

        this.expHitboxOffsetX = 0;   
        this.expHitboxOffsetY = 0;

        this.bombHITCollider = scene.physics.add.overlap(this.explodeHitbox, scene.bombs, (hitbox, bomb) => { 
                scene.globalFunctions.hitBomb(scene, this, bomb);
            }, null, this);   

    }
    preUpdate(time, delta){
        super.preUpdate(time, delta)

        if(this.swingSide){
            this.explodeHitbox.body.setSize(46, 78)
            if(this.facingLeft){
                this.expHitboxOffsetX = -20;   
                this.expHitboxOffsetY = 10;
            }
            else if(this.facingRight){
                this.expHitboxOffsetX = 30;   
                this.expHitboxOffsetY = 10;
            }
        }
        else if(this.swingUp || this.swingDown){
            this.explodeHitbox.body.setSize(84, 36)
            if(this.swingUp){
                this.expHitboxOffsetX = 10;   
                this.expHitboxOffsetY = -20;
            }
            else if (this.swingDown){
                this.expHitboxOffsetX = 10;   
                this.expHitboxOffsetY = 46;
            }
        }
        this.explodeHitbox.x = this.body.x + this.expHitboxOffsetX
        this.explodeHitbox.y = this.body.y + this.expHitboxOffsetY

    }
    update (scene){
        this.CharKey = "abby"
        

        if(this.invAfterHit && !this.invPreventer){
            this.invPreventer = true
            
                if(!this.flashing){
                    this.flashOn = true
                    this.flashing = true
                }
                scene.time.delayedCall(3500, () =>{
                    if(this.invAfterHit){
                        this.flashing = false
                        this.flashOn = false
                        this.setAlpha(1)
                        
                        this.invAfterHit = false
                        this.invPreventer = false
                        
                    }
                })
            
        }
        if (this.flashing){
            if(this.flashOn){
                this.flashOn = false
                this.setAlpha(0)
                scene.time.delayedCall(50, ()=>{
                    this.setAlpha(1)
                    scene.time.delayedCall(50, ()=>{
                        this.flashOn = true
                    })
                })
            }
        }
        //special sound handler
        if(!scene.gameOver){
            if(this.body.onFloor()){
                scene.jumpSound.stop()
                scene.activeStomp.stop()
                this.swingSide = false
                this.swingUp = false
                this.swingDown = false
            }
            if(!this.charstateAbility && scene.activeStomp.isPlaying){
                scene.activeStomp.stop()
            }
        }



        if(this.body.velocity.y > -1 && !this.charstateClimb){
            this.charstateThroughPlatform = true
            
        }
        else if (this.body.velocity.y <= 0 || this.charstateClimb){
            this.charstateThroughPlatform = false
        }

        //char starts here
        if(!this.charstateDead)
        {
        //states for flipping the char
            if(!this.charstateSkidd){
                if(this.facingLeft == true){
                    this.setFlipX(true);
                    this.body.setOffset(40, 29);
                    //console.log("Fliping player anims to the Left")
                }
                else if(this.facingRight == true){
                    this.setFlipX(false);
                    this.body.setOffset(45, 29);
                    //console.log("Fliping player anims to the Right")
                }
            }

            if(!this.charstateHurt && !this.charstateSkidd && !this.charstateAbility){
                if(scene.inputManager.leftINST() && !scene.inputManager.rightINST() && this.body.velocity.x >= 0){
                    this.facingLeft = true;
                    this.facingRight = false;
                }
                else if(scene.inputManager.rightINST() && !scene.inputManager.leftINST() && this.body.velocity.x <= 0){
                    this.facingLeft = false;
                    this.facingRight = true;
                }
            else if(scene.inputManager.leftINST() && scene.inputManager.rightINST()){
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
            if(!this.charstateHurt && !this.charstateAbility){
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
                        if(scene.inputManager.leftINST()){
                            this.setAccelerationX(-350);
                            //console.log("Pushing right");
                        }
                        else if(scene.inputManager.rightINST()){
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
                else if(this.charstateIdle && !this.charstateAbility){
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

            else if(this.charstateAbility && this.abilitySwing){

                if(scene.inputManager.upINST()){
                    this.swingUp = true
                    this.setVelocityY(-500)
                    this.setAccelerationX(0)
                }
                else if(scene.inputManager.downINST()){
                    this.swingDown = true
                    this.setVelocityY(500)
                }
                else if(!scene.inputManager.upINST() && !scene.inputManager.downINST()){
                    if(this.facingLeft){
                        this.swingSide = true
                    }
                    else if(this.facingRight){
                        this.swingSide = true
                    }
                }
                this.abilitySwing = false
            }
            else if(this.charstateAbility && this.swingSide){
                if(this.facingLeft){
                    this.setVelocityX(-500)
                }
                else if (this.facingRight){
                    this.setVelocityX(500)
                }
            }
            

            
        }
        else if(this.charstateDead){
            this.setVelocityX(0);
            //console.log("State: Dead")
        }
        //Hitbox Handler for the swings

        if(this.charstateAbility || this.invAfterHit){
            if(this.charstateAbility && !this.abilityCooldown){
                if(!this.invAfterHit && !scene.effectInv){
                    scene.bombPlayerCollider.active = false
                    this.body.debugBodyColor = 0x000000
                }
                this.bombHITCollider.active = true
                this.explodeHitbox.body.debugBodyColor = 0x00ff00
                this.abilityCooldown = true
                scene.time.delayedCall(100, ()=>{
                    if((!this.body.onFloor() && this.charstateAbility) && !scene.effectShield){
                        this.setTint(0xb4b4d8).setTintMode(Phaser.TintModes.MULTIPLY)
                        this.jumpFatigue = true
                    }
                    if(this.abilityCooldown){
                        scene.time.delayedCall(150, ()=>{
                            if(this.abilityCooldown){
                                if(!this.invAfterHit){
                                    scene.bombPlayerCollider.active = true
                                    this.body.debugBodyColor = 0xffffff
                                }
                                this.bombHITCollider.active = false
                                this.explodeHitbox.body.debugBodyColor = 0xff0000
                            }
                        })
                    }
                })
            }

            if(this.invAfterHit){
                scene.bombPlayerCollider.active = false
                this.body.debugBodyColor = 0x000000
            }
                
        }
        else if (!this.charstateAbility && !this.invAfterHit){
            scene.bombPlayerCollider.active = true
            this.bombHITCollider.active = false

            this.body.debugBodyColor = 0xffffff
            this.explodeHitbox.body.debugBodyColor = 0xff0000

        }

        //Keybinds
        if(!this.charstateDead){
            //climb stuff
            if(this.onLadder && scene.inputManager.upINST() && !this.charstateClimb && this.canjumpLadder){
                this.charstateClimb = true
                this.charstateFall = false
                this.charstateJump = false
                this.climbDisabling = true
                this.canjumpLadder = false
                scene.time.delayedCall(100, ()=>{
                    if(!this.charstateAbility){
                        this.climbDisabling = false
                    }
                })
                scene.time.delayedCall(200, ()=>{
                    this.canjumpLadder = true
                })
            }
            else if(!this.onLadder && this.charstateClimb && !this.climbDisabling){
                this.charstateClimb = false
                this.charstateFall = true
            }

            if(this.charstateClimb){
                if(scene.inputManager.upINST() && !scene.inputManager.downINST()){
                    this.charstateUp = true
                    this.charstateDown = false
                }
                else if(!scene.inputManager.upINST() && scene.inputManager.downINST()){
                    this.charstateUp = false
                    this.charstateDown = true
                }
                else if(!scene.inputManager.upINST() && !scene.inputManager.downINST()){
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
                scene.time.delayedCall(80,() => {
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
                if(scene.inputManager.leftINST() || scene.inputManager.rightINST()){
                        this.charstateWalk = true
                    if(scene.inputManager.bINST() && this.body.onFloor() && !this.charstateClimb){
                        this.charstateRun = true
                        if((scene.inputManager.leftINST() && this.body.velocity.x > 160) || (scene.inputManager.rightINST() && this.body.velocity.x < -160)){
                            this.charstateSkidd = true
                        }
                        else if((scene.inputManager.leftINST() && this.body.velocity.x < 160) || (scene.inputManager.rightINST() && this.body.velocity.x > -160)){
                            this.charstateSkidd = false
                        }
                    }
                    else if(!scene.inputManager.bINST() || (!this.body.onFloor() && !this.coyoteTime)){
                        this.charstateRun = false
                        this.charstateSkidd = false
                    }
                    
                }
                //jumping and falling
                if(!this.jumpFatigue && !this.charstateAbility && (scene.inputManager.cINST() || scene.inputManager.aINST()) && ((this.body.onFloor() || (this.charstateClimb && this.canjumpLadder)) || this.coyoteTime)){
                    if(!scene.jumpSound.isPlaying){
                        scene.jumpSound.play()
                    }
                    this.coyoteTime = false
                    if(this.charstateClimb){
                        this.canjumpLadder = false
                        this.onLadder = false
                        this.charstateClimb = false
                        scene.time.delayedCall(500, ()=>{
                            this.canjumpLadder = true
                        })
                    }
                    this.abilityCooldown = true
                    this.charstateJump = true
                    this.charstateSkidd = false

                }
                else if(!this.charstateClimb){
                        if((scene.inputManager.cINST() || scene.inputManager.aINST()) && !this.body.onFloor() && this.body.velocity.y < -1 && !this.coyoteTime){
                            this.charstateJump = true;
                            this.preventDupped = false
                            this.charstateFall = true
                        }
                        else if(!this.body.onFloor() && (this.body.velocity.y >= -1 && (scene.inputManager.cINST() || scene.inputManager.aINST()) || !(scene.inputManager.cINST() || scene.inputManager.aINST()))){
                            
                            if(this.charstateJump){
                                this.charstateJump = false;
                            }
                                this.charstateFall = true;
                                this.charstateSkidd = false

                                if(!(scene.inputManager.cINST() || scene.inputManager.aINST())){
                                    this.abilityCooldown = false
                                }
                            
                        }
                    }

                if(!this.body.onFloor() && (scene.inputManager.cINST() || scene.inputManager.aINST()) && !this.abilityCooldown && !this.coyoteTime && !this.charstateClimb){
                    if(!this.charstateAbility && !this.jumpFatigue){
                        this.charstateJump = false;
                        this.charstateFall = false;
                        //this.charstateWalk = false
                        this.charstateAbility = true
                        this.abilitySwing = true 
                        scene.time.delayedCall(50, ()=>{
                            if(!scene.activeStomp.isPlaying && this.charstateAbility){
                                scene.activeStomp.play()
                            }
                        })
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
            if(this.body.onFloor() && this.jumpFatigue && !this.preventDupped){
                this.preventDupped = true
            }
            if(this.preventDupped){
                scene.time.delayedCall(500, ()=>{
                    if(this.preventDupped){
                        this.preventDupped = false
                        this.jumpFatigue = false
                        scene.sound.play("beep")
                        this.clearTint()
                    }
                    
                })
            }

            if(!this.charstateHurt){
                if((this.body.onFloor() && ( !scene.inputManager.cINST() || scene.inputManager.aINST())|| !this.body.onFloor()) && (!scene.inputManager.leftINST() && !scene.inputManager.rightINST() || scene.inputManager.leftINST() && scene.inputManager.rightINST()) || (this.body.velocity.x == 0 && (this.body.touching.left || this.body.touching.right))){
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
                else if ((scene.inputManager.cINST() && this.charstateAbility && !this.body.onFloor()) || !(this.jumpFatigue && this.body.onFloor() && scene.inputManager.cINST())  || scene.inputManager.aINST() || (this.charstateClimb && (scene.inputManager.upINST() || scene.inputManager.downINST()))  || scene.inputManager.leftINST() || scene.inputManager.rightINST()){
                    this.charstateIdle = false
                }

                if(this.body.onFloor()){
                    this.charstateFall = false;
                    this.charstateAbility = false;
                    this.coyoteTime = true;
                    this.canjumpLadder = true

                };

                if(this.charstateIdle){
                    this.charstateWalk = false;
                    
                }

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
        
    

            if(!this.charstateDead && !this.charstateHurt && !this.charstateAbility){
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
            else if(this.charstateAbility && !this.body.onFloor() && !this.charstateDead && !this.charstateHurt){
             
                if(this.swingUp)
                    this.play(Phaser.Utils.String.Format('%1_swingUp', [this.CharKey]), true)
                if(this.swingDown)
                    this.play(Phaser.Utils.String.Format('%1_swingDown', [this.CharKey]), true)
                if(this.swingSide)
                    this.play(Phaser.Utils.String.Format('%1_swingSide', [this.CharKey]), true)
                
                
            }
            else if(this.charstateDead){
                this.play(Phaser.Utils.String.Format('%1_dead', [this.CharKey]), true)
            }
            else if (this.charstateHurt && !this.body.onFloor()){
                this.play(Phaser.Utils.String.Format('%1_hurt', [this.CharKey]), true)
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

    smashBomb(scene){
        if(scene.effectShield && !this.charstateAbility && !scene.effectInv){
            this.invAfterHit = true;
            scene.effectShield = false;
            this.upStun = true;
            scene.sound.play('hurt_shield')
        }
        if(!this.invAfterHit && !scene.effectShield && !scene.effectInv){
            scene.globalFunctions.gameOverHandler(scene)
        }

    }
}


