import SvgType from './SvgType';
import SvgPolyBase from './SvgPolyBase';

export default class SvgPolygon extends SvgPolyBase{
    constructor(description_or_SvgPolygon){
        super(SvgType.POLYGON,description_or_SvgPolygon);
    }

    copy(){
        return new SvgPolygon(this);
    }
}