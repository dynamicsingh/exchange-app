import React from 'react';
import { Layout } from '../index';
import { render } from '@testing-library/react';

describe('<Layout/>', () => {
  it('renders Layout with children', () => {
    const { getByTestId } = render(<Layout>Hello</Layout>);
    let layout = getByTestId(/layout-container/i);
    expect(layout).toHaveTextContent('Hello');
  });
});
