import alfrid, { Scene, GLTexture, FrameBuffer } from './lib/alfrid'
import VideoScene from './lib/VideoScene'
import VideoKeyScene from './src/scenes/VideoKeyScene'
import Proxxy from './src/proxy'
const GL = alfrid.GL;
export default class VideoEffects{

  constructor(glCanvas, targetCanvas, mediaSource,mediaSource2, options={}) {
    GL.init(glCanvas)
    //this._scene = new VideoScene(targetCanvas, mediaSource, options)
    this._scene = new VideoKeyScene(targetCanvas, mediaSource,mediaSource2, options)
  }

  setUniforms(uniforms){
    this._scene.view.setUniforms(uniforms)
    return new Proxxy(uniforms, (prop, val) => { this._onPropertyChanged(prop, val) }).p
  }

  _onPropertyChanged(prop, val) {
    this._scene.view.updateUniform(prop, val)
  }

  get view(){
    return this._scene.view
  }

  set paused(v) {
    this._paused = v
    this._scene.paused = this._paused
  }

  set width(w) {
    this._scene.width = w
  }

  set height(h) {
    this._scene.height = w
  }

  get texture() {
    return this._scene.fbo.getTexture()
  }

  get pixels() {
    return this._scene._pixels
  }

  get ctx(){
    return this._scene.targetCanvasCtx
  }

  render(){

  }
}
