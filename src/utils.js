const Utils = {
  resizeEl: (el, type, containerWidth, containerHeight, elWidth, elHeight) => {
    var containerRatio = containerWidth / containerHeight;
    var elRatio = elWidth / elHeight;
    var scale, x, y;

    // define scale
    if (containerRatio > elRatio) {
      scale = containerWidth / elWidth;
    } else {
      scale = containerHeight / elHeight;
    }

    //FIT MODE
    //scale = Math.min(containerWidth/ elWidth, containerHe / this.targetCanvas.height)

    // define position
    if (containerRatio === elRatio) {
      x = y = 0;
    } else {
      x = (containerWidth - elWidth * scale) * 0.5 / scale;
      y = (containerHeight - elHeight * scale) * 0.5 / scale;
    }

    // fixed
    x = Number(x.toFixed(1));
    y = Number(y.toFixed(1));

    // set el css
    el.style.transform = 'scale3d(' + scale + ', ' + scale + ', 1) translate3d(' + x + 'px,' + y + 'px,0)'
    el.style.transformOrigin = '0% 0% 0px'
  }
}

export default Utils
