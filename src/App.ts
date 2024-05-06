import { lego, legoLogger } from '@armathai/lego';
import { PixiStatsPlugin } from '@armathai/pixi-stats';
import { Application, Assets } from 'pixi.js';
import PixiStage from './MainStage';
import { fitDimension, getImageLanguage } from './Utils';
import { ScreenSizeConfig } from './configs/ScreenSizeConfig';
import { MainGameEvents, WindowEvent } from './events/MainEvents';
import { IMAGES } from './Images';

class App extends Application {
    public stage: PixiStage;

    public constructor() {
        super({
            backgroundColor: 0x25184c,
            backgroundAlpha: 0,
            powerPreference: 'high-performance',
            antialias: true,
            resolution: Math.max(window.devicePixelRatio || 1, 2),
            sharedTicker: true,
        });
    }

    public async init(): Promise<void> {
        this.stage = new PixiStage();
        // @ts-ignore
        this.view.classList.add('app');
        // @ts-ignore
        const div = document.getElementsByClassName('html-embed')[0];

        // @ts-ignore
        div.appendChild(this.view);
        // document.body.appendChild(this.view);

        if (process.env.NODE_ENV !== 'production') {
            globalThis.__PIXI_APP__ = this;
            this.initStats();
            this.initLego();
        }
        await this.loadAssets();
        this.onLoadComplete();
    }

    public appResize(): void {
        const { clientWidth: w } = document.body;
        // if (w === 0 || h === 0) return;
        const h = 600;

        const { min, max } = ScreenSizeConfig.size.ratio;
        const { width, height } = fitDimension({ width: w, height: h }, min, max);

        this.resizeCanvas(width, height);
        this.resizeRenderer(width, height);

        this.stage.resize();

        lego.event.emit(MainGameEvents.Resize);
    }

    public onFocusChange(focus: boolean): void {
        lego.event.emit(WindowEvent.FocusChange, focus);
    }

    private async loadAssets(): Promise<void> {
        IMAGES.wheel = await Assets.load(
            `https://pub-5e90f92420514692a46e74a3bd609a71.r2.dev/wheel_${getImageLanguage()}.png`,
        );
        IMAGES.spinButton = await Assets.load(
            `https://pub-5e90f92420514692a46e74a3bd609a71.r2.dev/spin_button_${getImageLanguage()}.png`,
        );
    }

    private onLoadComplete(): void {
        this.appResize();
        this.stage.start();
    }

    private resizeCanvas(width: number, height: number): void {
        const { style } = this.renderer.view;
        if (!style) return;
        style.width = `${width}px`;
        style.height = `${height}px`;
    }

    private resizeRenderer(width: number, height: number): void {
        this.renderer.resize(width, height);
    }

    private initLego(): void {
        legoLogger.start(lego, Object.freeze({}));
    }

    private initStats(): void {
        //@ts-ignore
        const stats = new PixiStatsPlugin(this);
        document.body.appendChild(stats.stats.dom);
        this.ticker.add(() => stats.stats.update());
    }
}

export default App;
