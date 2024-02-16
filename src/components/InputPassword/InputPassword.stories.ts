import type { Meta, StoryObj } from '@storybook/react'
import InputPassword from '.'

const meta: Meta<typeof InputPassword> = {
  component: InputPassword,
}

export default meta
type Story = StoryObj<typeof InputPassword>

export const Default: Story = {
  args: {
    label: 'Password',
    labelFor: 'password',
  },
}
