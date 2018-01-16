import * as PIXI from 'pixi.js'
import Transform from '@/core/tinyecs/Transform'
import Movement from '@/component/Movement'

export function MovementSystem(entities, width, height) 
{
	this.entities = entities
	this.width = width
	this.height = height
}

MovementSystem.prototype.update = function()
{
	let toUpdate = this.entities.queryComponents([ Transform, Movement ])

	toUpdate.forEach((entity) => {

		entity.transform.position.x += Math.random() * entity.movement.speed 
		entity.transform.position.y += Math.random() * entity.movement.speed

		if (entity.transform.position.x <= 0 || entity.transform.position.x + entity.sprite.width >= this.width)
			entity.movement.speed *= -1

		if (entity.transform.position.y <= 0 || entity.transform.position.y + entity.sprite.height >= this.height)
			entity.movement.speed *= -1	
	})
}