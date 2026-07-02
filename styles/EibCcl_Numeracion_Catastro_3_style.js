
function obtenerColorTextoDesdeRGBA(colorStr) {
    // Esta expresi�n regular captura los 3 primeros grupos de n�meros ignorando los espacios y el Alpha
    const coincidencias = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    
    if (!coincidencias) {
        return '#000000'; // Color de seguridad por si el string viene corrupto
    }

    // Convertimos las capturas a n�meros enteros
    const r = parseInt(coincidencias[1], 10);
    const g = parseInt(coincidencias[2], 10);
    const b = parseInt(coincidencias[3], 10);

    // Aplicamos la f�rmula YIQ
    const luminosidad = (r * 299 + g * 587 + b * 114) / 1000;

    // Si la puntuaci�n es alta (borde claro) -> texto negro. Si es baja (borde oscuro) -> texto blanco.
    return luminosidad >= 128 ? '#000000' : '#FFFFFF';
}

// =========================================================================
// ESTILO 1: PARA EL GRUPO DE ESTADO DE CONSERVACI�N
// =========================================================================
function estiloGrupoConservacion(feature, resolution) {
    var valueNUM = feature.get('ENA_N1_00') || '';
        var valueLETRA = feature.get("ENA_L1_00") || '';
    var estado = feature.get('ESTADOS_CONS_Estado_Conservacion');
    var numero = valueNUM + valueLETRA;
/*    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }    */
    // Asignamos un color de reborde seg�n el estado de conservaci�n
    var colorBorde = "rgba(0,0,0,1.000)"; // Por defecto negro
    if (estado === 'Bueno')   colorBorde = "rgba(44, 160, 44,1.000)";  
    if (estado === 'Regular') colorBorde = "rgba(255, 127, 0,1.000)";  
    if (estado === 'Malo')    colorBorde = "rgba(227, 26, 28,1.000)";  
    if (estado === 'Ruina')   colorBorde = "rgba(152, 78, 163,1.000)"; 

    // Calculamos el color del interior (blanco o negro) seg�n la claridad del borde
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde); 

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}

// =========================================================================
// ESTILO 2: PARA EL GRUPO DE TIPO DE NUMERACI�N
// =========================================================================
function estiloGrupoTipo(feature, resolution) {
    var valueNUM = feature.get('ENA_N1_00') || '';
    var valueLETRA = feature.get("ENA_L1_00") || '';
    var valueCODVIA = feature.get('ENA_CV_00');
    var numero = valueNUM + valueLETRA;

    // Aquí usamos otra paleta de colores completamente distinta para el reborde

    var colorBorde = obtenerColorPorVia(valueCODVIA);
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde);

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}



