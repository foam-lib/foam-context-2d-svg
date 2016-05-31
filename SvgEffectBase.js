import {
    createSvgObject
} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';

export const VALID_IN = [
    'SourceGraphic','SourceAlpha', 'BackgroundImage', 'BackgroundAlpha', 'FillPaint','StrokePaint '
];

let id = 0;
export default class SvgEffectBase {
    constructor(type){
        this._id = `effect-${type}-${id++}`;
        this._element = createSvgObject(type);
        this._element.setAttribute('id',this._id);
        this._element.setAttribute('in','SourceGraphic');
        this._element.setAttribute('result',`${this._id}-out`);
        this._in = 'SourceGraphic';
    }

    setIn(in_){
        if(in_ !== null && !(in_ instanceof SvgEffectBase) && VALID_IN.indexOf(in_) === -1){
            throw new TypeError(`In-effect not 'null', instance of SvgFilterPartBase or '${VALID_IN.join("', '")}'.`);
        }
        this._in = in_ === null ? 'SourceGraphic' : in_;
        this._element.setAttribute('in',this._in._id ? `url(#${this._in._id})` : this._in);
    }

    getIn(){
        return this._in;
    }
}
