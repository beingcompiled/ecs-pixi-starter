//import * as PIXI from "pixi.js"
import preload from "./core/preload"
import { pathImage, assets, config } from "./manifest.json"

import EntityManager from "./core/tinyecs/EntityManager"
import Messenger from "./core/tinyecs/Messenger"

import Sprite from "./component/Sprite"
import Movement from "./component/Movement"

import { PixiSystem } from "./system/PixiSystem"
import { MovementSystem } from "./system/MovementSystem"

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
