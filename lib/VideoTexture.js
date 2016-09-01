// GLTexture.js

import alfrid, { GLTexture } from './alfrid'
const GL = alfrid.GL;
let gl
class VideoTexture extends GLTexture {

  constructor(mSource, isTexture = false, mParameters = {}) {
      super(mSource, isTexture, mParameters)
      gl = GL.gl
    }
    /*

    gl.texImage2D(target,
     level,
      internalformat, width, height, border, format, type, ArrayBufferView? pixels);

    */
  updateTexture(mSource) {
    if(mSource){ this._mSource = mSource; }
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._mSource);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
    if(this.minFilter === gl.LINEAR_MIPMAP_NEAREST) {
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}

export default VideoTexture;
