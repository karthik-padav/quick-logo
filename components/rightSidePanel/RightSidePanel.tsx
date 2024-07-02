import { useEffect, useState } from "react";
import { fetchSvg } from "@/lib/actions/svg.actions";
import { useSession } from "next-auth/react";
import { useAppProvider } from "@/components/app-provider";
import { User } from "next-auth";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: ExtendedUser;
}

interface ExtendedUser extends User {
  svgs: string[];
}

interface Params {
  onSelect: (params: {
    html: Element | null;
    filename: string;
    source: string;
  }) => void;
  svgdata: any;
}

interface svgListItem {
  data: {
    _id: string;
    svg: string;
    filename: string;
    source: string;
  }[];
  loader: boolean;
}

export default function RightSidePanel({ svgdata, onSelect }: Params) {
  const [mySvg, setMySvg] = useState<svgListItem>({
    data: [],
    loader: false,
  });
  const [similarSvg, setSimilarSvg] = useState<svgListItem>({
    data: [],
    loader: false,
  });

  const { data: session } = useSession() as { data: ExtendedSession | null };
  const { toggleLogin } = useAppProvider();
  useEffect(() => {
    fetchMySVG();
  }, []);

  useEffect(() => {
    if (svgdata.filename) fetchRelatedSVG();
  }, [svgdata.filename]);

  async function fetchRelatedSVG() {
    setSimilarSvg((prev) => ({ ...prev, loader: true }));
    const data = await fetchSvg({
      filename: svgdata.filename,
    });
    setSimilarSvg({ data, loader: false });
  }

  async function fetchMySVG() {
    if (session?.user?.svgs?.length) {
      setMySvg((prev) => ({ ...prev, loader: true }));
      const data = await fetchSvg({
        svgIds: session?.user?.svgs,
      });
      setMySvg({ data, loader: false });
    }
  }

  async function handleSelect({
    svg,
    filename,
    source = "",
  }: {
    svg: string;
    filename: string;
    source: string;
  }) {
    if (typeof document !== "undefined") {
      let svgDoc = document.createElement("div");
      svgDoc.innerHTML = svg;

      const insvg = svgDoc?.querySelector(`.wrapper-svg`);
      await onSelect({ html: insvg, filename, source });
    }
  }
  return (
    <>
      {mySvg?.data?.length > 0 && (
        <div className="col-span-1 p-4 rounded-md bg-gray-100 dark:bg-gray-900">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 font-bold">
            My Downloads
          </p>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
            {mySvg.loader
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div key={i} className="animate-pulse space-x-4">
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-md dark:hover:bg-gray-900 max-h-full h-16 max-w-full w-20" />
                  </div>
                ))
              : (mySvg?.data || []).map(
                  (i: {
                    _id: string;
                    svg: string;
                    filename: string;
                    source: string;
                  }) => {
                    const html = { __html: i.svg };
                    return (
                      <div
                        className="sample_svg flex justify-center p-2 items-center rounded-md bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 cursor-pointer"
                        key={i._id}
                        dangerouslySetInnerHTML={html}
                        onClick={() => {
                          session?.user ? handleSelect(i) : toggleLogin();
                        }}
                      />
                    );
                  }
                )}
          </div>
        </div>
      )}
      {similarSvg?.data?.length > 0 && (
        <div className="col-span-1 p-4 rounded-md bg-gray-100 dark:bg-gray-900 mt-4">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 font-bold">
            Similar Icons
          </p>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-2">
            {similarSvg.loader
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                  <div key={i} className="animate-pulse space-x-4">
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-md dark:hover:bg-gray-900 max-h-full h-16 max-w-full w-20" />
                  </div>
                ))
              : (similarSvg?.data || []).map(
                  (i: {
                    _id: string;
                    svg: string;
                    filename: string;
                    source: string;
                  }) => {
                    const html = { __html: i.svg };
                    return (
                      <div
                        className="sample_svg flex justify-center p-2 items-center rounded-md bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 cursor-pointer"
                        key={i._id}
                        dangerouslySetInnerHTML={html}
                        onClick={() => {
                          session?.user ? handleSelect(i) : toggleLogin();
                        }}
                      />
                    );
                  }
                )}
          </div>
        </div>
      )}
    </>
  );
}
