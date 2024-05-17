"use client"

import * as React from "react"
import { Moon, Sun, Zap } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"


export default function Header() {
    const { setTheme } = useTheme()
    const themes = [{ code: 'light', label: 'Light' }, { code: 'dark', label: 'Dark' }, { code: 'system', label: 'System' }]
    return (
        <header className="py-2 border-b flex flex-wrap gap-4 items-center justify-between w-full mx-auto">
            <nav className="container flex justify-between">
                <Link href="/" className="flex items-center">
                    <Zap className="mr-2 text-red-400" />
                    <h1 className="text-base-content text-lg font-bold">Quick Logo</h1>
                </Link>
                <div className="flex items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {themes.map((item) => (
                                <DropdownMenuItem key={item.code} onClick={() => setTheme(item.code)}>
                                    {item.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </header>
    )
}
