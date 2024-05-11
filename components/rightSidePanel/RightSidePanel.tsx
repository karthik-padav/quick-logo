
import { useEffect, useRef, useState } from "react"
import { fetchSvg } from "@/lib/actions/svg.actions";


export default function RightSidePanel(svgdata: any) {
    const [list, setList] = useState<Object[]>([])

    useEffect(() => {
        if (svgdata._svg) fetchRelatedSVG()
    }, [svgdata._svg])


    async function fetchRelatedSVG() {
        const data = await fetchSvg({ userId: '', icon: '' })
        setList(data)
    }

    if (!list.length) return null
    return (
        <>
            {list.map((i) => {
                const html = { __html: i.svg };
                return (
                    <div className="sample_svg" key={i._id} dangerouslySetInnerHTML={html} />
                )
            })
            }
        </>
    )
}