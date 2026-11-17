export class InputManager {
    constructor(scene) {
        this.scene = scene;
        
        // Creamos las teclas usando el plugin de entrada de la escena actual
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            sKey: Phaser.Input.Keyboard.KeyCodes.S,
            dKey: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
            esc: Phaser.Input.Keyboard.KeyCodes.ESC

        });
    }

    // Actualiza la referencia de la escena cuando cambias de nivel/pantalla
    updateScene(newScene) {
        this.scene = newScene;
        this.scene.input.keyboard.addExistingKeys(this.keys);
    }


    upINST() {
        return this.keys.up.isDown;
    }

    downINST() {
        return this.keys.down.isDown;
    }

    leftINST() {
        return this.keys.left.isDown;
    }

    rightINST() {
        return this.keys.right.isDown;
    }

    aINST() {
        return this.keys.space.isDown;
    }

    cINST() {
        return this.keys.dKey.isDown;
    }
    bINST() {
        return this.keys.sKey.isDown
    }
    startINST() {
        return Phaser.Input.Keyboard.JustDown(this.keys.enter)
    }
    backINST(){
        return Phaser.Input.Keyboard.JustDown(this.keys.esc)
    }
}