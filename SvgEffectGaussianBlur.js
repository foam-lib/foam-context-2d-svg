import SvgType from './SvgType';
import SvgEffectBase from './SvgEffectBase';


export default class SvgEffectGaussianBlur extends SvgEffectBase{
    constructor(description_or_SvgEffectGaussianBlur){
        super(SvgType.FE_GAUSSIAN_BLUR);
        this._element.setAttribute('type','matrix');
        this._blur = 5;
        this.setBlur(this._blur);
        this.set(description_or_SvgEffectGaussianBlur);
    }

    setBlur(blur){
        this._blur = blur;
        this._element.setAttribute('stdDeviation',this._blur);
    }

    getBlur(){
        return this._blur;
    }

    set(description_or_SvgEffectGaussianBlur){
        if(!description_or_SvgEffectGaussianBlur){
            return;
        }
        if(description_or_SvgEffectGaussianBlur instanceof SvgEffectBase){
            this.setBlur(description_or_SvgEffectGaussianBlur._blur);
            return;
        }
        if(description_or_SvgEffectGaussianBlur.blur !== undefined){
            this.setBlur(description_or_SvgEffectGaussianBlur.blur);
        }
    }
}
