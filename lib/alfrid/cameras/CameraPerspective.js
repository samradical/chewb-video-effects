// CameraPerspective.js

import Camera from './Camera';
import glm from 'gl-matrix';

class CameraPerspective extends Camera {

	constructor() {
		super();
	}

	setPerspective(mFov, mAspectRatio, mNear, mFar) {
		
		this._fov         = mFov;
		this._near        = mNear;
		this._far         = mFar;
		this._aspectRatio = mAspectRatio;
		glm.mat4.perspective(this._projection, mFov, mAspectRatio, mNear, mFar);
	}

	reset(){
		glm.mat4.perspective(this._projection, this._fov, this._aspectRatio, this._near, this._far);
	}


	setAspectRatio(mAspectRatio) {
		this._aspectRatio = mAspectRatio;
		glm.mat4.perspective(this.projection, this._fov, mAspectRatio, this._near, this._far);
	}
}


export default CameraPerspective;