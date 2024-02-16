import type { Meta, StoryObj } from '@storybook/react'
import LoginForm from '.'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  args: {},
}
