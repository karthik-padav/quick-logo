import { Button } from "@/components/ui/button";
import constants from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-black body-font">
      <section className="container flex flex-col justify-center h-[70vh] mx-auto">
        <h1 className="text-gray-600 dark:text-white text-4xl font-bold tracking-tighter lg:text-8xl md:text-7xl text-center">
          {constants.landingPage.title}
        </h1>
        <p className="mx-auto mt-6 text-lg md:text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3 text-center">
          {constants.landingPage.subtitle}
        </p>
      </section>

      <section className="container py-20">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <img
            className="object-cover object-center w-full rounded-lg"
            alt="quick logo banner"
            src="/images/banner.png"
          />
          <div className="flex flex-col justify-between pb-6">
            <ul className="list-disc pl-4">
              {constants.landingPage.detailedList.map((item, index) => (
                <li className="mb-2 leading-relaxed text-lg" key={index}>
                  <p className="text-gray-600 dark:text-white font-bold">
                    {item.title}:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
            <div>
              <Link
                href="/quick-logo"
                className="text-accent-foreground hover:bg-red-500 bg-red-400 text-white px-2 py-3 rounded-lg"
              >
                Generate Logo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              100+
            </p>
            <p className="leading-relaxed pt-4 text-gray-600 dark:text-gray-300">
              Users
            </p>
          </div>
          <div>
            <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              300+
            </p>
            <p className="leading-relaxed pt-4 text-gray-600 dark:text-gray-300">
              Subscribes
            </p>
          </div>
          <div>
            <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              1000+
            </p>
            <p className="leading-relaxed pt-4 text-gray-600 dark:text-gray-300">
              Downloads
            </p>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white text-center">
          How it works
        </h2>
        <ul>
          {constants.landingPage.howItWorks.map((item, index) => (
            <li className="mb-2 leading-relaxed text-lg" key={index}>
              <p className="text-gray-600 dark:text-white font-bold">
                {item.title}:
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container py-20">
        <h2 className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white text-center">
          Frequently Asked Questions
        </h2>
        <ul>
          {constants.landingPage.faq.map((item, index) => (
            <li className="mb-2 leading-relaxed text-lg" key={index}>
              <p className="text-gray-600 dark:text-white font-bold">
                {item.q}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.a}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
