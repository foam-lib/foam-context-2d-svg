import {createSvgObject} from './SvgCmd';
import SvgType from './SvgType';
import * as Vec2 from 'foam-math/Vec2';

import SvgDef from './SvgDef';
import SvgClipPath from './SvgClipPath';
import SvgMask from './SvgMask';
import SvgGradientLinear from './SvgGradientLinear';
import SvgGradientRadial from './SvgGradientRadial';
import SvgPattern from './SvgPattern';
import SvgElementBase from './SvgElementBase';
import SvgGroup from './SvgGroup';
import SvgPath from './SvgPath';
import SvgCircle from './SvgCircle';
import SvgEllipse from './SvgEllipse';
import SvgImage from './SvgImage';
import SvgLine from './SvgLine';
import SvgRect from './SvgRect';
import SvgPolyline from './SvgPolyline';
import SvgPolygon from './SvgPolygon';
import SvgText from './SvgText';
import SvgReference from './SvgReference';

export default class SvgRoot{
    constructor(parent){
        this._element = parent.appendChild(createSvgObject(SvgType.SVG));
        this._element.setAttribute('version',1.2);
        this._element.setAttribute('xmlns','http://www.w3.org/2000/svg');
        this._element.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
        this._defs = SvgDef.element = this._element.appendChild(createSvgObject(SvgType.DEFS));
        this._group = new SvgGroup();
        this._element._parent = this;
        this._element.appendChild(this._group._element);
        this.updateSize();
    }

    updateSize(){
        const parentNode = this._element.parentNode;
        const width  = parentNode.offsetWidth;
        const height = parentNode.offsetHeight;
        this._element.setAttribute('width',width);
        this._element.setAttribute('height',height);
        this._element.setAttribute('viewbox',`0 0 ${width} ${height}` );
    }

    addToDefinitions(element){
        if(!(element instanceof SvgElementBase)){
            throw new TypeError('Element not of type SvgElementBase.');
        }
        element._moveToDefinitions();
    }

    appendChild(element){
        this._group.appendChild(element);
    }

    appendChildren(elements){
        this._group.appendChildren(elements);
    }

    removeChild(child){
        this._group.removeChild(child);
    }

    removeChildren(elements){
        this._group.removeChildren(elements);
    }

    removeChildAtIndex(index){
        this._group.removeChildAtIndex(index);
    }

    getNumChildren(){
        return this._group.getNumChildren();
    }

    createClipPath(description_or_SvgClipPath){
        return new SvgClipPath(description_or_SvgClipPath);
    }

    createMask(description_or_SvgMask){
        return new SvgMask(description_or_SvgMask);
    }

    createGroup(description_or_SvgGroup){
        return new SvgGroup(description_or_SvgGroup);
    }

    createLinearGradient(description_or_SvgLinearGradient){
        return new SvgGradientLinear(description_or_SvgLinearGradient);
    }

    createRadialGradient(description_or_SvgRadialGradient){
        return new SvgGradientRadial(description_or_SvgRadialGradient);
    }

    createPattern(description_or_SvgPattern){
        return new SvgPattern(description_or_SvgPattern);
    }

    createPath(description_or_SvgPath){
        return new SvgPath(description_or_SvgPath);
    }

    createCircle(description_or_SvgCircle){
        return new SvgCircle(description_or_SvgCircle);
    }

    createEllipse(description_or_SvgEllipse){
        return new SvgEllipse(description_or_SvgEllipse);
    }

    createImage(description_or_SvgImage){
        return new SvgImage(description_or_SvgImage);
    }

    createLine(description_or_SvgLine){
        return new SvgLine(description_or_SvgLine);
    }

    createRect(description_or_SvgRect){
        return new SvgRect(description_or_SvgRect);
    }

    createPolyline(description_or_SvgPolyline){
        return new SvgPolyline(description_or_SvgPolyline);
    }

    createPolygon(description_or_SvgPolygon){
        return new SvgPolygon(description_or_SvgPolygon);
    }

    createText(description_or_SvgText){
        return new SvgText(description_or_SvgText);
    }

    createReference(description){
        return new SvgReference(description);
    }

    set(description){
        if(!description){
            return;
        }
        if(description.children !== undefined){
            const children = description.children;
            for(let i = 0; i < children.length; ++i){
                this.appendChild(children[i]);
            }
        }
    }
}
