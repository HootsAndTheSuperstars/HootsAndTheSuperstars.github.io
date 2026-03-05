import { ObjPlayer } from './objects/player.js'

export class Game extends Phaser.Scene


{
    constructor (){

        super({key: 'stage'});
    }

    init(){
        this.stageName = 'stage';
        this.gameOverLauncher = false;
        this.scoreText;
        this.gameOver = false;
        this.score = 0;
        this.innerScore = 0;
        this.level = 1;
        this.bombsExploded = 0;
        this.bombSpawning = 0;
        this.bombsThatShouldSpawn = 1;


        this.cursors;
        this.keyD;
        this.keyS;
        this.keyA;
        this.keySPACEBAR;

        this.platforms;
        this.bombs;
        this.stars;

        //platform boxes

        this.platform1;
        this.platform2;
        this.platform3;

        

        //effects
        this.effectShield = false;
        this.shield;
        this.shieldGenObj;

        this.invGenObj;
        
        this.effectInv = false;
        this.invStack = 0;

        this.youAskedForIt = false;
        this.aboveWorldBounds = false
        this.groundKill = false
        this.fastLevelUp = false
    }

    create ()
    {
       this.physics.world.setBounds(20, 0, 900, 600)

        //this.charstateDead = false
        //this.gameOver = false
        //this.score = 0
        //this.badLuck = false

        this.mainStageMusic = this.sound.add('stage')
        this.cameras.main.fadeIn(500)
        this.time.delayedCall(500, () =>{
            this.mainStageMusic.play()
            this.mainStageMusic.loop = true
        })

        this.invMusic = this.sound.add('invincibility')
        this.invMusicIntro = this.sound.add('invincibilityIntro')
        this.invMusic.loop = true
        //sounds start here
        this.sound.add('wetfard')
        this.sound.add('bomb_explosion')
        this.sound.add('bomb_fall')
        this.sound.add('box_explosion')
        this.sound.add('munch')
        this.sound.add('shield')
        this.jumpSound = this.sound.add('jump')
        this.skiddSound = this.sound.add('skidd')
        this.activeStomp = this.sound.add('stomp_activate')

        this.starSound = this.sound.add('star_get')
        this.sound.add('hurt')
        this.sound.add('hurt_shield')
        this.sound.add('youMustDie')
        this.sound.add('fall')
        this.sound.add('floor_destroy')
        this.sound.add('continue')
        
        
        this.physics.world.checkCollision.up = false;
        this.physics.world.checkCollision.down = false;
        
        //this.sound.add('shield')
        //main game
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);



        console.log("inputs created!")
        this.input.keyboard.on('keydown-ENTER', () =>
        {
                if(!this.charstateDead && !this.groundKill){
                    console.log('Pausing game...')
                    this.scene.launch('pause', {
                        score: this.score,
                        bombLoad: this.bombsThatShouldSpawn,
                        level: this.level,
                        stageName: this.stageName,
                    })
                    this.scene.pause('stage')
                    this.mainStageMusic.pause()
                    this.invMusic.pause()
                    this.invMusicIntro.pause()
                }
                else{
                    console.log("You can't pause the game right now...")
                }
        });

        this.add.tileSprite(750, 300, 1500, 600, 'sky');
        // We add some complexity to the background
        this.bg_farestClouds = this.add.tileSprite(450, 220, 940, 46, 'sky_farestClouds');
        this.bg_middleClouds = this.add.tileSprite(450, 280, 940, 131, 'sky_middleClouds');
        this.bg_nearestClouds = this.add.tileSprite(450, 350, 940, 346, 'sky_nearestClouds');

        //Background spud!

    
        //tilemap of the stage itself
        const stage = this.add.tilemap('noonStage');

        const decorationTiles = stage.addTilesetImage("decoration", "decoration");
        const groundTiles = stage.addTilesetImage("ground", "ground");
        const platformsTiles = stage.addTilesetImage("platforms", "platforms");

        const decorationLayer = stage.createLayer("decoration", decorationTiles)
        this.player = new ObjPlayer(this, 450, 450);
        const groundLayer = stage.createLayer("ground", groundTiles)
        const platformsLayer = stage.createLayer("platforms", platformsTiles)

        //  The score
        this.scoreText = this.add.text(32, 16, `SCORE: ${this.score}`, { fontFamily:'HUDfont', fontSize: '32px', fill: '#000' }).setVisible(false);
        this.levelText = this.add.text(32, 50, 'LEVEL: 0', { fontFamily:'HUDfont', fontSize: '32px', fill: '#000' }).setVisible(false);

