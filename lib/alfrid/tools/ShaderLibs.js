// ShaderLbs.js

'use strict';

import F1 from '../shaders/simpleColor.frag';
import V1 from '../shaders/bigTriangle.vert';
import V3 from '../shaders/generalWithNormal.vert';
import V2 from '../shaders/general.vert';

const ShaderLibs = {
	simpleColorFrag:F1,
	bigTriangleVert:V1,
	generalVert:V2,
	generalNormalVert:V3
};


export default ShaderLibs;