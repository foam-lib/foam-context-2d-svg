import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';
import * as Vec2 from 'foam-math/Vec2';

let id = 0;

export default class SvgPattern{
    constructor(description_or_SvgPattern){
        this._id = `${SvgType.PATTERN}-${id++}`;
        this._element = createSvgObject(SvgType.PATTERN);
        this._element.setAttribute('id',this._id);
        SvgDef.appendElement(this);

        this._position = [0,0];
        this._size = [0,0];
        this._children = [];

        this.set(description_or_SvgPattern);
    }

    copy(){
        return new SvgPattern(this);
    }

    setPosition(pos){
        this.setPosition2(pos[0],pos[1]);
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

    getPosition(out){
        return Vec2.set(out || Vec2.create(),this._position);
    }

    getPositionX(){
        return this._position[0];
    }

    getPositionY(){
        return this._position[1];
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

    appendChild(element){
        const index = this._children.indexOf(element);
        if(index !== -1){
            this._element.removeChild(element._element);
            this._children.splice(index,1);
        }
        element._parent = this;
        this._element.appendChild(element._element);
        this._children.push(element);
    }

    appendChildren(elements){
        for(let i = 0; i < elements.length; ++i){
            this.appendChild(elements[i]);
        }
    }

    removeChild(child){
        const index = this._children.indexOf(child);
        if(index === -1){
            throw new Error('Element not child of group.');
        }
        child._parent = null;
        this._element.removeChild(child._element);
        this._children.splice(index,1);
    }

    removeChildren(children){
        for(let i = 0; i < children.length; ++i){
            this.removeChild(children[i]);
        }
    }

    removeChildAtIndex(index){
        if(index < 0 || index > this._children.length - 1){
            throw new RangeError(`Invalid child index ${index}.`);
        }
        const child = this._children[index];
        child._parent = null;
        this._element.removeChild(child._element);
        this._children.splice(index,1);
    }

    getChildren(){
        return this._children;
    }

    getNumChildren(){
        return this._children.length;
    }

    set(description_or_SvgPattern){
        if(!description_or_SvgPattern){
            return;
        }

        if(description_or_SvgPattern instanceof SvgPattern){
            const element = description_or_SvgPattern;

            this.setPosition(element._position);
            this.setSize(element._size);

            this._children = [];
            while(this._element.firstChild){
                this._element.removeChild(this._element.firstChild);
            }
            for(var i = 0; i < element._children.length; ++i){
                this.appendChild(element._children[i].copy());
            }
            return;
        }

        const description = description_or_SvgPattern;
        //position
        if(description.position !== undefined){
            this.setPosition(description.position);
        }
        if(description.x !== undefined){
            this.setPositionX(description.x);
        }
        if(description.y !== undefined){
            this.setPositionY(description.y);
        }

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

        //children
        if(description.children !== undefined){
            this.appendChildren(description.children);
        }
    }
}