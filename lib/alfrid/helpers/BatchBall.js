// BatchBall.js

import Geom from '../Geom';
import GLShader from '../GLShader';
import Batch from '../Batch';

import V from '../shaders/general.vert';
import F from '../shaders/simpleColor.frag';

class BatchBall extends Batch {

	constructor() {
		let mesh = Geom.sphere(1, 24);
		let shader = new GLShader(V,F);
		super(mesh, shader);
	}


	draw(position=[0,0,0], scale=[1,1,1], color=[1,1,1], opacity=1) {
		this.shader.bind();
		this.shader.uniform('position', 'uniform3fv', position);
		this.shader.uniform('scale', 'uniform3fv', scale);
		this.shader.uniform('color', 'uniform3fv', color);
		this.shader.uniform('opacity', 'uniform1f', opacity);
		super.draw();
	}

}

export default BatchBall;