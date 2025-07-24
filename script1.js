
//Variables de puntuación 
var score = 0;
var scoreText;

//GAME OVER Variable
var gameOver = false;
var Metalmusic = false;
var Ghostmusic = false;
var Flymusic = false;
var Starmusic = false;
var Noon = false;
var Night = false;
var Rain = false;




function preload(){
    this.load.image('sky_noon', 'assets/background/noon.png');
    this.load.image('sky_night', 'assets/background/night.png');
    this.load.image('cloudy', 'assets/background/cloudy.png');
    this.load.image('rain_drop', 'assets/background/raindrop.png');
    this.load.spritesheet('star_night_anim', 'assets/background/star_night_anim.png', {frameWidth: 11, frameHeight: 11});
    this.load.image('rain_clouds', 'assets/background/rain_clouds.png');
    this.load.image('cloud_noon', 'assets/background/cloud_noon.png');
    this.load.image('cloud_noon2', 'assets/background/cloud_noon2.png');
    this.load.image('ground1', 'assets/platform.png');
    this.load.image('ground1_bg', 'assets/platform1_bg.png');
    this.load.image('ground1_bg1', 'assets/platform1_bg1.png');

    this.load.image('ground1_night', 'assets/platform_night.png');
    this.load.image('ground1_night1', 'assets/platform_night1.png');
    this.load.image('ground1_night_bg', 'assets/platform1_night_bg.png');
    this.load.image('ground1_night_bg1', 'assets/platform1_night_bg1.png');
    this.load.image('ground2', 'assets/platform2.png');
    this.load.image('ground2_bg', 'assets/platform2_bg.png');
    this.load.image('gameover', 'assets/game_over_text.png');
    this.load.image('bruh', 'assets/bruh_text.png');
    this.load.spritesheet('star', 'assets/star.png', {frameWidth: 25, frameHeight: 24});
    this.load.spritesheet('bomb', 'assets/bomb.png', {frameWidth: 28, frameHeight: 28});
    this.load.spritesheet('boom', 'assets/bomb_explosion.png', {frameWidth: 56, frameHeight: 56});
    this.load.spritesheet('star_boom', 'assets/star_explosion.png', {frameWidth: 25, frameHeight: 73});

    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('dude_death', 'assets/dude_death.png', {frameWidth: 50, frameHeight: 54});
    this.load.spritesheet('jump_left', 'assets/jump_left.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_right', 'assets/jump_right.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_front', 'assets/jump_front.png', {frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('fall', 'assets/fall.png', {frameWidth: 34, frameHeight: 50});
    this.load.spritesheet('fall_left', 'assets/fall_left.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('fall_right', 'assets/fall_right.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('dude_crouch', 'assets/dude_down.png', {frameWidth: 36, frameHeight: 39});
    this.load.spritesheet('run_left', 'assets/run_left.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('run_right', 'assets/run_right.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('fastrun_left', 'assets/fastrun_left.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('fastrun_right', 'assets/fastrun_right.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('skidd_left', 'assets/skidd_left.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_right', 'assets/skidd_right.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_turn_left', 'assets/skidd_turn_left.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('skidd_turn_right', 'assets/skidd_turn_right.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('twirl', 'assets/twirl.png',{frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('twirl_down', 'assets/twirldown.png',{frameWidth: 34, frameHeight: 55});

    this.load.spritesheet('metalic_box', 'assets/metal/metal_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('metalic_box_squish', 'assets/metal/metal_block_squish.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('dude_m', 'assets/metal/dude.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('jump_left_m', 'assets/metal/jump_left.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_right_m', 'assets/metal/jump_right.png', {frameWidth: 30, frameHeight: 54});
    this.load.spritesheet('jump_front_m', 'assets/metal/jump_front.png', {frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('fall_m', 'assets/metal/fall.png', {frameWidth: 34, frameHeight: 50});
    this.load.spritesheet('fall_left_m', 'assets/metal/fall_left.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('fall_right_m', 'assets/metal/fall_right.png', {frameWidth: 30, frameHeight: 49});
    this.load.spritesheet('dude_crouch_m', 'assets/metal/dude_down.png', {frameWidth: 36, frameHeight: 39});
    this.load.spritesheet('run_left_m', 'assets/metal/run_left.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('run_right_m', 'assets/metal/run_right.png', {frameWidth: 28, frameHeight: 52});
    this.load.spritesheet('skidd_left_m', 'assets/metal/skidd_left.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_right_m', 'assets/metal/skidd_right.png', {frameWidth: 30, frameHeight: 51});
    this.load.spritesheet('skidd_turn_left_m', 'assets/metal/skidd_turn_left.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('skidd_turn_right_m', 'assets/metal/skidd_turn_right.png', {frameWidth: 34, frameHeight: 51});
    this.load.spritesheet('twirl_m', 'assets/metal/twirl.png',{frameWidth: 34, frameHeight: 55});
    this.load.spritesheet('twirl_down_m', 'assets/metal/twirldown.png',{frameWidth: 34, frameHeight: 55});

    this.load.spritesheet('ghostic_box', 'assets/ghost/ghost_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('ghostic_box_squish', 'assets/ghost/ghost_block_squish.png',{frameWidth: 30, frameHeight: 30});

    this.load.spritesheet('starstic_box', 'assets/star/star_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('starstic_box_squish', 'assets/star/star_block_squish.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('stars_S', 'assets/star/stars.png',{frameWidth: 48, frameHeight: 48});

    this.load.spritesheet('flystic_box', 'assets/fly/fly_block.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('flystic_box_squish', 'assets/fly/fly_block_squish.png',{frameWidth: 30, frameHeight: 30});
    this.load.spritesheet('boost_cloud', 'assets/fly/boost_cloud.png',{frameWidth: 41, frameHeight: 30});

    this.load.audio('jump_sfx', 'assets/mp3/jump.mp3');
    this.load.audio('jump_sfx_m', 'assets/mp3/jump_metal.mp3');
    this.load.audio('hitbomb_sfx', 'assets/mp3/hit_bomb.mp3');
    this.load.audio('block_break', 'assets/mp3/blockbreak.mp3');
    this.load.audio('music_metal_intro', 'assets/mp3/metal_intro.mp3');
    this.load.audio('music_metal', 'assets/mp3/metal_loop.mp3');
    this.load.audio('music_fly_intro', 'assets/mp3/fly_intro.mp3');
    this.load.audio('music_fly', 'assets/mp3/fly_loop.mp3');
    this.load.audio('music_metal_fly', 'assets/mp3/metalfly.mp3');
    this.load.audio('music_star', 'assets/mp3/invincible.mp3');
    this.load.audio('music_star_M', 'assets/mp3/invincible_M.mp3');
    this.load.audio('music_star_F', 'assets/mp3/invincible_F.mp3');
    this.load.audio('music_star_M_F', 'assets/mp3/invincible_M_F.mp3');
    this.load.audio('music_noon', 'assets/mp3/noon_loop.mp3');
    this.load.audio('music_noon_intro', 'assets/mp3/noon_intro.mp3');
    this.load.audio('music_night', 'assets/mp3/night_loop.mp3');
    this.load.audio('music_night_intro', 'assets/mp3/night_intro.mp3');
    this.load.audio('bruh_theme', 'assets/mp3/bruh.mp3');
    this.load.audio('gameover_theme', 'assets/mp3/game_over.mp3');
    this.load.audio('appear_sfx', 'assets/mp3/Appear.mp3');
    this.load.audio('disappear_sfx', 'assets/mp3/Disappear.mp3');
    this.load.audio('star_get_sfx', 'assets/mp3/star_get.mp3');
    this.load.audio('airjump_sfx', 'assets/mp3/jump_air.mp3');
    this.load.audio('airjump_m_sfx', 'assets/mp3/jump_air_m.mp3');
    this.load.audio('skidd_sfx', 'assets/mp3/skidd.mp3');
    this.load.audio('rain_sfx', 'assets/mp3/rain_sfx.mp3');



}

function create(){

    this.cursors = this.input.keyboard.createCursorKeys();
 
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
    this.jumpSFX = this.sound.add('jump_sfx');
    this.jumpMSFX = this.sound.add('jump_sfx_m');
    this.airjumpSFX = this.sound.add('airjump_sfx');
    this.airjumpMSFX = this.sound.add('airjump_m_sfx');
    this.starCollect = this.sound.add('star_get_sfx');
    this.skiddSFX = this.sound.add('skidd_sfx');
    this.rainSFX = this.sound.add('rain_sfx');
    this.sound.add('hitbomb_sfx');
    this.sound.add('block_break');
    this.sound.add('appear_sfx');
    this.sound.add('disappear_sfx');



    this.noontheme = this.sound.add('music_noon');
    this.noontheme.intro = this.sound.add('music_noon_intro');

    this.nighttheme = this.sound.add('music_night');
    this.nighttheme.intro = this.sound.add('music_night_intro');

    this.metalTheme = this.sound.add('music_metal');
    this.metalTheme.intro = this.sound.add('music_metal_intro');

    this.flyTheme = this.sound.add('music_fly');
    this.flyTheme.intro = this.sound.add('music_fly_intro');

    this.MetalFlyTheme = this.sound.add('music_metal_fly');

    this.starTheme = this.sound.add('music_star');
    this.starMTheme = this.sound.add('music_star_M');
    this.starFTheme = this.sound.add('music_star_F');
    this.starMFTheme = this.sound.add('music_star_M_F');

    this.bruhtheme = this.sound.add('bruh_theme');
    this.gameOvertheme = this.sound.add('gameover_theme');




    var BgTime = Phaser.Math.Between(1, 2)
 

    if(BgTime == 1){

        this.add.image(750, 300, 'sky_noon');
        this.noontheme.intro.play();
        Noon = true

    }

    else if(BgTime == 2){

        this.add.image(750, 300, 'sky_night');
        this.nighttheme.intro.play();
        Night = true

    };
    //Clouds
    this.noonClouds = this.physics.add.group({
        key: 'cloud_noon',
        quantity: 10,
    });

    this.noonClouds2 = this.physics.add.group({
        key: 'cloud_noon2',
        quantity: 10
    });


    this.nightstars = this.physics.add.group({
        key: 'star_night_anim',
        quantity: 50
    });

    this.anims.create({

        key: 'star_night_anims',
        frames: this.anims.generateFrameNumbers('star_night_anim', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });



    const { x, y } = this.physics.world.bounds;

    if(Noon){

        this.nightstars.setVisible(false);
        for (const nooncloud of this.noonClouds.getChildren())
        {
            nooncloud.setRandomPosition(x, y);
        };

    for (const nooncloud2 of this.noonClouds2.getChildren())
        {
            nooncloud2.setRandomPosition(x, y);
        };
    }

    else if(Night){
        this.noonClouds.setVisible(false);
        this.noonClouds2.setVisible(false);
        for (const starnight of this.nightstars.getChildren())
        {
            starnight.setRandomPosition(x, y);
            starnight.anims.play('star_night_anims');
        };

    };


    this.add.image(750, 592, 'ground2_bg');

    var r_platform1 = Phaser.Math.Between(1, 2)
    var r_platform2 = Phaser.Math.Between(1, 2)
    var r_platform3 = Phaser.Math.Between(1, 2)
    var r_platform4 = Phaser.Math.Between(1, 2)


    if (Noon && !Night){
        if (r_platform1 == 1){
        this.add.image(600, 382, 'ground1_bg');
        }
        else if (r_platform1 == 2){
            this.add.image(600, 380, 'ground1_bg1');    
        };

        if (r_platform2 == 1){
            this.add.image(1390, 351, 'ground1_bg');
            }
        else if (r_platform2 == 2){
             this.add.image(1390, 349, 'ground1_bg1');    
        };
 
        if (r_platform3 == 1){
            this.add.image(750, 202, 'ground1_bg');
            }
        else if (r_platform3 == 2){
             this.add.image(750, 200, 'ground1_bg1');    
        };

        if (r_platform4 == 1){
            this.add.image(50, 232, 'ground1_bg');
            }
        else if (r_platform4 == 2){
            this.add.image(50, 230, 'ground1_bg1');   
        };
    }
    else if (Night && !Noon){
        if (r_platform1 == 1){
        this.add.image(600, 382, 'ground1_night_bg');
        }
        else if (r_platform1 == 2){
            this.add.image(600, 382, 'ground1_night_bg1');    
        };

        if (r_platform2 == 1){
            this.add.image(1390, 351, 'ground1_night_bg');
            }
        else if (r_platform2 == 2){
             this.add.image(1390, 351, 'ground1_night_bg1');    
        };
 
        if (r_platform3 == 1){
            this.add.image(750, 202, 'ground1_night_bg');
            }
        else if (r_platform3 == 2){
             this.add.image(750, 202, 'ground1_night_bg1');    
        };

        if (r_platform4 == 1){
            this.add.image(50, 232, 'ground1_night_bg');
            }
        else if (r_platform4 == 2){
            this.add.image(50, 232, 'ground1_night_bg1');   
        };
    }

    this.mainplatform = this.physics.add.staticGroup();

    this.mainplatform.create(750, 610, 'ground2');
    
    this.platforms = this.physics.add.staticGroup();

    if(Noon){
        this.platforms.create(600, 400, 'ground1');
        this.platforms.create(50, 250, 'ground1');
        this.platforms.create(750, 220, 'ground1');
        this.platforms.create(1390, 370, 'ground1');
    }
    else if (Night){
        if (r_platform1 == 1){
            this.platforms.create(600, 400, 'ground1_night');
            }
            else if (r_platform1 == 2){
                this.platforms.create(600, 400, 'ground1_night1');  
            };
    
            if (r_platform2 == 1){
                this.platforms.create(1390, 370, 'ground1_night');
                }
            else if (r_platform2 == 2){
                this.platforms.create(1390, 370, 'ground1_night1'); 
            };
     
            if (r_platform3 == 1){
                this.platforms.create(750, 220, 'ground1_night');
                }
            else if (r_platform3 == 2){
                this.platforms.create(750, 220, 'ground1_night1');   
            };
    
            if (r_platform4 == 1){
                this.platforms.create(50, 250, 'ground1_night');
                }
            else if (r_platform4 == 2){
                this.platforms.create(50, 250, 'ground1_night1'); 
            };
    }
    
    this.player = this.physics.add.sprite(100, 330, 'dude').setMaxVelocity(600, 1000);;

    this.player.setCollideWorldBounds(true);
    this.physics.world.setBoundsCollision(true, true, false, false) 
    this.player.setBounce(-0.8);



    this.anims.create({

        key: 'star_movement',
        frames: this.anims.generateFrameNumbers('star', {start: 0, end: 3}),
        frameRate: 5,
        repeat: -1
    });

    //Hoots' movement
    this.anims.create({

        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'leftrunning',
        frames: this.anims.generateFrameNumbers('run_left', {start: 3, end: 0}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'leftfastrunning',
        frames: this.anims.generateFrameNumbers('fastrun_left', {start: 3, end: 0}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'leftskidd',
        frames: this.anims.generateFrameNumbers('skidd_left', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'leftturnskidd',
        frames: this.anims.generateFrameNumbers('skidd_turn_left', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        
        key: 'left_crouch',
        frames: this.anims.generateFrameNumbers('dude_crouch', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'jumpleft',
        frames: this.anims.generateFrameNumbers('jump_left', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'crouch',
        frames: [{key: 'dude_crouch', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'jumpfront',
        frames: this.anims.generateFrameNumbers('jump_front', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallfront',
        frames: this.anims.generateFrameNumbers('fall', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallleft',
        frames: this.anims.generateFrameNumbers('fall_left', {start: 1, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallright',
        frames: this.anims.generateFrameNumbers('fall_right', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'right_crouch',
        frames: this.anims.generateFrameNumbers('dude_crouch', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'jumpright',
        frames: this.anims.generateFrameNumbers('jump_right', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'rightrunning',
        frames: this.anims.generateFrameNumbers('run_right', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'rightfastrunning',
        frames: this.anims.generateFrameNumbers('fastrun_right', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({

        key: 'rightskidd',
        frames: this.anims.generateFrameNumbers('skidd_right', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'rightturnskidd',
        frames: this.anims.generateFrameNumbers('skidd_turn_right', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'superfall',
        frames: this.anims.generateFrameNumbers('twirl_down', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({

        key: 'springtwirl',
        frames: this.anims.generateFrameNumbers('twirl', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({

        key: 'death',
        frames: this.anims.generateFrameNumbers('dude_death', {start: 0, end: 0}),
        frameRate: 15,
        repeat: -1
    });
//
//
//
//Metal __
//        |
//        |
//        V


    this.anims.create({

        key: 'left_m',
        frames: this.anims.generateFrameNumbers('dude_m', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        
        key: 'left_crouch_m',
        frames: this.anims.generateFrameNumbers('dude_crouch_m', {start: 3, end: 0}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'leftrunning_m',
        frames: this.anims.generateFrameNumbers('run_left_m', {start: 3, end: 0}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'jumpleft_m',
        frames: this.anims.generateFrameNumbers('jump_left_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'leftskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_left_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'leftturnskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_turn_left_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'rightskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_right_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'rightturnskidd_m',
        frames: this.anims.generateFrameNumbers('skidd_turn_right_m', {start: 0, end: 1}),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({

        key: 'turn_m',
        frames: [{key: 'dude_m', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'crouch_m',
        frames: [{key: 'dude_crouch_m', frame: 4}],
        frameRate: 20,
    });
    this.anims.create({

        key: 'jumpfront_m',
        frames: this.anims.generateFrameNumbers('jump_front_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallfront_m',
        frames: this.anims.generateFrameNumbers('fall_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallleft_m',
        frames: this.anims.generateFrameNumbers('fall_left_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'fallright_m',
        frames: this.anims.generateFrameNumbers('fall_right_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });


    this.anims.create({

        key: 'right_m',
        frames: this.anims.generateFrameNumbers('dude_m', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'rightrunning_m',
        frames: this.anims.generateFrameNumbers('run_right_m', {start: 0, end: 3}),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({

        key: 'right_crouch_m',
        frames: this.anims.generateFrameNumbers('dude_crouch_m', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({

        key: 'jumpright_m',
        frames: this.anims.generateFrameNumbers('jump_right_m', {start: 0, end: 1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({

        key: 'superfall_m',
        frames: this.anims.generateFrameNumbers('twirl_down_m', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({

        key: 'springtwirl_m',
        frames: this.anims.generateFrameNumbers('twirl_m', {start: 0, end: 5}),
        frameRate: 25,
        repeat: -1
    });






    
    this.player.body.setGravityY(300);
  
    this.physics.add.collider(this.player, this.platforms, null, (player) => { return player.body.velocity.y >= 0 });
    this.physics.add.collider(this.player, this.mainplatform);


    this.stars =  this.physics.add.group({

        key: 'star',
        repeat: 15,
        setXY: {x: 12, y:0, stepX: 70}
    });

    //Star
    this.anims.create({

        key: 'star_movement',
        frames: this.anims.generateFrameNumbers('star', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });


    //Blocks

    this.anims.create({

        key: 'metalicblock',
        frames: this.anims.generateFrameNumbers('metalic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({

        key: 'ghosticblock',
        frames: this.anims.generateFrameNumbers('ghostic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({

        key: 'flysticblock',
        frames: this.anims.generateFrameNumbers('flystic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({

        key: 'starsticblock',
        frames: this.anims.generateFrameNumbers('starstic_box', {start: 0, end: 1}),
        frameRate: 5,
        repeat: -1
    });

    this.squishM = this.add.sprite(0, 0, 'metalic_box_squish').setVisible(false);

    this.anims.create({

        key: 'metalicblock_squish',
        frames: this.anims.generateFrameNumbers('metalic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    this.squishG = this.add.sprite(0, 0, 'ghostic_box_squish').setVisible(false);

    this.anims.create({

        key: 'ghosticblock_squish',
        frames: this.anims.generateFrameNumbers('ghostic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    this.squishF = this.add.sprite(0, 0, 'flystic_box_squish').setVisible(false);

    this.anims.create({

        key: 'flysticblock_squish',
        frames: this.anims.generateFrameNumbers('flystic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    
    this.squishS = this.add.sprite(0, 0, 'starstic_box_squish').setVisible(false);

    this.anims.create({

        key: 'starsticblock_squish',
        frames: this.anims.generateFrameNumbers('starstic_box_squish', {start: 0, end: 2}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    this.invstars = this.add.sprite(0, 0, 'stars_S').setVisible(false);

    this.anims.create({

        key: 'stars_effect',
        frames: this.anims.generateFrameNumbers('stars_S', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
        showOnStart: true,
    });

    this.flyBoost = this.add.sprite(0, 0, 'boost_cloud').setVisible(false);

    this.anims.create({

        key: 'fly_boost',
        frames: this.anims.generateFrameNumbers('boost_cloud', {start: 0, end: 2}),
        frameRate: 15,
        showOnStart: true,
        hideOnComplete: true
    });

    //Bomb
    this.anims.create({

        key: 'bomb_movement',
        frames: this.anims.generateFrameNumbers('bomb', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
 
 
    //kaboom? (Yes Rico, kaboom!)  
    
    this.explosion = this.add.sprite(0, 0, 'boom').setVisible(false);

    this.anims.create({

        key: 'explode',
        frames: this.anims.generateFrameNumbers('boom', {start: 0, end: 3}),
        frameRate: 10,
        repeat: 2,
        showOnStart: true,
        hideOnComplete: true
    });

    this.starExplosion = this.add.sprite(0, 0, 'boom').setVisible(false);

    this.anims.create({

        key: 'star_explode',
        frames: this.anims.generateFrameNumbers('star_boom', {start: 0, end: 3}),
        frameRate: 30,
        showOnStart: true,
        hideOnComplete: true
    });

    this.anims.create({

        key: 'explode_final',
        frames: this.anims.generateFrameNumbers('boom', {start: 0, end: 3}),
        frameRate: 20,
        repeat: -1,
    });

    


    this.stars.children.iterate(function(child){
        child.setBounce(0.9);
        child.setVelocityX(Phaser.Math.FloatBetween(-200, 200), 20);
        child.setCollideWorldBounds(true);
        child.anims.play('star_movement', true);

        
    });

    this.physics.add.collider(this.stars, this.platforms, null, () => { return Ghostmusic == false});
    this.physics.add.collider(this.stars, this.mainplatform);

    this.physics.add.overlap(this.player, this.stars, collectStar, (player, stars) =>
        {
            this.starCollect.play();
            this.starExplosion.copyPosition(this.stars).play('star_explode');
        });


    scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: 'red'});

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms, null, () => { return Ghostmusic == false});
    this.physics.add.collider(this.bombs, this.mainplatform);
    this.physics.add.collider(this.bombs, this.bombs, null, () => { return Ghostmusic == false});

    const bombsCollider = this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

    const bombsColliderMetal = this.physics.add.overlap(this.player, this.bombs, (player, bomb) =>
        {
            this.sound.play('hitbomb_sfx');
            score += 50;
            scoreText.setText('Score: '+score);
            this.explosion.copyPosition(bomb).play('explode');
            bomb.destroy();
        });
    


    this.metalboxes = this.physics.add.staticGroup();

        this.physics.add.collider(this.player, this.metalboxes, (player, _metalboxes) =>
            {
                if ((this.player.body.touching.up && _metalboxes.body.touching.down || this.player.body.touching.down && this.cursors.down.isDown) && !gameOver)
                    {
                        this.noontheme.pause();
                        this.noontheme.intro.pause();
                        this.nighttheme.pause();
                        this.nighttheme.intro.pause();
                        this.sound.play('block_break');
                        if (!Flymusic){
                            if(!Starmusic){
                            this.metalTheme.intro.play();
                            };
                            this.player.body.setGravityY(400);
                        }
                        else if (Flymusic){
                            this.player.body.setGravityY(300);
                        };
                        Metalmusic = true;
                        if(!Starmusic){
                        this.bombsCollider.active = false;
                        this.bombsColliderMetal.active = true;
                        };
                        this.squishM.copyPosition(_metalboxes).play('metalicblock_squish');
                        _metalboxes.destroy();
                        this.time.delayedCall(48000, () =>
                            {
                                this.player.setTint(0x42ef00);
                            
                            })
                        this.time.delayedCall(50000, () =>
                            {
                                if(!Starmusic){
                                this.bombsCollider.active = true;
                                this.bombsColliderMetal.active = false;
                                this.metalTheme.pause();
                                this.metalTheme.intro.pause();
                                };
                                this.player.clearTint();
                                Metalmusic = false;
                                if(!Flymusic){
                                    if(!Starmusic){
                                    this.MetalFlyTheme.pause();
                                    if (Noon){
                                        this.noontheme.intro.play();
                                    }
                                    else if (Night){
                                        this.nighttheme.intro.play();
                                    }
                                    };
                                    this.player.body.setGravityY(300);
                                }
                                else if(Flymusic){
                                    if(!Starmusic){
                                    this.MetalFlyTheme.pause();
                                    this.flyTheme.intro.play();
                                    };
                                    this.player.body.setGravityY(100);
                                }                       
                            });
                    };
    
            });
        this.physics.add.collider(this.bombs, this.metalboxes, null, () => { return Ghostmusic == false});
        this.physics.add.collider(this.stars, this.metalboxes, null, () => { return Ghostmusic == false});
   
    this.ghostboxes = this.physics.add.staticGroup();

    this.physics.add.collider(this.player, this.ghostboxes, (player, _ghostboxes) =>
        {
            if ((this.player.body.touching.up && _ghostboxes.body.touching.down || this.player.body.touching.down && this.cursors.down.isDown) && !gameOver)
                {
                    this.sound.play('block_break');
                    this.squishG.copyPosition(_ghostboxes).play('ghosticblock_squish');
                    _ghostboxes.destroy();

                    this.time.delayedCall(600, () =>
                        {
                            if (!gameOver){
                            this.sound.play('disappear_sfx');
                            };
                        Ghostmusic = true;
                    });
                    this.time.delayedCall(5800, () =>
                        {
                            if (!gameOver){
                                this.sound.play('disappear_sfx');
                                };
                        })
                    this.time.delayedCall(7000, () =>
                        {
                            Ghostmusic = false;
                            if (!gameOver){
                            this.sound.play('appear_sfx');
                            };
                        });
                };
    
        });
    this.physics.add.collider(this.bombs, this.ghostboxes, null, () => { return Ghostmusic == false});
    this.physics.add.collider(this.stars, this.ghostboxes, null, () => { return Ghostmusic == false});


    this.flyboxes = this.physics.add.staticGroup();

    this.physics.add.collider(this.player, this.flyboxes, (player, _flyboxes) =>
        {
            if ((this.player.body.touching.up && _flyboxes.body.touching.down || this.player.body.touching.down && this.cursors.down.isDown) && !gameOver)
                {
                    this.noontheme.pause();
                    this.noontheme.intro.pause();
                    this.nighttheme.pause();
                    this.nighttheme.intro.pause();
                    this.sound.play('block_break');
                    Flymusic = true;
                    this.squishF.copyPosition(_flyboxes).play('flysticblock_squish');
                    _flyboxes.destroy();
                    if (!Metalmusic){
                        if(!Starmusic){
                            this.flyTheme.intro.play();
                        };
                        this.player.body.setGravityY(100);
                    }
                    else if (Metalmusic){
                        this.player.body.setGravityY(300);
                    }
                    this.time.delayedCall(48000, () =>
                        {
                            this.player.setTint(0xff0042);
                        
                        })
                    this.time.delayedCall(50000, () =>
                        {
                            this.player.clearTint();
                            this.flyTheme.pause();
                            this.flyTheme.intro.pause();
                            if(!Metalmusic){
                                Flymusic = false;
                                if(!Starmusic){
                                this.MetalFlyTheme.pause();
                                if (Noon){
                                    this.noontheme.intro.play();
                                }
                                else if (Night){
                                    this.nighttheme.intro.play();
                                }
                                };
                                this.player.body.setGravityY(300);
                            }
                            else if(Metalmusic){
                                Flymusic = false;
                                if(!Starmusic){
                                this.MetalFlyTheme.pause();
                                this.metalTheme.intro.play();
                                };
                                this.player.body.setGravityY(400);
                            };       
                        });
                };

        });
    this.physics.add.collider(this.bombs, this.flyboxes, null, () => { return Ghostmusic == false});
    this.physics.add.collider(this.stars, this.flyboxes, null, () => { return Ghostmusic == false});



this.starboxes = this.physics.add.staticGroup();

this.physics.add.collider(this.player, this.starboxes, (player, _starboxes) =>
    {
        if ((this.player.body.touching.up && _starboxes.body.touching.down || this.player.body.touching.down && this.cursors.down.isDown) && !gameOver)
            {
                this.noontheme.pause();
                this.noontheme.intro.pause();
                this.nighttheme.pause();
                this.nighttheme.intro.pause();
                this.flyTheme.intro.pause();
                this.flyTheme.pause();
                this.metalTheme.intro.pause();
                this.metalTheme.pause();
                this.MetalFlyTheme.pause();
                this.sound.play('block_break');
                invthis.stars.setVisible(true);
                invthis.stars.anims.play('stars_effect');
                Starmusic = true;
                if(!Metalmusic){
                this.bombsCollider.active = false;
                this.bombsColliderMetal.active = true;
                };
                this.squishS.copyPosition(_starboxes).play('starsticblock_squish');
                _starboxes.destroy();
                this.time.delayedCall(48000, () =>
                    {
                        this.player.setTint(0xffe739);
                    
                    })
                this.time.delayedCall(50000, () =>
                    {

                        this.player.clearTint();
                        Starmusic = false;
                        this.invstars.setVisible(false);
                        if(!Metalmusic){
                        this.bombsCollider.active = true;
                        this.bombsColliderMetal.active = false;
                        };

                        if(!Flymusic && !Metalmusic){
                            this.starTheme.pause();
                            this.starFTheme.pause();
                            this.starMTheme.pause();
                            this.starMFTheme.pause();
                            if (Noon){
                                this.noontheme.intro.play();
                            }
                            else if (Night){
                                this.nighttheme.intro.play();
                            }
                        }
                        else if(Flymusic && !Metalmusic){
                            this.starTheme.pause();
                            this.starFTheme.pause();
                            this.starMTheme.pause();
                            this.starMFTheme.pause();
                            this.flyTheme.intro.play();
                        } 
                        else if(!Flymusic && Metalmusic){
                            this.starTheme.pause();
                            this.starFTheme.pause();
                            this.starMTheme.pause();
                            this.starMFTheme.pause();
                            this.metalTheme.intro.play();
                        };  
                                         
                    });
            };

    });
this.physics.add.collider(this.bombs, this.starboxes, null, () => { return Ghostmusic == false});
this.physics.add.collider(this.stars, this.starboxes, null, () => { return Ghostmusic == false});

this.bruh_screen = this.add.image(750, 300, 'bruh').setVisible(false);

var Weather = Phaser.Math.Between(1, 3);

this.rain = this.physics.add.group({
    key: 'rain_drop',
    quantity: 250,
    visible: false
});


if(Weather == 2){
    for (const rainmove of this.rain.getChildren())
        {
            rainmove.setRandomPosition(x, y);
            this.rain.setVisible(true);
            this.noonClouds.setVisible(false);
            this.noonClouds2.setVisible(false);
            this.nightstars.setVisible(false);
            Rain = true
        }
        this.add.image(750, 300, 'cloudy');
        this.add.image(750, -20, 'rain_clouds');
    }

}




function update(){


if(!Metalmusic && !gameOver){


    if(gameOver){
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('dude_death', true);
   
    }else if(this.cursors.right.isDown && !this.cursors.down.isDown && !this.keyS.isDown && this.player.body.touching.down && !this.cursors.left.isDown){
        if(this.player.body.velocity.x >= -600 && this.player.body.velocity.x <= -161){
            if(!Rain){
                this.player.setAccelerationX(600);
            }
            else if (Rain){
                this.player.setAccelerationX(300);
            }
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }

        else if(this.player.body.velocity.x <= 160 || this.player.body.velocity.x >= -160 || this.player.body.velocity.x == 0){

            if (!this.keyS.isDown){
                if(!Starmusic){
                    this.player.setVelocityX(160);
                    this.player.setAccelerationX(0);
                }
                else if(Starmusic){
            this.player.setAccelerationX(160);
                }

            }
            else if (this.keyS.isDown){ 
         
                if(Starmusic){
                this.player.setAccelerationX(600);

                }
                else if(!Starmusic){
                    this.player.setVelocityX(300);
                    this.player.setAccelerationX(300);
                };
            }
        };

        if (this.player.body.velocity.x >= 1 && this.player.body.velocity.x <= 249){
            this.player.anims.play('right', true)
        }
        else if(this.player.body.velocity.x >= 250 && this.player.body.velocity.x <= 549){
            this.player.anims.play('rightrunning', true);
        }

        else if(this.player.body.velocity.x >= 550){
            this.player.anims.play('rightfastrunning', true);
        }
        else if(this.player.body.velocity.x <= -191){
            this.player.anims.play('leftskidd', true);
        }
        else if(this.player.body.velocity.x >= -190 && this.player.body.velocity.x <= -1){
            this.player.anims.play('leftturnskidd', true);
        };

    }else if(this.cursors.left.isDown && !this.cursors.down.isDown && !this.keyS.isDown && this.player.body.touching.down && !this.cursors.right.isDown){
        if(this.player.body.velocity.x <= 600 && this.player.body.velocity.x >= 161){
            if(!Rain){
                this.player.setAccelerationX(-600);
            }
            else if (Rain){
                this.player.setAccelerationX(-300);
            }
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }

        else if(this.player.body.velocity.x <= 160 || this.player.body.velocity.x >= -160 || this.player.body.velocity.x == 0){

            if (!this.keyS.isDown){
                if(!Starmusic){
                    this.player.setVelocityX(-160);
                    this.player.setAccelerationX(0);
                }
                else if(Starmusic){
            this.player.setAccelerationX(-160);
                }

            }
            else if (this.keyS.isDown){ 
         
                if(Starmusic){
                this.player.setAccelerationX(-600);

                }
                else if(!Starmusic){
                    this.player.setVelocityX(-300);
                    this.player.setAccelerationX(-300);
                };
            }
        };

        if (this.player.body.velocity.x <= -1 && this.player.body.velocity.x >= -249){
            this.player.anims.play('left', true)
        }
        else if(this.player.body.velocity.x <= -250 && this.player.body.velocity.x >= -549){
            this.player.anims.play('leftrunning', true);
        }

        else if(this.player.body.velocity.x <= -550){
            this.player.anims.play('leftfastrunning', true);
        }
        else if(this.player.body.velocity.x >= 191){
            this.player.anims.play('rightskidd', true);
        }
        else if(this.player.body.velocity.x <= 190 && this.player.body.velocity.x >= 1){
            this.player.anims.play('rightturnskidd', true);
        };
  
    } else if(this.cursors.right.isDown && this.cursors.down.isDown && this.player.body.touching.down){
        this.player.setVelocityX(80);
        this.player.anims.play('right_crouch', true);   

    } else if(this.cursors.left.isDown && this.cursors.down.isDown && this.player.body.touching.down){
        this.player.setVelocityX(-80);
        this.player.anims.play('left_crouch', true);   

    } else if (this.cursors.left.isDown && !this.cursors.down.isDown && !this.keyA.isDown && !this.player.body.touching.down){
        if(this.player.body.velocity.y <= -2 && !Flymusic){
            this.player.anims.play('jumpleft', true);
        }
        else if(this.player.body.velocity.y <= -2 && Flymusic){
            this.player.anims.play('springtwirl', true);
        }
        else if(this.player.body.velocity.y >= 10){
            this.player.anims.play('fallleft', true);
        };
        if(!Starmusic){
            this.player.setVelocityX(-160);
            this.player.setAccelerationX(0);
        }
        else if(Starmusic){
            this.player.setAccelerationX(-600);   
        };
    
    } else if(this.cursors.right.isDown && !this.cursors.down.isDown && !this.keyA.isDown && !this.player.body.touching.down){

        if(this.player.body.velocity.y <= -2 && !Flymusic){
            this.player.anims.play('jumpright', true);
        }
        else if(this.player.body.velocity.y <= -2 && Flymusic){
            this.player.anims.play('springtwirl', true);
        }
        else if(this.player.body.velocity.y >= 10){
            this.player.anims.play('fallright', true);
        };
        if(!Starmusic){
        this.player.setVelocityX(160);
        this.player.setAccelerationX(0);
        }
        else if(Starmusic){
            this.player.setAccelerationX(600);   
        };

        
    } else if(!this.cursors.down.isDown && !this.keyA.isDown && !this.cursors.space.isDown && !this.player.body.touching.down){
        if(this.player.body.velocity.y <= -2 && !Flymusic){
            this.player.anims.play('jumpfront', true);
        }
        else if(this.player.body.velocity.y <= -2 && Flymusic){
            this.player.anims.play('springtwirl', true);
        }
        else if(this.player.body.velocity.y >= 2){
            this.player.anims.play('fallfront', true);
        };

        if(!Starmusic){
        this.player.setVelocityX(0);
        };
        this.player.setAccelerationX(0);

    } else if(this.keyA.isDown && !this.player.body.touching.down){
        this.player.anims.play('superfall', true);
        this.player.setVelocityY (900);
        this.player.setAccelerationX(0);

    }else if(this.player.body.touching.down && !this.cursors.left.isDown && !this.cursors.right.isDown && this.cursors.down.isDown){
        this.player.setVelocityX(0);
        this.player.setAccelerationX(0);
        this.player.anims.play('crouch', true);

    }else if(this.player.body.touching.down && !this.cursors.left.isDown && !this.cursors.right.isDown){

        if(this.player.body.velocity.x <= 600 && this.player.body.velocity.x >= 161){
            if(!Rain){
                this.player.setAccelerationX(-600);
            }
            else if (Rain){
                this.player.setAccelerationX(-300);
            }
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
        }
        if(this.player.body.velocity.x >= -600 && this.player.body.velocity.x <= -161){
            if(!Rain){
                this.player.setAccelerationX(600);
            }
            else if (Rain){
                this.player.setAccelerationX(300);
            }
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
            };
        }

        if(this.player.body.velocity.x <= -191){
            this.player.anims.play('leftskidd', true);
        }
        else if(this.player.body.velocity.x >= -190 && this.player.body.velocity.x <= -161){
            this.player.anims.play('leftturnskidd', true);
        }

        else if(this.player.body.velocity.x >= 191){
            this.player.anims.play('rightskidd', true);
        }
        else if(this.player.body.velocity.x <= 190 && this.player.body.velocity.x >= 161){
            this.player.anims.play('rightturnskidd', true);
        }
           
        else if((this.player.body.velocity.x >= -160 || this.player.body.velocity.x <= 160 || this.player.body.velocity.x == 0)){
        this.player.setVelocityX(0);
        this.player.setAccelerationX(0);
        this.player.setAccelerationY(0);
        this.player.anims.play('turn', true);
            if (this.jumpSFX.isPlaying || this.airjumpSFX.isPlaying || this.jumpSFX.isPlaying && this.airjumpSFX.isPlaying){
                this.jumpSFX.pause();
                this.airjumpSFX.pause();
            };
        }
    }

    if((this.keyS.isDown || this.cursors.up.isDown) && this.player.body.touching.down && !gameOver){
        this.player.setVelocityY(-490);
        this.jumpSFX.play();
        this.flyBoost.copyPosition(this.player).play('fly_boost');

    }

    else if((this.keyS.isDown || this.cursors.up.isDown) && !this.player.body.touching.down && !gameOver && Flymusic && this.player.body.velocity.y > 200){
        this.player.setVelocityY(-500);
        this.flyBoost.copyPosition(this.player).play('fly_boost');
        this.airjumpSFX.play();

    };

    if(!this.player.body.touching.down && (!(this.keyS.isDown || this.cursors.up.isDown) || this.player.body.velocity.y >= 10) && !gameOver && !Flymusic){
        this.player.setAccelerationY(900)
    }
    else if(!this.player.body.touching.down && (this.keyS.isDown || this.cursors.up.isDown) && !gameOver){
        this.player.setAccelerationY(0)
    }
    else if(this.player.body.touching.down && !gameOver){
        this.player.setAccelerationY(0)
    }
}

else if(Metalmusic && !gameOver){
    if(gameOver){
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('dude_death', true);
    
    }else if(this.cursors.right.isDown && !this.cursors.down.isDown && !this.keyS.isDown && this.player.body.touching.down && !this.cursors.left.isDown){
        if(this.player.body.velocity.x >= -400 && this.player.body.velocity.x <= -121){
            this.player.setAccelerationX(900);
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }

        else if(this.player.body.velocity.x <= 120 || this.player.body.velocity.x >= -120 || this.player.body.velocity.x == 0){

            if (!this.keyS.isDown){
                if(!Starmusic){
                    this.player.setVelocityX(120);
                    this.player.setAccelerationX(0);
                }
                else if(Starmusic){
            this.player.setAccelerationX(120);
                }

            }
            else if (this.keyS.isDown){ 
         
                if(Starmusic){
                this.player.setAccelerationX(400);

                }
                else if(!Starmusic){
                    this.player.setVelocityX(200);
                    this.player.setAccelerationX(200);
                };
            }
        };

        if (this.player.body.velocity.x >= 1 && this.player.body.velocity.x <= 249){
            this.player.anims.play('right_m', true)
        }
        else if(this.player.body.velocity.x >= 250){
            this.player.anims.play('rightrunning_m', true);
        }

        else if(this.player.body.velocity.x <= -191){
            this.player.anims.play('leftskidd_m', true);
        }
        else if(this.player.body.velocity.x >= -190 && this.player.body.velocity.x <= -1){
            this.player.anims.play('leftturnskidd_m', true);
        };

    }else if(this.cursors.left.isDown && !this.cursors.down.isDown && !this.keyS.isDown && this.player.body.touching.down && !this.cursors.right.isDown){
        if(this.player.body.velocity.x <= 400 && this.player.body.velocity.x >= 121){
            this.player.setAccelerationX(-900);
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
            this.skiddSFX.play();
            };
        }

        else if(this.player.body.velocity.x <= 120 || this.player.body.velocity.x >= -120 || this.player.body.velocity.x == 0){

            if (!this.keyS.isDown){
                if(!Starmusic){
                    this.player.setVelocityX(-120);
                    this.player.setAccelerationX(0);
                }
                else if(Starmusic){
            this.player.setAccelerationX(-120);
                }

            }
            else if (this.keyS.isDown){ 
         
                if(Starmusic){
                this.player.setAccelerationX(-400);

                }
                else if(!Starmusic){
                    this.player.setVelocityX(-200);
                    this.player.setAccelerationX(-200);
                };
            }
        };

        if (this.player.body.velocity.x <= -1 && this.player.body.velocity.x >= -249){
            this.player.anims.play('left_m', true)
        }
        else if(this.player.body.velocity.x <= -250){
            this.player.anims.play('leftrunning_m', true);
        }

        else if(this.player.body.velocity.x >= 191){
            this.player.anims.play('rightskidd_m', true);
        }
        else if(this.player.body.velocity.x <= 190 && this.player.body.velocity.x >= 1){
            this.player.anims.play('rightturnskidd_m', true);
        };
  
    } else if(this.cursors.right.isDown && this.cursors.down.isDown && this.player.body.touching.down){
        this.player.setVelocityX(80);
        this.player.anims.play('right_crouch_m', true);   

    } else if(this.cursors.left.isDown && this.cursors.down.isDown && this.player.body.touching.down){
        this.player.setVelocityX(-80);
        this.player.anims.play('left_crouch_m', true);   

    } else if (this.cursors.left.isDown && !this.cursors.down.isDown && !this.keyA.isDown && !this.player.body.touching.down){
        if(this.player.body.velocity.y <= -2 && !Flymusic){
            this.player.anims.play('jumpleft_m', true);
        }
        else if(this.player.body.velocity.y <= -2 && Flymusic){
            this.player.anims.play('springtwirl_m', true);
        }
        else if(this.player.body.velocity.y >= 10){
            this.player.anims.play('fallleft_m', true);
        };
        if(!Starmusic){
            this.player.setVelocityX(-160);
            this.player.setAccelerationX(0);
        }
        else if(Starmusic){
            this.player.setAccelerationX(-400);   
        };
    
    } else if(this.cursors.right.isDown && !this.cursors.down.isDown && !this.keyA.isDown && !this.player.body.touching.down){

        if(this.player.body.velocity.y <= -2 && !Flymusic){
            this.player.anims.play('jumpright_m', true);
        }
        else if(this.player.body.velocity.y <= -2 && Flymusic){
            this.player.anims.play('springtwirl_m', true);
        }
        else if(this.player.body.velocity.y >= 10){
            this.player.anims.play('fallright_m', true);
        };
        if(!Starmusic){
        this.player.setVelocityX(160);
        this.player.setAccelerationX(0);
        }
        else if(Starmusic){
            this.player.setAccelerationX(600);   
        };

        
    } else if(!this.cursors.down.isDown && !this.keyA.isDown && !this.cursors.space.isDown && !this.player.body.touching.down){
        if(this.player.body.velocity.y <= -2 && !Flymusic){
            this.player.anims.play('jumpfront_m', true);
        }
        else if(this.player.body.velocity.y <= -2 && Flymusic){
            this.player.anims.play('springtwirl_m', true);
        }
        else if(this.player.body.velocity.y >= 2){
            this.player.anims.play('fallfront_m', true);
        };

        if(!Starmusic){
        this.player.setVelocityX(0);
        };
        this.player.setAccelerationX(0);

    } else if(this.keyA.isDown && !this.player.body.touching.down){
        this.player.anims.play('superfall_m', true);
        this.player.setVelocityY (900);
        this.player.setAccelerationX(0);

    }else if(this.player.body.touching.down && !this.cursors.left.isDown && !this.cursors.right.isDown && this.cursors.down.isDown){
        this.player.setVelocityX(0);
        this.player.setAccelerationX(0);
        this.player.anims.play('crouch_m', true);

    }else if(this.player.body.touching.down && !this.cursors.left.isDown && !this.cursors.right.isDown){

        if(this.player.body.velocity.x <= 400 && this.player.body.velocity.x >= 121){
            this.player.setAccelerationX(-900);
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
                };
        }
        if(this.player.body.velocity.x >= -400 && this.player.body.velocity.x <= -121){
            this.player.setAccelerationX(900);
            this.player.setAccelerationY(0);
            if(!this.skiddSFX.isPlaying){
                this.skiddSFX.play();
            };
        }

        if(this.player.body.velocity.x <= -191){
            this.player.anims.play('leftskidd_m', true);
        }
        else if(this.player.body.velocity.x >= -190 && this.player.body.velocity.x <= -121){
            this.player.anims.play('leftturnskidd_m', true);
        }

        else if(this.player.body.velocity.x >= 191){
            this.player.anims.play('rightskidd_m', true);
        }
        else if(this.player.body.velocity.x <= 190 && this.player.body.velocity.x >= 121){

            this.player.anims.play('rightturnskidd_m', true);
        }
           
        else if((this.player.body.velocity.x >= -120 || this.player.body.velocity.x <= 120 || this.player.body.velocity.x == 0)){
        this.player.setVelocityX(0);
        this.player.setAccelerationX(0);
        this.player.setAccelerationY(0);
        this.player.anims.play('turn_m', true);
            if (this.jumpMSFX.isPlaying || this.airjumpMSFX.isPlaying || this.jumpMSFX.isPlaying && this.airjumpMSFX.isPlaying){
                this.jumpMSFX.pause();
                this.airjumpMSFX.pause();
            };
        }
    }


    if((this.keyS.isDown || this.cursors.up.isDown) && this.player.body.touching.down && !gameOver){
        this.player.setVelocityY(-500);
        this.jumpMSFX.play();
        this.flyBoost.copyPosition(this.player).play('fly_boost');

    }

    else if((this.keyS.isDown || this.cursors.up.isDown) && !this.player.body.touching.down && !gameOver && Flymusic && this.player.body.velocity.y > 200){
        this.player.setVelocityY(-450);
        this.flyBoost.copyPosition(this.player).play('fly_boost');
        this.airjumpMSFX.play();

    };

    if(!this.player.body.touching.down && (!(this.keyS.isDown || this.cursors.up.isDown) || this.player.body.velocity.y >= 10) && !gameOver && !Flymusic){
        this.player.setAccelerationY(1200)
    }
    else if(!this.player.body.touching.down && (this.keyS.isDown || this.cursors.up.isDown) && !gameOver){
        this.player.setAccelerationY(0)
    }
    else if(this.player.body.touching.down && !gameOver){
        this.player.setAccelerationY(0)
    }
};


    if (!this.noontheme.isPlaying && !this.noontheme.intro.isPlaying && !this.nighttheme.isPlaying && !this.nighttheme.intro.isPlaying && 
        !gameOver && !Metalmusic && !Flymusic && !Starmusic){

        if (Noon){
            this.noontheme.play();
        }
        else if (Night){
            this.nighttheme.play();    
        }

    }
    
    else if (Metalmusic && !gameOver && !Flymusic && !Starmusic){

        if (this.metalTheme.isPlaying){
            this.metalTheme.intro.pause();
        };

        if (!this.metalTheme.isPlaying && !this.metalTheme.intro.isPlaying && !this.starTheme.isPlaying){
            this.metalTheme.play();
        }

    }
    else if (Flymusic && !gameOver && !Metalmusic && !Starmusic){

        if (this.flyTheme.isPlaying){
            this.flyTheme.intro.pause();
        };
    

        if (!this.flyTheme.isPlaying && !this.flyTheme.intro.isPlaying && !this.starTheme.isPlaying){
            this.flyTheme.play();
        }

    }
    else if (Flymusic && Metalmusic && !Starmusic && !gameOver){
        this.flyTheme.pause();
        this.flyTheme.intro.pause();
        this.metalTheme.pause();
        this.metalTheme.intro.pause();
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

        this.time.delayedCall(600, () =>
            {
            if (!this.MetalFlyTheme.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying && !this.starTheme.isPlaying){
                this.MetalFlyTheme.play();
            }
        });

    }
    else if (!this.noontheme.isPlaying && Starmusic && !gameOver){

            this.invstars.copyPosition(this.player);
            this.MetalFlyTheme.pause();

        if (!Metalmusic && Flymusic){
            this.starTheme.pause();
            this.starMTheme.pause();
            this.starMFTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starFTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starFTheme.play();
                }
            });
        }
        else if (Metalmusic && !Flymusic){
            this.starTheme.pause();
            this.starFTheme.pause();
            this.starMFTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starMTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starMTheme.play();

                }
            });
        }
        else if (!Metalmusic && !Flymusic){
            this.starFTheme.pause();
            this.starMTheme.pause();
            this.starMFTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starTheme.play();

                }
            });
        }
        else if (Metalmusic && Flymusic){
            this.starFTheme.pause();
            this.starMTheme.pause();
            this.starTheme.pause();
            this.time.delayedCall(600, () =>
                {
                if (!this.starMFTheme.isPlaying && !this.noontheme.intro.isPlaying && !this.metalTheme.intro.isPlaying && !this.flyTheme.intro.isPlaying){

                    this.starMFTheme.play();

                }
            });
        }

    }
    else if (!Starmusic && !gameOver){
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

    }
    else if (gameOver && this.player.y < 610 && this.player.y > -200){

        this.metalTheme.pause();
        this.metalTheme.intro.pause();
        this.flyTheme.pause();
        this.flyTheme.intro.pause();
        this.noontheme.pause();
        this.noontheme.intro.pause();
        this.nighttheme.pause();
        this.nighttheme.intro.pause();
        this.MetalFlyTheme.pause();
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

        this.player.anims.play('death');
        this.physics.pause();
     
        gameOver = true;

        if (!this.gameOvertheme.isPlaying){
            
            this.gameOvertheme.play();
        };
    }
    else if ((this.player.y >= 610 || this.player.y <= -200) && gameOver){

        this.metalTheme.pause();
        this.metalTheme.intro.pause();
        this.flyTheme.pause();
        this.flyTheme.intro.pause();
        this.noontheme.pause();
        this.noontheme.intro.pause();
        this.nighttheme.pause();
        this.nighttheme.intro.pause();
        this.MetalFlyTheme.pause();
        this.starTheme.pause();
        this.starFTheme.pause();
        this.starMTheme.pause();
        this.starMFTheme.pause();

        if (!this.bruhtheme.isPlaying){
            
            this.bruhtheme.play();
        };

    };

    if (this.player.y >= 610 || this.player.y <= -200){

        bruh_screen.setVisible(true);
        this.physics.pause();

        gameOver = true
    }

    if(!this.rainSFX.isPlaying && !gameOver && Rain){
        this.rainSFX.play();
    }

    if(Ghostmusic && !gameOver){
    this.bombs.setAlpha(0.7);
    this.stars.setAlpha(0.7);
    }
    else if(Ghostmusic == false || gameOver){
        this.bombs.setAlpha(1);
        this.stars.setAlpha(1);
    }


            this.physics.world.wrap(this.noonClouds, 100);
            this.noonClouds.setVelocity(50, 50);

            this.physics.world.wrap(this.noonClouds2, 100);
            this.noonClouds2.setVelocity(50, 50);

            this.physics.world.wrap(this.nightstars, 0);
            this.nightstars.setVelocity(10, -20);

            this.physics.world.wrap(this.rain, 0);
            this.rain.setVelocity(700, 700);


 

}


function collectStar(star){
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: '+score);

    if(this.stars.countActive(true) == 0 ){
                this.star.children.iterate(function(child){
                child.enableBody(true, child.x, 0, true, true);
                child.setBounce(0.9);
                child.setVelocityX(Phaser.Math.FloatBetween(-200, 200), 20);
                child.setCollideWorldBounds(true);

            });

        var StarRandom = Phaser.Math.Between(1, 10);


        var Xmetal = Phaser.Math.Between(100, 1400);
        var Ymetal = Phaser.Math.Between(100, 450);

        var Xghost = Phaser.Math.Between(100, 1400);
        var Yghost = Phaser.Math.Between(100, 450);

        var Xfly = Phaser.Math.Between(100, 1400);
        var Yfly = Phaser.Math.Between(100, 450);

        var Xstar = Phaser.Math.Between(100, 1400);
        var Ystar = Phaser.Math.Between(100, 450);

        if (!Metalmusic && this.metalboxes.countActive(true) == 0 && 
        (StarRandom == 1 || StarRandom == 2 || StarRandom == 3 || StarRandom == 5 || StarRandom == 7)){

            var metalbox = this.metalboxes.create(Xmetal, Ymetal, 'metalic_box');
            metalbox.anims.play('metalicblock', true);
        };

        if (!Ghostmusic && this.ghostboxes.countActive(true) == 0 && 
        (StarRandom == 2 || StarRandom == 3 || StarRandom == 4 || StarRandom == 6 || StarRandom == 8)){

            var ghostbox = this.ghostboxes.create(Xghost, Yghost, 'ghostic_box');
            ghostbox.anims.play('ghosticblock', true);
        };

        if (!Flymusic && this.flyboxes.countActive(true) == 0 &&
        (StarRandom == 1 || StarRandom == 3 || StarRandom == 6 || StarRandom == 9)){

            var flybox = this.flyboxes.create(Xfly, Yfly, 'flystic_box');
            flybox.anims.play('flysticblock', true);
        };

        if (!Starmusic && this.starboxes.countActive(true) == 0 && 
        (StarRandom == 3 || StarRandom == 1 || StarRandom == 4)){

            var starbox = this.starboxes.create(Xstar, Ystar, 'starstic_box');
            starbox.anims.play('starsticblock', true);
        };

        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0,400);

        var bomb = this.bombs.create(x, 16, 'bomb');

        bomb.anims.play('bomb_movement', true);
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        if(Ghostmusic){
            bomb.setAlpha(0.5);
        }
    }

}


function hitBomb(bomb){

    this.player.anims.play('death');
    bomb.anims.play('explode_final', true);
    this.sound.play('hitbomb_sfx');
    this.physics.pause();
    this.add.image(750, 300, 'gameover', true);
   
    gameOver = true;
    
}




var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 600,
    parent: 'Game',
    physics:{
        default: 'arcade',
        arcade: {
            gravity:{y: 300},
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);


this.scene.start('game');
    






