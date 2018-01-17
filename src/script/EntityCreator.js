import Hero from '~/component/Hero'
import Transform from '~/component/Transform'
import Motion from '~/component/Motion'
import Display from '~/component/Display'
import HeroPixi from './view/HeroPixi'

export default class EntityCreator {

	constructor (engine) {
		this.engine = engine
	}

	destroyEntity(entity) {
		this.engine.removeEntity(entity)
	}

	createHero(heroData) {
		let graphic = new HeroPixi(heroData)

		let hero = new Ash.Entity()
			.add(new Hero())
			.add(new Transform(heroData.position.x, heroData.position.y, heroData.rotation))
			.add(new Motion(heroData.speed))
			.add(new Display(heroData.width, heroData.height, graphic))
 
		this.engine.addEntity(hero)
		
		return hero;
	}
}
