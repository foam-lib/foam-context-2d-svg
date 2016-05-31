import {
    createSvgObject
} from './SvgCmd';
import SvgType from './SvgType';
import SvgDef from './SvgDef';
import * as Vec2 from 'foam-math/Vec2';
import * as Color from 'foam-color/Color';

function colorMatrixStr(R0,G0,B0,A0,_10,
                        R1,G1,B1,A1,_11,
                        R2,G2,B2,A2,_12,
                        R3,G3,B3,A3,_13){
    return '' +
`${R0} ${G0} ${B0} ${A0} ${_10}
 ${R1} ${G1} ${B1} ${A1} ${_11}
 ${R2} ${G2} ${B2} ${A2} ${_12}
 ${R3} ${G3} ${B3} ${A3} ${_13}`;
}

let id = 0;

function createColorMatrix(in_,out,matrix){
    const feColorMatrix = createSvgObject(SvgType.FE_COLOR_MATRIX);
    feColorMatrix.setAttribute('result',out);
    feColorMatrix.setAttribute('in',in_);
    feColorMatrix.setAttribute('type','matrix');
    feColorMatrix.setAttribute('values', matrix);
    return feColorMatrix;
}

export default class SvgDropShadow{
    constructor(description_or_SvgDropShadow){
        this._id = `drop-shadow-${id++}`;
        this._element = createSvgObject(SvgType.FILTER);
        this._element.setAttribute('id',this._id);
        this._element.setAttribute('width','500%');
        this._element.setAttribute('height','500%');

        this._offset = [0,0];
        this._color = Color.create();
        this._blur = 0;

        //offset input
        this._feOffset = this._element.appendChild(createSvgObject(SvgType.FE_OFFSET));
        this._feOffset.setAttribute('result','offset');
        this._feOffset.setAttribute('in','SourceGraphic');
        this._feOffset.setAttribute('dx','' + this._offset[0]);
        this._feOffset.setAttribute('dy','' + this._offset[1]);
        //make input black
        this._feColorMatrixBlack = this._element.appendChild(
            createColorMatrix('offset','color-matrix-black',
                colorMatrixStr(
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,1,0
                )
            )
        );
        //tint independently from input
        this._feColorMatrixTint = this._element.appendChild(
            createColorMatrix('color-matrix-black','color-matrix-tint',
                colorMatrixStr(
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,0,0,
                    0,0,0,1,0
                )
            )
        );
        //blur
        this._feGaussianBlur = this._element.appendChild(createSvgObject(SvgType.FE_GAUSSIAN_BLUR));
        this._feGaussianBlur.setAttribute('result','blur');
        //blend source over tinted blur result
        this._feBlend  = this._element.appendChild(createSvgObject(SvgType.FE_BLEND));
        this._feBlend.setAttribute('in','SourceGraphic');
        this._feBlend.setAttribute('in2','color-matrix-tint');
        this._feBlend.setAttribute('mode','normal');

        SvgDef.appendElement(this);
        this.set(description_or_SvgDropShadow);
    }

    copy(){
        return new SvgDropShadow(this);
    }

    setOffset(pos){
        this.setOffset2(pos[0],pos[1]);
    }

    setOffset2(x,y){
        this.setOffsetX(x);
        this.setOffsetY(y);
    }

    setOffsetX(x){
        this._offset[0] = x;
        this._feOffset.setAttribute('dx',x);
    }

    setOffsetY(y){
        this._offset[1] = y;
        this._feOffset.setAttribute('dy',y);
    }

    getOffset(out){
        return Vec2.set(out || Vec2.create(),this._offset);
    }

    setBlur(blur){
        if(!blur){
            if(!this._blur){
                return;
            }
            this._blur = 0;
            //detach in
            this._feGaussianBlur.removeAttribute('in');
            this._feBlend.setAttribute('in2','color-matrix-tint');
            return;
        }
        if(blur === this._blur){
            return;
        }
        //connect effects
        if(!this._blur){
            this._feGaussianBlur.setAttribute('in','color-matrix-tint');
            this._feBlend.setAttribute('in2','blur');
        }
        this._blur = blur;
        this._feGaussianBlur.setAttribute('stdDeviation',this._blur);
    }

    getBlur(){
        return this._blur;
    }

    setColor(color){
        if(color === null){
            this._color = Color.set4(this._color,0,0,0,1.0);
        } else if(Color.isHex(color)){
            this._color = Color.setFromHex(this._color,color);
        } else if(Color.isRgbaString(color)){
            this._color = Color.setFromRgbaString(this._color,color);
        } else {
            this._color = Color.set(this._color,color);
        }
        this._feColorMatrixTint.setAttribute('values',colorMatrixStr(
            0,0,0,this._color[0],0,
            0,0,0,this._color[1],0,
            0,0,0,this._color[2],0,
            0,0,0,this._color[3],0
        ));
    }

    getColor(out){
        return Color.set(out || Color.create(), this._color);
    }


    set(description_or_SvgDropShadow){
        if(!description_or_SvgDropShadow){
            return;
        }

        if(description_or_SvgDropShadow instanceof SvgDropShadow){
            const element = description_or_SvgDropShadow;
            this.setBlur(element._blur);
            this.setOffset(element._offset);
            this.setColor(element._color);
            return;
        }

        const description = description_or_SvgDropShadow;

        if(description.blur !== undefined){
            this.setBlur(description.blur);
        }

        if(description.offset !== undefined){
            this.setOffset(description.offset);
        }

        if(description.color !== undefined){
            this.setColor(description.color);
        }
    }
}