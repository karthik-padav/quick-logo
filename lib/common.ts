import { toast } from "sonner";
import { updateSVG } from "./actions/svg.actions";

const MAX_WIDTH = 800;
const WRAPPER_SVG = 'wrapper-svg';
const INNER_SVG = 'inner-svg';
const FOREIGN_OBJECT = 'foreignObject';
const FOREIGN_OBJECT_DIV = 'foreignObjectDiv';


export function processSVG(_svg: any) {

    let tempEl = document.createElement('div');
    tempEl.appendChild(_svg)
    if (tempEl.querySelector(`#${WRAPPER_SVG}`)) {
        const regex = /fill="#[^"]*"/g;
        const _arr = JSON.stringify(_svg).match(regex) || []
        let data = []
        for (let i = 0; i < _arr.length; i++) {
            const id = `_id_${i}`
            _svg = _svg.replace(_arr[i], `${_arr[i]} id="${id}"`);
            data.push({ id, color: _arr[i].replace('fill=', '').replaceAll('"', '') })
        }
        let ediv = tempEl.querySelector(`#${INNER_SVG}`)
        ediv?.setAttribute('width', '100%');
        ediv?.setAttribute('height', '100%');
        return { _svg: tempEl.innerHTML, data }
    } else {
        let div = document.createElement('div');
        let wrapper_svg = document.createElement('svg');
        wrapper_svg?.setAttribute('width', '400px');
        wrapper_svg?.setAttribute('height', '400px');
        wrapper_svg?.setAttribute('id', WRAPPER_SVG);
        wrapper_svg?.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        let foreignObject = document.createElement('foreignObject');
        foreignObject?.setAttribute('width', '100%');
        foreignObject?.setAttribute('height', '100%');
        foreignObject?.setAttribute('id', FOREIGN_OBJECT);

        let foreignObjectDiv = document.createElement('div');
        foreignObjectDiv?.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
        foreignObjectDiv?.setAttribute('style', 'text-align:center;overflow:hidden;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;');
        foreignObjectDiv?.setAttribute('id', FOREIGN_OBJECT_DIV);

        _svg?.setAttribute('id', INNER_SVG)
        _svg?.setAttribute('width', '100%');
        _svg?.setAttribute('height', '100%');

        foreignObjectDiv.appendChild(_svg)
        foreignObject.appendChild(foreignObjectDiv)
        wrapper_svg.appendChild(foreignObject)
        div.appendChild(wrapper_svg)

        return { _svg: div.innerHTML, data: [] }
    }
}


export function downloadPng(filename: string, ext: string) {
    const element = document.getElementById('wrapper-svg');
    let clonedElement = element.cloneNode(true);
    clonedElement?.setAttribute('width', MAX_WIDTH)
    clonedElement?.setAttribute('height', MAX_WIDTH)
    clonedElement = clonedElement?.outerHTML;
    const blob = new Blob([clonedElement], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const img = new Image();

    // Once the image is loaded, draw it onto a canvas and convert to PNG
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Convert canvas to PNG data URL
        const dataUrl = canvas.toDataURL('image/png');

        // Trigger download of the PNG image
        const link = document.createElement('a');
        link.download = generateFileName(`${filename}.${ext}`);
        link.href = dataUrl;
        link.click();
        uploadToServer({ svg: clonedElement, filename });
    };

    // Set the image source to a data URL representing the SVG content
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(clonedElement)));

    toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM"
    })
}

function generateFileName(filename: string = "") {
    return `quick_logo_${filename}`
}

