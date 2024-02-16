import type { Preview } from "@storybook/react";
import colors from 'tailwindcss/colors'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: colors.zinc[200],
        },
        {
          name: 'dark',
          value: colors.zinc[900],
        },
      ],
    },
    layout: 'fullscreen'
  },
};

export default preview;
