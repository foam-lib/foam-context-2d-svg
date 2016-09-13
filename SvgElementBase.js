import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';

let id = 0;

export default class SvgElementBase{
    constructor(type,description){
        this._id = null;
        this._class = null;
        this._element = createSvgObject(type);
        this._parent = null;
        this._clipPath = null;
        this._mask = null;
        this._filter = null;
        this._filterIds = [];
        this.set(description);
    }

    copy(){
        return this.constructor(this);
    }

    getParent(){
        return this._parent;
    }

    _moveToDefinitions(){
        if(!SvgDef.hasElement(this)){
            if(this._id === null){
                this.setId(`${SvgType.PATH}-${id++}`);
            }
            if(this._parent){
                this._parent.removeChild(this);
            }
            SvgDef.appendElement(this);
        }
        return this._id;
    }

    getCssStyle(){
        return this._element.style;
    }

    getBoundingClientRect(){
        return this._element.getBoundingClientRect();
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // event listener
    /*----------------------------------------------------------------------------------------------------------------*/

    addEventListener(type,listener,useCapture){
        this._element.addEventListener(type,listener,useCapture);
    }

    removeEventListener(type,listener){
        this._element.removeEventListener(type,listener);
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // id
    /*----------------------------------------------------------------------------------------------------------------*/

    setId(id){
        this._id = id;
        this._element.setAttribute('id',this._id);
    }

    getId(){
        return this._id;
    }

    _generateAutoId(){
        if(this._id !== null || this._id !== ''){
            throw new Error(`Id already set '${this._id}'.`);
        }
        this.setId(`auto-${id++}`);
        return this._id;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // class
    /*----------------------------------------------------------------------------------------------------------------*/

    setClass(class_){
        this._class = class_;
        this._element.setAttribute('class',this._class);
    }

    getClass(){
        return this._class;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // clipPath
    /*----------------------------------------------------------------------------------------------------------------*/

    setClipPath(clipPath){
        if(clipPath === null){
            this._clipPath = null;
            this._element.removeAttribute('clip-path');
            return;
        }
        this._clipPath = clipPath;
        this._element.setAttribute('clip-path',`url(#${clipPath._id})`);
    };

    getClipPath(){
        return this._clipPath;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // mask
    /*----------------------------------------------------------------------------------------------------------------*/

    setMask(mask){
        if(mask === null){
            this._mask = null;
            this._element.removeAttribute('mask');
            return;
        }
        this._mask = mask;
        this._element.setAttribute('mask',`url(#${mask._id})`);
    }

    getMask(){
        return this._mask;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // shadow
    /*----------------------------------------------------------------------------------------------------------------*/

    setDropShadow(dropShadow){
        this.setFilter(dropShadow);
    }

    getDropShadow(){
        return this._filter;
    }

    setFilter(filter){
        if(filter === null){
            this._filter = null;
            this._element.removeAttribute('filter');
            return;
        }
        this._filter = filter;
        this._element.setAttribute('filter',`url(#${filter._id})`);
    }

    getFilter(){
        return this._filter;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
    // set
    /*----------------------------------------------------------------------------------------------------------------*/

    set(description_or_SvgElementBase){
        if(!description_or_SvgElementBase){
            return;
        }

        //copy
        if(description_or_SvgElementBase instanceof SvgElementBase){
            const element = description_or_SvgElementBase;
            this.setClipPath(element._clipPath);
            this.setMask(element._mask);
            this.setFilter(element._filter);
            return;
        }

        const description = description_or_SvgElementBase;

        if(description.id !== undefined){
            this.setId(description.id)
        }
        if(description.class !== undefined){
            this.setClass(description.class);
        }
        if(description.clipPath !== undefined){
            this.setClipPath(description.clipPath);
        }
        if(description.mask !== undefined){
            this.setMask(description.mask);
        }
        if(description.dropShadow !== undefined){
            this.setDropShadow(description.dropShadow);
        }
    }
}