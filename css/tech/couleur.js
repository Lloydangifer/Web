"use strict";

/* Très mal écrit. A factoriser quand j'aurai le temps .... */
/* voir aussi http://dev.w3.org/csswg/css-color/#apis */

var FPL = {
	// initialisés dans IIF
	prefixeCSS: '',	

	rngHEX1: null,
	rngHEX2: null,
	rngHEX3: null,
	bcHEXTest: null,
	bcHEX: null,
	HEX1: null,
	HEX2: null,
	HEX3: null,
		
	rngRGB1: null,
	rngRGB2: null,
	rngRGB3: null,
	bcRGBTest: null,
	bcRGB: null,
	RGB1: null,
	RGB2: null,
	RGB3: null,
		
	rngRGBA1: null,
	rngRGBA2: null,
	rngRGBA3: null,
	bcRGBATest: null,
	bcRGBA: null,
	RGBA1: null,
	RGBA2: null,
	RGBA3: null,
	
	rngHSL1: null,
	rngHSL2: null,
	rngHSL3: null,
	bcHSLTest: null,
	bcHSL: null,
	bcHSL1: null,
	bcHSL2: null,
	bcHSL3: null,
	
	rngHSLA1: null,
	rngHSLA2: null,
	rngHSLA3: null,
	bcHSLATest: null,
	bcHSLA: null,
	bcHSLA1: null,
	bcHSLA2: null,
	bcHSLA3: null,	
	
	//---------------------------------------------------------------------
	// Changement des curseurs notation héxadécimal
	HEXChange: function (i) {
		var RVB = [ '', 'Rouge', 'Vert', 'Bleu' ], 
			red = 0, green = 0, blue = 0, 
			Bloc, couleur, rgb;
	
		if (i == 1) red = couleur = Number(this.rngHEX1.value);
		else if (i == 2) green = couleur = Number(this.rngHEX2.value);
		else blue = couleur = Number(this.rngHEX3.value);
	
		rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		
		Bloc = document.getElementById('labHEX' + i);
		Bloc.innerHTML = RVB[i] + ' ' + this.decToHexa(couleur);
		document.getElementById('HEX' + i).style.backgroundColor = rgb;
	
		red = Number(this.rngHEX1.value);
		green = Number(this.rngHEX2.value);
		blue = Number(this.rngHEX3.value);
	
		rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
	
		this.bcHEXTest.style.backgroundColor = rgb;
		this.bcHEXTest.style.color = this.texteNoirOuBlanc(red, green, blue);
	
		rgb = '#' 
				+ this.decToHexa(red) 
				+ this.decToHexa(green) 
				+ this.decToHexa(blue); 
				
		this.bcHEX.innerHTML = rgb;
	},
		
	//---------------------------------------------------------------------
	// Changement des curseurs RGB
	RGBChange: function (i) {
		var RVB = [ '', 'Rouge', 'Vert', 'Bleu' ], 
			red = 0, green = 0, blue = 0, 
			Bloc, couleur, rgb;
	
		if (i == 1) red = couleur = Number(this.rngRGB1.value);
		else if (i == 2) green = couleur = Number(this.rngRGB2.value);
		else blue = couleur = Number(this.rngRGB3.value);
	
		rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
		
		Bloc = document.getElementById('labRGB' + i);
		Bloc.innerHTML = RVB[i] + ' ' + couleur;
		document.getElementById('RGB' + i).style.backgroundColor = rgb;
	
		red = Number(this.rngRGB1.value);
		green = Number(this.rngRGB2.value);
		blue = Number(this.rngRGB3.value);
	
		rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
	
		this.bcRGBTest.style.backgroundColor = rgb;
		this.bcRGBTest.style.color = this.texteNoirOuBlanc(red, green, blue);
	
		rgb += '<br>rgb(' 
				+ parseInt((red / 255) * 100, 10) + '%, ' 
				+ parseInt((green / 255) * 100, 10) + '%, ' 
				+ parseInt((blue / 255) * 100, 10)	+ '%)';
				
		this.bcRGB.innerHTML = rgb;
	},

	//---------------------------------------------------------------------
	// Changement des curseurs RGBA
	RGBAChange: function (i) {
		var RVB = [ '', 'Rouge', 'Vert', 'Bleu', 'Alpha' ], 
			red = 0, green = 0, blue = 0, alpha = 0, 
			couleur, rgb, rgba, ii;
	
		if (i == 1) red = couleur = Number(this.rngRGBA1.value);
		else if (i == 2) green = couleur = Number(this.rngRGBA2.value);
		else if (i == 3)  blue = couleur = Number(this.rngRGBA3.value);
		else alpha = couleur = Number(this.rngRGBA4.value);
		
		if (i != 4) {
			rgb = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
			document.getElementById('labRGBA' + i).innerHTML = RVB[i] + ' ' + couleur;
			document.getElementById('RGBA' + i).style.backgroundColor = rgb;
		}

		red = Number(this.rngRGBA1.value);
		green = Number(this.rngRGBA2.value);
		blue = Number(this.rngRGBA3.value);
		alpha = Number(this.rngRGBA4.value);
			
		rgba = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';

		if (i == 4) {
			document.getElementById('labRGBA4').innerHTML = RVB[i] + ' ' + couleur;
		}
		
		this.bcRGBATest.style.backgroundColor = rgba;
		this.bcRGBATest.style.color = this.texteNoirOuBlanc(red, green, blue);
	
		rgba += '<br>rgba(' 
				+ parseInt((red / 255) * 100, 10) + '%, ' 
				+ parseInt((green / 255) * 100, 10) + '%, ' 
				+ parseInt((blue / 255) * 100, 10)	+ '%, ' 
				+ parseInt(alpha * 100) + '%)';
				
		this.bcRGBA.innerHTML = '<span style="background: #fff; color: #000">' + rgba + '</span>';
		
		if (i != 4) {
			for (ii = 0, rgba = ''; ii < 1.1; ii += 0.2) {
				rgba += ',rgba(' + red + ', ' + green + ', ' + blue + ', ' + ii + ')';
			}
			rgba = FPL.prefixeCSS + 'linear-gradient(left' + rgba + ')';
			
			this.RGBA4.style.backgroundImage = rgba;
		}
	},
	
	//---------------------------------------------------------------------
	// Changement des curseurs HSL
	HSLChange: function(i) {
		// 1 => teinte
		// 2 => saturation
		// 3 => luminosité
		var HSL = [ '', 'Teinte', 'Saturation', 'Luminosité' ], 
			hue = 0, sat = 0, light = 0, 
			sTxt = '', sBackground = '',
			rgb;
		
		hue = Number(this.rngHSL1.value);
		sat = Number(this.rngHSL2.value);
		light = Number(this.rngHSL3.value);
		
		if (i == 1) sTxt = HSL[i] + ' ' + hue + '°';
		else if (i == 2) sTxt = HSL[i] + ' ' + sat + '%';
		else if (i == 3) sTxt = HSL[i] + ' ' + light + '%';
		
		document.getElementById('labHSL' + i).innerHTML = sTxt;

		sBackground = 'hsl(' + hue + ', ' + sat + '%, ' + light + '%)';
		rgb = this.hslToRgb(hue, sat, light);
		
		this.bcHSLTest.style.color = this.texteNoirOuBlanc(rgb[0], rgb[1], rgb[2]);
		this.bcHSLTest.style.background = sBackground;
		
		this.bcHSL.innerHTML = sBackground;
				
		if (i != 1) {
			return;
		}
		
		for (i = 0, sBackground = ''; i < 101; i += 20) {
			sBackground += ',hsla(' + hue + ', ' + i + '%, 50%, 1)';
		}
		sBackground = FPL.prefixeCSS + 'linear-gradient(left' + sBackground + ')';
		
		this.HSL2.style.backgroundImage = sBackground;

		for (i = 0, sBackground = ''; i < 101; i += 20) {
			sBackground += ',hsla(' + hue + ', 100%, ' + i + '%, 1)';
		}
		sBackground = FPL.prefixeCSS + 'linear-gradient(left' + sBackground + ')';
		
		this.HSL3.style.backgroundImage = sBackground;
	},

	//---------------------------------------------------------------------
	// Changement des curseurs HSLA
	HSLAChange: function(i) {
		// 1 => teinte
		// 2 => saturation
		// 3 => luminosité
		// 4 => alpha
		var HSLA = [ '', 'Teinte', 'Saturation', 'Luminosité', 'Alpha'], 
			hue = 0, sat = 0, light = 0, alpha = 0, 
			sTxt = '', sBackground = '',
			B, rgb, ii;
		
		hue = Number(this.rngHSLA1.value);
		sat = Number(this.rngHSLA2.value);
		light = Number(this.rngHSLA3.value);
		alpha = Number(this.rngHSLA4.value);
		
		if (i == 1) sTxt = HSLA[i] + ' ' + hue + '°';
		else if (i == 2) sTxt = HSLA[i] + ' ' + sat + '%';
		else if (i == 3) sTxt = HSLA[i] + ' ' + light + '%';
		else if (i == 4) sTxt = HSLA[i] + ' ' + alpha;
		
		document.getElementById('labHSLA' + i).innerHTML = sTxt;

		sBackground = 'hsla(' + hue + ', ' + sat + '%, ' + light + '%, ' + alpha +')';
		rgb = this.hslToRgb(hue, sat, light);
		
		this.bcHSLATest.style.color = this.texteNoirOuBlanc(rgb[0], rgb[1], rgb[2]);
		this.bcHSLATest.style.background = sBackground;
		
		this.bcHSLA.innerHTML = '<span style="background: #fff; color: #000">' + sBackground + '</span>';
		
		for (ii = 0, sBackground = ''; ii < 1.1; ii += 0.2) {
			sBackground += ',hsla(' + hue + ', ' + sat + '%, ' + light + '%, ' + ii + ')';
		}
		sBackground = FPL.prefixeCSS + 'linear-gradient(left' + sBackground + ')';
		
		this.HSLA4.style.backgroundImage = sBackground;
				
		if (i != 1) {
			return;
		}
		
		for (ii = 0, sBackground = ''; ii < 101; ii += 20) {
			sBackground += ',hsla(' + hue + ', ' + ii + '%, 50%, 1)';
		}
		sBackground = FPL.prefixeCSS + 'linear-gradient(left' + sBackground + ')';
		
		this.HSLA2.style.backgroundImage = sBackground;

		for (ii = 0, sBackground = ''; ii < 101; ii += 20) {
			sBackground += ',hsla(' + hue + ', 100%, ' + ii + '%, 1)';
		}
		sBackground = FPL.prefixeCSS + 'linear-gradient(left' + sBackground + ')';
		
		this.HSLA3.style.backgroundImage = sBackground;
	},
	
	//---------------------------------------------------------------------
	// Définit la couleur du texte suivant la couleur de fond
	texteNoirOuBlanc: function(red, green, blue) {
		var luminosite = (red * 299) + (green * 587) + (blue * 114);
		luminosite = luminosite / 255000;
	
		// valeur de 0 à 1
		return (luminosite >= 0.5) ? '#000' : '#fff';
	},
	
	//---------------------------------------------------------------------
	// Transformation décimal en hexadécimal
	decToHexa: function(n) {
		var s = n.toString(16).toUpperCase();
		return ((s.length == 1) ? '0' : '') + s;
	},
	
	//---------------------------------------------------------------------
	// Transformation d'une couleur rgb en hsl
	rgbToHsl: function(red, green, blue) {
		var max, min, d, hue, sat = 0;
	
		red /= 255;
		green /= 255;
		blue /= 255;
	
		max = Math.max(red, green, blue);
		min = Math.min(red, green, blue);
		light = (max + min) / 2;
	
		if (max == min) {
			hue = sat = 0; // achromatic
			//return [ hue, sat, light ];	
			hue = Math.floor(hue * 360);
			sat = Math.floor(sat * 100);
			light = Math.floor(light * 100);
			return 'hsl(' + hue + ', ' + sat + '%,' + light + '%)'; //==>> RETURN
		}
	
		d = max - min;
	
		sat = (light > 0.5) ? d / (2 - max - min) : d / (max + min);
	
		if (max == red) {
			hue = (green - blue) / d + (green < blue ? 6 : 0);
		} else if (max == green) {
			hue = (blue - red) / d + 2;
		} else if (max == blue) {
			hue = (red - green) / d + 4;
		}
	
		hue /= 6;
	
		//return [ hue, sat, light ];
		hue = Math.floor(hue * 360);
		sat = Math.floor(sat * 100);
		light = Math.floor(light * 100);
		return 'hsl(' + hue + ', ' + sat + '%,' + light + '%)';
	},
	
	//---------------------------------------------------------------------
	// Transformation d'une couleur hsl en rgb
	hslToRgb: function(hue, sat, light) {
		var red, green, blue;
		
		hue = hue / 360;
		sat = sat / 100;
		light = light / 100;
		
		if (sat == 0) {
			red = green = blue = light; // achromatic
		} else {
			var q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
			var p = 2 * light - q;
			 
			red = this.hue2rgb(p, q, hue + 1/3);
			green = this.hue2rgb(p, q, hue);
			blue = this.hue2rgb(p, q, hue - 1/3);
		}
		 
		//return [ red * 255, green * 255, blue * 255 ];
		
		red = Math.floor(red * 255);
		green = Math.floor(green * 255);
		blue = Math.floor(blue * 255);
		return [red, green, blue];
	},
	
	hue2rgb: function(p, q, t) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1/6) return p + (q - p) * 6 * t;
		if (t < 1/2) return q;
		if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
		return p;
	}

}; // FIN OBJET FPL
	
	
	
