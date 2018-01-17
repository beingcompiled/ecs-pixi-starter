import * as PIXI from 'pixi.js'

const Preload = (manifest, cb) => {

    PIXI.loader
        .add(manifest)
        .on('progress', loader => console.log(`preload ${loader.progress}% completed`))
        .load(cb)
}

export default Preload;
