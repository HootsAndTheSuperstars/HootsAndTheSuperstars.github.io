export default class Star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture = 'star') {
        super(scene, x, y, texture);

        // 1. Registrar el objeto visualmente (Esencial para que las animaciones corran)
        scene.add.existing(this);
    }

    // Método para inicializar físicas en el create() o al reaparecer
    initPhysics() {
        // Aseguramos la existencia del cuerpo de Arcade Physics
        this.setGravityY(300)
        if (!this.body) {
            this.scene.physics.add.existing(this);
        }
        
        // Propiedades de rebote y mundo
        this.setBounce(0.9);
        this.setCollideWorldBounds(true);
        
        // Caída por gravedad (si el mapa tiene gravedad global caerá sola, 
        // pero podemos forzarla aquí si deseas)
        this.setVelocityX(Phaser.Math.Between(50, 150)); 
        
        // Iniciamos la animación
        this.anims.play('star_idle', true); // Cambia 'star_idle' por el nombre exacto de tu animación
    }

    // Método que se llama cuando se vacía el mapa
    respawn() {
        const randomX = Phaser.Math.Between(10, 920);
        this.setGravityY(300)
        // Reactivamos el cuerpo en la nueva posición y lo hacemos visible
        this.enableBody(true, randomX, 0, true, true);
        
        this.setBounce(0.9);
        this.setCollideWorldBounds(true);
        
        // Movimiento lateral aleatorio y empuje vertical inicial
        this.setVelocity(Phaser.Math.FloatBetween(-200, 200), 20); 
        
        // Volvemos a asegurar la animación al revivir
        this.anims.play('star_idle', true);
    }
}