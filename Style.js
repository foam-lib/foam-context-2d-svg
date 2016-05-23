export const DefaultStyle = Object.freeze({
    fillStyle : null,
    fillRule : null,
    fillOpacity: null,
    strokeStyle : null,
    strokeOpacity: null,
    lineWidth : null,
    lineCap : null,
    lineJoin : null,
    miterLimit : null,
    lineDash : null,
    dashOffset : null
});

export const DefaultStyleText = Object.freeze({
    fillStyle : null,
    fillRule : null,
    fillOpacity: null,
    strokeStyle : null,
    strokeOpacity: null,
    lineWidth : null,
    lineCap : null,
    lineJoin : null,
    miterLimit : null,
    lineDash : null,
    dashOffset : null,
    fontFamily: null,
    fontStyle: null,
    fontWeight: null,
    fontStretch: null,
    fontSize:null,
    letterSpacing: null,
    underlinePosition: null,
    underlineThickness: null,
    strikethroughPosition: null,
    strikethroughThickness: null,
    overlinePosition: null,
    overlineThickness: null
});

export const LineCap = Object.freeze({
    BUTT : 'butt',
    ROUND : 'round',
    SQUARE : 'square'
});

export const StyleSvgStyleMap = Object.freeze({
    fillStyle : 'fill',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    strokeStyle : 'stroke',
    strokeOpacity: 'stroke-opacity',
    lineWidth : 'stroke-width',
    lineCap: 'stroke-linecap',
    lineJoin: 'stroke-linejoin',
    miterLimit: 'stroke-miterlimit',
    lineDash: 'stroke-dasharray',
    dashOffset : 'stroke-dashoffset',
    fontFamily: 'font-family',
    fontStyle: 'font-style',
    fontWeight: 'font-weight',
    fontStretch: 'font-stretch',
    fontSize: 'font-size',
    letterSpacing: 'letter-spacing',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness'
});

const _StyleStyleSvgMap = {};
for(var key in StyleSvgStyleMap){
    _StyleStyleSvgMap[StyleSvgStyleMap[key]] = key;
}

export const StyleStyleSvgMap = _StyleStyleSvgMap;