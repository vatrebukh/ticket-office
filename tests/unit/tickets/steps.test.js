import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Navigation, LabeledInput1, LabeledBox, LabeledInput2 } from '../../../frontend/static/js/tickets/steps';
import { StepContext } from '../../../frontend/static/js/tickets/StepContext';

describe('Navigation', () => {
  it('renders navigation buttons', () => {
    const stepHandler = jest.fn();
    const { getByText } = render(
      <StepContext.Provider value={stepHandler}>
        <Navigation step={2} />
      </StepContext.Provider>
    );

    expect(getByText('prev')).toBeInTheDocument();
    expect(getByText('next')).toBeInTheDocument();
  });

  it('calls stepHandler when buttons are clicked', () => {
    const stepHandler = jest.fn();
    const { getByText } = render(
      <StepContext.Provider value={stepHandler}>
        <Navigation step={2} />
      </StepContext.Provider>
    );

    fireEvent.click(getByText('prev'));
    expect(stepHandler).toHaveBeenCalledWith(1);

    fireEvent.click(getByText('next'));
    expect(stepHandler).toHaveBeenCalledWith(3);
  });
});


describe('LabeledInput1', () => {
    
    it('renders label and input', () => {
        const { getByText } = render(<LabeledInput1 label='First Name' name='firstName' />);
        expect(getByText('First Name')).toBeInTheDocument();
    });

    test('renders error label conditionally', () => {
        const errorMessage = "Error message";
        const { rerender } = render(<LabeledInput1 label="Test Label" name="test" value="" error="" onChange={() => {}} />);
        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();

        rerender(<LabeledInput1 label="Test Label" name="test" value="" error={errorMessage} onChange={() => {}} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('calls onChange when input is changed', () => {
        const onChange = jest.fn();
        const { getByDisplayValue } = render(
            <LabeledInput1 label='First Name' name='firstName' value='Jack' onChange={onChange} />
        );

        const input = getByDisplayValue('Jack');
        fireEvent.change(input, { target: { value: 'John' } });

        expect(onChange).toHaveBeenCalledWith(expect.anything());
    });
    
})


describe('LabeledBox', () => {
    
    it('renders label and checkbox', () => {
        const { getByText } = render(<LabeledBox label='Terms' name='terms' />);
        expect(getByText('Terms')).toBeInTheDocument();
    });

    it('calls onChange when checkbox is changed', () => {
        const onChange = jest.fn();
        const { getByRole } = render(
            <LabeledBox label='Terms' name='terms' value={false} onChange={onChange} />
        );

        const checkbox = getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(onChange).toHaveBeenCalledWith(expect.anything());
    });
})