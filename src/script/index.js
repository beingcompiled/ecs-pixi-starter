import { imagesPath, assets, config } from './manifest.json'

import preload from './core/Preload'
import Loop from './core/Loop'

import EntityCreator from './EntityCreator'

import { SystemPriorities } from './system/SystemPriorities'
import PixiSystem from './system/PixiSystem'
import MotionSystem from './system/MotionSystem'

import GameState from './component/GameState'

export default class Game {

	constructor(canvas) {

		this.loop = new Loop()
		
		this.engine = new Ash.Engine()

		this.state = new GameState(config.width, config.height)

		this.creator = new EntityCreator(this.engine)
		 
		this.engine.addSystem(
			new MotionSystem(this.state),
			SystemPriorities.move
		)
		this.engine.addSystem(
			new PixiSystem(config),
			SystemPriorities.render
		)
		console.log('engine: ', this.engine)

		this.creator.createHero({
			width: 15,
			height: 15,
			radius: 15,
			position: { x: 100, y: 100 },
			rotation: 6,
			speed: 1
		})
	}

	start () {
		
		this.loop.add(this.engine.update, this.engine);
		this.loop.start();
	}
}

/* 

	INIT 

*/

window.addEventListener('load', () => { 

	preload(assets, () => {
		let game = new Game()
		game.start()
	})
})
