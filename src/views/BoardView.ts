import { Container, Sprite } from 'pixi.js';
import anime from 'animejs';
import { getSpinResult } from '../logic';

export const WINS = [
    {
        tryAmount: 750,
        angle: -45,
    },
    {
        tryAmount: 4500,
        angle: -135,
    },
    {
        tryAmount: 1500,
        angle: -225,
    },
    {
        tryAmount: 3000,
        angle: -315,
    },
];

export const LOSE_POSITIONS = [0, 90, 180, 270];
export const WIN_POSITIONS = [-45, -135, -225, -315];

export class BoardView extends Container {
    private arrow: Sprite;
    private ornament: Sprite;
    private wheel: Sprite;
    private spinButton: Sprite;
    private canSpin = true;

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
        this.arrow.position.set(0, -260);
        this.addChild(this.arrow);
    }

    private buildWheel(): void {
        this.wheel = Sprite.from('wheel.png');
        this.wheel.anchor.set(0.5);
        this.wheel.angle = -315;
        this.wheel.position.set(7, -10);
        this.addChild(this.wheel);
    }

    private buildSpinButton(): void {
        this.spinButton = Sprite.from('spin_button.png');
        this.spinButton.anchor.set(0.5);
        this.spinButton.position.set(9, -5);
        this.spinButton.eventMode = 'static';
        this.spinButton.on('pointerup', this.onSpinClick, this);
        this.addChild(this.spinButton);
    }

    private onSpinClick(): void {
        if (!this.canSpin) return;
        this.canSpin = false;
        const angle = getSpinResult();
        anime({
            targets: this.wheel,
            angle: 360 * 5 + angle,
            duration: 3000,
            easing: 'easeInOutSine',
            complete: () => {
                this.wheel.angle = angle;
                this.canSpin = true;
            },
        });
    }
}
