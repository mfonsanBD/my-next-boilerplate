import type { Meta, StoryObj } from '@storybook/react'
import AuthBase from '.'

const meta: Meta<typeof AuthBase> = {
  component: AuthBase,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AuthBase>

export const Default: Story = {
  args: {},
}
