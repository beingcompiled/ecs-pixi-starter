import * as PIXI from "pixi.js"
import preload from "./core/preload"
import { pathImage, assets } from "./data/manifest.json"

let stage
let sprite
let speed = 1

/*


	LOOP


*/

const loop = (time, renderer) => {

	requestAnimationFrame(t => loop(t, renderer))

	sprite.x += 2.3 * speed
	sprite.y += 0.8 * speed

	if (sprite.x <= 0 || sprite.x + sprite.width >= renderer.view.width)
		speed *= -1

	if (sprite.y <= 0 || sprite.y + sprite.height >= renderer.view.height)
		speed *= -1

	renderer.render(stage)
}

/*


	BUILD


*/

const build = () => {

	const renderer = PIXI.autoDetectRenderer(640, 320, {
	    antialias: false,
	    transparent: false,
	    resolution: 1
	});

	renderer.view.className = "renderer";

	document.getElementById("main").appendChild(renderer.view);

	stage = new PIXI.Container()

	sprite = new PIXI.Sprite(PIXI.loader.resources[pathImage + "test.png"].texture)

	sprite.position.set(160, 80)

	stage.addChild(sprite)

	loop(-1, renderer)
}

/* 

	INIT 

*/

window.addEventListener("load", () => {

	preload(assets, () => {
		build()
	})
})
