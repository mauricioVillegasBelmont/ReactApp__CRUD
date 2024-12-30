import React, { useEffect, useState } from "react";

import { Button, Pagination, Select, Spinner, Table, TextInput } from "flowbite-react";
import {
  HiPencilAlt,
  HiTrash,
  HiSearch,
  HiEye,
} from "react-icons/hi";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";


// import styles from "./LoginForm.module.scss";
interface DinamicTableProps<
  T extends Record<string, string | boolean | number>
> {
  rows: T[];
  module:string;
  readItems: boolean;
  updateItems: boolean;
  deleteItemsCallback?: (id: string | number) => void;
  itemsPerPage:number;
}

const DinamicTable = <T extends Record<string, any>>(
  props: DinamicTableProps<T>
): JSX.Element => {
  const { rows,module, readItems, updateItems, deleteItemsCallback, itemsPerPage } =
    props;

  const [sortedRows, setRows] = useState<T[]>([]);
  const [order, setOrder] = useState("asc");
  const [sortKey, setSortKey] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (rows.length > 0) {
      setRows(rows);
      setSortKey(Object.keys(rows[0])[0]);
      setIsLoading(false);
    }
  }, [rows]);

  if (isLoading) {
    return <Spinner />;
  }

  const filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value) {
      setRows([
        ...rows.filter((row) => {
          return Object.values(row).join("").toLowerCase().includes(value);
        }),
      ]);
    } else {
      setRows(rows);
    }
  };
  const sort = (value: keyof T, order: string) => {
    const returnValue = order === "desc" ? 1 : -1;

    setSortKey(value as string);
    setRows([
      ...sortedRows.sort((a, b) => {
        return a[value] > b[value] ? returnValue * -1 : returnValue;
      }),
    ]);
  };

  const updateOrder = () => {
    const updatedOrder = order === "asc" ? "desc" : "asc";

    setOrder(updatedOrder);
    sort(sortKey as keyof T, updatedOrder);
  };


  const capitalize = (str: string) =>
    str?.replace(/\b\w/g, (substr) => substr.toUpperCase());

  const formatEntry = (entry: string | number | boolean) => {
    if (typeof entry === "boolean") {
      return entry ? "✅" : "❌";
    }
    return entry;
  };

  const deleteHandler = (response:boolean,itemID:string|number)=>{
    if(!response || deleteItemsCallback === undefined) return;
    console.log(`delete item: ${itemID}`);
    deleteItemsCallback(itemID)
  };

  const totalPages =Math.ceil(Object.keys(rows).length / itemsPerPage);
  // const [totalPages, setTotalPages] = useState<number>(1);


  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex py-5 w-100">
        <div className="flex-none w-30 mr-auto">
          <TextInput
            id="filter"
            placeholder="filter"
            addon={<HiSearch className="mx-auto h-4 w-4" />}
            list="products-names"
            onInput={filter}
          />
        </div>
        <div className="flex-none w-30 ml-auto">
          <Select
            onChange={(event) => sort(event.target.value as keyof T, order)}
          >
            {Object.keys(rows[0]).map((entry, index) => (
              <option value={entry} key={index}>
                Order by {capitalize(entry)}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex-none w-30 ml-5">
          <Button size="sm" onClick={updateOrder}>
            Switch order ({order})
          </Button>
        </div>
      </div>
      <Table>
        <Table.Head>
          {Object.keys(rows[0]).map((entry, index) => (
            <Table.HeadCell key={index}>{capitalize(entry)}</Table.HeadCell>
          ))}
          {readItems ? (
            <Table.HeadCell>{capitalize("view")}</Table.HeadCell>
          ) : null}
          {updateItems ? (
            <Table.HeadCell>{capitalize("edit")}</Table.HeadCell>
          ) : null}
          {deleteItemsCallback !== undefined ? (
            <Table.HeadCell>{capitalize("delete")}</Table.HeadCell>
          ) : null}
        </Table.Head>
        <Table.Body className="divide-y">
          {sortedRows
            .filter(
              (element: T, index: number) =>
                index < currentPage * itemsPerPage &&
                index >= (currentPage - 1) * itemsPerPage
            )
            .map((row, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                {Object.values(row).map((entry, columnIndex) => (
                  <Table.Cell key={columnIndex}>
                    {formatEntry(entry)}
                  </Table.Cell>
                ))}
                {readItems ? (
                  <Table.Cell className="text-center">
                    <a
                      href={`/#/${module}/${row.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      <HiEye className="mx-auto h-4 w-4" />
                    </a>
                  </Table.Cell>
                ) : null}
                {updateItems ? (
                  <Table.Cell className="text-center">
                    <a
                      href={`/#/${module}/update/${row.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      <HiPencilAlt className="mx-auto h-4 w-4" />
                    </a>
                  </Table.Cell>
                ) : null}
                {deleteItemsCallback !== undefined ? (
                  <Table.Cell className="text-center">
                    <ConfirmDialog
                      buttonProps={{
                        color: "failure",
                        size: "xs",
                      }}
                      buttonMessage={<HiTrash className="mx-auto h-4 w-4" />}
                      modalMesage={
                        <>
                          <h3 className="text-center mb-3">
                            ¿Estas seguro que quieres eliminar este elemento?
                          </h3>
                          <h2 className="text-center font-bold">{row.name}</h2>
                        </>
                      }
                      confirmHandler={(response: boolean) =>
                        deleteHandler(response, row.id as string | number)
                      }
                    />
                  </Table.Cell>
                ) : null}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {!sortedRows.length && <h1>No results... Try expanding the search</h1>}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default DinamicTable;
