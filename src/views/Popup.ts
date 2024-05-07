import { Container, Graphics, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import anime from 'animejs';
import { BASE64_IMAGES } from '../Images';
import { fitText, getTextLanguage, openAffiliatePage } from '../Utils';
import { TEXTS } from '../configs/Texts';

const WIDTH = 794;
const HEIGHT = 600;

export class Popup extends Container {
    private bkg: Sprite;
    private clicksEnabled = false;
    private claimButton: Sprite;
    private checkmark: Sprite;

    constructor() {
        super();
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
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

    public show(): void {
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

    private build(): void {
        this.buildBkg();
        this.buildCheckmark();
        this.buildTexts();
        this.buildClaimButton();
    }

    private buildBkg(): void {
        this.bkg = Sprite.from(BASE64_IMAGES.popupBkg);
        this.bkg.anchor.set(0.5);
        this.addChild(this.bkg);
    }

    private buildCheckmark(): void {
        this.checkmark = Sprite.from(BASE64_IMAGES.checkmark);
        this.checkmark.anchor.set(0.5);
        this.checkmark.scale.set(1.3);
        this.checkmark.position.set(0, -this.height / 2 + 80);
        this.addChild(this.checkmark);
    }

    private buildTexts(): void {
        const congrats = new Text(TEXTS[getTextLanguage()].congratulations, {
            fill: 0xffffff,
            fontSize: 36,
            fontWeight: '900',
        });
        congrats.anchor.set(0.5);
        congrats.position.set(0, -70);
        fitText(congrats, WIDTH * 0.6);
        this.addChild(congrats);

        const winningInfo = new Text(TEXTS[getTextLanguage()].content, {
            fill: 0xcecece,
            fontSize: 26,
            fontWeight: '400',
            lineHeight: 34,
            align: 'center',
        });
        winningInfo.anchor.set(0.5);
        winningInfo.position.set(0, 10);
        fitText(winningInfo, WIDTH * 0.6);
        this.addChild(winningInfo);

        const clickToClaim = new Text(TEXTS[getTextLanguage()].clickBelowToClaim, {
            fill: 0xcecece,
            fontSize: 16,
            fontWeight: '400',
            align: 'center',
        });
        clickToClaim.anchor.set(0.5);
        clickToClaim.position.set(0, 76);
        fitText(clickToClaim, WIDTH * 0.6);
        this.addChild(clickToClaim);
    }

    private buildClaimButton(): void {
        this.claimButton = Sprite.from(BASE64_IMAGES.greenButton);
        this.claimButton.anchor.set(0.5);
        this.claimButton.position.set(0, 160);
        this.claimButton.eventMode = 'static';
        this.claimButton.on('pointerup', this.onMainButtonClick, this);
        this.addChild(this.claimButton);

        const claimText = new Text(TEXTS[getTextLanguage()].claim, {
            fill: 0xffffff,
            fontSize: 24,
            fontWeight: '400',
            lineHeight: 38,
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