(function() {
	var i, H, aMax, aVal, aStep, sBackground = '';

	if(navigator.userAgent.indexOf("Chrome") > -1) {
	    FPL.prefixeCSS = '-webkit-';
	} else if (navigator.userAgent.indexOf("Safari") > -1) {
	    FPL.prefixeCSS = '-webkit-';
	} else if (navigator.userAgent.indexOf("Opera") > -1) {
	    FPL.prefixeCSS = '-o-';
	} else if (navigator.userAgent.indexOf("Firefox") > -1) {
	    FPL.prefixeCSS = '-moz-';
	} else if (navigator.userAgent.indexOf("MSIE") > -1) {
	    FPL.prefixeCSS = '-ms-';
	}
	
	// Génération des blocs pour test Hexadecimal
	// les oninput sont pour html5slider.js, le polyfill Firefox 
	
	aVal = [-1, 255, 239, 128];

	for (i = 1; i < 4; i++) {
		H = '<label id="labHEX' + i + '"></label>'
			+ '<div class="val-min-max" style="text-align:right">00</div>'
			+ '<div id="HEX' + i + '" class="bcTest-couleur">'
				+ '<input type="range" id="rngHEX' + i + '" min="0" max="255" '
				+ 'step="1" value="' + aVal[i] + '" onchange="FPL.HEXChange(' + i + ')" oninput="FPL.HEXChange(' + i + ')">'
			+ '</div>'
			+ '<div class="val-min-max">FF</div>';

		document.getElementById('bcHEX' + i).innerHTML = H;
	}
	
	// Génération des blocs pour test RGB
	
	aVal = [-1, 255, 239, 128];
	
	for (i = 1; i < 4; i++) {
		H = '<label id="labRGB' + i + '"></label>'
			+ '<div class="val-min-max" style="text-align:right">0</div>'
			+ '<div id="RGB' + i + '" class="bcTest-couleur">'
				+ '<input type="range" id="rngRGB' + i + '" min="0" max="255" '
				+ 'step="1" value="' + aVal[i] + '" onchange="FPL.RGBChange(' + i + ')" oninput="FPL.RGBChange(' + i + ')">'
			+ '</div>'
			+ '<div class="val-min-max">255</div>';

		document.getElementById('bcRGB' + i).innerHTML = H;
	}

	
	// Génération des blocs pour test RGBA
		
	aMax = [-1, 255, 255, 255, 1];
	aVal = [-1, 255, 239, 128, 0.75];
	aStep = [-1, 1, 1, 1, 0.01];

	for (i = 1; i < 5; i++) {
		H = '<label id="labRGBA' + i + '"';
		if (i == 4) {
			H += ' style="background: #FFF"';
		}
		H += '></label>'
			+ '<div class="val-min-max" style="text-align:right">0</div>'
			+ '<div id="RGBA' + i + '" class="bcTest-couleur">'
				+ '<input type="range" id="rngRGBA' + i + '" min="0" max="' + aMax[i] + '" '
				+ 'step="' + aStep[i] + '" value="' + aVal[i] + '" onchange="FPL.RGBAChange(' + i + ')" oninput="FPL.RGBAChange(' + i + ')">'
			+ '</div>'
			+ '<div class="val-min-max">' + aMax[i]+ '</div>';

		document.getElementById('bcRGBA' + i).innerHTML = H;
	}
						
	// Génération des blocs pour test HSL

	aMax = [-1, 360, 100, 100];
	aVal = [-1, 52, 100, 75];

	for (i = 1; i < 4; i++) {
		H = '<label id="labHSL' + i + '"></label>'
			+ '<div class="val-min-max" style="text-align:right">0</div>'
			+ '<div id="HSL' + i + '" class="bcTest-couleur">'
				+ '<input type="range" id="rngHSL' + i + '" min="0" max="' + aMax[i] + '" '
				+ 'step="1" value="' + aVal[i] + '" onchange="FPL.HSLChange(' + i + ')" oninput="FPL.HSLChange(' + i + ')">'
			+ '</div>'
			+ '<div class="val-min-max">' + aMax[i]+ '</div>';

		document.getElementById('bcHSL' + i).innerHTML = H;
	}
		
	for (i = 0, sBackground = ''; i < 361; i += 10) {
		sBackground += ',hsla(' + i + ', 100%, 50%, 1)';
	}
	sBackground = FPL.prefixeCSS + 'linear-gradient(left' + sBackground + ')';
	
	document.getElementById('HSL1').style.backgroundImage = sBackground;
	
						
	// Génération des blocs pour test HSLA

	aMax = [-1, 360, 100, 100, 1];
	aVal = [-1, 52, 100, 75, 0.7];
	aStep = [-1, 1, 1, 1, 0.01];
	
	for (i = 1; i < 5; i++) {
		H = '<label id="labHSLA' + i + '"';
		if (i == 4) {
			H += ' style="background: #FFF"';
		}
		H += '></label>'
			+ '<div class="val-min-max" style="text-align:right">0</div>'
			+ '<div id="HSLA' + i + '" class="bcTest-couleur">'
				+ '<input type="range" id="rngHSLA' + i + '" min="0" max="' + aMax[i] + '" '
				+ 'step="' + aStep[i] + '" value="' + aVal[i] + '" onchange="FPL.HSLAChange(' + i + ')" oninput="FPL.HSLAChange(' + i + ')">'
			+ '</div>'
			+ '<div class="val-min-max">' + aMax[i]+ '</div>';

		document.getElementById('bcHSLA' + i).innerHTML = H;
	}
		
	for (i = 0, sBackground = ''; i < 361; i += 10) {
		sBackground += ',hsla(' + i + ', 100%, 50%, 1)';
	}
	sBackground = FPL.prefixeCSS + 'linear-gradient(left' + sBackground + ')';
	
	document.getElementById('HSLA1').style.backgroundImage = sBackground;
	


	// Init ref blocs
	FPL.rngHEX1 = document.getElementById('rngHEX1');
	FPL.rngHEX2 = document.getElementById('rngHEX2');
	FPL.rngHEX3 = document.getElementById('rngHEX3');
	FPL.bcHEXTest = document.getElementById('bcHEXTest');
	FPL.bcHEX = document.getElementById('bcHEX');
	FPL.HEX1 = document.getElementById('HEX1');
	FPL.HEX2 = document.getElementById('HEX2');
	FPL.HEX3 = document.getElementById('HEX3');
	
	FPL.rngRGB1 = document.getElementById('rngRGB1');
	FPL.rngRGB2 = document.getElementById('rngRGB2');
	FPL.rngRGB3 = document.getElementById('rngRGB3');
	FPL.bcRGBTest = document.getElementById('bcRGBTest');
	FPL.bcRGB = document.getElementById('bcRGB');
	FPL.RGB1 = document.getElementById('RGB1');
	FPL.RGB2 = document.getElementById('RGB2');
	FPL.RGB3 = document.getElementById('RGB3');

	FPL.rngRGBA1 = document.getElementById('rngRGBA1');
	FPL.rngRGBA2 = document.getElementById('rngRGBA2');
	FPL.rngRGBA3 = document.getElementById('rngRGBA3');
	FPL.rngRGBA4 = document.getElementById('rngRGBA4');
	FPL.bcRGBATest = document.getElementById('bcRGBATest');
	FPL.bcRGBA = document.getElementById('bcRGBA');
	FPL.RGBA1 = document.getElementById('RGBA1');
	FPL.RGBA2 = document.getElementById('RGBA2');
	FPL.RGBA3 = document.getElementById('RGBA3');
	FPL.RGBA4 = document.getElementById('RGBA4');

	FPL.rngHSL1 = document.getElementById('rngHSL1');
	FPL.rngHSL2 = document.getElementById('rngHSL2');
	FPL.rngHSL3 = document.getElementById('rngHSL3');
	FPL.bcHSLTest = document.getElementById('bcHSLTest');
	FPL.bcHSL = document.getElementById('bcHSL');
	FPL.HSL1 = document.getElementById('HSL1');
	FPL.HSL2 = document.getElementById('HSL2');
	FPL.HSL3 = document.getElementById('HSL3');

	FPL.rngHSLA1 = document.getElementById('rngHSLA1');
	FPL.rngHSLA2 = document.getElementById('rngHSLA2');
	FPL.rngHSLA3 = document.getElementById('rngHSLA3');
	FPL.rngHSLA4 = document.getElementById('rngHSLA4');
	FPL.bcHSLATest = document.getElementById('bcHSLATest');
	FPL.bcHSLA = document.getElementById('bcHSLA');
	FPL.HSLA1 = document.getElementById('HSLA1');
	FPL.HSLA2 = document.getElementById('HSLA2');
	FPL.HSLA3 = document.getElementById('HSLA3');
	FPL.HSLA4 = document.getElementById('HSLA4');
	
	// Affichage des blocs
	for (i = 1; i < 4; i++) {
		FPL.HEXChange(i);
		FPL.RGBChange(i);
		FPL.RGBAChange(i);
		FPL.HSLChange(i);
		FPL.HSLAChange(i);
	}
	
	FPL.RGBAChange(4);
	FPL.HSLAChange(4);
			
	FPL.bcHEXTest.style.visibility = 'visible';
	FPL.bcRGBTest.style.visibility = 'visible';
	FPL.bcRGBATest.style.visibility = 'visible';
	FPL.bcHSLTest.style.visibility = 'visible';	
	FPL.bcHSLATest.style.visibility = 'visible';	
})();