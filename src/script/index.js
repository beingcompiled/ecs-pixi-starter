//import * as PIXI from "pixi.js"
import preload from "./core/util/preload"
import { pathImage, assets, config } from "./data/manifest.json"

import EntityManager from "./tinyecs/EntityManager"
import Messenger from "./tinyecs/Messenger"

import Sprite from "./core/component/Sprite"
import Movement from "./core/component/Movement"

import { PixiSystem } from "./core/system/PixiSystem"
import { MovementSystem } from "./core/system/MovementSystem"

const systems = []

/*


	LOOP


*/

const loop = (time) => { //dt, time

	requestAnimationFrame(time => loop(time))

	systems.forEach((system) => {
		system.update()
	})
}

/*


	BUILD


*/

const build = () => {
	
	var entityManager = new EntityManager(new Messenger())
	var hero = entityManager.create()
	hero.addComponent(Sprite).addComponent(Movement)

	hero.transform.position.x = Math.random() * config.width
	hero.transform.position.y = Math.random() * config.height
	hero.sprite.image = pathImage + 'test.png'
	hero.movement.speed = 3
	
	systems.push(
		new MovementSystem(entityManager, config.width, config.height),
		new PixiSystem(entityManager, config.width, config.height)	
	)

	loop(-1)
}

/* 


	INIT 


*/

window.addEventListener("load", () => {

	preload(assets, () => {
		build()
	})
})
