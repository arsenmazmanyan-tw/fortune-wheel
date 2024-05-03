import { Container, Graphics, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import anime from 'animejs';
import { BASE64_IMAGES } from '../Images';
import { fitText, getLanguage, openAffiliatePage } from '../Utils';
import { TEXTS } from '../configs/Texts';

const WIN_POPUP = Object.freeze({
    header: 'Congratulations!',
    message: 'You just won 100 freespins with up to 15,000\nJPY for Sevens&Fruits game by Playson!',
    buttonText: 'Claim!',
});

const SCALE = 1.3;

const WIDTH = 350;
const HEIGHT = 456;

export class Popup extends Container {
    private wrapper: Container;
    private clicksEnabled = false;
    private claimButton: Sprite;
    private checkmark: Sprite;

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
        this.buildCheckmark();
        this.buildTexts();
        this.buildClaimButton();
    }

    private buildWrapper(): void {
        this.wrapper = new Container();
        this.addChild(this.wrapper);
    }

    private buildCheckmark(): void {
        this.checkmark = Sprite.from(BASE64_IMAGES.checkmark);
        this.checkmark.anchor.set(0.5);
        this.checkmark.scale.set(1.3);
        this.checkmark.position.set(0, -this.height / 2 + 80);
        this.wrapper.addChild(this.checkmark);
    }

    private buildTexts(): void {
        const congrats = new Text(TEXTS[getLanguage()].congratulations, {
            fill: 0xffffff,
            fontSize: 36,
            fontWeight: '900',
        });
        congrats.anchor.set(0.5);
        congrats.position.set(0, -70);
        fitText(congrats, WIDTH);
        this.wrapper.addChild(congrats);

        const content = new Text(TEXTS[getLanguage()].content, {
            fill: 0xcecece,
            fontSize: 24,
            fontWeight: '400',
            lineHeight: 34,
            align: 'center',
        });
        content.anchor.set(0.5);
        content.position.set(0, 20);
        fitText(content, WIDTH);
        this.wrapper.addChild(content);
    }

    private buildClaimButton(): void {
        this.claimButton = Sprite.from(BASE64_IMAGES.greenButton);
        this.claimButton.anchor.set(0.5);
        this.claimButton.position.set(0, 160);
        this.claimButton.eventMode = 'static';
        this.claimButton.on('pointerup', this.onMainButtonClick, this);
        this.wrapper.addChild(this.claimButton);

        const claimText = new Text(TEXTS[getLanguage()].claim, {
            fill: 0xffffff,
            fontSize: 24,
            fontWeight: '400',
            lineHeight: 34,
            align: 'center',
        });
        claimText.anchor.set(0.5);
        this.claimButton.addChild(claimText);
    }

    private onMainButtonClick(): void {
        if (!this.clicksEnabled) return;
        this.clicksEnabled = false;

        openAffiliatePage();
    }
}
