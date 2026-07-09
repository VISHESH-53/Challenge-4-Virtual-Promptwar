import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './error';

describe('ErrorBoundary Component', () => {
  it('renders the error message and reset button', () => {
    const resetMock = vi.fn();
    const errorMock = new Error('Test Error');
    
    render(<ErrorBoundary error={errorMock} reset={resetMock} />);
    
    expect(screen.getByText('System Fault Detected')).toBeInTheDocument();
    expect(screen.getByText(/The command center encountered an unexpected rendering error/i)).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /Reinitialize Subsystem/i });
    expect(button).toBeInTheDocument();
  });

  it('calls reset function when button is clicked', () => {
    const resetMock = vi.fn();
    const errorMock = new Error('Test Error');
    
    render(<ErrorBoundary error={errorMock} reset={resetMock} />);
    
    const button = screen.getByRole('button', { name: /Reinitialize Subsystem/i });
    fireEvent.click(button);
    
    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});
