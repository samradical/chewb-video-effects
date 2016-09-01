// BatchCopy.js

import Geom from '../Geom';
import GLShader from '../GLShader';
import Batch from '../Batch';

import V from '../shaders/bigTriangle.vert';
import F from '../shaders/copy.frag';

class BatchCopy extends Batch {

	constructor() {
		let mesh = Geom.bigTriangle();
		let shader = new GLShader(V,F);
		super(mesh, shader);

		shader.bind();
		shader.uniform('texture', 'uniform1i', 0);
	}


	draw(texture) {
		this.shader.bind();
		texture.bind(0);
		super.draw();
	}

}

export default BatchCopy;