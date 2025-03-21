import constants from "@/lib/constants";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSvgCount } from "@/lib/actions/svg.actions";
import { getUserCount } from "@/lib/actions/user.actions";
import CounterUpWrapper from "@/components/counterUpWrapper";
import Image from "next/image";

export default async function Home() {
  const userCount = await getUserCount();
  const svgCount = await getSvgCount();

  return (
    <main className="text-black body-font">
      <section className="container flex flex-col justify-center min-h-[75vh] mx-auto py-10 md:py-20">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-4xl font-bold tracking-tighter lg:text-8xl md:text-7xl text-center">
            {constants.landingPage.title}
          </h1>
          <p className="mx-auto mt-6 text-lg md:text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3 text-center">
            {constants.landingPage.subtitle}
          </p>

          <Link
            href="/quick-logo"
            className="mt-14 px-6 py-3 inline-block text-accent-foreground hover:bg-red-500 bg-red-400 text-white rounded-lg"
          >
            Generate Logo
          </Link>

          <div className="grid grid-cols-2 gap-8 text-center pt-14">
            <CounterUpWrapper userCount={userCount} svgCount={svgCount} />
          </div>
        </div>
      </section>

      <section className="container pb-10 md:pb-20">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <div className="flex w-full justify-center items-center">
            <div className="relative">
              <Image
                alt={`${process.env.NEXT_PUBLIC_WEBSITE_NAME} banner`}
                src="/images/light-banner.png"
                width={1500}
                height={1500}
                className="dark:hidden"
              />
              <Image
                alt={`${process.env.NEXT_PUBLIC_WEBSITE_NAME} banner`}
                src="/images/dark-banner.png"
                width={1500}
                height={1500}
                className="dark:block hidden"
              />
            </div>
          </div>
          <div className="py-6 flex justify-center items-center">
            <ul className="list-disc pl-4 text-gray-600 dark:text-white">
              {constants.landingPage.detailedList.map((item, index) => (
                <li
                  className="mb-2 md:mb-4 leading-relaxed text-lg"
                  key={index}
                >
                  <p className="text-gray-600 text-lg md:text-xl dark:text-white font-bold">
                    {item.title}:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
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
    </main>
  );
}
