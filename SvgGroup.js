import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import * as Vec2 from 'foam-math/Vec2';
import SvgTransformElement from './SvgElementTransform';

export default class SvgGroup extends SvgTransformElement{
    constructor(description_or_SvgGroup){
        super(SvgType.GROUP);
        this._position = [0,0];
        this._children = [];
        this._size = [0,0];
        this.set(description_or_SvgGroup);
    }

    copy(){
        return new SvgGroup(this);
    }

    _setTransform(transform){
        this._element.setAttribute('transform',`translate(${this._position[0]},${this._position[1]}) ${transform}`);
    }

    setPositionX(x){
        this._position[0] = x;
        this._setTransform(this._transform);
    }

    setPositionY(y){
        this._position[1] = y;
        this._setTransform(this._transform);
    }

    setPosition2(x,y){
        this._position[0] = x;
        this._position[1] = y;
        this._setTransform(this._transform);
    }

    setPosition(pos){
        this._position[0] = pos[0];
        this._position[1] = pos[1];
        this._setTransform(this._transform);
    }

    _updateSize(){
        const bounds = this._element.getBoundingClientRect();
        this._size[2] = bounds.width;
        this._size[3] = bounds.height;
    }

    getSize(out){
        return Vec2.set(out || Vec2.create(),this._size);
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

        this._updateSize();
        return element;
    }

    appendChildren(elements){
        for(let i = 0; i < elements.length; ++i){
            this.appendChild(elements[i]);
        }
        return elements;
    }

    removeChild(child){
        const index = this._children.indexOf(child);
        if(index === -1){
            throw new Error('Element not child of group.');
        }
        child._parent = null;
        this._element.removeChild(child._element);
        this._children.splice(index,1);

        this._updateSize();
        return child;
    }

    removeChildren(children){
        for(let i = 0; i < children.length; ++i){
            this.removeChild(children[i]);
        }
        return children;
    }

    removeChildAtIndex(index){
        if(index < 0 || index > this._children.length - 1){
            throw new RangeError(`Invalid child index ${index}.`);
        }
        const child = this._children[index];
        child._parent = null;
        this._element.removeChild(child._element);
        this._children.splice(index,1);

        this._updateSize();
        return child;
    }

    getChildAtIndex(index){
        if(index < 0 || index > this._children.length - 1){
            throw new RangeError(`Invalid child index ${index}.`);
        }
        return this._children[index];
    }

    getChildren(){
        return this._children;
    }

    getNumChildren(){
        return this._children.length;
    }

    set(description_or_SvgGroup){
        if(!description_or_SvgGroup){
            return;
        }
        super.set(description_or_SvgGroup);

        //copy
        if(description_or_SvgGroup instanceof SvgGroup){
            const element = description_or_SvgGroup;
            this._children = [];
            while(this._element.firstChild){
                this._element.removeChild(this._element.firstChild);
            }
            for(var i = 0; i < element.length; ++i){
                this.appendChild(element[i].copy());
            }
            return;
        }

        const description = description_or_SvgGroup;
        //children
        if(description.children !== undefined){
            const children = description.children;
            for(var i = 0; i < children.length; ++i){
                this.appendChild(children[i]);
            }
        }
    }
}