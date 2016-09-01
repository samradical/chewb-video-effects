const F = `

// basic.frag

#define SHADER_NAME BASIC_FRAGMENT

precision highp float;
varying vec2 vTextureCoord;
uniform float time;
uniform sampler2D texture;
uniform sampler2D texture2;
uniform int uKeyVideoIndex; //one being keyed
uniform float uContrast;
uniform float uBrightness;
uniform float uMixRatio;
uniform float uThreshold;
uniform float uKeyColor;



float chromaVal(vec3 color, vec3 keyColor, float tolerance, float slope) {
    float d = abs(length(abs(keyColor - color)));
    float edge0 = tolerance * (1.0 - slope);
    float alpha = smoothstep(edge0, tolerance, d);
    return 1. - alpha;
}

void main(void) {
    vec2 st = vTextureCoord;
    st.x = 1. - vTextureCoord.x;
    //st.y = 1. - vTextureCoord.y;
    //vec3 texel = blur5(texture, st, vec2(640.0, 360.), vec2(5.,5.)).rgb;

    vec3 texel1 = texture2D(texture, st).rgb;
    vec3 texel2 = texture2D(texture2, st).rgb;
    vec3 keyedVideo = texel1;
    vec3 mixedVideo = texel2;
    if(uKeyVideoIndex > 0){
        keyedVideo = texel2;
        mixedVideo = texel1;
    }
    float cVal = chromaVal(keyedVideo, mixedVideo, uMixRatio, 0.2);
    vec3 col = mix(keyedVideo, mixedVideo, cVal);
    col = (col - 0.5) * (uContrast + 1.0) + 0.5;
    col = col + uBrightness;
    gl_FragColor = vec4(col, 1.0);
}

`

export default F