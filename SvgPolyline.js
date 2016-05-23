import SvgType from './SvgType';
import SvgPolyBase from './SvgPolyBase';

export default class SvgPolyline extends SvgPolyBase{
    constructor(description_or_SvgPolygon){
        super(SvgType.POLYLINE,description_or_SvgPolygon);
    }

    copy(){
        return new SvgPolyline(this);
    }
}