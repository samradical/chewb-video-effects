import alfrid, { Scene, GLTexture, FrameBuffer } from './alfrid'
import Utils from './utils'
import VideoView from './VideoGL'
import VideoTexture from './VideoTexture'
import glm from 'gl-matrix';
const GL = alfrid.GL;
export default class VideoGL extends Scene {
  constructor(targetCanvas, video, options = {}) {
    super()
    let gl = GL.gl
    this.options = options
    this.rotationFront = glm.mat4.fromValues(0, -1, 0);
    glm.mat4.identity(this.rotationFront);
    this.cameraOrtho.ortho(4, -4, 4, -4)
    this.video = video
    this.video.width = this.options.width || 640
    this.video.height = this.options.height || 360
    this._width = video.width
    this._height = video.height
    this.$targetCanvas = targetCanvas
    this.$targetCanvas.width = video.width
    this.$targetCanvas.height = video.height
    this.targetCanvasCtx = this.$targetCanvas.getContext('2d')

    this.video.exposure = true
    this.video.shape = [this._width, this._height]
    this.alfridTexture = new VideoTexture(this.video);
    this._view = new VideoView()
    this.fbo = new FrameBuffer(this._width, this._height);
    this._c = 0

    this._initImageDatas()
    if (this.options.fullscreen) {
      this.resize()
    }
  }

  _initImageDatas() {
    this._readPixelData = new Uint8Array(this._width * this._height * 4);
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
    if (this.video.readyState == 4) {

      if (this._c % 2 === 0) {
        let gl = GL.gl
        GL.enable(GL.DEPTH_TEST);
        GL.setMatrices(this.cameraOrtho)
        GL.rotate(this.rotationFront);
        GL.setViewport(0, 0, this._width, this._height);


        this.alfridTexture.updateTexture(this.video)

        /*this._ctx.drawImage(this.video, 0, 0, W, H);
        let frame = this._ctx.getImageData(0, 0, W, H);
        var pixels = new Uint8Array(W * H * 4).set(frame);*/
        // this.alfridTexture.updateTexture(this.video)

        /*gl.bindFramebuffer(gl.FRAMEBUFFER, this.FBO);
        var data = new Float32Array (W * H * 4);
        gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, data);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);*/
        //gl.bindFramebuffer(gl.FRAMEBUFFER, this.FBO)
        this.fbo.clear()
        this.fbo.bind()
        this._view.render(this.alfridTexture, this.video)
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE) {
          gl.readPixels(0, 0, this._width, this._height, gl.RGBA, gl.UNSIGNED_BYTE, this._readPixelData);
          this._outImageDate.data.set(this._readPixelData)
          this.targetCanvasCtx.putImageData(this._outImageDate, 0, 0)
        }
        this.fbo.unbind();
      }
      this._c++
    }
  }

  resize() {
    if(this.options.fullscreen){
      Utils.resizeEl(this.$targetCanvas, 'cover', window.innerWidth, window.innerHeight, this._width, this._height)
    }
  }

  get texture() {
    return this.fbo.getTexture()
  }

  get pixels() {
    return this._pixels
  }

  fade() {

  }
}
