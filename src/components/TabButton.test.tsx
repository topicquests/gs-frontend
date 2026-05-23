import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TabButton from './TabButton.tsx';

describe('TabButton', () => {
  const defaultProps = {
    active: false,
    onClick: () => {},
    label: 'Test Tab',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders with correct label', () => {
    render(<TabButton {...defaultProps} />);
    expect(screen.getByText('Test Tab')).toBeInTheDocument();
  });

  it('has correct styling when inactive', () => {
    render(<TabButton {...defaultProps} active={false} />);
    const button = screen.getByText('Test Tab');
    expect(button).toHaveClass('border-transparent', 'text-secondary-light');
  });

  it('has correct styling when active', () => {
    render(<TabButton {...defaultProps} active={true} />);
    const button = screen.getByText('Test Tab');
    expect(button).toHaveClass('border-primary-dark', 'text-primary-dark');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<TabButton {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByText('Test Tab'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
