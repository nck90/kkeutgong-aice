import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MistakesPage } from './page'
import { renderWithProviders } from '@/test/utils'

describe('MistakesPage', () => {
  it('shows mistake codes', async () => {
    renderWithProviders(<MistakesPage />)
    expect(await screen.findByText(/ANSWER_VAR_MISSING/)).toBeInTheDocument()
  })
})
