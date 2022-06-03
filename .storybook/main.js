/** @type {import('@storybook/core-common/dist/ts3.9/types').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/react',
};
