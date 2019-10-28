
class Bezier{
	constructor(puntosBase){
		this.PB = puntosBase;
		for (var j = 0; j < 0; j++) {
			for (var i = 0; i < 3; i++) {
				this.PB.unshift(puntosBase[i*2]);//pongo 2 veces mas al comienzo el primer punto
			}
		}
		for (var j = 0; j < 0; j++) {
			var len = puntosBase.length
			for (var i = len-3; i < len; i++) {
				this.PB.push(puntosBase[i]);//pongo 3 veces mas al final el ultimo punto
			}
		}
	}
	baseBezier0(u) { return (1-u)*(1-u)*(1-u);}  // 1*(1-u) - u*(1-u) = 1-2u+u2  ,  (1-2u+u2) - u +2u2- u3 ,  1 - 3u +3u2 -u3

  baseBezier1(u) { return 3*(1-u)*(1-u)*u; }    //

	baseBezier2(u) { return 3*(1-u)*u*u;}     //   -u3 +3u2

  baseBezier3(u) { return u*u*u; }			 // u3


  baseBezierDer0(u) { return -3*u*u+6*u-3;} 	//-3u2 +6u -3

  baseBezierDer1(u) { return 9*u*u-12*u+3; }  // 9u2 -12u +3

  baseBezierDer2(u) { return -9*u*u+6*u;}		 // -9u2 +6u

  baseBezierDer3(u) { return 3*u*u; }			// 3u2


  baseBezier0Der2(u) { return -6*u+6;} 		//-6u +6

  baseBezier1Der2(u) { return 18*u-12; }  		// 18u-12

  baseBezier2Der2(u) { return 6-18*u;}		 // -18u +6

  baseBezier3Der2(u) { return 6*u; }			// 6u


      bezierGetPunto(t,u){

        var punto=new Object();

        punto.x=this.baseBezier0(u)*this.PB[t*12]+this.baseBezier1(u)*this.PB[t*12+3]+this.baseBezier2(u)*this.PB[t*12+6]+this.baseBezier3(u)*this.PB[t*12+9];
        punto.y=this.baseBezier0(u)*this.PB[t*12+1]+this.baseBezier1(u)*this.PB[t*12+3+1]+this.baseBezier2(u)*this.PB[t*12+6+1]+this.baseBezier3(u)*this.PB[t*12+9+1];
        punto.z=this.baseBezier0(u)*this.PB[t*12+2]+this.baseBezier1(u)*this.PB[t*12+3+2]+this.baseBezier2(u)*this.PB[t*12+6+2]+this.baseBezier3(u)*this.PB[t*12+9+2];

        return vec3.fromValues(punto.x,punto.y,punto.z);
      }

      bezierGetDerPunto(t,u){

        var punto=new Object();
        punto.x=this.baseBezierDer0(u)*this.PB[t*12]+this.baseBezierDer1(u)*this.PB[t*12+3]+this.baseBezierDer2(u)*this.PB[t*12+6]+this.baseBezierDer3(u)*this.PB[t*12+9];
        punto.y=this.baseBezierDer0(u)*this.PB[t*12+1]+this.baseBezierDer1(u)*this.PB[t*12+3+1]+this.baseBezierDer2(u)*this.PB[t*12+6+1]+this.baseBezierDer3(u)*this.PB[t*12+9+1];
        punto.z=this.baseBezierDer0(u)*this.PB[t*12+2]+this.baseBezierDer1(u)*this.PB[t*12+3+2]+this.baseBezierDer2(u)*this.PB[t*12+6+2]+this.baseBezierDer3(u)*this.PB[t*12+9+2];

        return punto;
      }

      bezierGetNormal(punto,puntoDer){

        var binormal = this.bezierGetBinormal(punto,puntoDer);
        var tangente = this.bezierGetTangente(punto,puntoDer);
        var normal = vec3.create();
        vec3.cross(normal,tangente,binormal)
        return vec3.normalize(normal,normal);
      }

      bezierGetTangente(punto,puntoDer){
        var	tang = vec3.fromValues(puntoDer.x,puntoDer.y,puntoDer.z)
        return vec3.normalize(tang,tang);
      }

      bezierGetBinormal(punto,puntoDer){
        var tang = this.bezierGetTangente(punto,puntoDer);
        var normal = [0.0,0.0,1.0];

        tang = vec3.fromValues(tang[0],tang[1],tang[2])
        normal = vec3.fromValues(normal[0],normal[1],normal[2])
        var binormal = vec3.create([0.0,0.0,0.0]);
        vec3.cross(binormal, normal,tang );

        return vec3.normalize(binormal,binormal);
      }
    }
