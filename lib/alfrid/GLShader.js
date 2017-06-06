// GLShader.js

'use strict';

import GL from './GLTool';
import V from './shaders/basic.vert';
import F from './shaders/basic.frag';

function isSame(array1, array2) {
	if (array1.length !== array2.length) {
		return false;
	}

	for (let i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) {
			return false;
		}
	}

	return true;
};

let addLineNumbers = function(string) {
	let lines = string.split('\n');
	for (let i = 0; i < lines.length; i++) {
		lines[i] = (i + 1) + ': ' + lines[i];
	}
	return lines.join('\n');
};

let gl;
let defaultVertexShader = V
let defaultFragmentShader = F

const uniformMapping = {
	float: 'uniform1f',
	vec2: 'uniform2fv',
	vec3: 'uniform3fv',
	vec4: 'uniform4fv',
	int: 'uniform1i',
	mat3: 'uniformMatrix3fv',
	mat4: 'uniformMatrix4fv'
};

const cloneArray = (mArray) => {
	if (mArray.slice) {
		return mArray.slice(0);
	} else {
		return new Float32Array(mArray);
	}
}

class GLShader {
	constructor(strVertexShader = defaultVertexShader, strFragmentShader = defaultFragmentShader) {

		gl = GL.gl;
		this.parameters = [];
		this.uniformValues = {};
		this.uniformTextures = [];

		if (!strVertexShader) { strVertexShader = defaultVertexShader; }
		if (!strFragmentShader) { strFragmentShader = defaultVertexShader; }

		let vsShader = this._createShaderProgram(strVertexShader, true);
		let fsShader = this._createShaderProgram(strFragmentShader, false);
		this._vsShader = vsShader;
		this._fsShader = fsShader;
		this._attachShaderProgram(vsShader, fsShader);

	}


	bind() {

		gl.useProgram(this.shaderProgram);
		GL.useShader(this);
		this.uniformTextures = [];

	}


	uniform(mName, mType, mValue) {

		if (mValue === undefined || mValue === null) {
			console.warn('mValue Error:', mName);
			return;
		}

		const uniformType = uniformMapping[mType] || mType;
		const isNumber = uniformType === 'uniform1i' || uniformType === 'uniform1f';
		let hasUniform = false;
		let oUniform;
		let parameterIndex = -1;


		for (let i = 0; i < this.parameters.length; i++) {
			oUniform = this.parameters[i];
			if (oUniform.name === mName) {
				hasUniform = true;
				parameterIndex = i;
				break;
			}
		}


		if (!hasUniform) {
			this.shaderProgram[mName] = gl.getUniformLocation(this.shaderProgram, mName);
			if (isNumber) {
				this.parameters.push({ name: mName, type: uniformType, value: mValue, uniformLoc: this.shaderProgram[mName] });
			} else {
				this.parameters.push({ name: mName, type: uniformType, value: cloneArray(mValue), uniformLoc: this.shaderProgram[mName] });
			}

			parameterIndex = this.parameters.length - 1;
		} else {
			this.shaderProgram[mName] = oUniform.uniformLoc;
		}

		if (!this.parameters[parameterIndex].uniformLoc) {
			return;
		}

		if (uniformType.indexOf('Matrix') === -1) {
			if (!isNumber) {
				if (!isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform) {
					gl[uniformType](this.shaderProgram[mName], mValue);
					this.parameters[parameterIndex].value = cloneArray(mValue);
				}
			} else {
				const needUpdate = (this.parameters[parameterIndex].value !== mValue || !hasUniform);
				if (needUpdate) {
					gl[uniformType](this.shaderProgram[mName], mValue);
					this.parameters[parameterIndex].value = mValue;
				}
			}

		} else {
			if (!isSame(this.parameters[parameterIndex].value, mValue) || !hasUniform) {
				gl[uniformType](this.shaderProgram[mName], false, mValue);
				this.parameters[parameterIndex].value = cloneArray(mValue);

			}
		}
	}


	_createShaderProgram(mShaderStr, isVertexShader) {

		const shaderType = isVertexShader ? GL.VERTEX_SHADER : GL.FRAGMENT_SHADER;
		const shader = gl.createShader(shaderType);

		gl.shaderSource(shader, mShaderStr);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.warn('Error in Shader : ', gl.getShaderInfoLog(shader));
			console.log(addLineNumbers(mShaderStr));
			return null;
		}

		return shader;
	}

	_attachShaderProgram(mVertexShader, mFragmentShader) {

		this.shaderProgram = gl.createProgram();
		gl.attachShader(this.shaderProgram, mVertexShader);
		gl.attachShader(this.shaderProgram, mFragmentShader);
		gl.linkProgram(this.shaderProgram);

	}


	destroy() {
		//console.log(this.shaderProgram);
		this._deleteShader(this.shaderProgram, this._vsShader);
		this._deleteShader(this.shaderProgram, this._fsShader);
		this._deleteShaderProgram(this.shaderProgram);

	}

	_deleteShader(program, shader) {
		gl.detachShader(program, shader);
		gl.deleteShader(shader);
	}

	_deleteShaderProgram(program) {
		gl.deleteProgram(program);
	}


}


export default GLShader;
