#pragma glslify: blendAdd = require(./add);
#pragma glslify: blendAverage = require(./average);
#pragma glslify: blendColorBurn = require(./color-burn);
#pragma glslify: blendColorDodge = require(./color-dodge);
#pragma glslify: blendDarken = require(./darken);
#pragma glslify: blendDifference = require(./difference);
#pragma glslify: blendExclusion = require(./exclusion);
#pragma glslify: blendGlow = require(./glow);
#pragma glslify: blendHardLight = require(./hard-light);
#pragma glslify: blendHardMix = require(./hard-mix);
#pragma glslify: blendLighten = require(./lighten);
#pragma glslify: blendLinearBurn = require(./linear-burn);
#pragma glslify: blendLinearDodge = require(./linear-dodge);
#pragma glslify: blendMultiply = require(./multiply);
#pragma glslify: blendNegation = require(./negation);
#pragma glslify: blendNormal = require(./normal);
#pragma glslify: blendOverlay = require(./overlay);
#pragma glslify: blendPhoenix = require(./phoenix);
#pragma glslify: blendReflect = require(./reflect);
#pragma glslify: blendScreen = require(./screen);
#pragma glslify: blendSoftLight = require(./soft-light);
#pragma glslify: blendSubstract = require(./substract);


vec3 blendMode( int mode, vec3 base, vec3 blend ){
	if( mode == 1 ){
		return blendAdd( base, blend );
	}else
	if( mode == 2 ){
		return blendAverage( base, blend );
	}else
	if( mode == 3 ){
		return blendColorBurn( base, blend );
	}else
	if( mode == 4 ){
		return blendColorDodge( base, blend );
	}else
	if( mode == 5 ){
		return blendDarken( base, blend );
	}else
	if( mode == 6 ){
		return blendDifference( base, blend );
	}else
	if( mode == 7 ){
		return blendExclusion( base, blend );
	}else
	if( mode == 8 ){
		return blendGlow( base, blend );
	}else
	if( mode == 9 ){
		return blendHardLight( base, blend );
	}else
	if( mode == 10 ){
		return blendHardMix( base, blend );
	}else
	if( mode == 11 ){
		return blendLighten( base, blend );
	}else
	if( mode == 12 ){
		return blendLinearBurn( base, blend );
	}else
	if( mode == 13 ){
		return blendLinearDodge( base, blend );
	}else
	if( mode == 14 ){
		// ( problem with this ) return blendLinearLight( base, blend );
	}else
	if( mode == 15 ){
		return blendMultiply( base, blend );
	}else
	if( mode == 16 ){
		return blendNegation( base, blend );
	}else
	if( mode == 17 ){
		return blendNormal( base, blend );
	}else
	if( mode == 18 ){
		return blendOverlay( base, blend );
	}else
	if( mode == 19 ){
		return blendPhoenix( base, blend );
	}else
	if( mode == 20 ){
		// ( problem with this ) return blendPinLight( base, blend );
	}else
	if( mode == 21 ){
		return blendReflect( base, blend );
	}else
	if( mode == 22 ){
		return blendScreen( base, blend );
	}else
	if( mode == 23 ){
		return blendSoftLight( base, blend );
	}else
	if( mode == 24 ){
		return blendSubstract( base, blend );
	}else
	if( mode == 25 ){
		// ( problem with this ) return blendVividLight( base, blend );
	}
}
#pragma glslify:export(blendMode)