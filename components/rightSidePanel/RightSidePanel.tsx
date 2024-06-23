import { useEffect, useRef, useState } from "react";
import { fetchSvg } from "@/lib/actions/svg.actions";

interface Params {
  onSelect: (html: Element | null, filename: string) => void;
  svgdata: any;
}
interface ListItem {
  _id: string;
  svg: string;
  filename: string;
}

export default function RightSidePanel({ svgdata, onSelect }: Params) {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    if (svgdata.filename) fetchRelatedSVG();
  }, [svgdata.filename]);

  async function fetchRelatedSVG() {
    const data = await fetchSvg({ userId: "", icon: "" });
    setList(data);
  }

  async function handleSelect({
    svg,
    filename,
  }: {
    svg: string;
    filename: string;
  }) {
    if (typeof document !== "undefined") {
      let svgDoc = document.createElement("div");
      svgDoc.innerHTML = svg;

      const insvg = svgDoc?.querySelector(`.wrapper-svg`);
      await onSelect(insvg, filename);
    }
  }

  if (!list.length) return null;
  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
      {list.map((i: ListItem) => {
        const html = { __html: i.svg };
        return (
          <div
            className="sample_svg flex justify-center p-2 items-center rounded-md bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 cursor-pointer"
            key={i._id}
            dangerouslySetInnerHTML={html}
            onClick={() => handleSelect(i)}
          />
        );
      })}
    </div>
  );
}