        console.log("Char sprites created!");


        
        this.anims.create({

            key: 'bomb_movement',
            frames: this.anims.generateFrameNumbers('bomb', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        this.bombExplosion = this.add.sprite(0, 0, 'boom').setVisible(false);
        this.anims.create({

            key: 'explode',
            frames: this.anims.generateFrameNumbers('boom', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1,
        });


        console.log("Bomb sprites created!");

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 10,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.starCollect = this.add.sprite(0, 0, 'starGet').setVisible(false);

        this.anims.create({

        key: 'star_movement',
            frames: this.anims.generateFrameNumbers('star', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({

            key: 'star_collect',
            frames: this.anims.generateFrameNumbers('starGet', {start: 0, end: 3}),
            frameRate: 30,
            showOnStart: true,
            hideOnComplete: true
        });

        this.stars.children.iterate(child =>
        {

            child.setBounce(0.9);
            child.setGravityY(300)
            child.setVelocityX(Phaser.Math.FloatBetween(-200, 200), 20);
            child.setCollideWorldBounds(true);
            child.anims.play('star_movement', true);

        });
        console.log("Stars created!")

        this.bombs = this.physics.add.group()

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, platformsLayer, null, (player) => { return (this.player.charstateThroughPlatform == true)});
        this.physics.add.collider(this.player, groundLayer);
        this.physics.add.collider(this.stars, platformsLayer);
        this.physics.add.collider(this.stars, groundLayer);
        this.physics.add.collider(this.bombs, groundLayer);
        this.physics.add.collider(this.bombs, platformsLayer);
        this.physics.add.collider(this.bombs, this.bombs);

        groundLayer.setCollisionBetween(319, 325)
        platformsLayer.setCollisionBetween(331, 335)

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.starPlayerCollider = this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.bombPlayerCollider = this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        //Powers start here

        
        this.anims.create({

            key: 'shield',
            frames: this.anims.generateFrameNumbers('shield', {start: 0, end: 3}),
            frameRate: 30,
            repeat: -1
        });

        this.shieldPhysics = this.physics.add.group();



        this.shieldGenObj = this.physics.add.group();


        this.anims.create({

            key: 'invStars',
            frames: this.anims.generateFrameNumbers('invStars', {start: 0, end: 3}),
            frameRate: 30,
            repeat: -1
        });

        this.invPhysics = this.physics.add.group();

        this.invGenObj = this.physics.add.group();

        this.physics.add.collider(this.player, this.shieldGenObj, this.shieldAbility, null, this);
        this.physics.add.collider(this.player, this.invGenObj, this.invinsAbility, null, this);

        this.cameras.main.centerOn(470, 300)
    }

    update ()
    {

        //music handler
        if((!this.scene.isActive('pause') && this.mainStageMusic.isPaused)){
            if(!this.invMusicHandler){
                this.mainStageMusic.resume()
            }
            else if(this.invMusicHandler){
                this.invMusic.resume()
            }
            else if (this.invMusicIntro.isPaused){
                this.invMusicIntro.resume()
            }
            
            console.log("Music resumed")
        }

        if(this.effectInv && !this.invMusic.isPlaying && !this.invMusicIntro.isPlaying){
            this.invMusic.play()

        }
        else if(!this.effectInv && this.invMusic.isPlaying){
            this.invMusic.stop()
            
        };


        if(!this.gameOver){
            this.bg_farestClouds.tilePositionX += 0.1
            this.bg_middleClouds.tilePositionX += 0.05
            this.bg_nearestClouds.tilePositionX += 0.02
        }
        if(this.player.x < 4){
            this.player.x = 930
        }

        if (this.player.x > 935){
            this.player.x = 5 
        }
        this.physics.world.wrap(this.player, 600)
        if(this.player.y > 520){
            this.player.y = 500
            this.player.charstateAbility = false
        }


        //player handler
        this.player.update(this.cursors, this.keyA, this.keyS, this.keyD, this.keySPACEBAR, this.key2, this.skiddSound, this.jumpSound, this.activeStomp, this.gameOver, this.time);
        

        if(this.player.body.y > 1000 && !this.aboveWorldBounds){
            this.aboveWorldBounds = true
            this.bombPlayerCollider = false
            this.cameras.main.fadeOut(1000)
            const noWay = Phaser.Math.Between(1, 1995)
            this.time.delayedCall(5000, () =>{
                if(noWay == 1994){
                    this.scene.launch('error')
                }
                else{
                    this.scene.launch('gameover', {
                        score: this.score,
                    })
                }
                    this.scene.stop('stage')
                    
                
            })
        }
        //error screen stuff

        //Background starts here
        

        //shield stuff
        if(this.effectShield && !this.effectInv){
            Phaser.Display.Align.In.Center(this.shield, this.player)
            this.shield.anims.play('shield', true)
            this.shield.setActive(true).setVisible(true)
        }
        else if(this.effectInv){
            Phaser.Display.Align.In.Center(this.invStars, this.player)
            this.invStars.anims.play('invStars', true)
            if(this.effectShield){
                this.shield.setActive(false).setVisible(false)
            }
        }

        if(this.invAfterHit){
            this.bombPlayerCollider.active = false
            this.player.setAlpha(0.7)
            if(this.player.body.onFloor()){
                this.time.delayedCall(3000, () =>{
                    if(this.invAfterHit){
                        this.player.setTintFill(0xfcfcfc)
                    }
                })
                this.time.delayedCall(3500, () =>{
                    if(this.invAfterHit){
                        this.player.setAlpha(1)
                        this.player.clearTint()
                        this.invAfterHit = false
                        this.bombPlayerCollider.active = true
                    }
                })
            }
        }
    

        //bomb manager

        if(((this.bombsExploded >= 15 || this.innerScore >= 5000) || this.key1.isDown) && this.level <= 256 && !this.fastLevelUp){
            this.fastLevelUp = true
            if(this.innerScore >= 5000){
                this.innerScore = 0
            }
            this.bombsExploded = 0
            this.level += 1
            this.bombsThatShouldSpawn += 1
            this.levelText.setText(`LEVEL: ${this.level}`);
            this.sound.play('check')
            if(this.level <= 20){
                this.mainStageMusic.rate += 0.01
            }
            this.time.delayedCall(1, () =>{
                this.fastLevelUp = false
            })
        }
        else if(this.keyE.isDown && this.keyZ.isDown && !this.youAskedForIt){
            this.youAskedForIt = true
            this.bombsThatShouldSpawn += 999
            this.sound.play('beep')
            console.warn('You are doomed...')
        }

        if(this.level >= 255){
            this.physics.pause()
            this.mainStageMusic.stop()
            this.time.delayedCall(500, () =>{
                this.scene.switch('error')
            })
        }
    }

    collectStar (player, star)
    {
        this.starCollect.copyPosition(star).play('star_collect');
        star.disableBody(true, true);

        //  Add and update the score
        if(!this.starSound.isPlaying){
            this.starSound.play()
        }
        else if(this.starSound.isPlaying){
            this.starSound.stop()
            this.starSound.play()
        }
        this.score += 100;
        this.innerScore += 100;
        this.scoreText.setText(`SCORE: ${this.score}`).setVisible(true);
        this.levelText.setText(`LEVEL: ${this.level}`).setVisible(true)
        if (this.stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            this.stars.children.iterate(child =>
            {

                child.enableBody(true, (Phaser.Math.Between(10, 920)), 0, true, true);
                child.setBounce(0.9);
                child.setVelocityX(Phaser.Math.FloatBetween(-200, 200), 20);
                child.setCollideWorldBounds(true);
                

            });
            const badLuck = Phaser.Math.Between(1, 1000)
            if(badLuck == 1){
                this.youAskedForIt = true
                this.bombsThatShouldSpawn += 999
                console.warn('You are doomed...')
            }


            if(this.youAskedForIt){
                this.sound.play('wetfard')
            }
            else{
                this.sound.play('bomb_fall')
            }

            for (let i = this.bombSpawning; i < this.bombsThatShouldSpawn; i++){
                const x = Phaser.Math.Between(100, 900);
                const bomb = this.bombs.create(x, -10, 'bomb');
                bomb.body.setMaxSpeed(500);
                bomb.setGravityY(300);
                bomb.anims.play('bomb_movement', true);
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                //this should be for a better hitbox w/ the bomb...
                bomb.setCircle(7);
                bomb.body.offset.y = 7;
                bomb.body.offset.x = 7;
                console.log("Bomb created!");
                bomb.body.debugBodyColor = 0xff0000;
                console.log("Added color red (#ff0000) to the bomb's hitbox")  
            }
            

                
            //this is for the shield
            if(!this.effectShield && this.shieldGenObj.countActive(true) == 0){
                const shieldProbability = Phaser.Math.Between(1, 5)
                if(shieldProbability == 3){
                    this.Xshield = Phaser.Math.Between(100, 800);
                    this.Yshield = Phaser.Math.Between(100, 400);
                    this.shieldCollect = this.shieldGenObj.create(this.Xshield, this.Yshield, 'shield_box')
                    this.shieldCollect.anims.play('shield_pw', true)
                    console.log("This should have spawned a shield box...")
            
                }
            }

            if(this.invGenObj.countActive(true) == 0){
                const invProbability = Phaser.Math.Between(1, 10)
                if(invProbability == 3){
                    this.Xinv = Phaser.Math.Between(100, 800);
                    this.Yinv = Phaser.Math.Between(100, 400);
                    this.invCollect = this.invGenObj.create(this.Xinv, this.Yinv, 'star_box')
                    this.invCollect.anims.play('star_pw', true)
                    console.log("This should have spawned a candy...")
            
                }
            }
            this.badLuck = false
            this.youAskedForIt = false
            

        }
    }
    hitBomb (player, bomb)
    {
        if (this.player.charstateAbility || this.effectShield || this.effectInv){
            bomb.body.setVelocity(0, 0);
            bomb.body.setEnable(false);
            bomb.body.debugBodyColor = 0x9048fc;
            this.cameras.main.shake(200, 0.003);
            console.log("You should have seen a shake effect on your screen rn")
            bomb.anims.play("explode", true);
            if((this.effectShield && this.player.charstateAbility) || this.effectInv){

                this.score += 500;
                this.innerScore += 500;
                this.scoreText.setText(`SCORE: ${this.score}`);
                this.bombsExploded += 1
                this.time.delayedCall(10, () =>{
                    if(this.player.charstateAbility){
                        this.player.abilityCooldown = true
                        this.player.charstateAbility = false
                        this.player.charstateFall = true
                        this.player.setVelocityY(-200)
                        this.time.delayedCall(100, () =>{
                            this.player.abilityCooldown = false
                        })
                    }
                })
            }
            if(this.effectShield && !this.player.charstateAbility && !this.effectInv){
                this.invAfterHit = true;
                this.effectShield = false;
                this.shield.destroy()
                this.player.upStun = true;
                this.sound.play('hurt_shield')
                this.score += 10;
                this.innerScore += 10;
                this.scoreText.setText(`SCORE: ${this.score}`);
                this.bombsExploded += 1
            }
            if(!this.effectShield && this.player.charstateAbility && !this.effectInv){
                this.player.charstateAbility = false;
                this.player.upStun = true;
                this.sound.play('hurt')
                this.score += 100;
                this.innerScore += 100;
                this.scoreText.setText(`SCORE: ${this.score}`);
                this.bombsExploded += 1
            }
            this.time.delayedCall(1000, () => {
                bomb.destroy();
                console.log('Bomb destroyed!')
            })

        }
        else{
            if(!this.gameover)
                this.gameOver = true;
                this.time.delayedCall(800, () =>{
                    if(!this.gameOverLauncher){
                        this.gameOverLauncher = true
                        this.scene.launch('gameover', {
                            score : this.score,
                            stageName: this.stageName,
                        });
                        this.time.delayedCall(200, () =>{
                            this.registry.destroy()
                            this.scene.stop('stage')
                        })
                    }
                });
            bomb.anims.play('explode', true);
            this.bombPlayerCollider.active = false
            this.player.charstateFall = false;
            this.player.charstateWalk = false;
            this.player.charstateJump = false;
            this.player.charstateIdle = false;
            this.player.charstateSkidd = false;
            this.player.charstateDead = true;
            this.physics.pause();
            this.cameras.main.shake(300, 0.025);
            this.mainStageMusic.stop()
            this.effectInv = false
            this.invMusic.stop()
            this.invMusicIntro.stop()
            
        }
        this.sound.play('bomb_explosion')
    }
    shieldAbility(player, _shieldGenObj){
        if (!this.gameOver)
                {
                    this.sound.play('munch')
                    _shieldGenObj.destroy();

                    this.time.delayedCall(600, () =>
                    {
                        if(!this.gameOver){
                            this.effectShield = true
                            this.sound.play('shield')
                            this.shield = this.shieldPhysics.create(0, 0, 'shield')
                            this.shield.body.debugBodyColor = 0x0000ff
                        }
                    });
                }
    }

    invinsAbility(player, _invGenObj){
        if (!this.gameOver)
                {
                    this.sound.play('munch')
                    _invGenObj.destroy();
                    this.invMusicHandler = true
                    

                    this.time.delayedCall(600, () =>
                    {
                        if(!this.gameOver && this.invStack == 0){
                            this.invStack += 1
                            this.mainStageMusic.stop()
                            this.effectInv = true
                            this.invMusicIntro.play()
                            this.invStars = this.invPhysics.create(0, 0, 'invStars')
                            this.invStars.body.debugBodyColor = 0x0000ff
                            
                        }
                        else if(!this.gameOver && this.invStack > 0){
                            this.invStack += 1
                        };


                        this.time.delayedCall(45000, () =>{
                            if(this.invStack == 1){
                                this.invStack -= 1
                                console.log(`1 stack removed, total stack is ${this.invStack}`)
                                this.effectInv = false
                                this.invMusicHandler = false
                                this.invMusic.stop()
                                this.invStars.destroy()
                                this.mainStageMusic.play()
                                this.invAfterHit = true
                                
                            }
                            else if(this.invStack > 1){
                                this.invStack -=1 
                                console.log(`1 stack removed, total stack is ${this.invStack}`)
                            }
                        })
                    });
                    
                }
    }
}

