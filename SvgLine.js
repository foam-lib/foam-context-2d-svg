import SvgType from './SvgType';
import * as Vec2 from 'foam-math/Vec2';
import SvgElementStyleable from './SvgElementStyleable';

export default class SvgLine extends SvgElementStyleable{
    constructor(description_or_SvgLine){
        super(SvgType.LINE);
        this._position = [0,0,0,0];
        this.set(description_or_SvgLine);
    }

    copy(){
        return new SvgLine(this);
    }

    setPositionX(x){
        this._position[0] = x;
        this._element.setAttribute('x1',x);
    }

    setPositionY(y){
        this._position[1] = y;
        this._element.setAttribute('y1',y);
    }

    setPositionFrom(pos){
        this.setPosition(pos);
    }

    setPositionFromX(x){
        this.setPositionX(x);
    }

    setPositionFromY(y){
        this.setPositionY(y);
    }

    getPositionFrom(out){
        return Vec2.set(out || Vec2.create(),this._position[2],this._position[3]);
    }

    setPositionToX(x){
        this._position[2] = x;
        this._element.setAttribute('x2',x);
    }

    setPositionToY(y){
        this._position[3] = y;
        this._element.setAttribute('y2',y);
    }

    setPositionTo2(x,y){
        this.setPositionToX(x);
        this.setPositionToY(y);
    }

    setPositionTo(pos){
        this.setPositionTo2(pos[0],pos[1]);
    }

    setPositionFromTo(from,to){
        this.setPositionFromTo2(from[0],from[1],to[0],to[1]);
    }

    setPositionFromTo2(x1,y1,x2,y2){
        this._position[0] = x1;
        this._position[1] = y1;
        this._position[2] = x2;
        this._position[3] = y2;
        this._element.setAttribute('x1',x1);
        this._element.setAttribute('y1',y1);
        this._element.setAttribute('x2',x2);
        this._element.setAttribute('y2',y2);
    }

    set(description_or_SvgLine){
        if(!description_or_SvgLine){
            return;
        }
        super.set(description_or_SvgLine);

        //copy
        if(description_or_SvgLine instanceof SvgLine){
            const element = description_or_SvgLine;
            this.setPositionFromTo2(element._position[0],element._position[1],element._position[2],element._position[3]);
            return;
        }

        const description = description_or_SvgLine;
        //positions
        if(description.from !== undefined){
            this.setPositionFrom(description.from);
        }
        if(description.to !== undefined){
            this.setPositionTo(description.to);
        }
        if(description.fromX !== undefined){
            this.setPositionFromX(description.fromX);
        }
        if(description.fromY !== undefined){
            this.setPositionFromY(description.fromY);
        }
        if(description.toX !== undefined){
            this.setPositionToX(description.toX);
        }
        if(description.toY !== undefined){
            this.setPositionToY(description.toY);
        }
        if(description.fromTo !== undefined){
            const fromTo = description.fromTo;
            this.setPositionFromTo(fromTo[0],fromTo[1]);
        }
        if(description.fromTo2 !== undefined){
            const fromTo = description.fromTo2;
            this.setPositionFromTo2(fromTo[0],fromTo[1],fromTo[2],fromTo[3]);
        }
    }
}