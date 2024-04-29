import anime from 'animejs';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { BoardView } from './BoardView';
import { Popup } from './Popup';
import { Sprite } from 'pixi.js';
import { BASE64_IMAGES } from '../base';

export class GameView extends PixiGrid {
    private popup: Popup;
    private board: BoardView;
    private blocker: Sprite;

    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public rebuild(): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildBoard();
        this.buildBlocker();
        this.buildPopup();
    }

    private buildBoard(): void {
        this.board = new BoardView();
        this.board.on('showPopup', this.showPopup, this);
        this.setChild('board', this.board);
    }

    private showPopup(): void {
        this.popup.show();
        anime({
            targets: this.blocker,
            alpha: 0.975,
            duration: 300,
            easing: 'easeInOutCubic',
        });
    }

    private buildPopup(): void {
        this.popup = new Popup();
        this.setChild('popup', this.popup);
    }

    private buildBlocker(): void {
        this.blocker = Sprite.from(BASE64_IMAGES.blocker);
        this.blocker.alpha = 0;
        this.setChild('blocker', this.blocker);
    }
}
