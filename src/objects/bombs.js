export default class Bomb extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, group, texture = 'bomb') {
        super(scene, x, y, texture);

       
        scene.add.existing(this);
        
        
        if (group) {
            group.add(this);
        } else {
            scene.physics.add.existing(this);
        }

        this.body.setMaxSpeed(500);
        this.setGravityY(300);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocity(Phaser.Math.Between(-200, 200), 20);

        this.setCircle(7);
        this.body.offset.setTo(7, 7);

        this.anims.play('redBomb_movement', true);
        this.body.debugBodyColor = 0xff0000;
    }
}