import type { Meta, StoryObj } from '@storybook/react'
import TitleArea from './TitleArea'

const meta: Meta<typeof TitleArea> = {
  component: TitleArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TitleArea>

export const Default: Story = {
  args: {},
}
