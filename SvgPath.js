import {
    createSvgObject,
    createSvgPathCmdMoveTo,
    createSvgPathCmdLineTo,
    createSvgPathCmdLineStrip,
    createSvgPathCmdLineStrip2,
    createSvgPathCmdLines,
    createSvgPathCmdLines2,
    createSvgPathCmdArc,
    createSvgPathCmdQuadraticCurveTo,
    createSvgPathCmdCubicCurveTo,
    createSvgPathCmdClose
} from './SvgCmd';
import SvgType from './SvgType';
import * as Vec2 from 'foam-math/Vec2';
import SvgElementStyleable from './SvgElementStyleable';

let id = 0;

export default class SvgPath extends SvgElementStyleable{
    constructor(description_or_SvgPath){
        super(SvgType.PATH);
        this._cmd = '';
        this._totalLength = 0;
        this.set(description_or_SvgPath);
    }

    copy(){
        return new SvgPath(this);
    }

    _updateCmdAttribute(){
        this._element.setAttribute('d',this._cmd);
        this._totalLength = this._element.getTotalLength();
    }

    moveTo(pos){
        this.moveTo2(pos[0],pos[1]);
    }

    moveTo2(x,y){
        this._cmd += createSvgPathCmdMoveTo(x,y);
        this._updateCmdAttribute();
    }

    lineTo(pos){
        this.lineTo2(pos[0],pos[1]);
    }

    lineTo2(x,y){
        this._cmd += createSvgPathCmdLineTo(x,y);
        this._updateCmdAttribute();
    }

    lineStrip(points){
        this._cmd += createSvgPathCmdLineStrip(points);
        this._updateCmdAttribute();
    }

    lineStripFlat(points){
        this._cmd += createSvgPathCmdLineStrip2(points);
        this._updateCmdAttribute();
    }

    lines(points){
        this._cmd += createSvgPathCmdLines(points);
        this._updateCmdAttribute();
    }

    linesFlat(points){
        this._cmd += createSvgPathCmdLines2(points);
        this._updateCmdAttribute();
    }

    arc(radii,rotation,largeArcFlag,sweepFlag,center){
        this.arc2(radii[0],radii[1],rotation,largeArcFlag,sweepFlag,center[0],center[1]);
    }

    arc2(rx,ry,rotation,largeArcFlag,sweepFlag,cx,cy){
        this._cmd += createSvgPathCmdArc(rx,ry,rotation,largeArcFlag,sweepFlag,cx,cy);
        this._updateCmdAttribute();
    }

    ellipse(center,radii){
        this.ellipse2(center[0],center[1],radii[0],radii[0]);
    }

    ellipse2(cx,cy,rx,ry){
        console.warn('Not implemented.')
    }

    circle(center,radius){
        this.circle2(center[0],center[1],radius);
    }

    circle2(cx,cy,radius){
        console.warn('Not implemented.')
    }

    quadraticCurveTo(cp,pos){
        this.quadraticCurveTo2(cp[0],cp[1],pos[0],pos[1]);
    }

    quadraticCurveTo2(x1,y1,x,y){
        this._cmd += createSvgPathCmdQuadraticCurveTo(x1,y1,x,y);
        this._updateCmdAttribute();
    }

    cubicCurveTo(cp1,cp2,pos){
        this.cubicCurveTo2(cp1[0],cp1[1],cp2[0],cp2[1],pos[0],pos[1]);
    }

    cubicCurveTo2(x1,y1,x2,y2,x,y){
        this._cmd += createSvgPathCmdCubicCurveTo(x1,y1,x2,y2,x,y);
        this._updateCmdAttribute();
    }

    close(){
        this._cmd += createSvgPathCmdClose();
        this._updateCmdAttribute();
    }

    getTotalLength(){
        return this._totalLength;
    }

    getPositionAtLength(distance,out){
        out = out || [0,0];
        const p = this._element.getPointAtLength(distance);
        out[0] = p.x;
        out[1] = p.y;
        return out;
    }

    getPathSegmentAtLength(distance){
        return this._element.getPathSegAtLength(distance);
    }

    set(description_or_SvgPath){
        if(!description_or_SvgPath){
            return;
        }
        super.set(description_or_SvgPath);

        if(description_or_SvgPath instanceof SvgPath){
            this._cmd = description_or_SvgPath._cmd;
            this._element.setAttribute('cmd',this._cmd);
            return;
        }

        const description = description_or_SvgPath;
        //linestrip
        if(description.lineStrip !== undefined){
            this.lineStrip(description.lineStrip);
        }
        if(description.lineStripFlat !== undefined){
            this.lineStripFlat(description.lineStripFlat);
        }

        //lines
        if(description.lines !== undefined){
            this.lines(description.lines);
        }
        if(description.linesFlat !== undefined){
            this.linesFlat(description.linesFlat);
        }
    }
}