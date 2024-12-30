import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMaps from './index';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <SimpleMaps
      {...{
        center: {
          lat: 10.99835602,
          lng: 77.01502627,
        },
        zoom: 11,
        locations:[],
        locationsCallback:(e)=>{console.log(e)},
      }}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});