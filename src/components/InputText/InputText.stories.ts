import type { Meta, StoryObj } from '@storybook/react'
import InputText from './InputText'

const meta: Meta<typeof InputText> = {
  component: InputText,
  tags: ['autodocs'],
  argTypes: {
    isRequired: {
      control: { type: 'boolean' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputText>

export const Default: Story = {
  args: {
    label: 'Input',
    labelFor: 'input',
  },
}

export const IsRequired: Story = {
  args: {
    label: 'Input',
    labelFor: 'input',
    isRequired: true,
  },
}

export const IsDisabled: Story = {
  args: {
    label: 'Input',
    labelFor: 'input',
    isDisabled: true,
  },
}
