import { Container, Graphics, Text } from 'pixi.js';

export const lp = (l, p) => {
    const { clientWidth: w, clientHeight: h } = document.body;
    return w > h ? l : p;
};

export const fitDimension = (
    dim: { width: number; height: number },
    minRatio: number,
    maxRatio: number,
): { width: number; height: number } => {
    const ratioW = dim.width / dim.height;
    const ratioH = dim.height / dim.width;

    if (ratioW < ratioH) {
        if (ratioW > maxRatio) {
            dim.width = dim.width * (maxRatio / ratioW);
        } else if (ratioW < minRatio) {
            dim.height = dim.height * (ratioW / minRatio);
        }
    } else {
        if (ratioH > maxRatio) {
            dim.height = dim.height * (maxRatio / ratioH);
        } else if (ratioH < minRatio) {
            dim.width = dim.width * (ratioH / minRatio);
        }
    }

    return dim;
};

export const delayRunnable = (delay, runnable, context?, ...args) => {
    let delayMS = delay * 1000;
    const delayWrapper = () => {
        delayMS -= window.game.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            window.game.ticker.remove(delayWrapper);
        }
    };
    window.game.ticker.add(delayWrapper);
    return delayWrapper;
};

export const loopRunnable = (delay, runnable, context = null, ...args) => {
    return window.game.time.events.loop(delay, runnable, context, ...args);
};

export const removeRunnable = (runnable) => window.game.ticker.remove(runnable);

export const drawBounds = (gameObject: Container, color = 0xffffff * Math.random(), alpha = 0.5): Graphics => {
    const { x, y, width, height } = gameObject.getBounds();
    const gr = new Graphics();
    gr.beginFill(color, alpha);
    gr.drawRect(x, y, width, height);
    gr.endFill();
    gameObject.addChild(gr);
    return gr;
};

export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = randomInt(0, i);
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
};

export const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const randomInt = (min, max) => {
    const mi = Math.ceil(min);
    const ma = Math.floor(max);
    return Math.floor(Math.random() * (ma - mi + 1)) + mi;
};

export const openAffiliatePage = (): void => {
    const element = document.getElementsByClassName('html-embed')[0];
    // @ts-ignore
    const url = element.dataset.url;

    window.open(url, '_self');
};

export const getLanguage = (): string => {
    const element = document.getElementsByClassName('html-embed')[0];
    // @ts-ignore
    const webLang = element.dataset.lang;

    const langs = ['en', 'ja', 'pt-br', 'zh', 'ko', 'tr'];

    if (langs.includes(webLang)) {
        return webLang;
    } else {
        return 'en';
    }
};

export const fitText = (text: Text, width: number): void => {
    if (text.width < width) return;
    text.scale.set(width / text.width);
};
