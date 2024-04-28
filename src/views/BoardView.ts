import { Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import anime from 'animejs';
import { getSpinResult } from '../logic';
import { Popup, PopupType } from './Popup';
import { BASE64_IMAGES } from '../base';

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
    private popup: Popup;

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
        this.buildPopup();
    }

    private buildOrnament(): void {
        this.ornament = Sprite.from(BASE64_IMAGES.ornament);
        this.ornament.anchor.set(0.5);
        this.addChild(this.ornament);
    }

    private buildWheel(): void {
        this.wheel = Sprite.from(BASE64_IMAGES.wheel);
        this.wheel.anchor.set(0.5, 0.5);
        this.wheel.position.set(2, 10);
        this.wheel.angle = -225;
        this.addChild(this.wheel);
    }

    private buildPopup(): void {
        this.popup = new Popup();
        this.popup.on('closePopup', this.closeButtonClick, this);
        this.popup.visible = false;
        this.popup.scale.set(0);
        this.addChild(this.popup);
    }

    private buildSpinButton(): void {
        this.spinButton = Sprite.from(BASE64_IMAGES.spinButton);
        this.spinButton.anchor.set(0.5);
        this.spinButton.eventMode = 'static';
        this.spinButton.position.set(0, 0);
        this.spinButton.on('pointerup', this.onSpinClick, this);
        this.addChild(this.spinButton);
    }

    private onSpinClick(): void {
        if (this.isOver) {
            window.open('https://tokenwin107.com/#modal=register', '_self');
            return;
        }

        if (!this.canSpin) return;
        this.canSpin = false;

        // const { angle, win } = getSpinResult();
        // RN hardcoded to get win on first spin
        const win = true;
        const angle = -225;
        anime({
            targets: this.wheel,
            angle: 360 * 4 + angle,
            duration: 5000,
            easing: 'easeInOutCirc',
            complete: () => {
                this.wheel.angle = angle;

                this.showPopup(win ? 'win' : 'lose');
            },
        });
    }

    private closeButtonClick(type: PopupType): void {
        if (type === PopupType.Win) {
            this.isOver = true;
        }

        const tween = this.popup.hide();
        tween.complete = () => {
            this.canSpin = true;
        };
    }

    private showPopup(popupType: 'win' | 'lose'): void {
        this.popup.show(popupType);
    }
}
