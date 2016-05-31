import {
    createSvgObject
} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';

import SvgEffectColorMatrix from './SvgEffectColorMatrix';
import SvgEffectBlend from './SvgEffectBlend';
import SvgEffectGaussianBlur from './SvgEffectGaussianBlur';

import * as Vec2 from 'foam-math/Vec2';

let id = 0;
export default class SvgFilter {
    constructor(description_or_SvgFilter){
        this._id = `filter-${id++}`;
        this._element = createSvgObject(SvgType.FILTER);
        this._element.setAttribute('id',this._id);
        this._position = [0,0];
        this._size = [null,null];
        this._effects = [];

        SvgDef.appendElement(this);
        this.set(description_or_SvgFilter);
    }

    copy(){
        return new SvgFilter(this);
    }

    _addEffect(effect){
        this._effects.push(effect);
        this._element.appendChild(effect._element);
        return effect;
    }

    setPosition(position){
        this.setPosition2(position[0],position[1]);
    }

    setPosition2(x,y){
        this.setPositionX(x);
        this.setPositionY(y);
    }

    setPositionX(x){
        this._position[0] = x;
        this._element.setAttribute('x',x);
    }

    setPositionY(y){
        this._position[1] = y;
        this._element.setAttribute('y',y);
    }

    getPositionX(){
        return this._position[0];
    }

    getPositionY(){
        return this._position[1];
    }

    getPosition(out){
        return Vec2.set(out || Vec2.create(),this._position);
    }

    setSize(size){
        this.setSize2(size[0],size[1]);
    }

    setSize2(width,height){
        this.setWidth(width);
        this.setHeight(height);
    }

    setWidth(width){
        this._size[0] = width;
        this._element.setAttribute('width',width);
    }

    setHeight(height){
        this._size[1] = height;
        this._element.setAttribute('height',height);
    }

    getWidth(){
        return this._size[0];
    }

    getHeight(){
        return this._size[1];
    }

    getSize(out){
        return Vec2.set(out || Vec2.create(),this._size);
    }

    getEffects(){
        return this._effects;
    }

    createColorMatrix(description_or_SvgEffectColorMatrix){
        return this._addEffect(new SvgEffectColorMatrix(description_or_SvgEffectColorMatrix));
    }

    createBlend(description_or_SvgEffectBlend){
        return this._addEffect(new SvgEffectBlend(description_or_SvgEffectBlend));
    }

    createGaussianBlur(description_or_SvgEffectGaussianBlur){
        return this._addEffect(new SvgEffectGaussianBlur(description_or_SvgEffectGaussianBlur));
    }

    set(description_or_SvgFilter){
        if(!description_or_SvgFilter){
            return;
        }
        if(description_or_SvgFilter instanceof SvgFilter){
            const element = description_or_SvgFilter;
            this.setPosition(element._position);
            this.setSize(element._size);
            for(let i = 0; i < element._effects.length; ++i){
                const effect = element._effects[i];
                this._addEffect(effect.prototype.constructor(effect));
            }
        }
        const description = description_or_SvgFilter;
        if(description.x !== undefined){
            this.setPositionX(description.x);
        }
        if(description.y !== undefined){
            this.setPositionY(description.y);
        }
        if(description.position !== undefined){
            this.setPosition(description.position);
        }
        if(description.width !== undefined){
            this.setWidth(description.width);
        }
        if(description.height !== undefined){
            this.setHeight(description.height);
        }
        if(description.size !== undefined){
            this.setSize(description.size);
        }
    }
}
