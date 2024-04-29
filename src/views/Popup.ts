import { Container, Graphics, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import anime from 'animejs';
import { BASE64_IMAGES } from '../base';
import { openAffiliatePage } from '../Utils';

const WIN_POPUP = Object.freeze({
    header: 'Congratulations!',
    message: 'You just won 100 freespins with up to 15,000\nJPY for Sevens&Fruits game by Playson!',
    buttonText: 'Claim!',
    popupTexture: BASE64_IMAGES.winPopup,
    buttonTexture: BASE64_IMAGES.claim,
});

const LOSE_POPUP = Object.freeze({
    header: "Whoops! That didn't land right!",
    message: "That's OK, though! There's always next time.",
    buttonText: 'Spin Again!',
    popupTexture: BASE64_IMAGES.winPopup,
    buttonTexture: BASE64_IMAGES.spinAgain,
});

const SCALE = 1.3;

const WIDTH = 350;
const HEIGHT = 456;

export class Popup extends Container {
    private wrapper: Container;
    private clicksEnabled = false;
    private claimButton: Sprite;
    private content: Sprite;

    constructor() {
        super();
        this.build();

        this.wrapper.visible = false;
        this.wrapper.scale.set(0);
    }

    public getBounds(): Rectangle {
        return new Rectangle(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
    }

    public hide(): any {
        this.clicksEnabled = false;
        return anime({
            targets: this.wrapper.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutCubic',
        });
    }

    public show(): void {
        this.wrapper.visible = true;
        anime({
            targets: this.wrapper.scale,
            x: SCALE,
            y: SCALE,
            duration: 300,
            easing: 'easeInOutCubic',
            complete: () => {
                this.clicksEnabled = true;
            },
        });
    }

    private build(): void {
        this.buildWrapper();
        this.buildContent();
        this.buildClaimButton();
    }

    private buildWrapper(): void {
        this.wrapper = new Container();
        this.addChild(this.wrapper);
    }

    private buildContent(): void {
        this.content = Sprite.from(BASE64_IMAGES.winPopupContent);
        this.content.anchor.set(0.5, 0);
        this.content.position.set(0, -this.height / 2);
        this.wrapper.addChild(this.content);
    }

    private buildClaimButton(): void {
        this.claimButton = Sprite.from(BASE64_IMAGES.claim);
        this.claimButton.anchor.set(0.5);
        this.claimButton.position.set(0, 160);
        this.claimButton.eventMode = 'static';
        this.claimButton.on('pointerup', this.onMainButtonClick, this);
        this.wrapper.addChild(this.claimButton);
    }

    private onMainButtonClick(): void {
        if (!this.clicksEnabled) return;
        this.clicksEnabled = false;

        openAffiliatePage();
    }
}
