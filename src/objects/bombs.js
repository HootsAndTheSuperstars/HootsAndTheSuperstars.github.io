export default class Bomb extends Phaser.Physics.Arcade.Sprite {
    // Recibimos la escena, posición x, y, y el grupo de colisiones
    constructor(scene, x, y, group, texture = 'bomb') {
        super(scene, x, y, texture);

        // 1. Añadir el objeto visualmente a la escena
        scene.add.existing(this);
        
        // 2. IMPORTANTE: Si hay un grupo, lo añadimos PRIMERO. 
        // Esto hace que herede los colliders de la escena inmediatamente.
        if (group) {
            group.add(this);
        } else {
            scene.physics.add.existing(this);
        }

        // 3. Ahora configuramos las físicas sobre el cuerpo ya registrado
        this.body.setMaxSpeed(500);
        this.setGravityY(300);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.setVelocity(Phaser.Math.Between(-200, 200), 20);

        // Hitbox circular (ahora sí se mantendrá activa en las colisiones)
        this.setCircle(7);
        this.body.offset.setTo(7, 7);

        this.anims.play('redBomb_movement', true);
        this.body.debugBodyColor = 0xff0000;
    }
}