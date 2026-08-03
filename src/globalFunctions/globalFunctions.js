import Bomb from '../objects/bombs.js';

export class globalFunctions{
    
    //star function
    
    static collectStar (scene, player, star, starCollect){
        scene.starCollect.copyPosition(star).play('star_collect');
        star.disableBody(true, true);

        // Control del sonido
        if (!scene.starSound.isPlaying) {
            scene.starSound.play();
        } else {
            scene.starSound.stop();
            scene.starSound.play();
        }

        // Actualización de textos de interfaz
        scene.score += 100;
        scene.innerScore += 100;
        scene.scoreText.setText(`SCORE: ${scene.score}`).setVisible(true);
        scene.levelText.setText(`LEVEL: ${scene.level}`).setVisible(true);

        // Comprobamos si el mapa se quedó sin estrellas activas
        if (scene.stars.countActive(true) === 0) {
            // Llamamos al respawn interno de cada estrella de forma directa y limpia
            scene.stars.children.forEach(function (child) {
                child.respawn();
            });

            

            const badLuck = Phaser.Math.Between(1, 1000)
            if(badLuck == 1){
                scene.youAskedForIt = true
                scene.bombsThatShouldSpawn += 999
            }


            if(scene.youAskedForIt){
                scene.sound.play('wetfard')
            }
            else{
                scene.sound.play('bomb_fall')
            }
            
            for (let i = scene.bombSpawning; i < scene.bombsThatShouldSpawn; i++){
                const x = Phaser.Math.Between(100, 900);
                var bomb = new Bomb(scene, x, -10, scene.bombs);
                
                
            }
            

                
            //this is for the shield
            if(!scene.effectShield && scene.shieldGenObj.countActive(true) == 0){
                const shieldProbability = Phaser.Math.Between(1, 5)
                if(shieldProbability == 3){
                    //481 370
                    scene.Xshield = Phaser.Math.Between(100, 800);
                    scene.Yshield = Phaser.Math.Between(100, 400);
                    scene.shieldCollect = scene.shieldGenObj.create(scene.Xshield, scene.Yshield, 'shield_box')
                    scene.shieldCollect.anims.play('shield_pw', true)
            
                }
            }

            if(scene.invGenObj.countActive(true) == 0){
                const invProbability = Phaser.Math.Between(1, 10)
                if(invProbability == 3){
                    scene.Xinv = Phaser.Math.Between(100, 800);
                    scene.Yinv = Phaser.Math.Between(100, 400);
                    scene.invCollect = scene.invGenObj.create(scene.Xinv, scene.Yinv, 'star_box')
                    scene.invCollect.anims.play('star_pw', true)
            
                }
            }
            scene.badLuck = false
            scene.youAskedForIt = false
            

        }
    }

    static bombExplodedManager(scene){
        scene.fastLevelUp = true
        if(scene.innerScore >= 5000){
            scene.innerScore = 0
        }
        scene.bombsExploded = 0
        scene.level += 1
        scene.bombsThatShouldSpawn += 1
        scene.levelText.setText(`LEVEL: ${scene.level}`)
        scene.sound.play('check')
        if(scene.level <= 20){
            scene.mainStageMusic.rate += 0.01
        }
        scene.time.delayedCall(1, () =>{
            scene.fastLevelUp = false
        })
    }

