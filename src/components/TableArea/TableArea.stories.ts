import type { Meta, StoryObj } from '@storybook/react'
import TableArea from './TableArea'

const meta: Meta<typeof TableArea> = {
  component: TableArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TableArea>

export const Default: Story = {
  args: {},
}
