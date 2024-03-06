import type { Meta, StoryObj } from '@storybook/react'
import InputFormatPhone from './InputFormatPhone'

const meta: Meta<typeof InputFormatPhone> = {
  component: InputFormatPhone,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InputFormatPhone>

export const Default: Story = {
  args: {
    labelFor: 'document',
  },
}
