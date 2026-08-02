export class Shield extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture='shield') {
        super(scene, x, y, texture);
        
        // Agregar a la escena y habilitar física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.debugBodyColor = 0x0000ff;
        this.setVisible(false)
    }

    update(scene) {
        
        // Seguir automáticamente al jugador en cada frame
        if(scene.effectShield && !scene.effectInv){
            if(!this.visible){
                this.anims.play('shield', true);
                this.setVisible(true).setActive(true)
            }
            this.setPosition(scene.player.x, scene.player.y);
        }
        else if(!scene.effectShield || scene.effectInv)
            this.setVisible(false).setActive(false)
        
    }
}