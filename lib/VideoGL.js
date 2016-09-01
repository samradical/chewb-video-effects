// ViewDepth.js

import alfrid, { View } from './alfrid'
let GL = alfrid.GL;

import vs from "./basic_vert"
import fs from "./video_frag"

let gl;
class VideoGL extends alfrid.View {

  constructor() {
    super(vs, fs);
    gl = GL.gl;
    this.x = 0
    this.y = 3
    this.z = 10

    this._uBrightness = 0.
    this._uContrast = 0
  }


  _init() {
    this.mesh = alfrid.Geom.plane(8, 8, 2, false, false);
  }

  /*
  <name>:{
    type:
  }
  */
  setUniforms(uniforms){
    this._uniforms = []
    Object.keys(uniforms).forEach(key=>{
      let _o = uniforms[key]
      this._uniforms.push({
        name:key,
        type:_o.type,
        value:_o.value
      })
    })
    this._uniformLength= this._uniforms.length
  }

  render(texture) {
    this.shader.bind();
    for (var i = 0; i < this,_uniformLength; i++) {
      let _u =  this._uniforms[i]
      this.shader.uniform(_u.name, _u.type, _u.value);
    }
    /*this.shader.uniform("texture", "uniform1i", 0);
    this.shader.uniform("uBrightness", "float", this._uBrightness);
    this.shader.uniform("uContrast", "float", this._uContrast);*/
    /*gl.activeTexture(gl.TEXTURE0 + 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);*/
    texture.bind(0)
    GL.draw(this.mesh);
  }


}

export default VideoGL;
