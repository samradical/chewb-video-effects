import alfrid, { Scene, GLTexture, FrameBuffer } from './lib/alfrid'
import BinaryBase64 from './lib/base64-binary'
//import VideoScene from './lib/VideoScene'
import VideoKeyScene from './src/scenes/VideoKeyScene'
import Proxxy from './src/proxy'
const GL = alfrid.GL;
export default class VideoEffects {

  constructor(glCanvas,targetCanvas, mediaSource, mediaSource2, options = {}) {
    GL.init(glCanvas)
      //this._scene = new VideoScene(targetCanvas, mediaSource, options)
    this._scene = new VideoKeyScene(targetCanvas, mediaSource, mediaSource2, options)
    this._scene.onAfterRender = this._onAfterRender.bind(this)
    this._events = {}
  }

  setUniforms(uniforms) {
    this._scene.view.setUniforms(uniforms)
    return new Proxxy(uniforms, (prop, val) => { this._onPropertyChanged(prop, val) }).p
  }

  _onPropertyChanged(prop, val) {
    this._scene.view.updateUniform(prop, val)
  }

  get view() {
    return this._scene.view
  }

  set width(w) {
    this._scene.width = w
  }

  set height(h) {
    this._scene.height = w
  }

  get imageDatatoDataURLToArrayBuffer(){
    return BinaryBase64.decodeArrayBuffer(this._scene.canvas.toDataURL("image/jpeg"));
  }

  get imageData() {
    return this._scene.imageData
  }

  get imageDataArrayBuffer() {
    /*let buf = new ArrayBuffer(this._scene.imageData.data.length)
    let bufView = new Uint8Array(buf);
    bufView.set(this._scene.imageData.data)*/
    return this._scene.pixels
  }

  getDataURL(enc = 'image/jpeg', q = 1){
    return this._scene.getDataURL(enc, q)
  }

  get texture() {
    return this._scene.fbo.getTexture()
  }

  get pixels() {
    return this._scene.pixels
  }

  get ctx() {
    return this._scene.targetCanvasCtx
  }

  get GL(){
    return GL
  }

  on(str, cb){
    this._events[str] = cb
  }

  _onAfterRender(){
    let _cb = this._events['render']
    if(_cb){
      _cb()
    }
  }

  render() {

  }

  pause(v = true){
    this._paused = v
    this._scene.paused = v
  }

  resume(){
    this._scene.paused = false
  }
}


window.VideoEffects = VideoEffects