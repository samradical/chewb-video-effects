import alfrid, { Scene, GLTexture, FrameBuffer } from '../../lib/alfrid'
import Utils from '../utils'
import VideoView from './VideoKeyView'
import VideoTexture from '../../lib/VideoTexture'
import glm from 'gl-matrix';
const GL = alfrid.GL;
export default class VideoKeyScene extends Scene {
  constructor(targetCanvas, video1, video2, options = {}, uniforms={}) {
    super()
    let gl = GL.gl
    this.options = options
    this.rotationFront = glm.mat4.fromValues(0, -1, 0);
    glm.mat4.identity(this.rotationFront);
    this.cameraOrtho.ortho(4, -4, 4, -4)
    this._width = this.options.width || 640
    this._height = this.options.height || 360
    this.video1 = video1
    this.video1.width = this._width
    this.video1.height = this._height
    this.video2 = video2 || video1
    this.video2.width = this._width
    this.video2.height = this._height
    this.$targetCanvas = targetCanvas
    this.$targetCanvas.width = this._width
    this.$targetCanvas.height = this._height
    this.targetCanvasCtx = this.$targetCanvas.getContext('2d')

    this.videoTexture = new VideoTexture(this.video1);
    this.videoTexture2 = new VideoTexture(this.video2);
    this._view = new VideoView()
    this.fbo = new FrameBuffer(this._width, this._height);
    this._c = 0
    this._time = 0

    this._initImageDatas()
    if (this.options.fullscreen) {
      this.resize()
    }
  }

  _initImageDatas() {
    this._readPixelData = new Uint8Array(this._width * this._height * 4);
    this._readPixelData2 = new Uint8Array(this._width * this._height * 3);
    this._outImageDate = new ImageData(this._width, this._height)
  }

  set paused(v) {
    this._paused = v
  }

  set width(w) {
    this._width = w
    this._initImageDatas()
  }

  set height(h) {
    this._height = h
    this._initImageDatas()
  }

  render() {
    if (this._paused) {
      return
    }

    if (this.video1.readyState == 4) {
      const now = performance.now()
      if (now - this._time >= 30) {
        let gl = GL.gl
        GL.enable(GL.DEPTH_TEST);
        GL.setMatrices(this.cameraOrtho)
        GL.rotate(this.rotationFront);
        GL.setViewport(0, 0, this._width, this._height);


        this.videoTexture.updateTexture(this.video1)
        this.videoTexture2.updateTexture(this.video2)

        this.fbo.clear()
        this.fbo.bind()
        this._view.render(this.videoTexture, this.videoTexture2)
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE) {
          gl.readPixels(0, 0, this._width, this._height, gl.RGBA, gl.UNSIGNED_BYTE, this._readPixelData);
          //gl.readPixels(0, 0, this._width, this._height, gl.RGB, gl.UNSIGNED_BYTE, this._readPixelData2);
          this._outImageDate.data.set(this._readPixelData)
          this.targetCanvasCtx.putImageData(this._outImageDate, 0, 0)
        }
        this.fbo.unbind();

        this._time = now
      }
    }
    this.onAfterRender()
  }

  resize() {
    if (this.options.fullscreen) {
      Utils.resizeEl(this.$targetCanvas, 'cover', window.innerWidth, window.innerHeight, this._width, this._height)
    }
  }

  get canvas(){
    return this.$targetCanvas
  }

  get imageData(){
    return this._outImageDate
  }

  get texture() {
    return this.fbo.getTexture()
  }

  get pixels() {
    return this._readPixelData
  }

  getDataURL(enc, q){
    return this.$targetCanvas.toDataURL(enc, q);
  }

  get view(){
    return this._view
  }

  fade() {

  }
}
