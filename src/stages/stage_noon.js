import Bomb from '../objects/bombs.js';
import { InvSTARS } from '../objects/invStars.js';
import { ObjPlayer } from '../objects/player.js'
import { Shield } from '../objects/shield.js';
import Star from '../objects/star.js';


//this should be the global functions

import { globalFunctions } from '../globalFunctions/globalFunctions.js';


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


        this.bombExplosion = this.add.sprite(0, 0, 'boom').setVisible(false);
        


        console.log("Bomb sprites created!");

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            classType: Star,
            key: 'star',
            repeat: 10,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.stars.children.iterate(child => {
            child.initPhysics();
        });


        this.starCollect = this.add.sprite(0, 0, 'starGet').setVisible(false);


    

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
        this.starPlayerCollider = this.physics.add.overlap(this.player, this.stars, (player, star) => { globalFunctions.collectStar(this, this.player, star, this.starCollect) }, null, this);

        this.bombPlayerCollider = this.physics.add.collider(this.player, this.bombs, (player, bomb) => { globalFunctions.hitBomb(this, this.player, bomb)}, null, this);

        //Powers start here

        this.shield = new Shield(this, 0, 0)



        this.shieldGenObj = this.physics.add.group();


        

        this.invStars = new InvSTARS(this, 0, 0)

        this.invGenObj = this.physics.add.group();

        this.physics.add.collider(this.player, this.shieldGenObj, (player, shieldGenObj) => {
                globalFunctions.shieldAbility(this, player, shieldGenObj);
            }, null, this);
        this.physics.add.collider(this.player, this.invGenObj, (player, invGenObj) => {
                globalFunctions.invinsAbility(this, player, invGenObj);
            }, null, this);

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
            globalFunctions.outOfBounds(this)
        }
        //error screen stuff

        //Power updating
        this.shield.update(this.player, this.effectShield, this.effectInv)
        this.invStars.update(this.player, this.effectInv)


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
            globalFunctions.bombExplodedManager(this)
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
            this.invMusic.stop()
            this.time.delayedCall(500, () =>{
                this.scene.switch('error')
            })
        }
    }

}