function obtenerColorPorVia(valueCODVIA) {
    // Diccionario de colores (más rápido y limpio que un switch gigante)
    const mapaColores = {

'10':'rgba(160,42,214,0.494)',
'11':'rgba(104,177,237,0.494)',
'12': 'rgba(225,126,111,0.494)',
'13': 'rgba(80,71,206,0.494)',
'15': 'rgba(155,106,208,0.494)',
'16': 'rgba(231,121,220,0.494)',
'17': 'rgba(239,232,24,0.494)',
'19': 'rgba(129,204,76,0.494)',
'2': 'rgba(208,101,131,0.494)',
'21': 'rgba(91,183,214,0.494)',
'22': 'rgba(185,204,92,0.494)',
'23': 'rgba(163,208,86,0.494)',
'24': 'rgba(222,179,50,0.494)',
'25': 'rgba(201,76,85,0.494)',
'26': 'rgba(72,91,216,0.494)',
'27': 'rgba(20,211,61,0.494)',
'28': 'rgba(76,223,35,0.494)',
'29': 'rgba(221,93,235,0.494)',
'3': 'rgba(236,68,185,0.494)',
'30': 'rgba(13,255,7,0.494)',
'31': 'rgba(58,214,123,0.494)',
'33': 'rgba(17,201,170,0.494)',
'34': 'rgba(34,233,34,0.494)',
'36': 'rgba(145,120,208,0.494)',
'5': 'rgba(232,119,62,0.494)',
'6': 'rgba(103,201,204,0.494)',
'7': 'rgba(85,129,209,0.494)',
'8': 'rgba(238,157,59,0.494)',


'0': 'rgba(75,73,232,1.0)',
'102': 'rgba(154,214,63,1.0)',
'108': 'rgba(61,169,129,1.0)',
'113': 'rgba(98,191,222,1.0)',
'120': 'rgba(27,24,171,1.0)',
'126': 'rgba(240,240,117,1.0)',
'132': 'rgba(13,180,21,1.0)',
'133': 'rgba(56,222,147,1.0)',
'134': 'rgba(66,198,19,1.0)',
'5001': 'rgba(244,33,54,1.0)',
'5002': 'rgba(214,187,36,1.0)',
'5003': 'rgba(61,121,190,1.0)',
'5004': 'rgba(161,199,121,1.0)',
'5005': 'rgba(199,215,26,1.0)',
'5006': 'rgba(112,192,21,1.0)',
'5007': 'rgba(19,68,245,1.0)',
'5009': 'rgba(86,169,168,1.0)',
'5010': 'rgba(133,160,38,1.0)',
'5011': 'rgba(183,190,47,1.0)',
'5012': 'rgba(77,138,63,1.0)',
'5013': 'rgba(229,40,144,1.0)',
'5014': 'rgba(23,230,29,1.0)',
'5015': 'rgba(173,230,82,1.0)',
'5016': 'rgba(179,101,49,1.0)',
'5017': 'rgba(171,91,127,1.0)',
'5018': 'rgba(150,218,81,1.0)',
'5019': 'rgba(187,15,184,1.0)',
'5020': 'rgba(35,153,82,1.0)',
'5021': 'rgba(142,79,114,1.0)',
'5022': 'rgba(25,18,132,1.0)',
'5023': 'rgba(162,201,95,1.0)',
'5024': 'rgba(151,89,157,1.0)',
'5025': 'rgba(130,75,65,1.0)',
'5026': 'rgba(33,131,158,1.0)',
'5027': 'rgba(65,131,134,1.0)',
'5028': 'rgba(249,171,35,1.0)',
'5029': 'rgba(148,47,14,1.0)',
'5030': 'rgba(231,178,44,1.0)',
'5031': 'rgba(151,109,225,1.0)',
'5032': 'rgba(65,65,194,1.0)',
'5033': 'rgba(140,41,162,1.0)',
'5034': 'rgba(69,103,217,1.0)',
'5035': 'rgba(182,117,108,1.0)',
'5036': 'rgba(71,112,133,1.0)',
'5037': 'rgba(222,111,232,1.0)',
'5038': 'rgba(134,24,198,1.0)',
'5039': 'rgba(57,193,154,1.0)',
'5040': 'rgba(241,90,26,1.0)',
'5055': 'rgba(138,28,234,1.0)',
'5065': 'rgba(45,119,238,1.0)',
'5066': 'rgba(20,66,193,1.0)',
'5067': 'rgba(50,235,47,1.0)'


    };

    // Forzamos conversión a String para asegurar coincidencia exacta de la propiedad
    const clave = String(valueCODVIA);

    // Retorna el color del mapa. Si no se encuentra, aplica el default (negro)
    return mapaColores[clave] || 'rgba(255,255,255,1.000)';
}




var size = 0;
var placement = 'point';

var style_EibCcl_Numeracion_Catastro_3 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var valueCODVIA = feature.get("ENA_CV_00");
    var valueSGVIA = feature.get("EibCcl_Callejero_eibTipVia");
    var valueNOMVIA = feature.get("EibCcl_Callejero_eibNomVia");
    var nombreNUCLEO = String(valueCODVIA + " - " + valueSGVIA + " / " + valueNOMVIA)
    var valueNUM = feature.get("ENA_N1_00");
    var valueLETRA = feature.get("ENA_L1_00");
    var valueTIPO = feature.get("EN1_TIPO");
    var valueESTCONS = feature.get("ESTADOS_CONS_Estado_Conservacion");
    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }
