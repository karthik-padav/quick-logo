const constants = {
  headerMenuList: [
    { code: "HOME", title: "Home", href: "/" },
    { code: "QUICK_LOGO", title: "Create", href: "/quick-logo" },
  ],
  footerLegalList: [
    {
      code: "TERMS_AND_CONDITIONS",
      title: "Terms And Conditions",
      href: "/terms-and-conditions",
    },
    {
      code: "PRIVACY_POLICY",
      title: "Privacy Policy",
      href: "/privacy-policy",
    },
  ],
  landingPage: {
    title: "Create Stunning Logos In Seconds",
    subtitle: "Design Your Perfect Logo Instantly - No Design Skills Required!",
    detailed_desc: [
      "Simple to create and personalize.",
      "Design a stunning logo in minutes.",
      `Effortless logo creation with ${process.env.NEXT_PUBLIC_WEBSITE_NAME}.`,
      "Obtain a high-quality logo for download and use on websites, social media, print, and branding.",
    ],
    howItWorks: [
      {
        title: "Select or Upload an Icon",
        desc: "Begin by selecting a pre-designed icon from our extensive library or upload your own unique SVG.",
      },
      {
        title: "Customize Your Design",
        desc: "Use our easy-to-use tools to resize your icon, add colors, and apply background gradients to create a personalized logo.",
      },
      {
        title: "Preview Your Logo",
        desc: "Instantly see how your logo looks with our real-time preview feature, ensuring you get the perfect design.",
      },
      {
        title: "Download Your Logo",
        desc: "Once you're happy with your design, download your logo in high-quality SVG or PNG formats, ready for use across all platforms.",
      },
    ],
    detailedList: [
      {
        title: "Simple to create and personalize",
        desc: `${process.env.NEXT_PUBLIC_WEBSITE_NAME} makes it easy for anyone to design a unique and professional logo, regardless of design experience.`,
      },
      {
        title: "Design a stunning logo in minutes",
        desc: " Our intuitive platform allows you to craft beautiful logos quickly, saving you time and effort.",
      },
      {
        title: `Effortless logo creation with ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
        desc: "Choose from a wide selection of icons or upload your own, then customize with colors, gradients, and sizes.",
      },
      {
        title: "Obtain a high-quality logo for download",
        desc: "Export your logo in SVG or PNG formats, perfect for websites, social media, print, and branding.",
      },
      {
        title: "Perfect for all uses",
        desc: `Whether you need a logo for your business, personal project, or event, ${process.env.NEXT_PUBLIC_WEBSITE_NAME} provides the quality and flexibility you need.`,
      },
    ],
    faq: [
      {
        q: `Do I need any design experience to use ${process.env.NEXT_PUBLIC_WEBSITE_NAME}?`,
        a: `No, ${process.env.NEXT_PUBLIC_WEBSITE_NAME} is designed for users of all skill levels. Our intuitive interface and easy-to-use tools make it simple for anyone to create a professional logo.`,
      },

      {
        q: "Can I upload my own icons?",
        a: "Yes, you can upload your own icons and customize them using our platform.",
      },

      {
        q: "What formats are available for download?",
        a: "You can download your finished logo in SVG or PNG formats, ensuring high-quality results for any use.",
      },

      {
        q: "Is there a limit to the number of logos I can create?",
        a: `No, there are no limits on the number of logos you can create and download with ${process.env.NEXT_PUBLIC_WEBSITE_NAME}.`,
      },

      {
        q: "Can I use the logos I create for commercial purposes?",
        a: "Yes, once you download your logo, you have full rights to use it for any commercial or personal projects.",
      },
    ],
  },
};
export default constants;
