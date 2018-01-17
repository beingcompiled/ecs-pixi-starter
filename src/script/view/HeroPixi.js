import * as PIXI from 'pixi.js'

class HeroPixi extends PIXI.Container {

	constructor(props) {
		super()		

		this.graphics = new PIXI.Graphics()
		this.graphics.beginFill(0xF00d0F, 1)
		this.graphics.drawCircle(0, 0, props.radius)
		this.addChild(this.graphics)		
	}
}

export default HeroPixi
