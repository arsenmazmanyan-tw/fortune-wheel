import { Container, Rectangle, Sprite } from 'pixi.js';
import anime from 'animejs';
import { BASE64_IMAGES } from '../Images';
import { getLanguage, openAffiliatePage } from '../Utils';

export const WINS = [
    {
        tryAmount: 50,
        angle: -45,
    },
    {
        tryAmount: 200,
        angle: -135,
    },
    {
        tryAmount: 100,
        angle: -225,
    },
    {
        tryAmount: 150,
        angle: -315,
    },
];

export const LOSE_POSITIONS = [0, 90, 180, 270];
export const WIN_POSITIONS = [-45, -135, -225, -315];

export class BoardView extends Container {
    private ornament: Sprite;
    private wheel: Sprite;
    private spinButton: Sprite;
    private canSpin = true;
    private isOver = false;

    constructor() {
        super();
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(-360, -360, 720, 720);
    }

    private build(): void {
        this.buildWheel();
        this.buildOrnament();
        this.buildSpinButton();
    }

    private buildOrnament(): void {
        this.ornament = Sprite.from(BASE64_IMAGES.ornament);
        this.ornament.anchor.set(0.5);
        this.addChild(this.ornament);
    }

    private buildWheel(): void {
        this.wheel = Sprite.from(BASE64_IMAGES[getLanguage()].wheel);

        this.wheel.anchor.set(0.5, 0.5);
        this.wheel.position.set(2, 10);
        this.wheel.angle = -225;
        this.addChild(this.wheel);
    }

    private buildSpinButton(): void {
        this.spinButton = Sprite.from(BASE64_IMAGES[getLanguage()].spinButton);
        this.spinButton.anchor.set(0.5);
        this.spinButton.eventMode = 'static';
        this.spinButton.position.set(0, 0);
        this.spinButton.on('pointerup', this.onSpinClick, this);
        this.addChild(this.spinButton);
    }

    private onSpinClick(): void {
        if (this.isOver) {
            openAffiliatePage();
            return;
        }

        if (!this.canSpin) return;
        this.canSpin = false;

        // const { angle, win } = getSpinResult();
        // RN hardcoded to get win on first spin
        // const win = true;
        const angle = -225;
        anime({
            targets: this.wheel,
            angle: 360 * 4 + angle,
            duration: 5000,
            easing: 'easeInOutCirc',
            complete: () => {
                this.wheel.angle = angle;

                this.emit('showPopup');
            },
        });
    }
}
