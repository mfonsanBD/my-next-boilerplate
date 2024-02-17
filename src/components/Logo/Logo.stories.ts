import type { Meta, StoryObj } from '@storybook/react'
import Logo from './Logo'

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: ['colorized', 'white'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large', '3xl'],
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
