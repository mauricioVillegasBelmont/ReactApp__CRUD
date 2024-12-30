import React from 'react';
import ReactDOM from 'react-dom';
import ConfirmDialog from './ConfirmDialog';

it('It should mount', () => {
  const div = document.createElement('div');
  const confirmHandler = (response:boolean)=>{
    console.log(response);
  };
  ReactDOM.render(
    <ConfirmDialog
      buttonProps={{
        color: "failure",
        size: "xs",
      }}
      buttonMessage={'demo Button'}
      modalMesage={<h3>estas seguro que queres eliminar este elemnto</h3>}
      confirmHandler={(response) => confirmHandler(response)}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});