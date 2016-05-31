
import SvgElementStyleable from './SvgElementStyleable';

export default class SvgPolyBase extends SvgElementStyleable{
    constructor(type,description){
        super(type);
        this.setFillStyle('none');
        this.setStrokeStyle('#000');
        this._points = '';
        this.set(description);
    }

    setPoints(points){
        this._points = '';
        this.appendPoints(points);
        this._element.setAttribute('points',this._points);
    }

    setPointsFlat(points){
        this._points = '';
        this.appendPointsFlat(points);
        this._element.setAttribute('points',this._points);
    }

    setPointsv(...points){
        this.setPoints(points);
    }

    setPointsFlatv(...points){
        this.setPointsFlat(points);
    }

    appendPoints(points){
        for(let i = 0; i < points.length; ++i){
            const point = points[i];
            this._points += `${point[0]},${point[1]} `;
        }
        this._element.setAttribute('points',this._points);
    }

    appendPointsFlat(points){
        for(let i = 0; i < points.length; i+=2){
            this._points += `${points[i]},${points[i+1]} `;
        }
        this._element.setAttribute('points',this._points);
    }

    appendPointsv(...points){
        this.appendPoints(points);
    }

    appendPointsFlatv(...points){
        this.appendPointsFlat(points);
    }

    appendPoint(point){
        this.appendPoint2(point[0],point[1]);
    }

    appendPoint2(x,y){
        this._points += `${x},${y} `;
        this._element.setAttribute('points',this._points);
    }

    set(description_or_SvgPolybase){
        if(!description_or_SvgPolybase){
            return;
        }
        super.set(description_or_SvgPolybase);

        if(description_or_SvgPolybase instanceof SvgPolyBase){
            this._points = description_or_SvgPolybase._points;
            this._element.setAttribute('points',this._points);
            return;
        }

        const description = description_or_SvgPolybase;
        //points
        if(description.points !== undefined){
            this.setPoints(description.points);
        }
        if(description.pointsFlat !== undefined){
            this.setPointsFlat(description.pointsFlat);
        }
    }
}