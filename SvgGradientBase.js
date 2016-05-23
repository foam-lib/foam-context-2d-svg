import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';
import * as Vec2 from 'foam-math/Vec2';

let id = 0;

export default class SvgGradientBase{
    constructor(type,description){
        this._id = `${type}-${id++}`;
        this._element = createSvgObject(type);
        this._element.setAttribute('id',this._id);
        this._units = 'objectBoundingBox';
        this._colorStops = [];
        SvgDef.appendElement(this);
        this.set(description);
    }

    setUnits(units){
        this._units = units;
        this._element.setAttribute('gradientUnits',units);
    }

    getUnits(){
        return this._units;
    }

    addColorStop(offset,color,opacity){
        const stop = createSvgObject('stop');
        stop.setAttribute('offset',`${offset * 100}%`);
        stop.setAttribute('stop-color',color);
        if(opacity !== undefined){
            stop.setAttribute('stop-opacity',opacity);
        }
        this._element.appendChild(stop);
        this._colorStops.push([offset,color,opacity]);
    }

    set(description_or_SvgGradientBase){
        if(!description_or_SvgGradientBase){
            return;
        }

        if(description_or_SvgGradientBase instanceof SvgGradientBase){
            const element = description_or_SvgGradientBase;
            element.setUnits(element._units);
            while(this._element.firstChild){
                this._element.removeChild(this._element.firstChild);
            }
            this._colorStops = [];
            for(let i = 0; i < element._colorStops.length; ++i){
                const colorStop = element._colorStops[i];
                this.addColorStop(colorStop[0],colorStop[1],colorStop[2]);
            }
            return;
        }

        const description = description_or_SvgGradientBase;
        //copy
        if(description.units !== undefined){
            this.setUnits(description.units);
        }

        if(description.colorStops !== undefined){
            const colorStops = description.colorStops;
            for(var i = 0; i < colorStops.length; ++i){
                const colorStop = colorStops[i];
                this.addColorStop(colorStop[0],colorStop[1],colorStop[2]);
            }
        }
    }
}