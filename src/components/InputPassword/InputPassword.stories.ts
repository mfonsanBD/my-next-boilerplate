import type { Meta, StoryObj } from '@storybook/react'
import InputPassword from '.'

const meta: Meta<typeof InputPassword> = {
  component: InputPassword,
  tags: ['autodocs'],
  argTypes: {
    isRequired: {
      control: { type: 'boolean' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputPassword>

export const Default: Story = {
  args: {
    label: 'Password',
    labelFor: 'password',
  },
}
