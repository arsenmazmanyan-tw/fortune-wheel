import { Container, Graphics, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import anime from 'animejs';
import { BASE64_IMAGES } from '../Images';
import { fitText, getTextLanguage, openAffiliatePage } from '../Utils';
import { TEXTS } from '../configs/Texts';

const WIDTH = 810;
const HEIGHT = 600;

const TEXT_GRAY = 0x999999;

export class Popup extends Container {
    private bkg: Sprite;
    private clicksEnabled = false;
    private claimButton: Sprite;
    private checkmark: Sprite;

    constructor() {
        super();
        this.build();

        this.bkg.scale.set(0);
    }

    public getBounds(): Rectangle {
        return new Rectangle(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
    }

    public hide(): any {
        this.clicksEnabled = false;
        return anime({
            targets: this.bkg.scale,
            x: 0,
            y: 0,
            duration: 300,
            easing: 'easeInOutCubic',
        });
    }

    public show(): void {
        anime({
            targets: this.bkg.scale,
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
        this.checkmark.scale.set(1.2);
        this.checkmark.position.set(0, -150);
        this.bkg.addChild(this.checkmark);
    }

    private buildTexts(): void {
        const { congratulations, content, clickBelowToClaim } = TEXTS[getTextLanguage()];
        const congrats = new Text(congratulations, {
            fill: 0xffffff,
            fontSize: 36,
            fontWeight: '900',
        });
        congrats.anchor.set(0.5);
        congrats.position.set(0, -10);
        fitText(congrats, WIDTH * 0.6);
        this.bkg.addChild(congrats);

        const winningInfo = new Text(`${content}\n${clickBelowToClaim}`, {
            fill: TEXT_GRAY,
            fontSize: 26,
            fontWeight: '400',
            lineHeight: 34,
            align: 'center',
        });
        winningInfo.anchor.set(0.5);
        winningInfo.position.set(0, 85);
        fitText(winningInfo, WIDTH * 0.6);
        this.bkg.addChild(winningInfo);
    }

    private buildClaimButton(): void {
        this.claimButton = Sprite.from(BASE64_IMAGES.greenButton);
        this.claimButton.anchor.set(0.5);
        this.claimButton.position.set(0, 200);
        this.claimButton.eventMode = 'static';
        this.claimButton.on('pointerup', this.onMainButtonClick, this);
        this.bkg.addChild(this.claimButton);

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
