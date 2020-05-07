const fa = require("@fortawesome/free-brands-svg-icons")

module.exports = {
  title: "Gazelle",
  tagline: "The tagline of my site",
  url: "https://gzle.io",
  baseUrl: "/",
  favicon: "",
  organizationName: "Cryptoeconomics Lab",
  projectName: "Gazelle",
  themeConfig: {
    disableDarkMode: true,
    prism: {
      theme: require("prism-react-renderer/themes/vsDark")
    },
    navbar: {
      title: "Gazelle",
      logo: {
        alt: "Gazelle",
        src: "img/logo-w.svg"
      },
      links: [
        {
          to: "docs/Introduction",
          activeBasePath: "docs",
          label: "Docs",
          position: "right"
        },
        {
          to: "communities/Support",
          activeBasePath: "communities",
          label: "Community",
          position: "right"
        },
        {
          href: "https://medium.com/cryptoeconomics-lab",
          label: "Blog",
          position: "right"
        },
        {
          href: "https://github.com/cryptoeconomicslab",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Home",
          items: [
            {
              label: "Showcase",
              to: "/#showcase"
            },
            {
              label: "Roadmap",
              to: "/#roadmap"
            },
            {
              label: "Supporters",
              to: "/#supporters"
            }
          ]
        },
        {
          title: "Resources",
          items: [
            {
              label: "Docs",
              to: "/docs/Introduction"
            },
            {
              label: "Community",
              to: "/communities/Support"
            },
            {
              label: "Blog",
              href: "https://medium.com/cryptoeconomics-lab"
            },
            {
              label: "Github",
              href: "https://github.com/cryptoeconomicslab"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Cryptoeconomics Lab, Inc.`,
      socials: [
        {
          name: "twitter",
          link: "https://twitter.com/cryptoeconlab",
          icon: fa.faTwitter
        },
        {
          name: "medium",
          link: "https://medium.com/cryptoeconomics-lab",
          icon: fa.faMedium
        },
        {
          name: "telegram",
          link: "https://t.me/cryptoeocnomicslab",
          icon: fa.faTelegramPlane
        },
        {
          name: "linkedin",
          link: "https://www.linkedin.com/company/cryptoeconomics-lab/",
          icon: fa.faLinkedin
        },
        {
          name: "youtube",
          link: "https://www.youtube.com/channel/UCp1w3jQNBDD2Pz4kool36Pw",
          icon: fa.faYoutube
        }
      ]
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "pages",
          routeBasePath: "",
          sidebarPath: require.resolve("./sidebars.js")
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss")
        }
      }
    ]
  ],
  plugins: ["docusaurus-plugin-sass"],
  stylesheets: [
    "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
  ]
}
