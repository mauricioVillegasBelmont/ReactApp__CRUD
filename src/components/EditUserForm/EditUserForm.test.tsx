import React from 'react';
import ReactDOM from 'react-dom';
import EditUserForm from './EditUserForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditUserForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});