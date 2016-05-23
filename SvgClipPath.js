import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';

let id = 0;

export default class SvgClipPath{
    constructor(description_or_SvgClipPath){
        this._id = `${SvgType.CLIP_PATH}-${id++}`;
        this._element = createSvgObject(SvgType.CLIP_PATH);
        this._element.setAttribute('id',this._id);
        this._paths = [];
        
        SvgDef.appendElement(this);
        this.set(description_or_SvgClipPath);
    }

    copy(){
        return new SvgClipPath(this);
    }

    appendPath(path){
        this._paths.push(path);
        this._element.appendChild(path._element);
    }

    set(description_or_SvgClipPath){
        if(!description_or_SvgClipPath){
            return;
        }
        if(description_or_SvgClipPath instanceof SvgClipPath){
            const element = description_or_SvgClipPath;

            while(this._element.firstChild){
                this._element.removeChild(this._element.firstChild);
            }
            this._paths = [];
            for(let i = 0; i < element._paths.length; ++i){
                //console.log(element._paths[i]);
                this.appendPath(element._paths[i].copy());
            }
            this._id = this._id ?
                (this._id.length === 0 ? `${element._id}-copy` : this._id) :
                `${element._id}-copy`;
            this._element.setAttribute('id',this._id);
            return;
        }

        if(description_or_SvgClipPath.paths !== undefined){
            const paths = description_or_SvgClipPath.paths;
            for(var i = 0; i < paths.length; ++i){
                this.appendPath(paths[i]);
            }
        }
    }
}