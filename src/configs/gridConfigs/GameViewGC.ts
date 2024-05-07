import { CellAlign, CellScale } from '@armathai/pixi-grid';
import { lp } from '../../Utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: 600 };
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'popup',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: 600 };
    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
            {
                name: 'popup',
                scale: CellScale.fit,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
