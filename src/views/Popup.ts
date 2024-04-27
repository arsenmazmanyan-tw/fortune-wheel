import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';
import anime from 'animejs';

const WIN_POPUP = Object.freeze({
    header: 'Congratulations!',
    message: 'You just won 100 freespins with up to 15,000\nJPY for Sevens&Fruits game by Playson!',
    buttonText: 'Claim!',
    popupTexture: 'win_popup.png',
    buttonTexture: 'claim.png',
});

const LOSE_POPUP = Object.freeze({
    header: "Whoops! That didn't land right!",
    message: "That's OK, though! There's always next time.",
    buttonText: 'Spin Again!',
    popupTexture: 'lose_popup.png',
    buttonTexture: 'spin_again.png',
});

export enum PopupType {
    Win = 'win',
    Lose = 'lose',
}
export class Popup extends Container {
    private clicksEnabled = false;
    private bkg: Sprite;
    private header: Text;
    private message: Text;
    private closeButton: Sprite;
    private mainButton: Sprite;

    private _type: PopupType = PopupType.Win;

    constructor() {
        super();
        this.build();
    }

    get type(): PopupType {
        return this._type;
    }

    public hide(): any {
        this.clicksEnabled = false;
        return anime({
            targets: this.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutCubic',
        });
    }

    public show(type: 'win' | 'lose'): void {
        type === 'win' ? this.setupForWinPopup() : this.setupForLosePopup();

        this.visible = true;
        anime({
            targets: this.scale,
            x: 1,
            y: 1,
            duration: 300,
            easing: 'easeInOutCubic',
            complete: () => {
                this.clicksEnabled = true;
            },
        });
    }

    public setupForWinPopup(): void {
        this._type = PopupType.Win;

        // this.header.text = WIN_POPUP.header;
        // this.message.text = WIN_POPUP.message;

        this.mainButton.texture = Texture.from(WIN_POPUP.buttonTexture);
        this.mainButton.position.set(0, 60);
        this.bkg.texture = Texture.from(WIN_POPUP.popupTexture);
    }

    public setupForLosePopup(): void {
        this._type = PopupType.Lose;
        // this.header.text = LOSE_POPUP.header;
        // this.message.text = LOSE_POPUP.message;
        this.mainButton.texture = Texture.from(LOSE_POPUP.buttonTexture);
        this.mainButton.position.set(0, 50);
        this.bkg.texture = Texture.from(LOSE_POPUP.popupTexture);
    }

    private build(): void {
        this.buildBkg();
        this.buildCloseButton();
        // this.buildHeader();
        // this.buildText();
        this.buildMainButton();
    }

    private buildBkg(): void {
        this.bkg = Sprite.from('win_popup.png');
        this.bkg.anchor.set(0.5);
        this.addChild(this.bkg);
    }

    private buildCloseButton(): void {
        this.closeButton = Sprite.from('close_button.png');
        this.closeButton.anchor.set(0.5);
        this.closeButton.position.set(this.bkg.width / 2 - 35, -this.bkg.height / 2 + 35);
        this.closeButton.eventMode = 'static';
        this.closeButton.on('pointerup', this.onCloseButtonClick, this);
        this.addChild(this.closeButton);
    }

    private buildHeader(): void {
        this.header = new Text(WIN_POPUP.header, {
            fill: 0xffffff,
            fontSize: 24,
        });

        this.header.anchor.set(0.5);
        this.header.position.set(0, -65);
        this.addChild(this.header);
    }

    private buildText(): void {
        this.message = new Text(WIN_POPUP.message, {
            fill: 0x999999,
            fontSize: 16,
        });

        this.message.anchor.set(0.5);
        this.message.position.set(0, -15);
        this.addChild(this.message);
    }

    private buildMainButton(): void {
        this.mainButton = Sprite.from('claim.png');
        this.mainButton.anchor.set(0.5);
        this.mainButton.position.set(0, 60);
        this.mainButton.eventMode = 'static';
        this.mainButton.on('pointerup', this.onMainButtonClick, this);
        this.addChild(this.mainButton);
    }

    private onCloseButtonClick(): void {
        if (!this.clicksEnabled) return;
        this.clicksEnabled = false;
        this.emit('closePopup', this.type);
    }

    private onMainButtonClick(): void {
        if (!this.clicksEnabled) return;
        this.clicksEnabled = false;

        if (this.type === PopupType.Win) {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        }
        this.emit('closePopup', this.type);
    }
}
