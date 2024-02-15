import type { Meta, StoryObj } from '@storybook/react'
import Logo from '.'

const meta: Meta<typeof Logo> = {
  component: Logo,
  argTypes: {
    color: {
      options: ['colorized', 'white'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {
    color: 'white',
    size: 'medium',
  },
}
