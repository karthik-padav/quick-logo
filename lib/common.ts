import { toast } from "sonner";
import { updateSVG, fetchSvg } from "./actions/svg.actions";
import { findUser } from "./actions/user.actions";

const MAX_WIDTH = "800";
const WRAPPER_SVG = "wrapper-svg";
const INNER_SVG = "inner-svg";
const FOREIGN_OBJECT = "foreignObject";
const FOREIGN_OBJECT_DIV = "foreignObjectDiv";

export function processSVG(_svg: any) {
  if (typeof document === "undefined") return { _svg: "", data: [] };

  let tempEl = document.createElement("div");
  tempEl.appendChild(_svg);
  if (tempEl.querySelector(`.${WRAPPER_SVG}`)) {
    const regex = /fill="#[^"]*"/g;
    const _arr = JSON.stringify(_svg).match(regex) || [];
    let data = [];
    for (let i = 0; i < _arr.length; i++) {
      const id = `_id_${i}`;
      _svg = _svg.replace(_arr[i], `${_arr[i]} id="${id}"`);
      data.push({
        id,
        color: _arr[i].replace("fill=", "").replaceAll('"', ""),
      });
    }
    let wrapper_svg = tempEl.querySelector(`.${WRAPPER_SVG}`);
    wrapper_svg?.setAttribute("width", "100%");
    wrapper_svg?.setAttribute("height", "100%");

    // let ediv = tempEl.querySelector(`.${INNER_SVG}`);
    // ediv?.setAttribute("width", "100%");
    // ediv?.setAttribute("height", "100%");
    return { _svg: tempEl.innerHTML, data };
  } else {
    let div = document.createElement("div");
    let wrapper_svg = document.createElement("svg");
    wrapper_svg?.setAttribute("width", "100%");
    wrapper_svg?.setAttribute("height", "100%");
    wrapper_svg?.setAttribute("class", WRAPPER_SVG);
    wrapper_svg?.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    let foreignObject = document.createElement(FOREIGN_OBJECT);
    foreignObject?.setAttribute("width", "100%");
    foreignObject?.setAttribute("height", "100%");
    foreignObject?.setAttribute("class", FOREIGN_OBJECT);

    let foreignObjectDiv = document.createElement("div");
    foreignObjectDiv?.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    foreignObjectDiv?.setAttribute(
      "style",
      "text-align:center;overflow:hidden;position:absolute;top:0;bottom:0;right:0;left:0;margin:auto;display:flex;justify-content:center;align-items:center"
    );
    foreignObjectDiv?.setAttribute("class", FOREIGN_OBJECT_DIV);

    _svg?.setAttribute("class", INNER_SVG);
    _svg?.setAttribute("width", "100%");
    _svg?.setAttribute("height", "100%");

    foreignObjectDiv.appendChild(_svg);
    foreignObject.appendChild(foreignObjectDiv);
    wrapper_svg.appendChild(foreignObject);
    div.appendChild(wrapper_svg);

    return { _svg: div.innerHTML, data: [] };
  }
}

export function downloadPng({
  filename,
  ext,
  svg,
  key,
  session,
  source,
}: {
  filename: string;
  ext: string;
  svg: string;
  key: string;
  source: string;
  session: any;
}) {
  if (typeof document === "undefined") return;
  let tempEl = document.createElement("div");
  tempEl.innerHTML = svg;
  let element = tempEl.querySelector(`.${WRAPPER_SVG}`);
  if (element) {
    element?.setAttribute("width", MAX_WIDTH);
    element?.setAttribute("height", MAX_WIDTH);
    const svgString = new XMLSerializer().serializeToString(element);

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = generateFileName(`${filename}.${ext}`);
      link.href = dataUrl;
      link.click();
      updateSVG({
        svg: element?.outerHTML,
        filename,
        key,
        source,
        email: session?.data?.user?.email,
      });
    };

    // Set the image source to a data URL representing the SVG content
    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgString)));
  }
}

