import React from 'react';
import ReactDOM from 'react-dom';
import ValidationContent from './ValidationContent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ValidationContent value='Abcd@1245' />, div);
  ReactDOM.unmountComponentAtNode(div);
});