    static hitBomb (scene, player, bomb)
    {
        if (scene.player.charstateAbility || scene.effectShield || scene.effectInv){
            bomb.body.setVelocity(0, 0);
            bomb.body.setEnable(false);
            bomb.body.debugBodyColor = 0x9048fc;
            scene.cameras.main.shake(200, 0.003);
            bomb.anims.play("explode", true);
            if((scene.effectShield && scene.player.charstateAbility) || scene.effectInv){

                scene.score += 500;
                scene.innerScore += 500;
                scene.scoreText.setText(`SCORE: ${scene.score}`);
                scene.bombsExploded += 1
            
            }
            if(scene.effectShield && !scene.player.charstateAbility && !scene.effectInv){
                scene.player.invAfterHit = true;
                scene.effectShield = false;
                scene.player.upStun = true;
                scene.sound.play('hurt_shield')
                scene.score += 10;
                scene.innerScore += 10;
                scene.scoreText.setText(`SCORE: ${scene.score}`);
                scene.bombsExploded += 1
            }
            if(!scene.effectShield && scene.player.charstateAbility && !scene.effectInv){
                scene.player.charstateAbility = false;
                scene.player.upStun = true;
                scene.sound.play('hurt')
                scene.score += 100;
                scene.innerScore += 100;
                scene.scoreText.setText(`SCORE: ${scene.score}`);
                scene.bombsExploded += 1
            }
            scene.time.delayedCall(1000, () => {
                bomb.destroy();
            })

        }
        else{
            if(!scene.gameover)
                scene.gameOver = true;
                scene.time.delayedCall(800, () =>{
                    if(!scene.gameOverLauncher){
                        scene.gameOverLauncher = true
                        scene.scene.launch('gameover', {
                            score : scene.score,
                            stageName: scene.stageName,
                        });
                        scene.time.delayedCall(200, () =>{
                            scene.registry.destroy()
                            scene.scene.stop('stage')
                        })
                    }
                });
            bomb.anims.play('explode', true);
            scene.bombPlayerCollider.active = false
            scene.player.charstateFall = false;
            scene.player.charstateWalk = false;
            scene.player.charstateJump = false;
            scene.player.charstateIdle = false;
            scene.player.charstateSkidd = false;
            scene.player.charstateDead = true;
            scene.physics.pause();
            scene.cameras.main.shake(300, 0.025);
            scene.mainStageMusic.stop()
            scene.effectInv = false
            scene.invMusic.stop()
            scene.invMusicIntro.stop()
            
        }
        scene.sound.play('bomb_explosion')
    }

    static invinsAbility(scene, player, _invGenObj){
        if(!scene.gameOver){
            scene.sound.play('munch')
            _invGenObj.destroy()
            scene.invMusicHandler = true
            

            scene.time.delayedCall(600, () =>
            {
                if(!scene.gameOver && scene.invStack == 0){
                    scene.invStack += 1
                    scene.mainStageMusic.stop()
                    scene.effectInv = true
                    scene.invMusicIntro.play()                            
                }
                else if(!scene.gameOver && scene.invStack > 0){
                    scene.invStack += 1
                }


                scene.time.delayedCall(45000, () =>{
                    if(scene.invStack == 1){
                        scene.invStack -= 1
                        scene.effectInv = false
                        scene.invMusicHandler = false
                        scene.invMusic.stop()
                        scene.mainStageMusic.play()
                        scene.player.invAfterHit = true
                        
                    }
                    else if(scene.invStack > 1){
                        scene.invStack -=1 
                    }
                })
            })
            
        }
    }

    static outOfBounds(scene){
        scene.aboveWorldBounds = true
        scene.bombPlayerCollider = false
        scene.cameras.main.fadeOut(1000)
        const noWay = Phaser.Math.Between(1, 1995)
        scene.time.delayedCall(5000, () =>{
            if(noWay == 1994){
                scene.scene.launch('error')
            }
            else{
                scene.scene.launch('gameover', {
                    score: scene.score,
                })
            }
                scene.scene.stop(Phaser.Utils.String.Format('%1', [scene.stageName]))
        })
    }

    static shieldAbility(scene, player, _shieldGenObj){
        if (!scene.gameOver){
                scene.sound.play('munch')
                _shieldGenObj.destroy();

                scene.time.delayedCall(600, () =>
                {
                    if(!scene.gameOver){
                        scene.effectShield = true
                        scene.sound.play('shield')
                    }
                });
            }
        }

    static pauseHandler(scene){
        if(!scene.player.charstateDead && !scene.groundKill){
                    scene.scene.launch('pause', {
                        score: scene.score,
                        bombLoad: scene.bombsThatShouldSpawn,
                        level: scene.level,
                        stageName: scene.stageName,
                    })
                    scene.scene.pause(Phaser.Utils.String.Format('%1', [scene.stageName]))
                    scene.mainStageMusic.pause()
                    scene.invMusic.pause()
                    scene.invMusicIntro.pause()
                }
                else{
                }
    }
}