export function downloadSvg(filename: string, ext: string) {
    const element = document.getElementById('wrapper-svg');
    let clonedElement = element?.cloneNode(true);
    clonedElement?.setAttribute('width', MAX_WIDTH)
    clonedElement?.setAttribute('height', MAX_WIDTH)
    clonedElement = clonedElement?.outerHTML;
    const blob = new Blob([clonedElement], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');



    a.href = url;
    a.download = generateFileName(`${filename}.${ext}`);
    uploadToServer({ svg: clonedElement, filename });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

function uploadToServer({ svg, filename }: { svg: string, filename: string }) {
    updateSVG({ svg, filename })
}

export function getStyles(styles: string) {
    let obj = {}
    styles?.split(';').forEach((i) => {
        const [key, v] = i.split(':')
        if (key && v) obj[key] = v;
    })
    return obj
}


export function _controler() {
    const wsvg = document.getElementById('wrapper-svg');
    const innerSvgEl = document.getElementById('inner-svg');
    const fobjDiv = document.getElementById('foreignObjectDiv');

    const fobjStyles = fobjDiv?.getAttribute("style");
    const fObj = getStyles(fobjStyles);

    const innerSvgStyles = innerSvgEl?.getAttribute("style");
    const innerSvgStylesObj = getStyles(innerSvgStyles);
    const iconSize = innerSvgEl?.getAttribute("width")?.replace('%', '') || 100;
    const rotate = innerSvgStylesObj?.['transform']?.replace('rotate', '')?.replace('deg', '') || 0;
    const borderColor = innerSvgEl?.getAttribute('stroke') || "#000000";
    const border = innerSvgEl?.getAttribute('stroke-width') || 1
    const fillColor = innerSvgEl?.getAttribute('fill') || "#ffffff";
    const fillOpacity = innerSvgEl?.getAttribute('fill-opacity') || 1;
    const bgColor = fObj?.['background'] || 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
    const bgSize = fObj?.['width']?.replace('%', '') || 100;
    const radius = fObj?.['border-radius']?.replace('px', '') || 0;
    const shadow = fObj?.['box-shadow']?.split(' ').find(i => i.includes('px'))?.replace('px', '') || 0
    return {
        iconSize: {
            label: "Icon size",
            valuePrefix: "%",
            tab: "icon",
            setSVG: (value: string, ref: any) => {
                const wrapperSvgElement = ref.current
                const element = wrapperSvgElement.getElementById('inner-svg');
                let styles = element?.getAttribute("style");
                let obj = getStyles(styles);
                element?.setAttribute("width", `${value}%`);
                obj['margin'] = '0 auto';
                let _style = '';
                Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
                element?.setAttribute("style", _style);
            },
            attr: {
                type: "range",
                min: 1,
                max: 100,
                value: iconSize,
                step: 5,
                className: "w-full slider dark:bg-accent bg-gray-200"
            }
        },
        rotate: {
            attr: {
                type: "range",
                min: -180,
                max: 180,
                value: rotate,
                step: 5,
                className: "w-full slider dark:bg-accent bg-gray-200"
            },
            label: "Rotate",
            valuePrefix: "deg",
            tab: "icon",
            setSVG: (value: string) => {
                const element = document.getElementById('inner-svg');
                let styles = element?.getAttribute("style");
                let obj = getStyles(styles);
                obj['transform'] = `rotate(${value}deg)`
                let _style = '';
                Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
                element?.setAttribute("style", _style);
            }
        },
        borderColor: {
            attr: {
                value: borderColor,
                type: "color",
            },
            label: "Border Color",
            valuePrefix: "",
            tab: "icon",
            setSVG: (value: string) => {
                const element = document.getElementById('inner-svg');
                element?.setAttribute("stroke", value)
            }
        },
        border: {
            attr: {
                min: 1,
                max: 4,
                value: border,
                step: 0.1,
                type: "range",
                className: "w-full slider dark:bg-accent bg-gray-200"
            },
            label: "Border",
            valuePrefix: "px",
            tab: "icon",
            setSVG: (value: string) => {
                const element = document.getElementById('inner-svg');
                element?.setAttribute("stroke-width", value)
                element?.setAttribute("stroke-linecap", "round")
                element?.setAttribute("stroke-linejoin", "round")
            }
        },
        // fillColor: {
        //     attr: {
        //         value: fillColor,
        //         type: "color",
        //     },
        //     label: "Fill Color",
        //     valuePrefix: "",
        //     tab: "icon",
        //     setSVG: (value: string) => {
        //         const element = document.getElementById('inner-svg');
        //         element?.setAttribute("fill", value)
        //     }
        // },
        // fillOpacity: {
        //     attr: {
        //         min: 0,
        //         max: 1,
        //         value: fillOpacity,
        //         step: 0.1,
        //         type: "range",
        //         className: "w-full slider dark:bg-accent bg-gray-200"
        //     },
        //     label: "Fill Opacity",
        //     valuePrefix: "%",
        //     tab: "icon",
        //     setSVG: (value: string) => {
        //         const element = document.getElementById('inner-svg');
        //         element?.setAttribute("fill-opacity", value)
        //     }
        // },
        bgColor: {
            attr: {
                type: "rgba_color",
                hideInputs: true,
                hideAdvancedSliders: true,
                hidePresets: true,
                hideGradientStop: true,
                value: bgColor,
            },
            setSVG: (color: string) => {
                const element = document.getElementById('foreignObjectDiv');
                let styles = element?.getAttribute("style");
                let obj = getStyles(styles);
                obj['background'] = color;
                let _style = '';
                Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
                element?.setAttribute("style", _style);
            },
            label: "Background Color",
            valuePrefix: "",
            hideValue: true,
            tab: "bg",
        },
        bgSize: {
            label: "Background Size",
            valuePrefix: "%",
            tab: "bg",
            setSVG: (value: string) => {
                const element = document.getElementById('foreignObjectDiv');
                let styles = element?.getAttribute("style");
                let obj = getStyles(styles);
                obj['width'] = `${value}%`;
                obj['height'] = `${value}%`;
                let _style = '';
                Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
                element?.setAttribute("style", _style);
            },
            attr: {
                type: "range",
                min: 1,
                max: 100,
                value: bgSize,
                step: 1,
                className: "w-full slider dark:bg-accent bg-gray-200"
            }
        },
        radius: {
            label: "Radius",
            valuePrefix: "px",
            tab: "bg",
            setSVG: (value: string) => {
                const element = document.getElementById('foreignObjectDiv');
                let styles = element?.getAttribute("style");
                let obj = getStyles(styles);
                obj['border-radius'] = `${value}px`;
                let _style = '';
                Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
                element?.setAttribute("style", _style);
            },
            attr: {
                type: "range",
                min: 0,
                max: 300,
                value: radius,
                step: 10,
                className: "w-full slider dark:bg-accent bg-gray-200"
            }
        },
        shadow: {
            label: "Shadow",
            valuePrefix: "px",
            tab: "bg",
            setSVG: (value: string) => {
                const element = document.getElementById('foreignObjectDiv');
                let styles = element?.getAttribute("style");
                let obj = getStyles(styles);
                obj['box-shadow'] = `0 ${value}px ${value}px 0 rgba(0, 0, 0, 0.2), 0 ${value}px ${value}px 0 rgba(0, 0, 0, 0.19)`
                let _style = '';
                Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
                element?.setAttribute("style", _style);
            },
            attr: {
                type: "range",
                min: 0,
                max: 12,
                value: parseInt(shadow),
                step: 1,
                className: "w-full slider dark:bg-accent bg-gray-200"
            }
        }
    }
}


export function updateSVGControl({ key, svgDoc, value }: { key: string, value: string, svgDoc: string }) {
    console.log(key, svgDoc, 'controler123')

    const wsvg = svgDoc.querySelector(`#${WRAPPER_SVG}`)
    const insvg = svgDoc.querySelector(`#${INNER_SVG}`)
    const fbd = svgDoc.querySelector(`#${FOREIGN_OBJECT_DIV}`)
    switch (key) {
        case 'iconSize':
            insvg?.setAttribute('width', `${value}%`);
            insvg?.setAttribute('height', `${value}%`);
            break;

        default:
            break;
    }
    // const shadow = controler?.shadow?.attr?.value;
    // const radius = controler?.radius?.attr?.value;
    // const bgSize = controler?.bgSize?.attr?.value;
    // const bgColor = controler?.bgColor?.attr?.value;
    // const rotate = controler?.rotate?.attr?.value;
    // const iconSize = controler?.iconSize?.attr?.value;
    // const borderColor = controler?.borderColor?.attr?.value
    // const border = controler?.border?.attr?.value

    // if (iconSize) {
    //     insvg?.setAttribute('width', `${iconSize}%`);
    //     insvg?.setAttribute('height', `${iconSize}%`);
    // }
    // insvg?.setAttribute("stroke", borderColor);
    // insvg?.setAttribute("stroke-width", border)
    // insvg?.setAttribute("stroke-linecap", "round")
    // insvg?.setAttribute("stroke-linejoin", "round")

    // let styles = insvg?.getAttribute("style");
    // let obj = getStyles(styles) ? getStyles(styles) : {};
    // console.log(getStyles(styles), 'obj123')
    // obj['margin'] = '0 auto';
    // if (rotate || rotate === 0)
    //     obj['transform'] = `rotate(${rotate}deg)`
    // Object.keys(obj).forEach((key) => _styles = `${styles}${key}:${obj[key]};`)
    // console.log(getStyles(styles), 'styles123')
    // insvg?.setAttribute("style", _styles);

    // let fbdStyles = fbd?.getAttribute("style");
    // let fbdObj = getStyles(fbdStyles);
    // if (bgColor)
    //     fbdObj['background'] = bgColor;
    // if (bgSize || bgSize === 0) {
    //     fbdObj['width'] = `${bgSize}%`;
    //     fbdObj['height'] = `${bgSize}%`;
    // }
    // if (radius)
    //     fbdObj['border-radius'] = `${radius}px`;
    // if (shadow)
    //     fbdObj['box-shadow'] = `0 ${shadow}px ${shadow}px 0 rgba(0, 0, 0, 0.2), 0 ${shadow}px ${shadow}px 0 rgba(0, 0, 0, 0.19)`


    // Object.keys(fbdObj).forEach((key) => fbdStyles = `${fbdStyles}${key}:${fbdObj[key]};`)
    // fbd?.setAttribute("style", fbdStyles);

    return new XMLSerializer().serializeToString(svgDoc);

}

