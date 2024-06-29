import { Button } from "@/components/ui/button";
import constants from "@/lib/constants";
import Link from "next/link";

export default function About() {
  return (
    <main className="text-black body-font">
      <section className="container py-10">
        <h1 className="title-font pb-2 md:pb-4 font-medium md:text-5xl text-3xl text-gray-600 dark:text-white">
          Terms and Conditions
        </h1>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          Welcome to {process.env.NEXT_PUBLIC_WEBSITE_NAME}!
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          These terms and conditions outline the rules and regulations for the
          use of {process.env.NEXT_PUBLIC_WEBSITE_NAME}&apos;s Website, located
          at
          {process.env.NEXT_PUBLIC_WEBSITE_URL}.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use{" "}
          {process.env.NEXT_PUBLIC_WEBSITE_NAME} if you do not agree to take all
          of the terms and conditions stated on this page.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements:
          &apos;Client&apos;, &apos;You&apos; and &apos;Your&apos; refers to
          you, the person log on this website and compliant to the
          Company&apos;s terms and conditions. &apos;The Company&apos;,
          &apos;Ourselves&apos;, &apos;We&apos;, &apos;Our&apos; and
          &apos;Us&apos;, refers to our Company. &apos;Party&apos;,
          &apos;Parties&apos;, or &apos;Us&apos;, refers to both the Client and
          ourselves. All terms refer to the offer, acceptance and consideration
          of payment necessary to undertake the process of our assistance to the
          Client in the most appropriate manner for the express purpose of
          meeting the Client&apos;s needs in respect of provision of the
          Company&apos;s stated services, in accordance with and subject to,
          prevailing law of in. Any use of the above terminology or other words
          in the singular, plural, capitalization and/or he/she or they, are
          taken as interchangeable and therefore as referring to same.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          Cookies
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          We employ the use of cookies. By accessing{" "}
          {process.env.NEXT_PUBLIC_WEBSITE_NAME}, you agreed to use cookies in
          agreement with the
          {process.env.NEXT_PUBLIC_WEBSITE_NAME}&apos;s Privacy Policy.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          Most interactive websites use cookies to let us retrieve the
          user&apos;s details for each visit. Cookies are used by our website to
          enable the functionality of certain areas to make it easier for people
          visiting our website. Some of our affiliate/advertising partners may
          also use cookies.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          License
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          Unless otherwise stated, {process.env.NEXT_PUBLIC_WEBSITE_NAME} and/or
          its licensors own the intellectual property rights for all material on
          {process.env.NEXT_PUBLIC_WEBSITE_NAME}. All intellectual property
          rights are reserved. You may access this from
          {process.env.NEXT_PUBLIC_WEBSITE_NAME} for your own personal use
          subjected to restrictions set in these terms and conditions.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          You must not:
        </p>
        <ul className="list-disc">
          <li className="text-lg text-gray-600 dark:text-gray-300">
            Sell, rent or sub-license material from{" "}
            {process.env.NEXT_PUBLIC_WEBSITE_NAME}
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            Reproduce, duplicate or copy material from
            {process.env.NEXT_PUBLIC_WEBSITE_NAME}
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            Redistribute content from {process.env.NEXT_PUBLIC_WEBSITE_NAME}
          </li>
        </ul>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          This Agreement shall begin on the date hereof.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information in certain areas of the website.
          {process.env.NEXT_PUBLIC_WEBSITE_NAME} does not filter, edit, publish
          or review Comments prior to their presence on the website. Comments do
          not reflect the views and opinions of{" "}
          {process.env.NEXT_PUBLIC_WEBSITE_NAME},its agents and/or affiliates.
          Comments reflect the views and opinions of the person who post their
          views and opinions. To the extent permitted by applicable laws,{" "}
          {process.env.NEXT_PUBLIC_WEBSITE_NAME} shall not be liable for the
          Comments or for any liability, damages or expenses caused and/or
          suffered as a result of any use of and/or posting of and/or appearance
          of the Comments on this website.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          {process.env.NEXT_PUBLIC_WEBSITE_NAME} reserves the right to monitor
          all Comments and to remove any Comments which can be considered
          inappropriate, offensive or causes breach of these Terms and
          Conditions.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          You warrant and represent that:
        </p>

        <ul className="list-disc">
          <li className="text-lg text-gray-600 dark:text-gray-300">
            You are entitled to post the Comments on our website and have all
            necessary licenses and consents to do so;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            The Comments do not invade any intellectual property right,
            including without limitation copyright, patent or trademark of any
            third party;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            The Comments do not contain any defamatory, libelous, offensive,
            indecent or otherwise unlawful material which is an invasion of
            privacy
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            The Comments will not be used to solicit or promote business or
            custom or present commercial activities or unlawful activity.
          </li>
        </ul>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          You hereby grant {process.env.NEXT_PUBLIC_WEBSITE_NAME} a
          non-exclusive license to use, reproduce, edit and authorize others to
          use, reproduce and edit any of your Comments in any and all forms,
          formats or media.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          Hyperlinking to our Content
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          The following organizations may link to our Website without prior
          written approval:
        </p>

        <ul className="list-disc">
          <li className="text-lg text-gray-600 dark:text-gray-300">
            Government agencies;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            Search engines;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            News organizations;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            Online directory distributors may link to our Website in the same
            manner as they hyperlink to the Websites of other listed businesses;
            and
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            System wide Accredited Businesses except soliciting non-profit
            organizations, charity shopping malls, and charity fundraising
            groups which may not hyperlink to our Web site.
          </li>
        </ul>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          These organizations may link to our home page, to publications or to
          other Website information so long as the link: (a) is not in any way
          deceptive; (b) does not falsely imply sponsorship, endorsement or
          approval of the linking party and its products and/or services; and
          (c) fits within the context of the linking party&apos;s site.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          We may consider and approve other link requests from the following
          types of organizations:
        </p>

        <ul className="list-disc">
          <li className="text-lg text-gray-600 dark:text-gray-300">
            commonly-known consumer and/or business information sources;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            dot.com community sites;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            associations or other groups representing charities;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            online directory distributors;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            internet portals;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            accounting, law and consulting firms; and
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            educational institutions and trade associations.
          </li>
        </ul>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          We will approve link requests from these organizations if we decide
          that: (a) the link would not make us look unfavorably to ourselves or
          to our accredited businesses; (b) the organization does not have any
          negative records with us; (c) the benefit to us from the visibility of
          the hyperlink compensates the absence of{" "}
          {process.env.NEXT_PUBLIC_WEBSITE_NAME}; and (d) the link is in the
          context of general resource information.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          These organizations may link to our home page so long as the link: (a)
          is not in any way deceptive; (b) does not falsely imply sponsorship,
          endorsement or approval of the linking party and its products or
          services; and (c) fits within the context of the linking party&apos;s
          site.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          If you are one of the organizations listed in paragraph 2 above and
          are interested in linking to our website, you must inform us by
          sending an e-mail to {process.env.NEXT_PUBLIC_WEBSITE_NAME}. Please
          include your name, your organization name, contact information as well
          as the URL of your site, a list of any URLs from which you intend to
          link to our Website, and a list of the URLs on our site to which you
          would like to link. Wait 2-3 weeks for a response.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          Approved organizations may hyperlink to our Website as follows:
        </p>

        <ul className="list-disc">
          <li className="text-lg text-gray-600 dark:text-gray-300">
            By use of our corporate name; or
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            By use of the uniform resource locator being linked to; or
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            By use of any other description of our Website being linked to that
            makes sense within the context and format of content on the linking
            party&apos;s site.
          </li>
        </ul>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          No use of {process.env.NEXT_PUBLIC_WEBSITE_NAME}&apos;s logo or other
          artwork will be allowed for linking absent a trademark license
          agreement.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          iFrames
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          Without prior approval and written permission, you may not create
          frames around our Webpages that alter in any way the visual
          presentation or appearance of our Website.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          Content Liability
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          We shall not be hold responsible for any content that appears on your
          Website. You agree to protect and defend us against all claims that is
          rising on your Website. No link(s) should appear on any Website that
          may be interpreted as libelous, obscene or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other
          violation of, any third party rights.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          Reservation of Rights
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          We reserve the right to request that you remove all links or any
          particular link to our Website. You approve to immediately remove all
          links to our Website upon request. We also reserve the right to amen
          these terms and conditions and it&apos;s linking policy at any time.
          By continuously linking to our Website, you agree to be bound to and
          follow these linking terms and conditions.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          Removal of links from our website
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          If you find any link on our Website that is offensive for any reason,
          you are free to contact and inform us any moment. We will consider
          requests to remove links but we are not obligated to or so or to
          respond to you directly.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          We do not ensure that the information on this website is correct, we
          do not warrant its completeness or accuracy; nor do we promise to
          ensure that the website remains available or that the material on the
          website is kept up to date.
        </p>

        <h2 className="text-gray-600 text-lg md:text-xl dark:text-white font-bold pb-2">
          Disclaimer
        </h2>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website. Nothing in this disclaimer will:
        </p>

        <ul className="list-disc">
          <li className="text-lg text-gray-600 dark:text-gray-300">
            limit or exclude our or your liability for death or personal injury;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li className="text-lg text-gray-600 dark:text-gray-300">
            exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          The limitations and prohibitions of liability set in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the
          disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty.
        </p>

        <p className="pb-2 md:pb-4 text-lg text-gray-600 dark:text-gray-300">
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </p>
      </section>
    </main>
  );
}
