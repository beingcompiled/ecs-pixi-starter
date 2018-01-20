import * as PIXI from 'pixi.js'

import Transform from '~/component/Transform'
import Display from '~/component/Display'
import RenderNode from '~/node/Render'

const PixiSystem = Ash.System.extend({

	context: null,
	nodes: null,

	constructor: function(gamestate) {
		this.gamestate = gamestate

		this.renderer = PIXI.autoDetectRenderer(this.gamestate.width, this.gamestate.height, {
			antialias: false
			, transparent: false
			// , resolution: window.devicePixelRatio,
			// , forceCanvas: true
		})

		this.renderer.view.className = 'renderer'
		window.addEventListener('resize', ()=> {
			this.resize(window.innerWidth, window.innerHeight)
		})

		this.scene = new PIXI.Container()

		let test = new PIXI.Graphics()
		test.beginFill(0xFFFFFF, 1)
		test.drawCircle(0, 0, 3)
		test.position.set(this.gamestate.width>>1,this.gamestate.height>>1)
		this.scene.addChild(test)

		document.getElementById('main').appendChild(this.renderer.view)
	},

	update: function (time) {
		
		var node, transform, display, view;

		for (node = this.nodes.head; node; node = node.next) {
			view = node.display.view;
			transform = node.transform;
			
			view.position.set(transform.position.x, transform.position.y)
			view.rotation = transform.rotation
		}

		this.renderer.render(this.scene)
	},

	addToDisplay: function (node) {
		console.log('node: ', node)
		let display = node.display

		this.scene.addChild(display.view)
	},

	removeFromDisplay: function (node) {
		let display = node.display
		
		this.scene.removeChild(display.view)
	},

	resize: function(width, height) {
		this.gamestate.width = width
		this.gamestate.height = height 
		this.renderer.resize(width, height)
	},

	addToEngine: function (engine) {

		this.nodes = engine.getNodeList(RenderNode);
		
		for (var node = this.nodes.head; node; node = node.next) {
			this.addToDisplay(node);
		}
		
		this.nodes.nodeAdded.add(this.addToDisplay, this);
		this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
	},

	removeFromEngine: function (engine) {
		this.nodes = null;
	}
})

export default PixiSystem