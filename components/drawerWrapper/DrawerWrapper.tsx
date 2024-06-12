"use clinet";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import * as LucideIcons from "lucide-react";
import { X, Plus, ArrowDownToLine, Upload } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faIcons from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { downloadPng, downloadSvg } from "@/lib/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MAX_COUNT = 100;

interface Pagination {
  pagenumber: number;
  originalList: string[];
}

interface Params {
  onSelect: (html: Element | null, filename: string) => void;
  svgdata: any;
}
type SvgElementCollection = { [key: string]: SVGElement };
type IconKeys = keyof typeof LucideIcons;
type IconsObject = { [key in IconKeys]: React.ComponentType<any> | string };

export default function DrawerWrapper({ onSelect, svgdata }: Params) {
  const [open, setOpen] = useState<boolean>(false);
  const svgRef = useRef<SvgElementCollection | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const iconsRef = useRef<IconsObject>(
    Object.keys(LucideIcons).reduce((acc, key) => {
      const icon = LucideIcons[key as IconKeys];
      if (key.includes("Icon")) {
        acc[key as IconKeys] = icon as React.ComponentType<any>;
      }
      return acc;
    }, {} as IconsObject)
  );
  const paginationRef = useRef<Pagination>({
    pagenumber: 1,
    originalList: Object.keys(LucideIcons).filter((i) => i.includes("Icon")),
  });
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(
      paginationRef.current.originalList.slice(
        0,
        MAX_COUNT * paginationRef.current.pagenumber
      )
    );
  }, []);

  function resetList() {
    const value = paginationRef.current.originalList
      .filter((i) => i.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, MAX_COUNT * 1);
    setList(value);
    paginationRef.current.pagenumber = 1;
  }

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      paginationRef.current.pagenumber =
        (paginationRef.current?.pagenumber || 0) + 1;
      setList(
        paginationRef.current.originalList
          .filter((i) => i.toLowerCase().includes(inputValue.toLowerCase()))
          .slice(0, MAX_COUNT * paginationRef.current?.pagenumber)
      );
    }
  }

  useEffect(() => {
    let db = setTimeout(() => {
      resetList();
    }, 500);

    return () => clearTimeout(db);
  }, [inputValue]);

  async function handleSelect(item: string) {
    if (svgRef?.current) {
      await onSelect(svgRef.current[item], `${item}`);
      setOpen(false);
      setInputValue("");
    }
  }

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.ctrlKey && event.keyCode === 75) {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  function onClose() {
    setOpen(!open);
    setInputValue("");
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e?.target?.files?.[0] || null;
    const reader = new FileReader();
    reader.onload = function (event) {
      const svgContent: string | ArrayBuffer | null | undefined =
        event?.target?.result;
      if (typeof svgContent === "string") {
        const svgElement = new DOMParser().parseFromString(
          svgContent,
          "image/svg+xml"
        ).documentElement;
        const _filename = file?.name || "fast_logo.svg";
        onSelect(svgElement, _filename);
      }
    };
    if (file) reader.readAsText(file);
  };

  const { filename } = svgdata;
  console.log(svgdata, "svgdata123");
  return (
    <>
      <div className="mb-4 flex justify-between">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="p-2 hover:text-red-400"
                  onClick={() => setOpen(!open)}
                >
                  <Plus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select Icons</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="p-2 ml-2 hover:text-red-400"
                  onClick={() => {
                    inputFileRef?.current?.click();
                  }}
                >
                  <input
                    type="file"
                    accept=".svg"
                    onChange={handleFileChange}
                    ref={inputFileRef}
                    hidden
                  />
                  <Upload />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload SVG</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {svgdata?._svg && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2">
                <ArrowDownToLine />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  downloadSvg({ filename, ext: "svg", svg: svgdata?._svg })
                }
              >
                Download SVG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  downloadPng({ filename, ext: "png", svg: svgdata?._svg })
                }
              >
                Download PNG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Drawer open={open} onOpenChange={setOpen} onClose={onClose}>
        <DrawerContent>
          <div className="container py-2 z-[99999]">
            <div className="flex justify-between items-center">
              <h3 className="text-base-content text-lg font-bold">
                Pick an icon
              </h3>
              <Button variant="ghost" className="p-2" onClick={onClose}>
                Esc
              </Button>
            </div>

            <div className="">
              <Input
                placeholder="Search Icons"
                className="my-4"
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="h-96 overflow-y-auto" onScroll={handleScroll}>
              <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
                {list.map((i) => {
                  const Component = iconsRef.current[i as IconKeys];
                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(i)}
                      className="flex justify-center p-2 items-center rounded-md hover:bg-gray-200 bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 cursor-pointer"
                    >
                      <Component
                        ref={(e: SVGElement) => {
                          svgRef?.current
                            ? (svgRef.current[i] = e)
                            : (svgRef.current = { [i]: e });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
