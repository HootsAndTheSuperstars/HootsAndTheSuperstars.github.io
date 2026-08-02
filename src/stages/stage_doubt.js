import Bomb from '../objects/bombs.js';
import { InvSTARS } from '../objects/invStars.js';
import { ObjPlayer } from '../objects/player.js'
import { Shield } from '../objects/shield.js';
import Star from '../objects/star.js';


//this should be the global functions

import { globalFunctions } from '../globalFunctions/globalFunctions.js';


export class StageDoubt extends Phaser.Scene


{
    constructor (){

        super({key: 'stage_doubt'});
    }

    init(){
        this.stageName = 'stage_doubt';
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

        this.mainStageMusic = this.sound.add('stage_doubt')
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
        this.vineClimbSFX = this.sound.add('vineClimb')
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
        //cursors or mostly called the keybinds
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
                globalFunctions.pauseHandler(this)
        });

        //tilesprite of the background

        this.background = this.add.tileSprite(750, 300, 1500, 600, 'background_doubt').setTint(0x9048fc);
        this.backgroundOver = this.add.tileSprite(750, 300, 1500, 600, 'background_doubt').setTint(0x0048fc);
    
        //tilemap of the stage itself and the fucking colission handler
        const stage = this.add.tilemap('doubtStage');

        const stageTiles = stage.addTilesetImage("tileSet", "tileSet_doubt");

        this.ladderLayer = stage.createLayer("ladder", stageTiles)

        const decorationLayer = stage.createLayer("decoration", stageTiles)
        
        
        this.player = new ObjPlayer(this, 450, 450);
        const groundLayer = stage.createLayer("ground", stageTiles)
        const platformsLayer = stage.createLayer("platforms", stageTiles)


        groundLayer.setCollisionByExclusion([-1])
        platformsLayer.setCollisionByExclusion([-1])
        this.ladderLayer.setCollisionByExclusion([-1])

        //ladder updater 

        this.events.on('preupdate', () => {
            this.player.onLadder = false;
        });

        this.physics.add.overlap(this.player, this.ladderLayer, (_player, tile) => {
            if (tile.index !== -1) {
                this.player.onLadder = true;
                //console.log('vine');
            }
        });



        //  The score
        this.scoreText = this.add.text(32, 16, `SCORE: ${this.score}`, { fontFamily:'HUDfont', fontSize: '32px', fill: '#fff' }).setVisible(false);
        this.levelText = this.add.text(32, 50, 'LEVEL: 0', { fontFamily:'HUDfont', fontSize: '32px', fill: '#fff' }).setVisible(false);

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
        this.stars.children.forEach(function (child) {
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


        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.starPlayerCollider = this.physics.add.overlap(this.player, this.stars, (player, star) => { globalFunctions.collectStar(this, this.player, star, this.starCollect) }, null, this);

        this.bombPlayerCollider = this.physics.add.overlap(this.player, this.bombs, (player, bomb) => { globalFunctions.hitBomb(this, this.player, bomb)}, null, this);
        
        //this overlaps are mainly to avoid noclip, like sonic 3 but upwards
        this.physics.add.overlap(this.player, groundLayer, (_player, tile) => {
            if (tile.index !== -1) {
                this.player.y = this.player.y -10
                
            }
        }, null, this);
        this.physics.add.overlap(this.player, platformsLayer, (_player, tile) => {
            if (tile.index !== -1 && this.player.charstateThroughPlatform) {
                this.player.y = this.player.y -10
            }
        }, null, this);
        //Powers start here

        this.shield = new Shield(this, 0, 0)



        this.shieldGenObj = this.physics.add.group();


        

        this.invStars = new InvSTARS(this, 0, 0)

        this.invGenObj = this.physics.add.group();

        this.physics.add.overlap(this.player, this.shieldGenObj, (player, shieldGenObj) => {
                globalFunctions.shieldAbility(this, player, shieldGenObj);
            }, null, this);
        
        this.physics.add.overlap(this.player, this.invGenObj, (player, invGenObj) => {
                globalFunctions.invinsAbility(this, player, invGenObj);
            }, null, this);

        //this 2 speceific overlaps are to avoid the powerup to get stuck somewhere in the solid ground
        this.physics.add.overlap(this.shieldGenObj, groundLayer, (shieldCollect, tile) => {
            if (tile.index !== -1) {
                this.Xshield = Phaser.Math.Between(100, 800);
                this.Yshield = Phaser.Math.Between(100, 400);
                this.shieldCollect.setPosition(this.Xshield, this.Yshield);
            }
        })
        this.physics.add.overlap(this.invGenObj, groundLayer, (invCollect, tile) => {
            if (tile.index !== -1) {
                this.Xinv = Phaser.Math.Between(100, 800);
                this.Yinv = Phaser.Math.Between(100, 400);
                this.invCollect.setPosition(this.Xinv, this.Yinv);
            }
        })
        this.cameras.main.centerOn(470, 300)

        this.backgroundLeft = true
        this.backgroundRight = false
        this.movementNumber = 0
        this.movementNumberOver = 0
   
    }

    update ()
    {
        if(!this.gameOver){
            this.background.tilePositionY += 0.5

            if(this.backgroundLeft){
                if(this.movementNumber > -2){
                    this.movementNumber -= 0.001
                    
                }
                else if(this.movementNumber <= -2){
                    this.time.delayedCall(100, ()=>{
                        this.backgroundLeft = false
                        this.backgroundRight = true
                    })
                }
            }
            else if(this.backgroundRight){
                if(this.movementNumber < 2){
                    this.movementNumber += 0.001
                    
                }
                else if(this.movementNumber >= 2){
                    this.time.delayedCall(100, ()=>{
                        this.backgroundLeft = true
                        this.backgroundRight = false
                    })
                }
            }

            this.background.tilePositionX += this.movementNumber


            this.backgroundOver.tilePositionY += 0.51

            if(this.backgroundLeft){
                if(this.movementNumberOver < 2){
                    this.movementNumberOver += 0.001
                    
                }
                else if(this.movementNumberOver >= 2){
                    this.time.delayedCall(100, ()=>{
                        this.backgroundLeft = false
                        this.backgroundRight = true
                    })
                }
            }
            else if(this.backgroundRight){
                if(this.movementNumberOver > -2){
                    this.movementNumberOver -= 0.001
                    
                }
                else if(this.movementNumberOver <= -2){
                    this.time.delayedCall(100, ()=>{
                        this.backgroundLeft = true
                        this.backgroundRight = false
                    })
                }
            }

            this.backgroundOver.tilePositionX += this.movementNumberOver
        }

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
        this.player.update(this);

        const { left, top, width, height } = this.player.body;

        this.player.onLadder = this.ladderLayer
            .getTilesWithinWorldXY(left, top, width, height)
            .some((tile) => tile.index !== -1);
        

        if(this.player.body.y > 1000 && !this.aboveWorldBounds){
            globalFunctions.outOfBounds(this)
        }

        //Power updating
        this.shield.update(this)
        this.invStars.update(this)

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