export function generateKey({
  controler,
  filename,
  source,
}: {
  controler: any;
  filename: string;
  source: string;
}) {
  let key = `filename:${filename}`;
  if (source) key = `${key}+source:${source}`;
  for (const k of Object.keys(controler).sort((a, b) => a.localeCompare(b))) {
    key = `${key}+${k}:${controler[k].attr.value}`;
  }
  return key.replaceAll(" ", "*");
}

export function downloadSvg({
  filename,
  ext,
  svg,
  key,
  session,
  source,
}: {
  filename: string;
  ext: string;
  svg: string;
  key: string;
  source: string;
  session: any;
}) {
  if (typeof document === "undefined") return;
  let tempEl = document.createElement("div");
  tempEl.innerHTML = svg;
  let element = tempEl.querySelector(`.${WRAPPER_SVG}`);
  if (element) {
    element?.setAttribute("width", MAX_WIDTH);
    element?.setAttribute("height", MAX_WIDTH);

    const svgString = new XMLSerializer().serializeToString(element);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = generateFileName(`${filename}.${ext}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    updateSVG({
      svg: element?.outerHTML,
      filename,
      key,
      source,
      email: session?.data?.user?.email,
    });
  }
}

function generateFileName(filename: string = "") {
  return `quick_logo_${filename}`;
}

export function getStyles(styles: string | null | undefined) {
  let obj: { [key: string]: string } = {};
  styles?.split(";").forEach((i) => {
    const [key, v] = i.split(":");
    if (key && v) obj[key.trim()] = v.trim();
  });
  return obj;
}

export function _controler(svg: string = "") {
  let iconSize: string | number = 100;
  let rotate: string | number = 0;
  let border: string | number = 1;
  let bgSize: string | number = 100;
  let radius: string | number = 0;
  let shadow: string = "0";
  let borderColor: string = "#000000";
  let fillColor: string = "#000000";
  let fillOpacity: string | number = 1;
  let bgColor: string =
    "linear-gradient(45deg, rgba(245,45,1,0.59) 0%, RGBA(252, 242, 1, 0.61) 100%)";

  if (typeof document !== "undefined") {
    let svgDoc = document.createElement("div");
    svgDoc.innerHTML = svg;

    const insvg = svgDoc?.querySelector(`.${INNER_SVG}`);
    const fbd = svgDoc?.querySelector(`.${FOREIGN_OBJECT_DIV}`);

    const fobjStyles = fbd?.getAttribute("style");
    const fObj = getStyles(fobjStyles);
    const innerSvgStyles = insvg?.getAttribute("style");
    const innerSvgStylesObj = getStyles(innerSvgStyles);
    iconSize = insvg?.getAttribute("width")?.replace("%", "") || iconSize;
    rotate =
      insvg
        ?.getAttribute("transform")
        ?.replace("rotate", "")
        ?.replace(")", "")
        ?.replace("(", "") || rotate;
    borderColor = insvg?.getAttribute("stroke") || borderColor;
    border = insvg?.getAttribute("stroke-width") || border;
    fillColor = insvg?.getAttribute("fill") || "#ffffff";
    fillOpacity = insvg?.getAttribute("fill-opacity") || 1;
    bgColor = fObj?.["background"] || bgColor;
    bgSize = fObj?.["width"]?.replace("%", "") || bgSize;
    radius = fObj?.["border-radius"]?.replace("%", "") || radius;
    shadow =
      fObj?.["box-shadow"]
        ?.split(" ")
        .find((i: string) => i.includes("em"))
        ?.replace("em", "") || shadow;
  }
  return {
    borderColor: {
      attr: {
        value: borderColor,
        type: "color",
      },
      label: "Border Color",
      valuePrefix: "",
      tab: "icon",
    },
    fillColor: {
      attr: {
        value: fillColor,
        type: "color",
      },
      label: "Fill Color",
      valuePrefix: "",
      tab: "icon",
    },
    fillOpacity: {
      label: "Fill Opacity",
      valuePrefix: "%",
      tab: "icon",
      attr: {
        type: "range",
        min: 0,
        max: 1,
        value: fillOpacity,
        step: 0.2,
        className: "w-full slider dark:bg-accent bg-gray-200",
      },
    },
    iconSize: {
      label: "Icon size",
      valuePrefix: "%",
      tab: "icon",
      attr: {
        type: "range",
        min: 5,
        max: 100,
        value: iconSize,
        step: 5,
        className: "w-full slider dark:bg-accent bg-gray-200",
      },
    },
    rotate: {
      attr: {
        type: "range",
        min: -180,
        max: 180,
        value: rotate,
        step: 10,
        className: "w-full slider dark:bg-accent bg-gray-200",
      },
      label: "Rotate",
      valuePrefix: "deg",
      tab: "icon",
    },
    border: {
      attr: {
        min: 1,
        max: 4,
        value: border,
        step: 1,
        type: "range",
        className: "w-full slider dark:bg-accent bg-gray-200",
      },
      label: "Border",
      valuePrefix: "px",
      tab: "icon",
    },
    bgColor: {
      attr: {
        type: "rgba_color",
        hideInputs: true,
        hideAdvancedSliders: true,
        hidePresets: true,
        hideGradientStop: true,
        value: bgColor,
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
      attr: {
        type: "range",
        min: 5,
        max: 100,
        value: bgSize,
        step: 5,
        className: "w-full slider dark:bg-accent bg-gray-200",
      },
    },
    radius: {
      label: "Radius",
      valuePrefix: "%",
      tab: "bg",
      attr: {
        type: "range",
        min: 0,
        max: 100,
        value: radius,
        step: 10,
        className: "w-full slider dark:bg-accent bg-gray-200",
      },
    },
    shadow: {
      label: "Shadow",
      valuePrefix: "em",
      tab: "bg",
      attr: {
        type: "range",
        min: 0,
        max: 1.6,
        value: parseInt(shadow),
        step: 0.4,
        className: "w-full slider dark:bg-accent bg-gray-200",
      },
    },
  };
}

export function updateSVGControl({
  key,
  svgDoc,
  value,
}: {
  key: string;
  value: string;
  svgDoc: Document;
}) {
  const wsvg = svgDoc.querySelector(`.${WRAPPER_SVG}`);
  const insvg = svgDoc.querySelector(`.${INNER_SVG}`);
  const fbd = svgDoc.querySelector(`.${FOREIGN_OBJECT_DIV}`);
  switch (key) {
    case "iconSize":
      insvg?.setAttribute("width", `${value}%`);
      insvg?.setAttribute("height", `${value}%`);
      break;
    case "rotate":
      insvg?.setAttribute("transform", `rotate(${value})`);
      break;
    case "border":
      insvg?.setAttribute("stroke-width", value);
      insvg?.setAttribute("stroke-linecap", "round");
      insvg?.setAttribute("stroke-linejoin", "round");
      break;
    case "borderColor":
      insvg?.setAttribute("stroke", value);
      break;
    case "fillOpacity":
      insvg?.setAttribute("fill-opacity", value);
      break;
    case "fillColor":
      insvg?.setAttribute("fill", value);
      break;
    case "bgColor":
    case "radius":
    case "bgSize":
    case "shadow":
      let fbdStyles = fbd?.getAttribute("style");
      let fbdObj = getStyles(fbdStyles);
      if (key === "radius") fbdObj["border-radius"] = `${value}%`;
      if (key === "bgColor") fbdObj["background"] = value;
      if (key === "bgSize") {
        fbdObj["width"] = `${value}%`;
        fbdObj["height"] = `${value}%`;
      }
      if (key === "shadow")
        fbdObj[
          "box-shadow"
        ] = `0 ${value}em ${value}em 0 rgba(0, 0, 0, 0.2), 0 ${value}em ${value}em 0 rgba(0, 0, 0, 0.19)`;

      let _styles = "";
      Object.keys(fbdObj).forEach(
        (key) => (_styles = `${_styles}${key}: ${fbdObj[key]}; `)
      );
      fbd?.setAttribute("style", _styles);
      break;

    default:
      break;
  }
  return new XMLSerializer().serializeToString(svgDoc);
}

export async function getWebsiteData() {
  const response = await fetch(
    "https://raw.githubusercontent.com/karthik-padav/public-data/refs/heads/main/upssp.json"
  );
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
}
