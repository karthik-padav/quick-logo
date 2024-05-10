"use client"

import {
  border,
  borderRandiusChange,
  downloadSvg,
  shadow,
  iconResize,
  opacity,
  processSVG,
  rotate,
  setBgColor,
  sizeChange,
  setColor,
  controlList,
  downloadPng,
} from "@/lib/common"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RgbaColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import DrawerWrapper from "@/components/drawerWrapper"
import Controls from "@/components/controls"
import { ArrowDownToLine, Plus, AArrowDown, AArrowUp, ALargeSmall } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import RightSidePanel from "@/components/rightSidePanel";


export default function Home() {

  const [svgdata, setSvgData] = useState({})
  const downloadableZoneRef = useRef()


  function selectedSVG(html, filename) {
    const { _svg, data } = processSVG(html)
    setSvgData({ _svg, data, filename })
  }


  // Set all initial value
  useEffect(() => {
    updateDimensions();
  }, [svgdata._svg])



  const updateDimensions = () => {
    if (downloadableZoneRef.current) {
      const { width } = downloadableZoneRef.current.getBoundingClientRect()
      const e1 = document.getElementById('wrapper-svg');
      e1?.setAttribute('width', `${width}px`)
      e1?.setAttribute('height', `${width}px`)
    }
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [])

  const html = { __html: svgdata._svg };
  console.log(downloadableZoneRef, 'downloadableZoneRef')
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <Controls svgdata={svgdata} />
        </div>

        <div className="col-span-2">
          <DrawerWrapper onSelect={selectedSVG} svgdata={svgdata} />
          <div className="p-10 w-full min-h-96 h-auto flex justify-center items-center dark:bg-gray-900 bg-gray-100 rounded-lg bg-[url('/grid.svg')]">
            {svgdata?._svg ?
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div dangerouslySetInnerHTML={html}
                      ref={downloadableZoneRef}
                      className="w-full outline-2 outline-dashed outline-[#9C92AC20] hover:outline-[#9C92AC50] bg-[#9C92AC15] hover:bg-[#9C92AC25] flex justify-center items-center" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Downloadable Zone</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              : (<p>
                Press
                <span className="leading-1 text-white font-bold bg-red-400 rounded-lg border border-base-content/20 py-1 px-3 mx-1">
                  <kbd>Ctrl + K</kbd></span>
                to select icon
              </p>)}
          </div>
        </div>
        <div className="col-span-1">
          <RightSidePanel {...svgdata} />
        </div>
      </div>
    </main >
  );
}
