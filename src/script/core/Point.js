export default class Point {
	
	constructor(x, y) { 
		this.x = x || 0;
		this.y = y || 0;
	}

	distanceSquaredTo(targetPoint) {
		
		var dx = this.x - targetPoint.x,
			dy = this.y - targetPoint.y;

		return dx * dx + dy * dy;
	}

	distanceTo( targetPoint ) {

		var dx = this.x - targetPoint.x,
			dy = this.y - targetPoint.y;

		return Math.sqrt(dx * dx + dy * dy);
	}
}