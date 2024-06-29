"use client";
import CountUp from "react-countup";

export default function CounterUpWrapper({ userCount = 0, svgCount = 0 }) {
  return (
    <>
      <div>
        <CountUp
          start={userCount > 1500 ? userCount - 100 : 1500 - 100}
          end={userCount > 1500 ? userCount : 1500}
          suffix="+"
        >
          {({ countUpRef }) => (
            <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              <span ref={countUpRef} />
            </p>
          )}
        </CountUp>
        <p className="leading-relaxed text-lg pt-4 text-gray-600 dark:text-gray-300">
          Users
        </p>
      </div>
      {/* <div>
        <CountUp
          start={userCount > 1500 ? userCount - 100 : 1500 - 100}
          end={userCount > 1500 ? userCount : 1500}
          suffix="+"
        >
          {({ countUpRef }) => (
            <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              <span ref={countUpRef} />
            </p>
          )}
        </CountUp>
        <p className="leading-relaxed text-lg pt-4 text-gray-600 dark:text-gray-300">
          Subscribes
        </p>
      </div> */}
      <div>
        <CountUp
          start={userCount > 3500 ? userCount - 100 : 3500 - 100}
          end={userCount > 3500 ? userCount : 3500}
          suffix="+"
        >
          {({ countUpRef }) => (
            <p className="title-font font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
              <span ref={countUpRef} />
            </p>
          )}
        </CountUp>
        <p className="leading-relaxed text-lg pt-4 text-gray-600 dark:text-gray-300">
          Downloads
        </p>
      </div>
    </>
  );
}
