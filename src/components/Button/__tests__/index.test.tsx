import * as React from 'react';
import { Button } from '../index';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

describe('<Button />', () => {
  it('renders a btn with primary class and qaId', () => {
    const { getByTestId } = render(<Button>Hello</Button>);
    const btn = getByTestId(/btn/i);
    expect(btn).toHaveAttribute('class', 'button');
    expect(btn).toHaveAttribute('data-testid', 'ele-btn');
  });

  it('renders with custom qaIdPrefix', () => {
    const { getByTestId } = render(<Button qaIdPrefix="submit">Hello</Button>);
    const btn = getByTestId(/btn/i);
    expect(btn).toHaveAttribute('data-testid', 'submit-btn');
  });

  it('renders a disabled btn when passed disabled', () => {
    const { getByTestId } = render(
      <Button qaIdPrefix="submit" disabled={true}>
        Hello
      </Button>,
    );
    const btn = getByTestId(/btn/i);
    expect(btn).toBeDisabled();
  });

  it('calls a function when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Button qaIdPrefix="submit" onClick={onClick}>
        Hello
      </Button>,
    );
    const btn = getByTestId(/btn/i);
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });
});
