import anime from 'animejs';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { BoardView } from './BoardView';
import { Popup } from './Popup';
import { Sprite } from 'pixi.js';
import { BASE64_IMAGES } from '../Images';

export class GameView extends PixiGrid {
    private popup: Popup;
    private board: BoardView;

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
        this.buildPopup();
    }

    private buildBoard(): void {
        this.board = new BoardView();
        this.board.on('showPopup', () => {
            this.popup.show();
        });
        this.setChild('board', this.board);
    }

    private buildPopup(): void {
        this.popup = new Popup();
        this.setChild('popup', this.popup);
    }
}
