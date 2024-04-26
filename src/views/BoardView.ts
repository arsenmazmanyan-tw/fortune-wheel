import { Container, Sprite, Text } from 'pixi.js';

export class BoardView extends Container {
    private arrow: Sprite;
    private ornament: Sprite;
    private wheel: Sprite;
    private spinButton: Sprite;

    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.buildOrnament();
        this.buildWheel();
        this.buildArrow();
        this.buildSpinButton();
    }

    private buildOrnament(): void {
        this.ornament = Sprite.from('ornament.png');
        this.ornament.anchor.set(0.5);
        this.addChild(this.ornament);
    }

    private buildArrow(): void {
        this.arrow = Sprite.from('arrow.png');
        this.arrow.anchor.set(0.5);
        this.arrow.position.set(0, -250);
        this.addChild(this.arrow);
    }

    private buildWheel(): void {
        this.wheel = Sprite.from('wheel.png');
        this.wheel.anchor.set(0.5);
        this.wheel.position.set(7, -10);
        this.addChild(this.wheel);
    }

    private buildSpinButton(): void {
        this.spinButton = Sprite.from('spin_button.png');
        this.spinButton.anchor.set(0.5);
        this.spinButton.position.set(9, -5);
        this.addChild(this.spinButton);
    }
}
