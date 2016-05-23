import {createSvgObject} from './SvgCmd';
import SvgElementBase from './SvgElementBase';
import * as Vec2 from 'foam-math/Vec2';

export default class SvgElementTransform extends SvgElementBase{
    constructor(type,description){
        super(type);
        this._position = [0, 0];
        this._transform = '';
        this.set(description);
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // position
    /*----------------------------------------------------------------------------------------------------------------*/

    setPosition(pos){
        this.setPosition2(pos[0], pos[1]);
    }

    setPosition2(x, y){
        this.setPositionX(x);
        this.setPositionY(y);
    }

    setPositionX(x){
        this._position[0] = x;
        this._element.setAttribute('x', x);
    }

    setPositionY(y){
        this._position[1] = y;
        this._element.setAttribute('y', y);
    }

    getPositionX(){
        return this._position[0];
    }

    getPositionY(){
        return this._position[1];
    }

    getPosition(out){
        return Vec2.set(out || Vec2.create(), this._position);
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // transform
    /*----------------------------------------------------------------------------------------------------------------*/

    setTransform(matrix){
        this.setTransform6(matrix[0],matrix[1],matrix[2],matrix[3],matrix[4],matrix[5]);
    }

    setTransform6(a,b,c,d,e,f){
        this._transform = `matrix(${a},${b},${c},${d},${e},${f})`;
        this._element.setAttribute('transform',this._transform);
    }

    setTransformString(transform){
        this._transform = transform;
        this._element.setAttribute('transform',this._transform);
    }

    getTransform(){
        return this._transform;
    }

    identity(){
        this._transform = '';
        this._element.removeAttribute('transform');
    }

    transform(matrix){
        this.transform6(matrix[0],matrix[1],matrix[2],matrix[3],matrix[4],matrix[5]);
    }

    transform6(a,b,c,d,e,f){
        this._transform += `matrix(${a},${b},${c},${d},${e},${f}) `;
        this._element.setAttribute('transform',this._transform);
    }

    translate(pos){
        this.translate2(pos[0],pos[1]);
    }

    translate2(x,y){
        this._transform += `translate(${x},${y}) `;
        this._element.setAttribute('transform',this._transform);
    }

    scale(sxy){
        this.scale2(sxy[0],sxy[1]);
    }

    scale1(sxy){
        this.scale2(sxy,sxy);
    }

    scale2(x,y){
        this._transform += `scale(${x},${y}) `;
        this._element.setAttribute('transform',this._transform);
    }

    rotate(radians){
        this._transform += `rotate(${radians * 180/Math.PI})`;
        this._element.setAttribute('transform',this._transform);
    }

    set(description_or_SvgElementTransform){
        if(!description_or_SvgElementTransform){
            return;
        }
        super.set(description_or_SvgElementTransform);

        //copy
        if(description_or_SvgElementTransform instanceof SvgElementTransform){
            const element = description_or_SvgElementTransform;
            this.setPosition(element._position);
            this.setTransformString(element._transform);
            return;
        }

        const description = description_or_SvgElementTransform;

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

        //transform
        if(description.transformSet !== undefined){
            this.setTransform(description.transformSet);
        }
        if(description.transform !== undefined){
            this.transform(description.transform);
        }
        if(description.translate !== undefined){
            this.translate(description.translate);
        }
        if(description.scale !== undefined){
            this.scale(description.scale);
        }
        if(description.scale1 !== undefined){
            this.scale1(description.scale1);
        }
        if(description.rotate !== undefined){
            this.rotate(description.rotate);
        }
    }
}