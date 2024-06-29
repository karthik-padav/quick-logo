"use client";
import * as React from "react";
import {
  Moon,
  Sun,
  Zap,
  AlignJustify,
  LaptopMinimal,
  Settings,
} from "lucide-react";
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
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import { useAppProvider } from "@/components/app-provider";

export default function Header() {
  const { setTheme } = useTheme();
  const themes = [
    {
      code: "light",
      label: "Light",
      icon: (
        <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
      ),
    },
    {
      code: "dark",
      label: "Dark",
      icon: (
        <Moon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
      ),
    },
    {
      code: "system",
      label: "System",
      icon: (
        <LaptopMinimal className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
      ),
    },
  ];
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const session = useSession();
  const { toggleLogin } = useAppProvider();

  function renderList() {
    return (
      <>
        {constants.headerMenuList.map((item) => (
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
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center text-gray-600 dark:text-gray-300"
          >
            <Zap className="mr-2 text-red-400" />
            <h1 className="text-base-content text-lg font-bold">
              {process.env.NEXT_PUBLIC_WEBSITE_NAME}
            </h1>
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
                {session?.data?.user?.image ? (
                  <div className="text-accent-foreground rounded-full h-10 w-10 border overflow-hidden">
                    <img
                      alt={`Profile Picture`}
                      src={`${session.data.user.image}`}
                    />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-accent-foreground hover:text-red-400 rounded-full"
                  >
                    <Settings className="h-[1.3rem] w-[1.3rem] rotate-0 scale-100 transition-all" />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {session.data?.user && (
                  <>
                    <div className="px-2 py-1.5">
                      <p className="text-md">{session.data.user.name}</p>
                      <p className="text-xs">{session.data.user.email}</p>
                    </div>
                    <hr className="my-2" />
                  </>
                )}
                <>
                  <p className="px-2 py-1.5 text-sm">Theme</p>
                  {themes.map((item) => (
                    <DropdownMenuItem
                      key={item.code}
                      onClick={() => setTheme(item.code)}
                    >
                      {item.icon}{" "}
                      <span className="ml-2 text-sm">{item.label}</span>
                    </DropdownMenuItem>
                  ))}
                </>
                <hr className="my-2" />
                <>
                  {session?.data ? (
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <span className="ml-2 text-sm"> Sign Out</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={toggleLogin}>
                      <span className="ml-2 text-sm"> Sign In</span>
                    </DropdownMenuItem>
                  )}
                </>
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
}
