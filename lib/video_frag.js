const F = `

// basic.frag

#define SHADER_NAME BASIC_FRAGMENT

precision highp float;
varying vec2 vTextureCoord;
uniform float time;
uniform sampler2D texture;
uniform float uContrast;
uniform float uBrightness;


vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture2D(image, uv) * 0.29411764705882354;
  color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
  color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
  return color;
}

void main(void) {
    vec2 st = vTextureCoord;
    st.x = 1. - vTextureCoord.x;
    //st.y = 1. - vTextureCoord.y;
    //vec3 texel = blur5(texture, st, vec2(640.0, 360.), vec2(5.,5.)).rgb;
    vec3 texel = texture2D(texture, st).rgb;
    texel = (texel - 0.5) * (uContrast + 1.0) + 0.5;
    texel = texel + uBrightness;
    gl_FragColor = vec4(texel, 1.0);
}

`

export default F