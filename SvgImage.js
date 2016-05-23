import SvgType from './SvgType';
import SvgElementTransform from './SvgElementTransform';

export default class SvgImage extends SvgElementTransform{
    constructor(description_or_SvgImage){
        super(SvgType.IMAGE);
        this._src = '';
        this.set(description_or_SvgImage);
    }

    copy(){
        return new SvgImage(this);
    }

    setSrc(src){
        this._src = src;
        this._element.setAttribute('xlink:href',src);
    }

    getSrc(){
        return this._src;
    }

    set(description_or_SvgImage){
        if(!description_or_SvgImage){
            return;
        }
        super.set(description_or_SvgImage);

        //copy
        if(description_or_SvgImage instanceof SvgImage){
            this.setSrc(description_or_SvgImage._src);
            return;
        }

        if(description_or_SvgImage.src !== undefined){
            this.setSrc(description_or_SvgImage.src);
        }
    }
}