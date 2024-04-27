import { sample } from '../Utils';
import { LOSE_POSITIONS, WIN_POSITIONS } from '../views/BoardView';

let i = 0;

export const getSpinResult = (): { angle: number; win: boolean } => {
    i++;

    if (i % 2) {
        return {
            angle: sample(LOSE_POSITIONS),
            win: false,
        };
    } else {
        return {
            angle: sample(WIN_POSITIONS),
            win: true,
        };
    }
};