/*    var labelFont = "bold 13px sans-serif";
    var labelFill = "#000000";
    var circleFill = "#4fc3f7";
    var bufferColor = "#aaaaaa";
    if (valueTIPO == "00_N1") {
    	circleFill = "#0d47a1";
    }
    if (valueESTCONS == "Bueno") {
    	bufferColor = "#2ca02c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Regular") {
    bufferColor = "#ff7f00";
    labelFill = "#ffffff"
    }
    if (valueESTCONS == "Malo") {
    	bufferColor = "#e31a1c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Ruina") {
    	bufferColor = "#984ea3";
    	labelFill = "#ffffff"
    }
*/
    
    var bufferWidth = 7;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String(valueNUM + valueLETRA);
    }
    var radioCirculo = 12;
    
   
    
/*        var style = [ 
        new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            displacement: [offsetX, offsetY],
            stroke: new ol.style.Stroke({
            color: circleFill,
            width: 3.5
        })
        })
    }),
    new ol.style.Style({
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
    })];;
*/


/*
switch(String(valueCODVIA)) {

case '60': circleFill = 'rgba(255,96,17,1.0)'; break;
case '85': circleFill = 'rgba(221,237,127,1.0)'; break;
case '94': circleFill = 'rgba(136,111,225,1.0)'; break;
case '95': circleFill = 'rgba(203,199,80,1.0)'; break;
case '98': circleFill = 'rgba(109,230,48,1.0)'; break;
case '101': circleFill = 'rgba(135,211,55,1.0)'; break;
case '103': circleFill = 'rgba(236,178,79,1.0)'; break;
case '105': circleFill = 'rgba(215,62,41,1.0)'; break;
case '107': circleFill = 'rgba(224,25,171,1.0)'; break;
case '108': circleFill = 'rgba(71,153,200,1.0)'; break;
case '109': circleFill = 'rgba(182,114,207,1.0)'; break;
case '111': circleFill = 'rgba(77,123,239,1.0)'; break;
case '112': circleFill = 'rgba(205,171,35,1.0)'; break;
case '114': circleFill = 'rgba(102,213,79,1.0)'; break;
case '115': circleFill = 'rgba(18,200,18,1.0)'; break;
case '120': circleFill = 'rgba(102,202,227,1.0)'; break;
case '121': circleFill = 'rgba(18,116,228,1.0)'; break;
case '5002': circleFill = 'rgba(240,125,80,1.0)'; break;
case '5003': circleFill = 'rgba(231,121,24,1.0)'; break;
case '5004': circleFill = 'rgba(78,70,214,1.0)'; break;
case '5005': circleFill = 'rgba(237,122,225,1.0)'; break;
case '5006': circleFill = 'rgba(14,223,87,1.0)'; break;
case '5007': circleFill = 'rgba(33,220,161,1.0)'; break;
case '5008': circleFill = 'rgba(208,118,123,1.0)'; break;
case '5009': circleFill = 'rgba(129,141,233,1.0)'; break;
case '5010': circleFill = 'rgba(125,72,203,1.0)'; break;
case '5011': circleFill = 'rgba(216,81,135,1.0)'; break;
case '5016': circleFill = 'rgba(107,234,173,1.0)'; break;
case '5017': circleFill = 'rgba(134,18,222,1.0)'; break;
case '5018': circleFill = 'rgba(233,92,172,1.0)'; break;
case '5019': circleFill = 'rgba(156,215,28,1.0)'; break;
case '5020': circleFill = 'rgba(67,237,95,1.0)'; break;
case '5021': circleFill = 'rgba(212,44,227,1.0)'; break;
case '5022': circleFill = 'rgba(87,200,204,1.0)'; break;

    case '123': circleFill = 'rgba(179,48,240,1.000)'; break;
    case '24': circleFill = 'rgba(239,81,94,1.000)'; break;
    case '26': circleFill = 'rgba(168,237,31,1.000)'; break;
    case '49': circleFill = 'rgba(37,40,211,1.000)'; break;
    case '50': circleFill = 'rgba(61,204,166,1.000)'; break;
    case '5001': circleFill = 'rgba(127,200,54,1.000)'; break;
    case '5021': circleFill = 'rgba(93,234,222,1.000)'; break;
    case '51': circleFill = 'rgba(191,216,51,1.000)'; break;
    case '53': circleFill = 'rgba(38,226,145,1.000)'; break;
    case '55': circleFill = 'rgba(121,232,145,1.000)'; break;
    case '57': circleFill = 'rgba(219,29,143,1.000)'; break;
    case '58': circleFill = 'rgba(96,27,234,1.000)'; break;
    case '59': circleFill = 'rgba(110,175,229,1.000)'; break;
    case '60': circleFill = 'rgba(198,72,217,1.000)'; break;
    case '62': circleFill = 'rgba(133,119,202,1.000)'; break;
    case '64': circleFill = 'rgba(106,215,87,1.000)'; break;
    case '65': circleFill = 'rgba(232,68,197,1.000)'; break;
    case '67': circleFill = 'rgba(210,65,128,1.000)'; break;
    case '69': circleFill = 'rgba(201,109,75,1.000)'; break;
    case '7': circleFill = 'rgba(115,229,159,1.000)'; break;
    case '71': circleFill = 'rgba(202,84,71,1.000)'; break;
    case '76': circleFill = 'rgba(224,222,79,1.000)'; break;
    case '78': circleFill = 'rgba(25,152,202,1.000)'; break;
    case '79': circleFill = 'rgba(122,159,223,1.000)'; break;
    case '80': circleFill = 'rgba(236,200,58,1.000)'; break;
    case '83': circleFill = 'rgba(45,199,216,1.000)'; break;
    case '85': circleFill = 'rgba(212,23,70,1.000)'; break;
    case '86': circleFill = 'rgba(227,160,53,1.000)'; break;
    case '87': circleFill = 'rgba(231,129,228,1.000)'; break;
    case '88': circleFill = 'rgba(154,95,209,1.000)'; break;
    case '89': circleFill = 'rgba(51,234,57,1.000)'; break;
    case '90': circleFill = 'rgba(83,106,207,1.000)'; break;
    case '91': circleFill = 'rgba(88,233,20,1.000)'; break;
    default: circleFill = 'rgba(0,0,0,1.000)'; break;
}
*/


var style = [ 

/*
            // 1. EL C�RCULO
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radioCirculo,
                    displacement: [offsetX, offsetY], // Tu desplazamiento original del c�rculo
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: 3.5
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 0, 0)' // Centro totalmente transparente para ver el texto
                    })
                })
            }),
*/
            
            // 2. EL TEXTO PERFECTAMENTE CENTRADO
            new ol.style.Style({
                text: new ol.style.Text({
                    text: labelText,
                    font: labelFont,
                    fill: new ol.style.Fill({
                        color: obtenerColorTextoDesdeRGBA(circleFill)
                    }),
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: bufferWidth
                    }),
                    
                    // =========================================================
                    // LAS 4 PROPIEDADES CLAVE PARA EL CENTRADO ABSOLUTO
                    // =========================================================
                    textAlign: 'center',     // Fuerza el centro horizontal del texto
                    textBaseline: 'middle',  // Fuerza el centro vertical del texto
                    offsetX: offsetX,        // Sigue al c�rculo en el eje X
                    offsetY: -offsetY,       // Sigue al c�rculo en el eje Y (OpenLayers invierte el signo Y en el texto respecto a displacement)
                    // =========================================================
                    
                    placement: placement
                })
            })
        ];
    

    return style;
};
