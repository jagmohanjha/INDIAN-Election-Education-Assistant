import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import EligibilityChecker from '../components/EligibilityChecker';

describe('EligibilityChecker', () => {
  it('renders all eligibility fields', () => {
    render(<EligibilityChecker onEligibilityResult={vi.fn()} />);

    expect(screen.getByLabelText(/what's your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/how old are you/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /yes, indian citizen/i })).toBeInTheDocument();
  });

  it('shows eligible result when user meets requirements', async () => {
    const resultHandler = vi.fn();
    render(<EligibilityChecker onEligibilityResult={resultHandler} />);

    fireEvent.change(screen.getByLabelText(/what's your name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/how old are you/i), { target: { value: '21' } });
    fireEvent.click(screen.getByRole('button', { name: /yes, indian citizen/i }));
    fireEvent.change(screen.getByLabelText(/which state do you live in/i), { target: { value: 'Maharashtra' } });
    fireEvent.click(screen.getByRole('button', { name: /check my eligibility/i }));

    expect(await screen.findByText(/congratulations/i)).toBeInTheDocument();
    expect(resultHandler).toHaveBeenCalled();
  });
});
