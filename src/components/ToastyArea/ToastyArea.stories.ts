import type { Meta, StoryObj } from '@storybook/react'
import ToastyArea from './ToastyArea'

const meta: Meta<typeof ToastyArea> = {
  component: ToastyArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ToastyArea>

export const Default: Story = {
  args: {},
}
