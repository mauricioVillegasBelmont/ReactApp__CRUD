import React from 'react';
import ReactDOM from 'react-dom';
import PoiMarkers from './';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PoiMarkers pois={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});