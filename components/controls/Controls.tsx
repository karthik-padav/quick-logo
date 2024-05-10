
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { _controler } from "@/lib/common"
import { useEffect, useRef, useState } from "react"
import { RgbaColorPicker } from "react-colorful"
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'


export default function Controls(svgdata: any) {

    const [controler, setControler] = useState(_controler());
    const [color, setColor] = useState(_controler()?.bgColor?.value);
    const controlerRef = useRef()


    function handleControler(value: string, id: string) {
        setControler((prev) => { return { ...prev, [id]: { ...prev[id], attr: { ...prev[id].attr, value } } } })
    }

    useEffect(() => {
        setControler(_controler())
    }, [svgdata])

    function controlComponent(value: any, key: string) {
        const { attr, setSVG } = value
        switch (attr.type) {
            case 'rgba_color':
                const { type, value, ...rest } = attr;
                const width = controlerRef.current && controlerRef.current?.getBoundingClientRect()?.width
                return (
                    <ColorPicker
                        {...rest}
                        width={width}
                        height={width}
                        id={key} value={color} onChange={async (color) => {
                            setColor(color)
                            await handleControler(color, key)
                            setSVG(color)
                        }} />
                )
            default:
                return (
                    <input disabled={!svgdata?.svgdata?._svg} {...attr} id={key} onChange={async (e) => {
                        const { value } = e.target;
                        await handleControler(value, key)
                        setSVG(value)
                    }} />
                )
        }
    }

    return (

        <Tabs defaultValue="icon" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger className="w-full" value="icon">Icon</TabsTrigger>
                <TabsTrigger className="w-full" value="bg">Background</TabsTrigger>
            </TabsList>
            {['icon', 'bg'].map((i) => {
                return (
                    <TabsContent key={i} value={i} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 mt-4 md:min-h-96 ">

                        <div ref={controlerRef}>
                            {Object.keys(controler).filter((key) => controler[key].tab === i).map((key) => {
                                const { attr, label, valuePrefix, hideValue } = controler[key]
                                return (
                                    <div key={key} className="mb-4">
                                        <p className="flex justify-between mb-1">
                                            {label}
                                            {!hideValue && <span>
                                                {attr.value === 'currentColor' ? '#000000' : attr.value}{valuePrefix}
                                            </span>}
                                        </p>
                                        {controlComponent(controler[key], key)}
                                    </div>
                                )
                            })}
                        </div>
                    </TabsContent>
                )
            })}
        </Tabs >
    )
}