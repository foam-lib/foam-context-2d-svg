const SvgDef = {
    element: null,
    appendElement : function(element){
        this.element.appendChild(element._element);
    },
    hasElement : function(element){
        return element._element.parentNode === this.element;
    }
};

export default SvgDef;