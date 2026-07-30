export class InvSTARS extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture='invStars') {
        super(scene, x, y, texture);
        
        // Agregar a la escena y habilitar física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.debugBodyColor = 0xffff00;
        this.setVisible(false)
    }

    update(player, effectInv) {
        
        // Seguir automáticamente al jugador en cada frame
        if(effectInv){
            if(!this.visible){
                this.anims.play('invStars', true);
                this.setVisible(true).setActive(true)
            }
            this.setPosition(player.x, player.y);
        }
        else
            this.setVisible(false).setActive(false)
        
    }
}