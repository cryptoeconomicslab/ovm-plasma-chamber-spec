module.exports = {
  title: "Gazelle",
  tagline: "The tagline of my site",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "Cryptoeconomics Lab", // Usually your GitHub org/user name.
  projectName: "gazelle", // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    navbar: {
      title: "Gazelle",
      logo: {
        alt: "Gazelle",
        src: "img/logo-w.svg",
      },
      links: [
        {
          to: "docs/Introduction",
          activeBasePath: "docs",
          label: "Docs",
          position: "right",
        },
        {
          to: "communities/Support",
          activeBasePath: "communities",
          label: "Community",
          position: "right",
        },
        {
          href: "https://medium.com/cryptoeconomics-lab",
          label: "Blog",
          position: "right",
        },
        {
          href: "https://github.com/cryptoeconomicslab",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/doc1",
            },
            {
              label: "Second Doc",
              to: "docs/doc2",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cryptoeconomics Lab, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "pages",
          routeBasePath: "",
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.scss"),
            require.resolve("./src/css/input.scss"),
          ],
        },
      },
    ],
  ],
  plugins: ["docusaurus-plugin-sass"],
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Roboto:wght@500;700;900&display=swap",
  ],
};
