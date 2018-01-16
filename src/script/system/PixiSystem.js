import * as PIXI from 'pixi.js'
import Transform from '@/core/tinyecs/Transform'
import Sprite from '@/component/Sprite'

export function PixiSystem(entities, width, height) 
{
	this.entities = entities

	this.renderer = PIXI.autoDetectRenderer(width, height, {
		antialias: false,
		transparent: false,
		resolution: 1
	})
	this.renderer.view.className = 'renderer'

	this.stage = new PIXI.Container()

	document.getElementById('main').appendChild(this.renderer.view)

	let toUpdate = this.entities.queryComponents([ Transform, Sprite ])

	toUpdate.forEach((entity) => {
		
		entity.sprite = new PIXI.Sprite(PIXI.loader.resources[entity.sprite.image].texture)
		entity.sprite.position.set(entity.transform.position.x, entity.transform.position.y)
		this.stage.addChild(entity.sprite)		
	})

	this.renderer.render(this.stage)
}

PixiSystem.prototype.update = function() 
{
	let toUpdate = this.entities.queryComponents([ Transform, Sprite ])

	toUpdate.forEach((entity) => {
		entity.sprite.position.set(entity.transform.position.x, entity.transform.position.y)

		this.renderer.render(this.stage)		
	})
}