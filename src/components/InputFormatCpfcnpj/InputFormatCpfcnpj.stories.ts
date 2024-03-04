import type { Meta, StoryObj } from '@storybook/react'
import InputFormatCpfcnpj from './InputFormatCpfcnpj'

const meta: Meta<typeof InputFormatCpfcnpj> = {
  component: InputFormatCpfcnpj,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof InputFormatCpfcnpj>

export const Default: Story = {
  args: {
    labelFor: 'document',
  },
}
