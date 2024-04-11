const MAX_WIDTH = 800;


export function processSVG(_svg: any) {
  const regex = /fill="#[^"]*"/g;
  const _arr = _svg.match(regex) || []

  // Add id
  _svg = _svg.replace('<svg', '<svg id="inner-svg"')
  let data = []
  for (let i = 0; i < _arr.length; i++) {
    const id = `_id_${i}`
    _svg = _svg.replace(_arr[i], `${_arr[i]} id="${id}"`);
    data.push({ id, color: _arr[i].replace('fill=', '').replaceAll('"', '') })
  }
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="400px" height="400px" id="wrapper-svg">
  <foreignObject width="100%" height="100%" id="foreignObject">
  <div xmlns='http://www.w3.org/1999/xhtml' id='foreignObjectDiv' style="text-align:center;overflow:hidden;position: absolute;top: 0;bottom: 0;right: 0;left: 0;margin: auto;
">
  ${_svg}
  </div>
  </foreignObject>
  
    </svg>
    `
  return { _svg: svg, data }
}

export function downloadSvg() {

  // const MAX_WIDTH 
  // style


  // wrapper-svg
  // foreignObjectDiv
  // const wElm = document.getElementById('wrapper-svg');
  // let wElm_styles = wElm?.getAttribute("style");
  // let wElm_obj = getStyles(wElm_styles);
  // if (wElm_obj['width']) wElm_obj['width'] = convertToPx(wElm_obj['width'])
  // if (wElm_obj['height']) wElm_obj['height'] = convertToPx(wElm_obj['height'])
  // let w_style = '';
  // Object.keys(wElm_obj).forEach((key) => w_style = `${w_style}${key}:${wElm_obj[key]};`)
  // wElm?.setAttribute("style", w_style);

  // // ============================

  // const fbdElm = document.getElementById('foreignObjectDiv');
  // let fbdElm_styles = fbdElm?.getAttribute("style");
  // let fbdElm_obj = getStyles(fbdElm_styles);
  // if (fbdElm_obj['width']) fbdElm_obj['width'] = convertToPx(fbdElm_obj['width'])
  // if (fbdElm_obj['height']) fbdElm_obj['height'] = convertToPx(fbdElm_obj['height'])
  // let fbd_style = '';
  // Object.keys(fbdElm_obj).forEach((key) => fbd_style = `${fbd_style}${key}:${fbdElm_obj[key]};`)
  // fbdElm?.setAttribute("style", fbd_style);

  // // ============================

  const wElm = document.getElementById('wrapper-svg');
  wElm?.setAttribute('width', MAX_WIDTH)
  wElm?.setAttribute('height', MAX_WIDTH)


  // const fbElm = document.getElementById('foreignObject');
  // fbElm?.setAttribute('width', MAX_WIDTH)
  // fbElm?.setAttribute('height', MAX_WIDTH)

  // // ============================

  // const isElm = document.getElementById('inner-svg');
  // let isElm_width = isElm?.getAttribute('width')
  // if (isElm_width) isElm_width = convertToPx(isElm_width)
  // isElm?.setAttribute('width', isElm_width)
  // let isElm_height = isElm?.getAttribute('height')
  // if (isElm_height) isElm_height = convertToPx(isElm_height)
  // isElm?.setAttribute('height', isElm_height)

  // // ============================



  const svgString = document.getElementById('wrapper-svg')?.outerHTML;
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'font-awesome-icon.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export function getStyles(styles: string) {
  let obj = {}
  styles?.split(';').forEach((i) => {
    const [key, v] = i.split(':')
    if (key && v) obj[key] = v;
  })
  return obj
}


export async function setColor(id: string, color: string) {
  const element = document.getElementById(id);
  element?.setAttribute("fill", color)
  const colorEl = document.getElementById(`_color_${id}`)
  colorEl?.setAttribute('value', color)
}

export function rotate(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const element = document.getElementById('inner-svg');
  let styles = element?.getAttribute("style");
  let obj = getStyles(styles);
  obj['transform'] = `rotate(${value}deg)`
  let _style = '';
  Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
  element?.setAttribute("style", _style);
  let txt = document.getElementById('rotate-value');
  txt.innerHTML = `${value}&deg;`
}


export function shadow(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const element = document.getElementById('foreignObjectDiv');
  let styles = element?.getAttribute("style");
  let obj = getStyles(styles);
  obj['box-shadow'] = `0 ${value}px ${value}px 0 rgba(0, 0, 0, 0.2), 0 ${value}px ${value}px 0 rgba(0, 0, 0, 0.19)`
  let _style = '';
  Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
  element?.setAttribute("style", _style);
  let txt = document.getElementById('shadow-value');
  txt.innerHTML = `${value}px;`
}


export function iconResize(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const element = document.getElementById('inner-svg');
  let styles = element?.getAttribute("style");
  let obj = getStyles(styles);
  element?.setAttribute("width", `${value}%`);
  obj['margin'] = '0 auto';
  let _style = '';
  Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
  element?.setAttribute("style", _style);
  let txt = document.getElementById('icon-size-value');
  txt.innerHTML = `${value}%`

}

export function opacity(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const element = document.getElementById('wrapper-svg');
  element?.setAttribute("fill-opacity", value)
  let txt = document.getElementById('opacity-value');
  txt.innerHTML = value

}

export function border(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const element = document.getElementById('inner-svg');
  element?.setAttribute("stroke-width", value)
  element?.setAttribute("stroke-linecap", "round")
  element?.setAttribute("stroke-linejoin", "round")
  element?.setAttribute("stroke", "#FFEB4D")
  let txt = document.getElementById('border-value');
  txt.innerHTML = `${value}px`
}

interface RGBA {
  r: number, g: number, b: number, a: number
}

export function setBgColor(color: RGBA) {
  const { r, g, b, a } = color
  const element = document.getElementById('foreignObjectDiv');
  let styles = element?.getAttribute("style");
  let obj = getStyles(styles);
  obj['background-color'] = `rgb(${r} ${g} ${b} / ${a * 100}%)`;
  let _style = '';
  Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
  element?.setAttribute("style", _style);
}

export function resizeBg(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const element = document.getElementById('foreignObjectDiv');
  let styles = element?.getAttribute("style");
  let obj = getStyles(styles);
  obj['width'] = `${value}%`;
  obj['height'] = `${value}%`;
  let _style = '';
  Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
  element?.setAttribute("style", _style);
  let txt = document.getElementById('bg-size-value');
  txt.innerHTML = `${value}%`;

}

export function borderRandiusChange(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value
  const element = document.getElementById('foreignObjectDiv');
  let styles = element?.getAttribute("style");
  let obj = getStyles(styles);
  obj['border-radius'] = `${value}px`;
  let _style = '';
  Object.keys(obj).forEach((key) => _style = `${_style}${key}:${obj[key]};`)
  element?.setAttribute("style", _style);
  let txt = document.getElementById('radius-value');
  txt.innerHTML = `${value}px`;
}

export function controlList() {
  return {
    icon: [
      {
        label: "Rotate",
        label_id: "rotate-value",
        default_label_value: `0&deg;`,
        type: "range",
        min: -180,
        max: 180,
        defaultValue: 0,
        step: 5,
        _onChange: rotate
      },
      {
        label: "Border",
        label_id: "border-value",
        default_label_value: "0px",
        type: "range",
        min: 1,
        max: 4,
        defaultValue: 1,
        step: 0.1,
        _onChange: border
      },
      {
        label: "Icon Size",
        label_id: "icon-size-value",
        default_label_value: "100%",
        type: "range",
        min: 10,
        max: 100,
        defaultValue: 100,
        step: 1,
        _onChange: iconResize
      },
      {
        label: "Opacity",
        label_id: "opacity-value",
        default_label_value: 1,
        type: "range",
        min: 0,
        max: 1,
        defaultValue: 1,
        step: 0.1,
        _onChange: opacity
      }
    ],
    bg: [
      {
        label: "Background Color",
        label_id: "bg-color-value",
        default_label_value: "",
        type: "color",
        _onChange: setBgColor
      },
      {
        label: "Background Size",
        label_id: "bg-size-value",
        default_label_value: '100%',
        type: "range",
        min: 1,
        max: 100,
        defaultValue: 100,
        step: 1,
        _onChange: resizeBg
      },
      {
        label: "Radius",
        label_id: "radius-value",
        default_label_value: '0px',
        type: "range",
        min: 0,
        max: 300,
        defaultValue: 0,
        step: 10,
        _onChange: borderRandiusChange
      },
      {
        label: "Shadow",
        label_id: "shadow-value",
        default_label_value: '0px',
        type: "range",
        min: 0,
        max: 12,
        defaultValue: 0,
        step: 1,
        _onChange: shadow
      }
    ]
  }
}


