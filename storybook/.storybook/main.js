module.exports = {
  stories: [
    "../stories/*.stories.(js|mdx)",
    "../stories/**/*.stories.(js|mdx)"
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-knobs/register"
  ]
};
