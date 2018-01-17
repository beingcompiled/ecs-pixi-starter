import Transform from '~/component/Transform'
import MotionNode from '~/node/Motion'

const MotionSystem = Ash.System.extend({
	state: null,
	nodeList: null,

	constructor: function(state) {
		this.state = state;
		return this;
	},

	addToEngine: function (engine) {
		this.nodeList = engine.getNodeList(MotionNode);
	},

	removeFromEngine: function (engine) {
		this.nodes = null;
	},

	update: function (time) {
		for(var node = this.nodeList.head; node; node = node.next) {
			this.updateNode(node, time);
		}
	},

	updateNode: function (node, time) {		
		let transform = node.transform;
		let motion = node.motion;
		let display = node.display;

		transform.position.x += motion.speed 
		transform.position.y += motion.speed
		transform.rotation += 0.1

		if (transform.position.x <= 0 || transform.position.x + display.width >= this.state.width) {
			motion.speed *= -1
		} 
		else if (transform.position.y <= 0 || transform.position.y + display.height >= this.state.height) {
			motion.speed *= -1
		} 
		else {
			motion.speed *= 1	
		}		
	}
})

export default MotionSystem