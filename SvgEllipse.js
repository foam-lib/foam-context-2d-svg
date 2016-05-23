import SvgType from './SvgType';
import * as Vec2 from 'foam-math/Vec2';
import SvgElementStyleable from './SvgElementStyleable';

export default class SvgEllipse extends SvgElementStyleable{
    constructor(description){
        super(SvgType.ELLIPSE);
        this._radii = [0,0];
        this.set(description);
    }

    setPositionX(x){
        this._position[0] = x;
        this._element.setAttribute('cx',x);
    }

    setPositionY(y){
        this._position[1] = y;
        this._element.setAttribute('cy',y);
    }

    setRadii(radii){
        this.setRadii2(radii[0],radii[1]);
    }

    setRaddi1(radius){
        this.setRadii2(radius,radius);
    }

    setRadii2(radiusx,radiusy){
        this.setRadiusX(radiusx);
        this.setRadiusY(radiusy);
    }

    setRadiusX(radius){
        this._radii[0] = radius;
        this._element.setAttribute('rx',radius);
    }

    setRadiusY(radius){
        this._radii[1] = radius;
        this._element.setAttribute('ry',radius);
    }

    getRadiusX(){
        return this._radii[0];
    }

    getRadiusY(){
        return this._radii[1];
    }

    getRadius(out){
        return Vec2.set(out || Vec2.create(),this._radii);
    }

    set(description_or_SvgEllipse){
        if(!description_or_SvgEllipse){
            return;
        }
        super.set(description_or_SvgEllipse);

        //copy
        if(description_or_SvgEllipse instanceof SvgEllipse){
            const element = description_or_SvgEllipse;
            this.setPosition(element._position);
            this.setRadii(element._radii);
            return;
        }

        const description = description_or_SvgEllipse;

        //position
        if(description.x !== undefined){
            this.setPositionX(description.x);
        }
        if(description.y !== undefined){
            this.setPositionY(description.y);
        }
        if(description.position !== undefined){
            this.setPosition(description.position);
        }

        //radius
        if(description.radii !== undefined){
            this.setRadii(description.radii);
        }
        if(description.radii1 !== undefined){
            this.setRaddi1(description.radii1);
        }
        if(description.radiusX !== undefined){
            this.setRadiusX(description.radiusX);
        }
        if(description.radiusY !== undefined){
            this.setRadiusX(description.radiusY);
        }
    }
}