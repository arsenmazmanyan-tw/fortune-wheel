import { SpriteSource } from 'pixi.js';
import { blocker } from './images64/BlockerImage';
import { checkmark } from './images64/CheckImage';
import { greenButton } from './images64/GreenButton';
import { ornament } from './images64/OrnamentImage';
import { EN } from './images64/en';
import { KO } from './images64/ko';
import { PTBR } from './images64/pt-br';
import { TR } from './images64/tr';
import { ZH } from './images64/zh';

export const BASE64_IMAGES = {
    // English
    en: EN,
    // Korean
    ko: KO,
    // Portugese-Brazil
    'pt-br': PTBR,
    // Turkish
    tr: TR,
    // Chinese
    zh: ZH,

    // images without text
    ornament,
    blocker,
    checkmark,
    greenButton,
};

export const IMAGES: any = {};
