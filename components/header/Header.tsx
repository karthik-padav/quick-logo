"use client";

import * as React from "react";
import { Moon, Sun, Zap, AlignJustify } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import constants from "@/lib/constants";

export default function Header() {
  const { setTheme } = useTheme();
  const themes = [
    { code: "light", label: "Light" },
    { code: "dark", label: "Dark" },
    { code: "system", label: "System" },
  ];
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  console.log(constants.list, "constants123");
  function renderList() {
    return (
      <>
        {constants.list.map((item) => (
          <Link
            key={item.code}
            className="md:mr-6 md:inline md:py-0 py-2 block hover:text-red-400"
            href={item.href}
          >
            {item.title}
          </Link>
        ))}
      </>
    );
  }
  return (
    <header className="text-white body-font">
      <div className="container mx-auto p-5">
        <div className="flex justify-between">
          <Link
            href="/"
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <Zap className="mr-2 text-red-400" />
            <h1 className="text-base-content text-lg font-bold">Quick Logo</h1>
          </Link>
          <div className="flex items-center">
            <nav className="text-base justify-center font-semibold md:block hidden text-gray-600 dark:text-gray-300">
              {renderList()}
            </nav>
            <Button
              className="md:hidden mr-2 text-accent-foreground hover:text-red-400"
              variant="outline"
              size="icon"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <AlignJustify />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-accent-foreground hover:text-red-400"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {themes.map((item) => (
                  <DropdownMenuItem
                    key={item.code}
                    onClick={() => setTheme(item.code)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {navbarOpen && (
          <nav className="text-base justify-center md:hidden font-semibold p-6 text-gray-600 dark:text-gray-300">
            {renderList()}
          </nav>
        )}
      </div>
    </header>
  );
  return (
    <header className="py-2 border-b flex flex-wrap gap-4 items-center justify-between w-full mx-auto">
      <nav className="container flex justify-between">
        <Link href="/" className="flex items-center">
          <Zap className="mr-2 text-red-400" />
          <h1 className="text-base-content text-lg font-bold">Quick Logo</h1>
        </Link>
        <div className="flex items-center"></div>
      </nav>
    </header>
  );
}
