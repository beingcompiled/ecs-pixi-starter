import * as PIXI from 'pixi.js'

import Transform from '~/component/Transform'
import Display from '~/component/Display'
import RenderNode from '~/node/Render'

const PixiSystem = Ash.System.extend({

	context: null,
	nodes: null,

	constructor: function(config) {

		this.renderer = PIXI.autoDetectRenderer(config.width, config.height, {
			antialias: false,
			transparent: false,
			resolution: 1
		})

		this.renderer.view.className = 'renderer'

		this.stage = new PIXI.Container()

		document.getElementById('main').appendChild(this.renderer.view)
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
	},

	addToDisplay: function (node) {
		console.log('node: ', node)
		let display = node.display;
	    
		this.stage.addChild(display.view)
	},

	removeFromDisplay: function (node) {
		let display = node.display;
		
		this.stage.removeChild(display.view)
	},

	update: function (time) {
		
		var node, transform, display, view;

		for (node = this.nodes.head; node; node = node.next) {
			view = node.display.view;
			transform = node.transform;
			
			view.position.set(transform.position.x, transform.position.y)
			view.rotation = transform.rotation
		}

		this.renderer.render(this.stage)
	}
})

export default PixiSystem