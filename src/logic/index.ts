import { sample } from '../Utils';
import { LOSE_POSITIONS, WIN_POSITIONS } from '../views/BoardView';

let i = 0;

export const getSpinResult = (): any => {
    i++;

    if (i % 2) {
        return sample(LOSE_POSITIONS);
    } else {
        return sample(WIN_POSITIONS);
    }
};
