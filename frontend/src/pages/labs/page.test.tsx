import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LabsPage } from './page'
import { renderWithProviders } from '@/test/utils'

describe('LabsPage', () => {
  it('renders labs list from mock api', async () => {
    renderWithProviders(<LabsPage />)
    expect(await screen.findByText('Full Pipeline: 회귀 기본 세트')).toBeInTheDocument()
  })
})
