import type { Meta, StoryObj } from '@storybook/react'
import Base from '.'

const meta: Meta<typeof Base> = {
  component: Base,
}

export default meta
type Story = StoryObj<typeof Base>

export const Default: Story = {
  args: {
    children: 'Base',
  },
}
