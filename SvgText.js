import SvgType from './SvgType';
import {
    DefaultStyleText,
    StyleSvgStyleMap
} from './Style';
import {
    createSvgObject,
    setHrefAttrib
} from './SvgCmd';
import SvgPath from './SvgPath';
import * as Vec2 from 'foam-math/Vec2';
import SvgElementStyleable from './SvgElementStyleable';

export default class SvgText extends SvgElementStyleable{
    constructor(description_or_SvgText){
        super(SvgType.TEXT);

        this._style = {};
        for(var key in DefaultStyleText){
            this._style[key] = DefaultStyleText[key];
        }

        this._anchor = null;
        this._length = null;
        this._string = '';
        this._path = null;
        this._textPathElement = null;

        this.set(description_or_SvgText);
    }

    copy(){
        return new SvgText(this);
    }

    setFontFamily(fontFamily){
        this._setStylePropertyNonArray(StyleSvgStyleMap.fontFamily,fontFamily);
    }

    getFontFamily(){
        return this._style.fontFamily;
    }

    setFontSize(fontSize){
        this._setStylePropertyNonArray(StyleSvgStyleMap.fontSize,fontSize);
    }

    getFontSize(){
        return this._style.fontSize;
    }

    setFontStyle(style){
        this._setStylePropertyNonArray(StyleSvgStyleMap.fontStyle,style);
    }

    getFontStyle(){
        return this._style.fontStyle;
    }

    setFontWeight(weight){
        this._setStylePropertyNonArray(StyleSvgStyleMap.fontWeight,weight);
    }

    getFontWeight(){
        return this._style.fontWeight;
    }

    setFontStretch(stretch){
        this._setStylePropertyNonArray(StyleSvgStyleMap.fontStretch,stretch);
    }

    getFontStretch(){
        return this._style.fontStretch;
    }

    setLetterSpacing(spacing){
        this._setStylePropertyNonArray(StyleSvgStyleMap.letterSpacing,spacing);
    }

    getLetterSpacing(){
        return this._style.letterSpacing;
    }

    setUnderlinePosition(pos){
        this._setStylePropertyNonArray(StyleSvgStyleMap.underlinePosition,pos);
    }

    getUnderlinePosition(){
        return this._style.underlinePosition;
    }

    setUnderlineThickness(thickness){
        this._setStylePropertyNonArray(StyleSvgStyleMap.underlineThickness,thickness);
    }

    getUnderlineThickness(){
        return this._style.underlineThickness;
    }

    setStrikethroughPosition(pos){
        this._setStylePropertyNonArray(StyleSvgStyleMap.strikethroughPosition,pos);
    }

    getStrikethroughPosition(){
        return this._style.strikethroughPosition;
    }

    setStrikethroughThickness(thickness){
        this._setStylePropertyNonArray(StyleSvgStyleMap.strikethroughThickness,thickness);
    }

    getStrikethroughThickness(){
        return this._style.strikethroughThickness;
    }

    setOverlinePosition(pos){
        this._setStylePropertyNonArray(StyleSvgStyleMap.overlinePosition,pos);
    }

    getOverlinePosition(){
        return this._style.overlinePosition;
    }

    setOverlineThickness(thickness){
        this._setStylePropertyNonArray(StyleSvgStyleMap.overlineThickness,thickness);
    }

    getOverlineThickness(){
        return this._style.overlineThickness;
    }

    setString(string){
        this._string = string;
        (this._textPathElement || this._element).textContent = string;
    }

    getString(){
        return this._string;
    }

    setPath(path){
        if(path && !(path instanceof SvgPath)){
            throw new TypeError('Element not of type SvgPath.');
        }
        this._path = path;
        if(path === null){
            if(this._textPathElement === null){
                return;
            }
            this._element.removeChild(this._textPathElement);
            this._textPathElement = null;
            this._element.textContent = this._string;
            return;
        }
        if(this._textPathElement === null){
            this._element.textContent = '';
            this._textPathElement = this._element.appendChild(createSvgObject(SvgType.TEXT_PATH));
            this._textPathElement.textContent = this._string;
        }
        let id = path._moveToDefinitions();

        setHrefAttrib(this._textPathElement,`#${id}`);
    }

    set(description_or_SvgText){
        if(!description_or_SvgText){
            return;
        }
        super.set(description_or_SvgText);

        if(description_or_SvgText instanceof SvgText){
            const element = description_or_SvgText;
            this.setFontFamily(element._style.fontFamily);
            this.setFontStyle(element._style.fontStyle);
            this.setFontWeight(element._style.fontWeight);
            this.setFontStretch(element._style.fontStretch);
            this.setLetterSpacing(element._style.letterSpacing);
            this.setUnderlinePosition(element._style.underlinePosition);
            this.setUnderlineThickness(element._style.underlineThickness);
            this.setStrikethroughPosition(element._style.strikethroughPosition);
            this.setStrikethroughThickness(element._style.strikethroughThickness);
            this.setOverlinePosition(element._style.overlinePosition);
            this.setOverlineThickness(element._style.overlineThickness);
            this.setString(element._string);
            this.setPath(element._path);
            return;
        }

        const description = description_or_SvgText;
        //font
        if(description.fontFamily !== undefined){
            this.setFontFamily(description.fontFamily);
        }
        if(description.fontSize !== undefined){
            this.setFontSize(description.fontSize);
        }
        if(description.fontStyle !== undefined){
            this.setFontStyle(description.fontStyle);
        }
        if(description.fontWeight !== undefined){
            this.setFontWeight(description.fontWeight);
        }
        if(description.fontStretch !== undefined){
            this.setFontStretch(description.fontStretch);
        }
        if(description.letterSpacing !== undefined){
            this.setLetterSpacing(description.letterSpacing);
        }
        if(description.underlinePosition !== undefined){
            this.setUnderlinePosition(description.underlinePosition);
        }
        if(description.underlineThickness !== undefined){
            this.setUnderlineThickness(description.underlineThickness);
        }
        if(description.strikethroughPosition !== undefined){
            this.setStrikethroughPosition(description.strikethroughPosition);
        }
        if(description.strikethroughThickness !== undefined){
            this.setStrikethroughThickness(description.strikethroughThickness);
        }
        if(description.overlinePosition !== undefined){
            this.setOverlinePosition(description.overlinePosition);
        }
        if(description.overlineThickness !== undefined){
            this.setOverlineThickness(description.overlineThickness);
        }

        //string
        if(description.string !== undefined){
            this.setString(description.string);
        }

        //textPath
        if(description.path !== undefined){
            this.setPath(description.path);
        }
    }
}