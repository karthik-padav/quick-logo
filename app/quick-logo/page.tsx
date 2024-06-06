"use client";

import { processSVG, _controler, updateSVGControl } from "@/lib/common";

import { ReactNode, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DrawerWrapper from "@/components/drawerWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ColorPicker from "react-best-gradient-color-picker";

import RightSidePanel from "@/components/rightSidePanel";

export default function Home() {
  const [svgdata, setSvgData] = useState<{
    _svg: string;
    data: { id: string; color: string }[];
    filename: string;
    controler: any;
  }>({ _svg: "", data: [], filename: "", controler: _controler() });
  const downloadableZoneRef = useRef<HTMLInputElement>(null);
  const downloadWrapperRef = useRef<HTMLInputElement>(null);
  const controlerRef = useRef<HTMLInputElement>(null);

  const [color, setColor] = useState<string>("");

  function handleControler(value: string, id: string) {
    setSvgData((prev) => {
      let { controler, _svg, ...rest } = prev;
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(_svg, "image/svg+xml");

      _svg = updateSVGControl({ key: id, svgDoc, value });

      controler = {
        ...controler,
        [id]: {
          ...controler[id],
          attr: { ...controler[id].attr, value },
        },
      };
      return { ...rest, _svg, controler };
    });
  }

  function selectedSVG(html: Element | null, filename: string) {
    const { _svg, data } = processSVG(html);
    setSvgData({ _svg, data, filename, controler: _controler(_svg) });
  }

  const { controler, _svg } = svgdata;
  const html = { __html: _svg };
  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 p-4 rounded-md bg-gray-100 dark:bg-gray-900 ">
          <Tabs defaultValue="icon" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger className="w-full" value="icon">
                Icon
              </TabsTrigger>
              <TabsTrigger className="w-full" value="bg">
                Background
              </TabsTrigger>
            </TabsList>
            {["icon", "bg"].map((i) => {
              return (
                <TabsContent
                  key={i}
                  value={i}
                  className="p-4 rounded-lg mt-4 md:min-h-96"
                >
                  <div>
                    {controler &&
                      Object.keys(controler)
                        .filter((key) => controler[key].tab === i)
                        .map((key) => {
                          const { attr, label, valuePrefix, hideValue } =
                            controler[key];
                          const { type, value, ...rest } = attr;
                          return (
                            <div key={key} className="mb-4">
                              <p className="flex justify-between mb-1">
                                {label}
                                {!hideValue && (
                                  <span>
                                    {attr.value === "currentColor"
                                      ? "#000000"
                                      : attr.value}
                                    {valuePrefix}
                                  </span>
                                )}
                              </p>
                              {attr.type === "rgba_color" ? (
                                <ColorPicker
                                  {...rest}
                                  width={200}
                                  height={200}
                                  id={key}
                                  value={color}
                                  onChange={async (color) => {
                                    setColor(color);
                                    await handleControler(color, key);
                                  }}
                                />
                              ) : (
                                <input
                                  disabled={!svgdata?._svg}
                                  {...attr}
                                  id={key}
                                  onChange={async (e) => {
                                    const { value } = e.target;
                                    await handleControler(value, key);
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>

        <div className="col-span-2 p-4 rounded-md bg-gray-100 dark:bg-gray-900">
          <DrawerWrapper onSelect={selectedSVG} svgdata={svgdata} />
          <div
            ref={downloadWrapperRef}
            className="p-10 w-full min-h-96 relative h-auto flex justify-center items-center dark:bg-gray-900 bg-gray-100 rounded-lg bg-[url('/grid.svg')]"
          >
            {svgdata?._svg ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      dangerouslySetInnerHTML={html}
                      ref={downloadableZoneRef}
                      className="w-full outline-2 outline-dashed outline-[#9C92AC20] hover:outline-[#9C92AC50] bg-[#9C92AC15] hover:bg-[#9C92AC25] flex justify-center items-center"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Downloadable Zone</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <p>
                Press
                <span className="leading-1 text-white font-bold bg-red-400 rounded-lg border border-base-content/20 py-1 px-3 mx-1">
                  <kbd>Ctrl + K</kbd>
                </span>
                to select icon
              </p>
            )}
          </div>
        </div>
        <div className="col-span-1 p-4 rounded-md bg-gray-100 dark:bg-gray-900 ">
          <RightSidePanel svgdata={svgdata} onSelect={selectedSVG} />
        </div>
      </div>
    </main>
  );
}
