import { Container, Sprite } from 'pixi.js';
import anime from 'animejs';
import { getSpinResult } from '../logic';
import { Popup } from './Popup';

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
    private ornament: Sprite;
    private wheel: Sprite;
    private spinButton: Sprite;
    private canSpin = true;
    private isOver = false;
    private popup: Popup;

    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.buildWheel();
        this.buildOrnament();
        this.buildSpinButton();
        this.buildPopup();
    }

    private buildOrnament(): void {
        this.ornament = Sprite.from('ornament.png');
        this.ornament.anchor.set(0.5);
        this.addChild(this.ornament);
    }

    private buildWheel(): void {
        this.wheel = Sprite.from('wheel.png');
        this.wheel.anchor.set(0.5, 0.5);
        this.wheel.position.set(0, 12);
        this.wheel.angle = -45;
        this.addChild(this.wheel);
    }

    private buildPopup(): void {
        this.popup = new Popup();
        this.popup.on('closeButtonClick', this.closeButtonClick, this);
        this.addChild(this.popup);
    }

    private buildSpinButton(): void {
        this.spinButton = Sprite.from('spin_button.png');
        this.spinButton.anchor.set(0.5);
        this.spinButton.eventMode = 'static';
        this.spinButton.position.set(0, 0);
        this.spinButton.on('pointerup', this.onSpinClick, this);
        this.addChild(this.spinButton);
    }

    private onSpinClick(): void {
        if (!this.canSpin) return;
        this.canSpin = false;

        const { angle, win } = getSpinResult();
        anime({
            targets: this.wheel,
            angle: 360 * 4 + angle,
            duration: 5000,
            easing: 'easeInOutCirc',
            complete: () => {
                this.wheel.angle = angle;
                // this.canSpin = true;

                if (win) {
                    this.showWinPopup();
                } else {
                    this.showLosePopup();
                }
            },
        });
    }

    private closeButtonClick(): void {
        this.hidePopup();
    }

    private hidePopup(): void {
        anime({
            targets: this.popup.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutCubic',
        });
    }

    private showWinPopup(): void {
        //
    }

    private showLosePopup(): void {
        //
    }
}
