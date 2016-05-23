import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';
import SvgGradientBase from './SvgGradientBase';
import * as Vec2 from 'foam-math/Vec2';

export default class SvgGradientRadial extends SvgGradientBase{
    constructor(description_or_SvgGradientRadial){
        super(SvgType.RADIAL_GRADIENT);
        this._center = [0,0];
        this._radius = 0;
        this._focal  = [0,0];
        this.setCenter2(0.5,0.5);
        this.setRadius(0.5);
        SvgDef.appendElement(this);
        this.set(description_or_SvgGradientRadial);
    }

    copy(){
        return new SvgGradientRadial(this);
    }

    setCenter(pos){
        this.setCenter2(pos[0],pos[1]);
    }

    setCenter2(x,y){
        this.setCenterX(x);
        this.setCenterY(y);
    }

    setCenterX(x){
        if(x === null){
            this._element.removeAttribute('cx');
            return;
        }
        this._element.setAttribute('cx',x);
    }

    setCenterY(y){
        if(y === null){
            this._element.removeAttribute('cy');
            return;
        }
        this._element.setAttribute('cy',y);
    }

    getCenter(out){
        return Vec2.set(out || Vec2.create(),this._center);
    }

    getCenterX(){
        return this._center[0];
    }

    getCenterY(){
        return this._center[1];
    }

    setRadius(radius){
        this._radius = radius;
        this._element.setAttribute('radius',radius);
    }

    setFocal(pos){
        this.setFocal2(pos[0],pos[1]);
    }

    setFocal2(x,y){
        this.setFocalX(x);
        this.setFocalY(y);
    }

    setFocalX(x){
        this._focal[0] = x;
        this._element.setAttribute('fx',x);
    }

    setFocalY(y){
        this._focal[1] = y;
        this._element.setAttribute('fy',y);
    }

    getFocal(out){
        return Vec2.set(out || Vec2.create(),this._focal);
    }

    getFocalX(){
        return this._focal[0];
    }

    getFocalY(){
        return this._focal[1];
    }

    set(description_or_SvgGradientRadial){
        if(!description_or_SvgGradientRadial){
            return;
        }

        super.set(description_or_SvgGradientRadial);

        //copy
        if(description_or_SvgGradientRadial instanceof SvgGradientRadial){
            const element = description_or_SvgGradientRadial;
            this.setCenter(element._center);
            this.setRadius(element._radius);
            this.setFocal(element._focal);
            return;
        }

        const description = description_or_SvgGradientRadial;

        //center
        if(description.center !== undefined){
            this.setCenter(description.center);
        }
        if(description.centerX !== undefined){
            this.setCenterX(description.centerX);
        }
        if(description.centerY !== undefined){
            this.setCenterY(description.centerY);
        }

        //focal
        if(description.focal !== undefined){
            this.setFocal(description.focal);
        }
        if(description.focalX !== undefined){
            this.setFocalX(description.focalX);
        }
        if(description.focalY !== undefined){
            this.setFocalY(description.focalY);
        }
    }
}