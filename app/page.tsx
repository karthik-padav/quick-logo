"use client";
import constants from "@/lib/constants";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { theme } = useTheme();
  return (
    <div className="text-black body-font">
      <section className="container flex flex-col justify-center min-h-[75vh] mx-auto">
        <div className="text-center">
          <h1 className="text-gray-600 dark:text-white text-4xl font-bold tracking-tighter lg:text-8xl md:text-7xl text-center">
            {constants.landingPage.title}
          </h1>
          <p className="mx-auto mt-6 text-lg md:text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3 text-center">
            {constants.landingPage.subtitle}
          </p>

          <Link
            href="/quick-logo"
            className="mt-14 px-6 inline-block text-accent-foreground hover:bg-red-500 bg-red-400 text-white px-2 py-3 rounded-lg"
          >
            Generate Logo
          </Link>

          <div className="grid grid-cols-3 gap-8 text-center pt-14">
            <div>
              <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
                100+
              </p>
              <p className="leading-relaxed text-lg pt-4 text-gray-600 dark:text-gray-300">
                Users
              </p>
            </div>
            <div>
              <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
                300+
              </p>
              <p className="leading-relaxed text-lg pt-4 text-gray-600 dark:text-gray-300">
                Subscribes
              </p>
            </div>
            <div>
              <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
                1000+
              </p>
              <p className="leading-relaxed text-lg pt-4 text-gray-600 dark:text-gray-300">
                Downloads
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-10 md:pb-20">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <div className="flex justify-center items-center">
            <img
              className="object-cover object-center w-full rounded-lg"
              alt="quick logo banner"
              src={`/images/${
                theme === "dark" ? "dark-banner" : "light-banner"
              }.png`}
            />
          </div>
          <div className="py-6 flex justify-center items-center">
            <ul className="list-disc pl-4">
              {constants.landingPage.detailedList.map((item, index) => (
                <li
                  className="mb-2 md:mb-4 leading-relaxed text-lg"
                  key={index}
                >
                  <p className="text-gray-600 text-lg md:text-xl dark:text-white font-bold">
                    {item.title}:
                  </p>
                  <p className="text-sm text-lg text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container pb-10 md:pb-20">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <div className="pb-2">
            <h2 className="title-font pb-2 md:pb-4 font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              How it works
            </h2>
            <Accordion
              type="multiple"
              defaultValue={constants.landingPage.howItWorks.map(
                (i, index) => `index_${index}`
              )}
              className="w-full"
            >
              {constants.landingPage.howItWorks.map((item, index) => (
                <AccordionItem value={`index_${index}`} key={`index_${index}`}>
                  <AccordionTrigger className="text-left text-gray-600 dark:text-gray-300">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="pb-2">
            <h2 className="title-font pb-2 md:pb-4 font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              FAQ
            </h2>
            <Accordion
              type="multiple"
              defaultValue={constants.landingPage.faq.map(
                (i, index) => `index_${index}`
              )}
              className="w-full"
            >
              {constants.landingPage.faq.map((item, index) => (
                <AccordionItem value={`index_${index}`} key={`index_${index}`}>
                  <AccordionTrigger className="text-left text-gray-600 dark:text-gray-300">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-gray-600 dark:text-gray-300">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
