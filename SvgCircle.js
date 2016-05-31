import SvgType from './SvgType';
import * as Vec2 from 'foam-math/Vec2';
import SvgElementStyleable from './SvgElementStyleable';

export default class SvgCircle extends SvgElementStyleable{
    constructor(description_or_SvgCircle){
        super(SvgType.CIRCLE);
        this.setFillStyle('none');
        this.setStrokeStyle('#000');
        this._radius = 0;
        this.set(description_or_SvgCircle);
    }

    copy(){
        return new SvgCircle(this);
    }

    setPositionX(x){
        this._position[0] = x;
        this._element.setAttribute('cx',x);
    }

    setPositionY(y){
        this._position[1] = y;
        this._element.setAttribute('cy',y);
    }

    setRadius(radius){
        this._radius = radius;
        this._element.setAttribute('r',radius);
    }

    getRadius(){
        return this._radius;
    }

    set(description_or_SvgCircle){
        if(!description_or_SvgCircle){
            return;
        }
        super.set(description_or_SvgCircle);

        if(description_or_SvgCircle instanceof SvgCircle){
            const element = description_or_SvgCircle;
            this.setPosition(element._position);
            this.setRadius(element._radius);
            return;
        }

        const description = description_or_SvgCircle;

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
        if(description.radius !== undefined){
            this.setRadius(description.radius);
        }
    }
}