import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Heading from './Heading'

describe('Heading', () => {
  it('should render heading', () => {
    render(<Heading>Heading</Heading>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })
})
