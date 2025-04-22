import constants from "@/lib/constants";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function Footer({ data }: any) {
  const products = data.ourProducts.find(
    (item: { code: string }) => item.code === "IMAGE_FLEX_STUDIO"
  );

  return (
    <footer className="py-4 w-full mx-auto border-t-2">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4">
          <div className="py-2">
            <Link
              href="/"
              className="flex items-center text-gray-600 dark:text-gray-300 pb-2"
            >
              <Zap className="mr-2 text-red-400" />
              <h1 className="text-base-content text-lg font-bold">
                {process.env.NEXT_PUBLIC_WEBSITE_NAME}
              </h1>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>

          <div className="py-2">
            <p className="text-lg text-gray-600 dark:text-gray-300 pb-2 font-bold">
              Legal
            </p>
            <ul>
              {constants.footerLegalList.map((item) => (
                <li
                  key={item.code}
                  className="pb-1 text-sm text-gray-600 dark:text-gray-300"
                >
                  <Link className="hover:text-red-400" href={item.href}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {data?.ourProducts && (
            <div className="py-2">
              <p className="text-lg text-gray-600 dark:text-gray-300 pb-2 font-bold">
                Our products
              </p>

              <ul>
                {(products.tools || []).map(
                  (item: {
                    code: string;
                    external: string;
                    href: string;
                    title: string;
                  }) => (
                    <li key={item.code} className="pb-2 text-md">
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          className="hover:text-red-400"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="pb-2 hover:text-red-400"
                        >
                          {item.title}
                        </Link>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
