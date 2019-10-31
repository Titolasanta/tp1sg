precision highp float;
varying vec3 vNormal;
varying vec3 vPosWorld;
uniform vec3 colorMaterial;
void main(void) {
	vec3 lightVec=normalize(vPosWorld - vec3(0.0,-3.0,0.5));					// vector desde el pixel a la fuente de luz
	vec3 diffColor=mix(colorMaterial,vNormal,1.0);						// color del pixel
	vec3 colorFinal=dot(lightVec,vNormal)*diffColor;		// color final iluminado
		colorFinal= colorMaterial+vNormal-vNormal;
   gl_FragColor = vec4(colorFinal,1.0);
}
