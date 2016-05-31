import SvgRoot from './SvgRoot';

/*--------------------------------------------------------------------------------------------------------------------*/
// CONTEXT2DSVG
/*--------------------------------------------------------------------------------------------------------------------*/

class Context2dSvg{
    constructor(element,config){
        this._element = element;
        this._root = new SvgRoot(this._element);
        this._xmlSerializer = new XMLSerializer();
    }

    updateSize(){
        this._root.updateSize();
    }

    addToDefinitions(element){
        this._root.addToDefinitions(element);
    }

    appendChild(element){
        return this._root.appendChild(element);
    }

    appendChildren(elements){
        return this._root.appendChildren(elements);
    }

    removeChild(child){
        return this._root.removeChild(child);
    }

    removeChildren(children){
        return this._root.removeChildren(children);
    }

    removeChildAtIndex(index){
        return this._root.removeChildAtIndex(index);
    }

    getNumChildren(){
        return this._root.getNumChildren();
    }

    getChildren(){
        return this._root.getChildren();
    }

    getChildAtIndex(index){
        return this._root.getChildAtIndex(index);
    }

    createClipPath(description_or_SvgClipPath){
        return this._root.createClipPath(description_or_SvgClipPath);
    }

    createLinearGradient(description_or_SvgLinearGradient){
        return this._root.createLinearGradient(description_or_SvgLinearGradient);
    }

    createRadialGradient(description_or_SvgRadialGradient){
        return this._root.createRadialGradient(description_or_SvgRadialGradient);
    }

    createPattern(description_or_SvgPattern){
        return this._root.createPattern(description_or_SvgPattern);
    }

    createMask(description_or_SvgMask){
        return this._root.createMask(description_or_SvgMask);
    }

    createGroup(description_or_SvgGroup){
        return this._root.createGroup(description_or_SvgGroup);
    }

    createPath(description_or_SvgPath){
        return this._root.createPath(description_or_SvgPath);
    }

    createCircle(description_or_SvgCircle){
        return this._root.createCircle(description_or_SvgCircle);
    }

    createEllipse(description_or_SvgEllipse){
        return this._root.createEllipse(description_or_SvgEllipse);
    }

    createImage(description_or_SvgImage){
        return this._root.createImage(description_or_SvgImage);
    }

    createLine(description_or_SvgLine){
        return this._root.createLine(description_or_SvgLine);
    }

    createRect(description_or_SvgRect){
        return this._root.createRect(description_or_SvgRect);
    }

    createPolyline(description_or_SvgPolyline){
        return this._root.createPolyline(description_or_SvgPolyline);
    }

    createPolygon(description_or_SvgPolygon){
        return this._root.createPolygon(description_or_SvgPolygon);
    }

    createText(description_or_SvgText){
        return this._root.createText(description_or_SvgText);
    }

    createReference(description){
        return this._root.createReference(description);
    }

    createDropShadow(description_or_SvgDropShadow){
        return this._root.createDropShadow(description_or_SvgDropShadow);
    }

    createFilter(description_or_SvgFilter){
        return this._root.createFilter(description_or_SvgFilter);
    }

    getSvgString(){
        return this._xmlSerializer.serializeToString(this._root._element);
    }

    makeShared(){
        Context2dSvg.__sharedContext = this;
    }

    static sharedContext(){
        return Context2dSvg.__sharedContext;
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/
// OPTIONAL SHARED CONTEXT
/*--------------------------------------------------------------------------------------------------------------------*/

Context2dSvg.__sharedContext = null;

/*--------------------------------------------------------------------------------------------------------------------*/
// EXPORT
/*--------------------------------------------------------------------------------------------------------------------*/

export default Context2dSvg;