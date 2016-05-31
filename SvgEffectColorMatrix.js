import SvgType from './SvgType';
import SvgEffectBase from './SvgEffectBase';

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

export default class SvgEffectColorMatrix extends SvgEffectBase{
    constructor(description_or_SvgEffectColorMatrix){
        super(SvgType.FE_COLOR_MATRIX);
        this._element.setAttribute('type','matrix');
        this._matrix = [
            1,0,0,0,0,
            0,1,0,0,0,
            0,0,1,0,0,
            0,0,0,1,0
        ];
        this.set(description_or_SvgEffectColorMatrix);
    }

    setMatrix(matrix){
        this.setMatrix20(
            matrix[0],matrix[1],matrix[2],matrix[3],
            matrix[4],matrix[5],matrix[6],matrix[7],
            matrix[8],matrix[9],matrix[10],matrix[11],
            matrix[12],matrix[13],matrix[14],matrix[15],
            matrix[16],matrix[17],matrix[18],matrix[19]
        )
    }

    setMatrix20(R0,G0,B0,A0,_10,
                R1,G1,B1,A1,_11,
                R2,G2,B2,A2,_12,
                R3,G3,B3,A3,_13){
        this._element.setAttribute('values',colorMatrixStr(
            R0,G0,B0,A0,_10,
            R1,G1,B1,A1,_11,
            R2,G2,B2,A2,_12,
            R3,G3,B3,A3,_13
        ))
    }

    getMatrix(out){
        out = out || new Array(20);
        for(var i = 0; i < this._matrix.length; ++i){
            out[i] = this._matrix[i];
        }
        return out;
    }

    set(description_or_SvgEffectColorMatrix){
        if(!description_or_SvgEffectColorMatrix){
            return;
        }
        if(description_or_SvgEffectColorMatrix instanceof SvgEffectColorMatrix){
            this.setMatrix(description_or_SvgEffectColorMatrix._matrix);
            return;
        }
        if(description_or_SvgEffectColorMatrix.matrix !== undefined){
            this.setMatrix(description_or_SvgEffectColorMatrix.matrix);
        }
    }
}
