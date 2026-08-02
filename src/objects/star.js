export default class Star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'star') {
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    initPhysics() {
        this.setGravityY(300)
        if (!this.body) {
            this.scene.physics.add.existing(this);
        }
        
        this.setBounce(0.9);
        this.setCollideWorldBounds(true);
        
        this.setVelocityX(Phaser.Math.Between(50, 150)); 
        
        this.anims.play('star_idle', true); 
    }

    respawn() {
        const randomX = Phaser.Math.Between(10, 920);
        this.setGravityY(300)
        this.enableBody(true, randomX, 0, true, true);
        
        this.setBounce(0.9);
        this.setCollideWorldBounds(true);
        
        this.setVelocity(Phaser.Math.FloatBetween(-200, 200), 20); 
        
       this.anims.play('star_idle', true);
    }
}