
class BSpline{
	constructor(puntosBase){
		this.PB = puntosBase;
		if(primeraEjecuccion){
			for (var j = 0; j < 0; j++) {
				for (var i = 0; i < 3; i++) {
					this.PB.unshift(puntosBase[i*2]);//pongo 2 veces mas al comienzo el primer punto
				}
			}
			for (var j = 0; j < 3; j++) {
				var len = puntosBase.length
				for (var i = len-3; i < len; i++) {
					this.PB.push(puntosBase[i]);//pongo 3 veces mas al final el ultimo punto
				}
			}
		}
	}
	// Definimos las Bases de Berstein, dependen de u

	baseSpline0(u) { return (1-u)*(1-u)*(1-u)*1/6;} // 1/6*(1-u)^3

	baseSpline1(u) { return (4-6*u*u+3*u*u*u)*1/6; } // (u^3)/2 - u +2/3

	baseSpline2(u) { return (1+3*u+3*u*u-3*u*u*u)*1/6} // -0.5*u^3+0.5*u^2+0.5*u+1

	baseSpline3(u) { return (u*u*u)*1/6; }


	// Definimos las Bases de Berstein derivadas

	baseSplineDer0(u) { return -0.5*Math.pow(1-u,2);} // ((1-u)^2)/2

	baseSplineDer1(u) { return (3/2)*u*u-2*u; }

	baseSplineDer2(u) { return -1.5*u*u+u+0.5;}

	baseSplineDer3(u) { return (u*u)/2; }


	// 4 Puntos de control P0, P1, P2 y P3
	// Modificarlos para obtener otra curva



	// devuelve un punto de la curva segun el parametro u entre 0 y 1
	splineGetPunto(t,u){

		var punto=new Object();

		punto.x=this.baseSpline0(u)*this.PB[t*3]+this.baseSpline1(u)*this.PB[(t+1)*3]+this.baseSpline2(u)*this.PB[(t+2)*3]+this.baseSpline3(u)*this.PB[(t+3)*3];
		punto.y=this.baseSpline0(u)*this.PB[(t)*3+1]+this.baseSpline1(u)*this.PB[(t+1)*3+1]+this.baseSpline2(u)*this.PB[(t+2)*3+1]+this.baseSpline3(u)*this.PB[(t+3)*3+1];
		punto.z=this.baseSpline0(u)*this.PB[(t)*3+2]+this.baseSpline1(u)*this.PB[(t+1)*3+2]+this.baseSpline2(u)*this.PB[(t+2)*3+2]+this.baseSpline3(u)*this.PB[(t+3)*3+2];

		return vec3.fromValues(punto.x,punto.y,punto.z);
	}

	splineGetDerPunto(t,u){

		var punto=new Object();
		punto.x=this.baseSplineDer0(u)*this.PB[t*3]+this.baseSplineDer1(u)*this.PB[(t+1)*3]+this.baseSplineDer2(u)*this.PB[(t+2)*3]+this.baseSplineDer3(u)*this.PB[(t+3)*3];
		punto.y=this.baseSplineDer0(u)*this.PB[(t)*3+1]+this.baseSplineDer1(u)*this.PB[(t+1)*3+1]+this.baseSplineDer2(u)*this.PB[(t+2)*3+1]+this.baseSplineDer3(u)*this.PB[(t+3)*3+1];
		punto.z=this.baseSplineDer0(u)*this.PB[(t)*3+2]+this.baseSplineDer1(u)*this.PB[(t+1)*3+2]+this.baseSplineDer2(u)*this.PB[(t+2)*3+2]+this.baseSplineDer3(u)*this.PB[(t+3)*3+2];

		return punto;
	}

	splineGetNormal(punto,puntoDer){

		var binormal = this.splineGetBinormal(punto,puntoDer);
		var tangente = this.splineGetTangente(punto,puntoDer);
		var normal = vec3.create();
		vec3.cross(normal,tangente,binormal)
		return vec3.normalize(normal,normal);
	}

	splineGetTangente(punto,puntoDer){


		var	tang = vec3.fromValues(puntoDer.x,puntoDer.y,puntoDer.z)
		return vec3.normalize(tang,tang);
	}

	splineGetBinormal(punto,puntoDer){
		var tang = this.splineGetTangente(punto,puntoDer);
		var normal = [0.0,0.0,1.0];

		tang = vec3.fromValues(tang[0],tang[1],tang[2])
		normal = vec3.fromValues(normal[0],normal[1],normal[2])
		var binormal = vec3.create([0.0,0.0,0.0]);
		vec3.cross(binormal, normal,tang );

		return vec3.normalize(binormal,binormal);
	}
}
