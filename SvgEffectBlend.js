import SvgType from './SvgType';
import {VALID_IN} from './SvgEffectBase';
import SvgEffectBase from './SvgEffectBase';

const VALID_MODES = [
    'normal','multiply','screen','darken','lighten'
];

export default class SvgEffectBlend extends SvgEffectBase{
    constructor(){
        super(SvgType.FE_BLEND);
        this._mode = 'normal';
        this._in2 = 'SourceGraphic';
    }

    setMode(mode){
        if(VALID_MODES.indexOf(mode) === -1){
            throw new Error(`Invalid mode '${mode}'. Valid modes are '${VALID_MODES.join("', '")}'.`);
        }
        this._mode = mode;
        this._element.setAttribute('mode',this._mode);
    }

    getMode(){
        return this._mode;
    }

    setIn2(in_){
        if(in_ !== null && !(in_ instanceof SvgEffectBase) && VALID_IN.indexOf(in_) === -1){
            throw new TypeError(`In-effect not 'null', instance of SvgFilterPartBase or '${VALID_IN.join("', '")}'.`);
        }
        this._in2 = in_ === null ? 'SourceGraphic' : in_;
        this._element.setAttribute('in2',this._in2._id ? `url(#${this._in2._id})` : this._in2);
    }

    getIn2(){
        return this._in2;
    }

    set(description_or_SvgEffectBlend){
        if(!description_or_SvgEffectBlend){
            return;
        }
        if(description_or_SvgEffectBlend instanceof SvgEffectBlend){
            this.setMode(description_or_SvgEffectBlend._mode);
            return;
        }
        if(description_or_SvgEffectBlend.mode !== undefined){
            this.setMode(description_or_SvgEffectBlend.mode);
        }
    }
}
