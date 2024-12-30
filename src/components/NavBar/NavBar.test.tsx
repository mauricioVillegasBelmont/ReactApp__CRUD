import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar isAuth={false} isAdmin={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});