import {createSvgObject} from './SvgCmd';
import {
    DefaultStyle,
    StyleSvgStyleMap,
    StyleStyleSvgMap,
    LineCap
} from './Style';
import * as Vec2 from 'foam-math/Vec2';
import SvgGradientBase from './SvgGradientBase';
import SvgPattern from './SvgPattern';
import SvgElementTransform from './SvgElementTransform';

export default class SvgElementStyleable extends SvgElementTransform{
    constructor(type,description){
        super(type);

        this._style = {};
        for(var key in DefaultStyle){
            this._style[key] = DefaultStyle[key];
        }

        this.set(description);
    }

    _setStylePropertyNonArray(key,value){
        const styleKey = StyleStyleSvgMap[key];
        if(styleKey === undefined){
            throw new Error(`Invalid style property '${key}'.`);
        }
        this._style[styleKey] = value;
        if(value === null){
            this._element.removeAttribute(key);
            return;
        }
        this._element.setAttribute(key,value);
    }

    _setStylePropertyArray(key,value){
        this._setStylePropertyNonArray(key,value.slice(0));
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // style
    /*----------------------------------------------------------------------------------------------------------------*/

    getStyle(){
        const copy = {};
        for(let key in this._style){
            let value = this._style[key];
            if(value === null){
                continue;
            }
            value = Array.isArray(value) ? value.slice(0) : value;
            copy[key] = this._style[key];
        }
        return copy;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // stroke properties
    /*----------------------------------------------------------------------------------------------------------------*/

    setStrokeStyle(strokeStyle){
        if(strokeStyle === null){
            this._style.strokeStyle = null;
            this._element.removeAttribute('stroke');
            return;
        } else if(strokeStyle instanceof SvgGradientBase || strokeStyle instanceof SvgPattern){
            strokeStyle = `url(#${strokeStyle._id})`;
        }
        this._style.strokeStyle = strokeStyle;
        this._element.setAttribute('stroke',strokeStyle);
    }

    getStrokeStyle(){
        return this._style.strokeStyle;
    }

    setStrokeOpacity(opacity){
        this._setStylePropertyNonArray(StyleSvgStyleMap.opacity,opacity);
    }

    getStrokeOpacity(){
        return this._style.strokeOpacity;
    }

    setLineWidth(lineWidth){
        this._setStylePropertyNonArray(StyleSvgStyleMap.lineWidth,lineWidth);
    }

    getLineWidth(){
        return this._style.lineWidth;
    }

    setLineCap(lineCap){
        this._setStylePropertyNonArray(StyleSvgStyleMap.lineCap,lineCap);
    }

    getLineCap(){
        return this._style.lineCap;
    }

    setLineJoin(lineJoin){
        this._setStylePropertyNonArray(StyleSvgStyleMap.lineJoin,lineJoin);
    }

    getLineJoin(){
        return this._style.lineJoin;
    }

    setMiterLimit(miterLimit){
        this._setStylePropertyNonArray(StyleSvgStyleMap.miterLimit,miterLimit);
    }

    getMiterLimit(){
        return this._style.miterLimit;
    }

    setLineDash(lineDash){
        this._setStylePropertyArray(StyleSvgStyleMap.lineDash,lineDash);
    }

    getLineDash(){
        return this._style.lineDash;
    }

    setDashOffset(offset){
        this._setStylePropertyNonArray(StyleSvgStyleMap.dashOffset,offset);
    }

    getDashOffset(){
        return this._style.dashOffset;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // fill properties
    /*----------------------------------------------------------------------------------------------------------------*/

    setFillStyle(fillStyle){
        if(fillStyle === null){
            this._style.fillStyle = null;
            this._element.removeAttribute('fill');
            return;
        } else if(fillStyle instanceof SvgGradientBase || fillStyle instanceof SvgPattern){
            fillStyle = `url(#${fillStyle._id})`;
        }
        this._style.fillStyle = fillStyle;
        this._element.setAttribute('fill',fillStyle);
    }

    getFillStyle(){
        return this._style.fillStyle;
    }

    setFillOpacity(opacity){
        this._setStylePropertyNonArray(StyleSvgStyleMap.fillOpacity,opacity);
    }

    getFillOpacity(){
        return this._style.fillOpacity;
    }

    setFillRule(fillRule){
        this._setStylePropertyNonArray(StyleSvgStyleMap.fillRule,fillRule);
    }

    getFillRule(){
        return this._style.fillRule;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // set
    /*----------------------------------------------------------------------------------------------------------------*/

    set(description_or_SvgElementStyleable){
        if(!description_or_SvgElementStyleable){
            return;
        }
        super.set(description_or_SvgElementStyleable);

        if(description_or_SvgElementStyleable instanceof SvgElementStyleable){
            const element = description_or_SvgElementStyleable;
            for(let key in element._style){
                const value = element._style[key];
                const svgKey = StyleSvgStyleMap[key];
                if(Array.isArray(value)){
                    this._setStylePropertyArray(svgKey,value);
                } else {
                    this._setStylePropertyNonArray(svgKey,value);
                }
            }
            return;
        }

        const description = description_or_SvgElementStyleable;

        //stroke
        if(description.strokeStyle !== undefined){
            this.setStrokeStyle(description.strokeStyle);
        }
        if(description.strokeOpacity !== undefined){
            this.setStrokeOpacity(description.strokeOpacity);
        }

        //fill
        if(description.fillStyle !== undefined){
            this.setFillStyle(description.fillStyle);
        }
        if(description.fillRule !== undefined){
            this.setFillRule(description.fillRule);
        }
        if(description.fillOpacity !== undefined){
            this.setFillOpacity(description.fillOpacity);
        }

        //line
        if(description.lineWidth !== undefined){
            this.setLineWidth(description.lineWidth);
        }
        if(description.lineCap !== undefined){
            this.setLineCap(description.lineCap);
        }
        if(description.lineJoin !== undefined){
            this.setLineJoin(description.lineJoin);
        }
        if(description.miterLimit !== undefined){
            this.setMiterLimit(description.miterLimit);
        }
        if(description.lineDash !== undefined){
            this.setLineDash(description.lineDash);
        }
        if(description.dashOffset !== undefined){
            this.setDashOffset(description.dashOffset);
        }
    }
}