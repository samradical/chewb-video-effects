precision mediump float;
varying vec2 vTextureCoord;
uniform float time;
uniform sampler2D texture;
uniform sampler2D texture2;
uniform float uColorEffectsOne;
uniform float uColorEffectsTwo;
uniform float uContrast;
uniform float uBrightness;
uniform float uSaturation;
uniform float uHue;

uniform int uKeyVideoIndex; //one being keyed
uniform float uMixRatio;
uniform float uThreshold;
uniform float uKeyColor;

#define TAU 6.28318530718
#pragma glslify: blend = require(./glsl/all);

 vec3 toHue(vec3 rgb, float adjustment) {
    const mat3 toYIQ = mat3(0.299, 0.587, 0.114,
        0.595716, -0.274453, -0.321263,
        0.211456, -0.522591, 0.311135);
    const mat3 toRGB = mat3(1.0, 0.9563, 0.6210,
        1.0, -0.2721, -0.6474,
        1.0, -1.107, 1.7046);

    vec3 yiq = toYIQ * rgb;
    float hue = atan(yiq.z, yiq.y) + adjustment;
    float chroma = sqrt(yiq.z * yiq.z + yiq.y * yiq.y);

    vec3 color = vec3(yiq.x, chroma * cos(hue), chroma * sin(hue));
    return toRGB * color;
 }

 vec3 changeSaturation(vec3 color, float saturation) {
    float luma = dot(vec3(0.2125, 0.7154, 0.0721) * color, vec3(1.));
    return mix(vec3(luma), color, saturation);
 }

float chromaVal(vec3 color, vec3 keyColor, float tolerance, float slope) {
    float d = abs(length(abs(keyColor - color)));
    float edge0 = tolerance * (1.0 - slope);
    float alpha = smoothstep(edge0, tolerance, d);
    return 1. - alpha;
}

void main(void) {
    vec2 st = vTextureCoord;
    st.x = 1. - vTextureCoord.x;

    vec3 texel1 = texture2D(texture, st).rgb;
    vec3 texel2 = texture2D(texture2, st).rgb;

    vec3 colorCorrectionOne = toHue(texel1, uHue * TAU);
    vec3 colorCorrectionTwo = toHue(texel2, uHue * TAU);

    colorCorrectionOne = changeSaturation(colorCorrectionOne, uSaturation);
    colorCorrectionOne = (colorCorrectionOne - 0.5) * (uContrast + 1.0) + 0.5;
    colorCorrectionOne = colorCorrectionOne + uBrightness;
    colorCorrectionOne = mix(texel1, colorCorrectionOne, uColorEffectsOne);

    colorCorrectionTwo = changeSaturation(colorCorrectionTwo, uSaturation);
    colorCorrectionTwo = (colorCorrectionTwo - 0.5) * (uContrast + 1.0) + 0.5;
    colorCorrectionTwo = colorCorrectionTwo + uBrightness;
    colorCorrectionTwo = mix(texel2, colorCorrectionTwo, uColorEffectsTwo);

    vec3 keyedVideo = colorCorrectionOne;
    vec3 mixedVideo = colorCorrectionTwo;

    if(uKeyVideoIndex > 0){
        keyedVideo = colorCorrectionTwo;
        mixedVideo = colorCorrectionOne;
    }

    float cVal = chromaVal(keyedVideo, mixedVideo, uMixRatio, uThreshold);
    vec3 col = mix(keyedVideo, mixedVideo, cVal);

    gl_FragColor = vec4(col, 1.0);
}
