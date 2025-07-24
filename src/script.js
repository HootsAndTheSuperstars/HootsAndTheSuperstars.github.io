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


        this.cursors;
        this.keyD;
        this.keyS;

        this.platforms;
        this.bombs;
        this.stars;
        this.player;

        //platform boxes

        this.platform1;
        this.platform2;
        this.platform3;

        //this are the character states (ex. walking, facing left... right... etc)
        //This is especially for flipping the sprites, DO NOT REMOVE
        this.facingRight = true;
        this.facingLeft = false;

        //char check
        this.Char1 = true;

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

        //effects
        this.effectShield = false;
        this.shield;
        this.shieldBoxes;

        this.youAskedForIt = false;
        this.aboveWorldBounds = false
    }
    preload ()
    {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.image('sky', 'assets/background/noon_background.png');
        this.load.image('sky_nearestClouds', 'assets/background/noon_nearestClouds.png');
        this.load.image('sky_middleClouds', 'assets/background/noon_middleClouds.png');
        this.load.image('sky_farestClouds', 'assets/background/noon_farestClouds.png');
        this.load.image('platform_0x02', 'assets/platforms/platform_02.png');
        this.load.image('platform_0x01', 'assets/platforms/platform_01.png');
        this.load.image('platform_0x00', 'assets/platforms/platform_main.png');


        this.load.spritesheet('star', 'assets/misc/star.png', {frameWidth: 25, frameHeight: 24});
        this.load.spritesheet('starGet', 'assets/misc/star_explosion.png', {frameWidth: 25, frameHeight: 73});
        this.load.spritesheet('boom', 'assets/misc/bomb_explosion.png', {frameWidth: 56, frameHeight: 56});
        this.load.spritesheet('bomb', 'assets/misc/bomb.png', {frameWidth: 28, frameHeight: 28});
        this.load.spritesheet('dude', 'assets/hoots/hoots.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('boxes', 'assets/misc/power_boxes.png', {frameWidth: 30, frameHeight: 30});

        this.load.spritesheet('shield', 'assets/misc/shield/shield.png', {frameWidth: 48, frameHeight: 42});
        this.load.pack('music_json', 'src/json/sounds.json')

    }

    create ()
    {

        //this.charstateDead = false
        //this.gameOver = false
        //this.score = 0
        //this.badLuck = false


        this.cameras.main.fadeIn(500)
        //sounds start here
        this.sound.add('wetfard')
        this.sound.add('bomb_explosion')
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
        
        //this.sound.add('shield')
        //main game
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keySPACEBAR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        console.log("inputs created!")
        this.input.keyboard.on('keydown-ENTER', () =>
        {
            if(!this.charstateDead){
                console.log('Pausing game...')
                this.scene.launch('pause')
                this.scene.pause('stage')
            }
            else if(this.charstateDead){
                console.log("You can't pause the game right now...")
            }
        });
        this.input.keyboard.on('keydown-L', () =>
        {
            this.sound.play('youMustDie')
            this.time.delayedCall(850, () =>{
                this.mainplatform.destroy()
                this.platform1.destroy()
                this.platform2.destroy()
                this.platform3.destroy()
                this.platform4.destroy()
                this.charstateDead = true
                this.sound.play('floor_destroy')
                this.time.delayedCall(200, () =>{
                    this.sound.play('fall')
                })
            })
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
            this.platform2 = this.platforms.create(1390, 353, 'platform_0x01');
        }
        else if (r_platform2 == 2){
            this.platform2 = this.platforms.create(1390, 353, 'platform_0x02');    
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
            this.platform4 = this.platforms.create(50, 232, 'platform_0x01');
            }
        else if (r_platform4 == 2){
            this.platform4 = this.platforms.create(50, 232, 'platform_0x02');   
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


        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'dude');
        console.log("Player Created!");
        this.player.body.setSize(16, 38);
        this.player.body.setOffset(25, 14);
        console.log("The player's hitbox should be mesured to fit the sprites");
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);
        this.physics.world.checkCollision.up = false;
        this.physics.world.checkCollision.down = false;
        this.player.body.setGravityY(600);
        this.player.debugBodyColor = 0x9048fc;
        console.log("Player's MISC configs should work now...");
        //  Our player animations, turning, walking left and walking right.

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11 }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'skidd',
            frames: this.anims.generateFrameNumbers('dude', { start: 16, end: 17 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('dude', { start: 18, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('dude', { start: 20, end: 21 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'stomp',
            frames: this.anims.generateFrameNumbers('dude', { start: 22, end: 25 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'hurt',
            frames: [ { key: 'dude', frame: 26 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('dude', { start: 27, end: 28 }),
            frameRate: 10,
            repeat: -1
        });

        console.log("Char sprites created!");

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

        //  The score
        this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontFamily:'HUDfont', fontSize: '32px', fill: '#000' }).setVisible(false);

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.player, this.platforms, null, (player) => { return (this.player.body.velocity.y >= 0)});
        this.physics.add.collider(this.player, this.mainplatform);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.bombs, this.bombs);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

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
                        this.effectShield = true
                        this.sound.play('shield')
                        this.shield = this.shieldPhysics.create(0, 0, 'shield').setAlpha(0.6)
                    });
                }
        });

        
        this.physics.add.collider(this.stars, this.shieldBoxes);
        this.physics.add.collider(this.bombs, this.shieldBoxes);

    }

    update ()
    {

        if(this.player.body.y > 1000 && !this.aboveWorldBounds){
            this.aboveWorldBounds = true
            this.bombPlayerCollider = false
            this.cameras.main.fadeOut(1000)
            this.time.delayedCall(5000, () =>{
                this.scene.launch('error')
                this.scene.stop('stage')
                    
                
            })
        }
        //error screen stuff

        //Background starts here
        if(!this.gameOver){
            this.bg_nearestClouds.tilePositionX -= 0.1;
            this.bg_middleClouds.tilePositionX -= 0.05;
            this.bg_farestClouds.tilePositionX -= 0.025;
        }
        else if(this.gameOver){
            this.bg_nearestClouds.tilePositionX -= 0;
            this.bg_middleClouds.tilePositionX -= 0;
            this.bg_farestClouds.tilePositionX -= 0;
        }

        //char starts here
        if(!this.charstateDead)
        {
        //states for flipping the char
            if(!this.charstateSkidd){
                if(this.facingLeft == true){
                    this.player.setFlipX(true);
                    console.log("Fliping player anims to the Left")
                }
                else if(this.facingRight == true){
                    this.player.setFlipX(false);
                    console.log("Fliping player anims to the Right")
                }
            }

            if(!this.charstateHurt && !this.charstateSkidd){
                if(this.cursors.left.isDown && !this.cursors.right.isDown && this.player.body.velocity.x >= 0){
                    this.facingLeft = true;
                    this.facingRight = false;
                }
                else if(this.cursors.right.isDown && !this.cursors.left.isDown && this.player.body.velocity.x <= 0){
                    this.facingLeft = false;
                    this.facingRight = true;
                }
            else if((this.cursors.left.isDown && this.cursors.right.isDown || this.cursors.left.isDown && this.cursors.right.isDown)){
                if(this.player.body.velocity.x > 0){
                    this.facingLeft = false;
                    this.facingRight = true;
                }
                else if(this.player.body.velocity.x < 0){
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
                        this.player.setVelocityX(-160);
                        console.log("Left, normal speed");
                    }
                    else if(this.facingRight){
                        this.player.setVelocityX(160);
                        console.log("Right, normal speed");                
                    }
                }
                else if(this.charstateRun && this.charstateWalk && !this.charstateSkidd){
                    console.log("State: Running");
                    if(this.facingLeft){
                        this.player.setVelocityX(-250);
                        console.log("Left, fast speed");
                    }
                    else if(this.facingRight){
                        this.player.setVelocityX(250);
                        console.log("Right, fast speed");                
                    }
                }
                else if(this.charstateSkidd){
                    console.log("State: Skidding")
                    if(!this.skiddSound.isPlaying && this.player.body.onFloor()){
                        this.skiddSound.play()
                    }
                    else if(!this.player.body.onFloor()){
                        this.skiddSound.stop()
                    }
                    if(!this.charstateIdle){
                        if(this.cursors.left.isDown){
                            this.player.setAccelerationX(-300);
                            console.log("Pushing right");
                        }
                        else if(this.cursors.right.isDown){
                            this.player.setAccelerationX(300);
                            console.log("Pushing left");                
                        }
                    }    
                    else if(this.charstateIdle){
                        if(this.facingLeft){
                            this.player.setAccelerationX(300);
                            console.log("Pushing right");
                        }
                        else if(this.facingRight){
                            this.player.setAccelerationX(-300);
                            console.log("Pushing left");                
                        }
                    }             
                }
                else if(this.charstateIdle){
                    this.player.setAccelerationX(0);
                    this.player.setAccelerationY(0);
                    this.player.setVelocityX(0);
                    console.log("State: idle");
                }

                if(this.charstateJump && !this.charstateFall){
                    this.player.setVelocityY(-490);
                    console.log("State: Jumping");
                }
                else if(this.charstateFall && !this.charstateJump){
                    this.player.setAccelerationY(900);
                    console.log("State: Falling");
                }
                else if(this.charstateFall && this.charstateJump){
                    this.player.setAccelerationY(0);
                    console.log("State: Maintaining jump");
                }
                else if(this.charstateAbility){
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(1500)
                    console.log("State: Stomp")
                }
            }
            else if(this.charstateHurt){

                console.log("State: Hurt");
                
                if(this.facingLeft){
                    this.player.setVelocityX(180);
                    console.log("Pushed right");
                }
                else if(this.facingRight){
                    this.player.setVelocityX(-180);
                    console.log("Pushed left");                
                }
            }
            if (this.upStun){
                this.player.body.setVelocityY(-200)
                this.charstateHurt = true;
                this.time.delayedCall(100, () => {
                    this.upStun = false
                })
            }
        }
        else if(this.charstateDead){
            this.player.setVelocityX(0);
            console.log("State: Dead")
        }

        //input states

        if(!this.charstateHurt){
            //general walk
            if(this.cursors.left.isDown || this.cursors.right.isDown){
                    this.charstateWalk = true
                if(this.keyS.isDown && this.player.body.onFloor()){
                    this.charstateRun = true
                    if((this.cursors.left.isDown && this.player.body.velocity.x > 160) || (this.cursors.right.isDown && this.player.body.velocity.x < -160)){
                        this.charstateSkidd = true
                    }
                    else if((this.cursors.left.isDown && this.player.body.velocity.x < 160) || (this.cursors.right.isDown && this.player.body.velocity.x > -160)){
                        this.charstateSkidd = false
                    }
                }
                else if(!this.keyS.isDown || !this.player.body.onFloor()){
                    this.charstateRun = false
                    this.charstateSkidd = false
                }
                
            }
            //jumping and falling
            if((this.cursors.up.isDown || this.keyD.isDown || this.keySPACEBAR.isDown) && this.player.body.onFloor()){
                if(!this.jumpSound.isPlaying){
                    this.jumpSound.play()
                }
                this.charstateJump = true;
                this.charstateFall = false;
                this.charstateSkidd = false
            }
            else if(!this.keyA.isDown && !this.cursors.down.isDown){
                if((this.cursors.up.isDown || this.keyD.isDown || this.keySPACEBAR.isDown) && !this.player.body.onFloor() && this.player.body.velocity.y < -1){
                    this.charstateJump = true;
                    this.charstateFall = true 
                }
                else if(!this.player.body.onFloor() && (this.player.body.velocity.y >= -1 && (this.cursors.up.isDown || this.keyD.isDown || this.keySPACEBAR.isDown) || (!this.cursors.up.isDown || !this.keyD.isDown || this.keySPACEBAR.isDown))){
                    this.charstateJump = false;
                    this.charstateFall = true;
                    this.charstateSkidd = false
                }
            }
            else if(!this.player.body.onFloor() && (this.keyA.isDown || this.cursors.down.isDown)){
                this.charstateJump = false;
                this.charstateFall = false;
                this.charstateAbility = true;

            }
        }

        else if(this.player.body.onFloor()){
            this.charstateHurt = false;
            this.time.delayedCall(300, () =>{
                this.checkforpreventingSkiddafterStun = false
            })
        };

        if(!this.charstateHurt){
            if((this.player.body.onFloor() && (!this.cursors.up.isDown && !this.keyD.isDown || this.keySPACEBAR.isDown)|| !this.player.body.onFloor()) && (!this.cursors.left.isDown && !this.cursors.right.isDown || this.cursors.left.isDown && this.cursors.right.isDown)){
                if((this.player.body.velocity.x >= 150 || this.player.body.velocity.x <= -150) && !this.checkforpreventingSkiddafterStun){
                    this.charstateSkidd = true
                    this.charstateIdle = true
                }
                else if(this.player.body.velocity.x < 150 && this.player.body.velocity.x > -150 || this.checkforpreventingSkiddafterStun){
                    this.charstateIdle = true
                    this.charstateSkidd = false
                }
            }
            else if (this.keyA.isDown || this.cursors.down.isDown || this.keyD.isDown || this.keySPACEBAR.isDown || this.cursors.up.isDown  || this.cursors.left.isDown || this.cursors.right.isDown){
                this.charstateIdle = false
            }

            if(this.player.body.onFloor()){
                this.charstateFall = false;
                this.charstateAbility = false;

            };

            if(this.charstateIdle){
                this.charstateWalk = false;
                
            }

        }
        //gameover ig
        if (this.gameOver)
        {
            this.charstateDead = true;
        }
        if(this.charstateHurt){
            this.checkforpreventingSkiddafterStun = true
        }

        //states for animations per char

        if(this.Char1){
            if(!this.charstateDead && !this.charstateHurt){
                if (this.charstateWalk && this.player.body.onFloor() && !this.charstateJump)
                {
                    if(!this.charstateSkidd && this.player.body.velocity.y == 0){
                        if((this.player.body.velocity.x < 0 && this.player.body.velocity.x > -199) || (this.player.body.velocity.x > 0 && this.player.body.velocity.x < 199)){
                            this.player.anims.play('walk', true);
                        }
                        else if(this.player.body.velocity.x <= -200 || this.player.body.velocity.x >= 200){
                            this.player.anims.play('run', true);
                        }
                    }
                        else if(this.charstateSkidd){
                        this.player.anims.play('skidd', true);
                    }
                
                }

                else if (this.charstateJump && this.player.body.velocity.y <= -1){
                    this.player.anims.play('jump', true);
                }
                else if (this.charstateFall && this.player.body.velocity.y >= 1){
                    this.player.anims.play('fall', true)
                }
                else if(this.charstateAbility && !this.player.body.onFloor() && !this.charstateFall){
                    this.player.anims.play('stomp', true)
                }

                else if(this.charstateIdle && this.player.body.onFloor())
                {
                    if(this.charstateSkidd){
                        this.player.anims.play('skidd', true);
                    }
                    else{
                        this.player.anims.play('turn', true);
                    }
                }

            }
            else if(this.charstateDead){
                this.player.anims.play('dead', true)
            }
            else if (this.charstateHurt && !this.player.body.onFloor()){
                this.player.anims.play('hurt', true)
            }

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
    

        if(this.keyE.isDown && this.keyZ.isDown && !this.youAskedForIt){
            this.youAskedForIt = true
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
        this.scoreText.setText(`SCORE: ${this.score}`).setVisible(true);

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

            const x = Phaser.Math.Between(400, 1100);
            const badLuck = Phaser.Math.FloatBetween(1, 10000)

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.body.setMaxSpeed(800);
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


            if(badLuck == 1){
                this.youAskedForIt = true
            }
            if(this.youAskedForIt){
                this.sound.play('wetfard')
                for (let i = 0; i < 800; i++){
                    const bomb = this.bombs.create(x, 16, 'bomb');
                    bomb.body.setMaxSpeed(800);
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
            }

                
            
            if(!this.effectShield && this.shieldBoxes.countActive(true) == 0){
                const shieldProbability = Phaser.Math.Between(1, 5)
                if(shieldProbability == 3){
                    this.Xshield = Phaser.Math.Between(100, 1400);
                    this.Yshield = Phaser.Math.Between(100, 450);
                    this.shieldBox = this.shieldBoxes.create(this.Xshield, this.Yshield, 'shield_box')
                    this.shieldBox.anims.play('shield_box', true)
            
                }
            }
            

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
                this.scoreText.setText(`SCORE: ${this.score}`);
            }
            if(this.effectShield && !this.charstateAbility){
                this.invAfterHit = true;
                this.effectShield = false;
                this.shield.destroy()
                this.upStun = true;
                this.sound.play('hurt_shield')
                this.score += 10;
                this.scoreText.setText(`SCORE: ${this.score}`);
            }
            if(!this.effectShield && this.charstateAbility){
                this.charstateAbility = false;
                this.upStun = true;
                this.sound.play('hurt')
                this.score += 200;
                this.scoreText.setText(`SCORE: ${this.score}`);
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
            
        }
        this.sound.play('bomb_explosion')
    }

    }

