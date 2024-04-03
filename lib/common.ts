export function processSVG(_svg: any) {
    const regex = /fill="#[^"]*"/g;
    const _arr = _svg.match(regex || [])
    for (let i = 0; i < _arr.length; i++) {
        _svg = _svg.replace(_arr[i], `fill={color_${i}}`);
    }
    console.log(_svg, 'replacedStr123')
    console.log(_arr, 'replacedStr123')
    return { _svg, _arr }
}