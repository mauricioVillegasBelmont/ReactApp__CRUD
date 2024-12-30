import React from 'react';
import ReactDOM from 'react-dom';
import DinamicTable from './DinamicTable';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DinamicTable
      rows={[]}
      module="test"
      readItems={true}
      updateItems={true}
      deleteItemsCallback={(id: string | number) => {
        console.log(id);
      }}
      itemsPerPage={5}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});