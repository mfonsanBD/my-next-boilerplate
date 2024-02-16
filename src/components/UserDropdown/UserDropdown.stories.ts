import type { Meta, StoryObj } from '@storybook/react'
import UserDropdown from '.'

const meta: Meta<typeof UserDropdown> = {
  component: UserDropdown,
}

export default meta
type Story = StoryObj<typeof UserDropdown>

export const Default: Story = {
  args: {},
}
