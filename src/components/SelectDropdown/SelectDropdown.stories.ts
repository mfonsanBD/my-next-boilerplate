import type { Meta, StoryObj } from '@storybook/react'
import SelectDropdown from './SelectDropdown'
import { ActivityType } from './mock'
import { SelectMapper } from '../../utils/mappers'

const meta: Meta<typeof SelectDropdown> = {
  component: SelectDropdown,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelectDropdown>

export const Default: Story = {
  args: {
    name: 'tipo de atividade',
    items: SelectMapper(ActivityType),
    label: 'Tipo de Atividade',
    labelFor: 'activityType',
  },
}

export const IsRequired: Story = {
  args: {
    name: 'tipo de atividade',
    items: SelectMapper(ActivityType),
    label: 'Tipo de Atividade',
    labelFor: 'activityType',
    isRequired: true,
  },
}

export const IsDisabled: Story = {
  args: {
    name: 'tipo de atividade',
    items: SelectMapper(ActivityType),
    label: 'Tipo de Atividade',
    labelFor: 'activityType',
    isDisabled: true,
  },
}
