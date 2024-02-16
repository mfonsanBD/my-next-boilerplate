import type { Meta, StoryObj } from '@storybook/react'
import InputWithMask from '.'

const meta: Meta<typeof InputWithMask> = {
  component: InputWithMask,
}

export default meta
type Story = StoryObj<typeof InputWithMask>

export const Default: Story = {
  args: {
    label: 'Phone',
    labelFor: 'phone',
    format: '+55 (##) 9####-####',
    mask: '_',
  },
}
