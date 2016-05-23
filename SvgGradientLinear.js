import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';
import SvgGradientBase from './SvgGradientBase';
import * as Vec2 from 'foam-math/Vec2';

export default class SvgGradientLinear extends SvgGradientBase{
    constructor(description_or_SvgGradientLinear){
        super(SvgType.LINEAR_GRADIENT);
        this._axis = [0,0,0,0];
        this.setAxis2(0,0,0,1);
        SvgDef.appendElement(this);
        this.set(description_or_SvgGradientLinear);
    }

    copy(){
        return new SvgGradientLinear(this);
    }

    setAxis(from,to){
        this.setAxis2(from[0],from[1],to[0],to[1]);
    }

    setAxis2(fromx,fromy,tox,toy){
        this.setAxisFromX(fromx);
        this.setAxisFromY(fromy);
        this.setAxisToX(tox);
        this.setAxisToY(toy);
    }

    setAxisFrom(pos){
        this.setAxisFrom2(pos[0],pos[1]);
    }

    setAxisFrom2(x,y){
        this.setAxisFromX(x);
        this.setAxisFromY(y);
    }

    setAxisFromX(x){
        this._axis[0] = x;
        this._element.setAttribute('x1',x);
    }

    setAxisFromY(y){
        this._axis[1] = y;
        this._element.setAttribute('y1',y);
    }

    setAxisTo(pos){
        this.setAxisTo2(pos[0],pos[1]);
    }

    setAxisTo2(x,y){
        this.setAxisToX(x);
        this.setAxisToY(y);
    }

    setAxisToX(x){
        this._axis[2] = x;
        this._element.setAttribute('x2',x);
    }

    setAxisToY(y){
        this._axis[3] = y;
        this._element.setAttribute('y2',y);
    }

    getAxisFrom(out){
        return Vec2.set2(out || Vec2.create(),this._axis[0],this._axis[1]);
    }

    getAxisTo(out){
        return Vec2.set2(out || Vec2.create(),this._axis[2],this._axis[3]);
    }

    set(description_or_SvgGradientLinear){
        if(!description_or_SvgGradientLinear){
            return;
        }
        super.set(description_or_SvgGradientLinear);

        //copy
        if(description_or_SvgGradientLinear instanceof SvgGradientLinear){
            const element = description_or_SvgGradientLinear;
            this.setAxis2(element._axis[0],element._axis[1],element._axis[2],element._axis[3]);
            return;
        }

        const description = description_or_SvgGradientLinear;

        //axis
        if(description.axis !== undefined){
            this.setAxis(description.axis[0],description.axis[1]);
        }
        if(description.axis2 !== undefined){
            const axis = description.axis2;
            this.setAxis2(axis[0],axis[1],axis[2],axis[3]);
        }
        if(description.axisFrom !== undefined){
            this.setAxisFrom(description.axisFrom);
        }
        if(description.axisTo !== undefined){
            this.setAxisTo(description.axisTo);
        }
    }
}