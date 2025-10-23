import { ObjPlayer } from './objects/player.js'

export class Game extends Phaser.Scene


{
    constructor (){

        super({key: 'stage'});
    }

    init(){
        this.gameOverLauncher = false;
        this.scoreText;
        this.gameOver = false;
        this.score = 0;
        this.innerScore = 0;
        this.bombsExploded = 0;
        this.level = 1;
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
        this.shieldBoxes;

        this.youAskedForIt = false;
        this.aboveWorldBounds = false
        this.groundKill = false
        this.fastLevelUp = false
    }

    create ()
    {

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
        //sounds start here
        this.sound.add('wetfard')
        this.sound.add('bomb_explosion')
        this.sound.add('bomb_fall')
        this.sound.add('box_explosion')
        this.jumpSound = this.sound.add('jump')
        this.sound.add('shield')
        this.skiddSound = this.sound.add('skidd')
        this.starSound = this.sound.add('star_get')
        this.sound.add('hurt')
        this.sound.add('hurt_shield')
        this.sound.add('youMustDie')
        this.sound.add('fall')
        this.sound.add('floor_destroy')
        this.sound.add('continue')
        this.activeStomp = this.sound.add('stomp_activate')
        
        
        this.physics.world.checkCollision.up = false;
        this.physics.world.checkCollision.down = false;
        
        //this.sound.add('shield')
        //main game
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        console.log("inputs created!")
        this.input.keyboard.on('keydown-ENTER', () =>
        {
            if(!this.charstateDead && !this.groundKill){
                console.log('Pausing game...')
                this.scene.launch('pause', {
                    score: this.score,
                    bombLoad: this.bombsThatShouldSpawn,
                    level: this.level,
                })
                this.scene.pause('stage')
                this.mainStageMusic.pause()
            }
            else{
                console.log("You can't pause the game right now...")
            }
        });
        this.input.keyboard.on('keydown-L', () =>
        {
            if(!this.groundKill){
                
                this.groundKill = true
                this.sound.play('youMustDie')
                this.time.delayedCall(850, () =>{
                    this.starPlayerCollider.active = false
                    this.mainplatform.destroy()
                    this.platform1.destroy()
                    this.platform2.destroy()
                    this.platform3.destroy()
                    this.platform4.destroy()
                    this.charstateDead = true
                    this.sound.play('floor_destroy')
                    console.error('You must DIE!!!\n - Gamñomn')
                    this.time.delayedCall(200, () =>{
                        this.sound.play('fall')
                        this.mainStageMusic.stop()
                    })
                })
            }
        });
        //  A simple background for our game
        this.add.tileSprite(750, 300, 1500, 600, 'sky');
        // We add some complexity to the background
        this.bg_farestClouds = this.add.tileSprite(750, 100, 1500, 23, 'sky_farestClouds'),
        this.bg_middleClouds = this.add.tileSprite(750, 180, 1500, 131, 'sky_middleClouds'),
        this.bg_nearestClouds = this.add.tileSprite(750, 430, 1500, 346, 'sky_nearestClouds'),

        //  The platforms group contains the ground and the platforms we can jump on
        this.platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Main platform
        this.mainplatform = this.platforms.create(400, 568, 'platform_0x00');
        this.mainplatform.body.setSize(3016, 17);
        this.mainplatform.body.setOffset(0, 37);
        console.log("Created Main platform!");

        //  Now let's create some platforms

        var r_platform1 = Phaser.Math.Between(1, 2)
        var r_platform2 = Phaser.Math.Between(1, 2)
        var r_platform3 = Phaser.Math.Between(1, 2)
        var r_platform4 = Phaser.Math.Between(1, 2)


        if (r_platform1 == 1){
            this.platform1 = this.platforms.create(600, 382, 'platform_0x01');
        }
        else if (r_platform1 == 2){
            this.platform1 = this.platforms.create(600, 382, 'platform_0x02');    
        };
        console.log("Created platform 1");
    
        if (r_platform2 == 1){
            this.platform2 = this.platforms.create(1390, 345, 'platform_0x01');
        }
        else if (r_platform2 == 2){
            this.platform2 = this.platforms.create(1390, 345, 'platform_0x02');    
        }
        console.log("Created platform 2");
        if (r_platform3 == 1){
            this.platform3 = this.platforms.create(750, 202, 'platform_0x01');
            }
        else if (r_platform3 == 2){
            this.platform3 = this.platforms.create(750, 202, 'platform_0x02');    
        }
        console.log("Created platform 3");


        if (r_platform4 == 1){
            this.platform4 = this.platforms.create(50, 270, 'platform_0x01');
            }
        else if (r_platform4 == 2){
            this.platform4 = this.platforms.create(50, 270, 'platform_0x02');   
        }
        console.log("Created platform 4");


        this.platform1.body.setSize(518, 20);
        this.platform1.body.setOffset(-8.5, 34);
        this.platform2.body.setSize(518, 20);
        this.platform2.body.setOffset(-8.5, 34);
        this.platform3.body.setSize(518, 20);
        this.platform3.body.setOffset(-8.5, 34);
        this.platform4.body.setSize(518, 20);
        this.platform4.body.setOffset(-8.5, 34);
        console.log("Platforms' box should be re-sized now...");


        //  The score
        this.scoreText = this.add.text(16, 16, `SCORE: ${this.score}`, { fontFamily:'HUDfont', fontSize: '32px', fill: '#000' }).setVisible(false);
        this.levelText = this.add.text(16, 50, 'LEVEL: 0', { fontFamily:'HUDfont', fontSize: '32px', fill: '#000' }).setVisible(false);

        console.log("Char sprites created!");


        this.player = new ObjPlayer(this, 100, 450);
        this.anims.create({

            key: 'bomb_movement',
            frames: this.anims.generateFrameNumbers('bomb', {start: 0, end: 3}),
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
            repeat: 15,
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

        this.bombs = this.physics.add.group();

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms, null, (player) => { return (this.player.body.velocity.y >= 0)});
        this.physics.add.collider(this.player, this.mainplatform);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.bombs, this.bombs);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.starPlayerCollider = this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.bombPlayerCollider = this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        //Powers start here

        this.anims.create({
            key: 'shield_box',
            frames: [ { key: 'boxes', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({

            key: 'shield',
            frames: this.anims.generateFrameNumbers('shield', {start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });

        this.shieldPhysics = this.physics.add.group();



        this.shieldBoxes = this.physics.add.staticGroup();

        this.physics.add.collider(this.player, this.shieldBoxes, (player, _shieldBoxes) =>
        {
            if ((this.player.body.touching.up && _shieldBoxes.body.touching.down || this.charstateAbility) && !this.gameOver)
                {
                    this.sound.play('box_explosion')
                    this.cameras.main.shake(200, 0.002);
                    _shieldBoxes.destroy();

                    this.time.delayedCall(600, () =>
                    {
                        if(!this.gameOver){
                            this.effectShield = true
                            this.sound.play('shield')
                            this.shield = this.shieldPhysics.create(0, 0, 'shield').setAlpha(0.6)
                        }
                    });
                }
        });

        
        this.physics.add.collider(this.stars, this.shieldBoxes);
        this.physics.add.collider(this.bombs, this.shieldBoxes);


        
    }

    update ()
    {
        //player handler
        this.player.update(this.cursors, this.keyA, this.keyS, this.keyD, this.keySPACEBAR, this.skiddSound, this.jumpSound, this.activeStomp);
        //music handler
        if(!this.scene.isActive('pause') && this.mainStageMusic.isPaused){
            this.mainStageMusic.resume()
            console.log("Music resumed")
        }

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
        if(!this.gameOver){
            this.bg_nearestClouds.tilePositionX -= 0.2;
            this.bg_middleClouds.tilePositionX -= 0.1;
            this.bg_farestClouds.tilePositionX -= 0.05;
        }
        else if(this.gameOver){
            this.bg_nearestClouds.tilePositionX -= 0;
            this.bg_middleClouds.tilePositionX -= 0;
            this.bg_farestClouds.tilePositionX -= 0;
        }

        //shield stuff
        if(this.effectShield){
            Phaser.Display.Align.In.Center(this.shield, this.player)
            this.shield.anims.play('shield', true)
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

        if(((this.bombsExploded >= 15 || this.innerScore >= 10000) || this.key1.isDown) && this.level <= 256 && !this.fastLevelUp){
            this.fastLevelUp = true
            if(this.innerScore >= 10000){
                this.innerScore = 0
            }
            this.bombsExploded = 0
            this.level += 1
            this.bombsThatShouldSpawn += 1
            this.levelText.setText(`LEVEL: ${this.level}`);
            this.sound.play('check')
            if(this.level <= 10){
                this.mainStageMusic.rate += 0.01
            }
            this.time.delayedCall(500, () =>{
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

                child.enableBody(true, (Phaser.Math.Between(10, 1450)), 0, true, true);
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
                const x = Phaser.Math.Between(100, 1400);
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
            

                
            
            if(!this.effectShield && this.shieldBoxes.countActive(true) == 0){
                const shieldProbability = Phaser.Math.Between(1, 5)
                if(shieldProbability == 3){
                    this.Xshield = Phaser.Math.Between(100, 1400);
                    this.Yshield = Phaser.Math.Between(100, 450);
                    this.shieldBox = this.shieldBoxes.create(this.Xshield, this.Yshield, 'shield_box')
                    this.shieldBox.anims.play('shield_box', true)
                    console.log("This should have spawned a shield box...")
            
                }
            }
            this.badLuck = false
            this.youAskedForIt = false
            

        }
    }

    hitBomb (player, bomb)
    {
        if (this.charstateAbility || this.effectShield){
            bomb.body.setVelocity(0, 0);
            bomb.body.setEnable(false);
            bomb.body.debugBodyColor = 0x9048fc;
            this.cameras.main.shake(200, 0.003);
            console.log("You should have seen a shake effect on your screen rn")
            bomb.anims.play("explode", true);
            if(this.effectShield && this.charstateAbility){
                this.score += 500;
                this.innerScore += 500;
                this.scoreText.setText(`SCORE: ${this.score}`);
                this.bombsExploded += 1
            }
            if(this.effectShield && !this.charstateAbility){
                this.invAfterHit = true;
                this.effectShield = false;
                this.shield.destroy()
                this.upStun = true;
                this.sound.play('hurt_shield')
                this.score += 10;
                this.innerScore += 10;
                this.scoreText.setText(`SCORE: ${this.score}`);
                this.bombsExploded += 1
            }
            if(!this.effectShield && this.charstateAbility){
                this.charstateAbility = false;
                this.upStun = true;
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
                        });
                        this.time.delayedCall(200, () =>{
                            this.registry.destroy()
                            this.scene.stop('stage')
                        })
                    }
                });
            bomb.anims.play('explode', true);
            this.bombPlayerCollider.active = false
            this.charstateFall = false;
            this.charstateWalk = false;
            this.charstateJump = false;
            this.charstateIdle = false;
            this.charstateSkidd = false;
            this.charstateDead = true;
            this.physics.pause();
            this.cameras.main.shake(300, 0.025);
            this.mainStageMusic.stop()
            
        }
        this.sound.play('bomb_explosion')
    }

    }

