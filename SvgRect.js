import SvgType from './SvgType';
import * as Vec2 from 'foam-math/Vec2';
import SvgElementStyleable from './SvgElementStyleable';

export default class SvgRect extends SvgElementStyleable{
    constructor(description_or_SvgRect){
        super(SvgType.RECT);
        this.setFillStyle('none');
        this.setStrokeStyle('#000');
        this._size = [0,0];
        this._cornerRadius = 0;
        this.set(description_or_SvgRect);
    }

    copy(){
        return new SvgRect(this);
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

    getSize(out){
        return Vec2.set(out || Vec2.create(),this._size);
    }

    getWidth(){
        return this._size[0];
    }

    getHeight(){
        return this._size[1];
    }

    setCornerRadius(radius){
        this._cornerRadius = radius;
        this._element.setAttribute('rx',radius);
        this._element.setAttribute('ry',radius);
    }

    getCornerRadius(){
        return this._cornerRadius;
    }

    set(description_or_SvgRect){
        if(!description_or_SvgRect){
            return;
        }
        super.set(description_or_SvgRect);

        if(description_or_SvgRect instanceof SvgRect){
            const element = description_or_SvgRect;
            this.setSize(element._size);
            return;
        }

        const description = description_or_SvgRect;

        //size
        if(description.size !== undefined){
            this.setSize(description.size);
        }
        if(description.width !== undefined){
            this.setWidth(description.width);
        }
        if(description.height !== undefined){
            this.setHeight(description.height);
        }
        if(description.cornerRadius){
            this.setCornerRadius(description.cornerRadius);
        }
    }
}