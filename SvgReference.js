import {setHrefAttrib} from './SvgCmd';
import SvgType from './SvgType';
import SvgElementBase from './SvgElementBase';
import * as Vec2 from 'foam-math/Vec2';
import SvgElementStyleable from './SvgElementStyleable';

export default class SvgReference extends SvgElementStyleable{
    constructor(description){
        super(SvgType.USE);
        this._ref = null;
        this.set(description);
    }

    setElement(element){
        if(!(element instanceof SvgElementBase)){
            return new TypeError('Element not of type SvgElementBase.');
        }
        let id = element.getId();
        if(id === undefined || id === null || id === ''){
            id = element._generateAutoId();
        }
        this._ref = id;
        setHrefAttrib(this._element,`#${id}`);
    }

    set(description){
        if(!description){
            return;
        }
        if(description instanceof SvgElementBase){
            this.setElement(description);
            return;
        }
        super.set(description);

        if(description.element !== undefined){
            this.setElement(description.element);
        }
    }
}