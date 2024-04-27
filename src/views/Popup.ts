import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';

const WIN_POPUP = Object.freeze({
    header: 'Congratulations!',
    message: 'You just won 100 freespins with up to 15,000\nJPY for Sevens&Fruits game by Playson!',
    buttonText: 'Claim!',
});

const LOSE_POPUP = Object.freeze({
    header: "Whoops! That didn't land right!",
    message: "That's OK, though! There's always next time.",
    buttonText: 'Spin Again!',
});

export class Popup extends Container {
    public clicksEnabled = false;

    private bkg: Sprite;
    private header: Text;
    private message: Text;
    private closeButton: Sprite;
    private mainButton: Sprite;

    constructor() {
        super();
        this.build();
    }

    public setupForWinPopup(): void {
        // this.header.text = WIN_POPUP.header;
        // this.message.text = WIN_POPUP.message;
        this.mainButton.texture = Texture.from('claim.png');
        this.bkg.texture = Texture.from('win_popup.png');
    }

    public setupForLosePopup(): void {
        // this.header.text = LOSE_POPUP.header;
        // this.message.text = LOSE_POPUP.message;
        this.mainButton.texture = Texture.from('spin_again.png');
        this.bkg.texture = Texture.from('lose_popup.png');
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
        this.closeButton.on('pointerup', this.onClosButtonClick, this);
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

    private onClosButtonClick(): void {
        if (!this.clicksEnabled) return;
        this.clicksEnabled = false;
        this.emit('closeButtonClick');
    }

    private onMainButtonClick(): void {
        if (!this.clicksEnabled) return;
        this.clicksEnabled = false;
        console.warn('main button click');
    }
}
