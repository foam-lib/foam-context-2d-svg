export function createSvgObject(type){
    return document.createElementNS("http://www.w3.org/2000/svg",type);
}

export function setHrefAttrib(element,value){
    element.setAttributeNS("http://www.w3.org/1999/xlink",'xlink:href',value);
}

export function createTagFromHtml(html){
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

export function createSvgPathCmdMoveTo(x,y){
    return 'M ' + x + ' ' + y ;
}

export function createSvgPathCmdLineTo(x,y){
    return 'L ' + x + ' ' + y ;
}

export function createSvgPathCmdLineStrip2(points){
    let cmd = '';
    for(let i = 0, l = points.length; i < l; i+=2){
        cmd += 'L ' + points[i] + ' ' + points[i+1] + ' ';
    }
    return cmd;
}

export function createSvgPathCmdLineStrip(points){
    let cmd = '';
    for(let i = 0, l = points.length; i < l; ++i){
        cmd += 'L ' + points[i][0] + ' ' + points[i][1] + ' ';
    }
    return cmd;
}

export function createSvgPathCmdLines(points){
    let cmd = '';
    for(let i = 0, l = points.length; i < l; i+=2){
        const a = points[i  ];
        const b = points[i+1];
        cmd += `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} `;
    }
    return cmd;
}

export function createSvgPathCmdLines2(points){
    let cmd = '';
    for(let i = 0, l = points.length; i < l; i+=4){
        cmd += `M ${points[i]} ${points[i+1]} L ${points[i+2]} ${points[i+3]} `;
    }
    return cmd;
}

export function createSvgPathCmdArc(rx,ry,rotation,largeArcFlag,sweepFlag,x,y){
    return `A ${rx} ${ry} ${rotation} ${largeArcFlag} ${sweepFlag} ${x} ${y} `;
}

export function createSvgPathCmdQuadraticCurveTo(x1,y1,x,y){
    return `Q ${x1} ${y1} ${x} ${y} `;
}

export function createSvgPathCmdCubicCurveTo(x1,y1,x2,y2,x,y){
    return `C ${x1} ${y1} ${x2} ${y2} ${x} ${y} `;
}

export function createSvgPathCmdClose(){
    return 'Z';
}