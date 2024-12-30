import React, { useEffect, useState } from "react";
import useProductsQuery from "../../../hooks/UseProductsQuery/UseProductsQuery";
import { Badge, Button, Modal, Pagination, Spinner, Table, TextInput, List } from 'flowbite-react';
import { IProduct } from "../../../features/product/interface";
import { HiPencilAlt, HiTrash, HiSearch } from "react-icons/hi";
import useArrayHooks from "../../../hooks/arrayHooks/arrayHooks";

import styles from "./ProductList.module.scss";
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";

import pipe from "utils/pipe";
import useArrayPipes from "../../../hooks/UseArrayPipes/UseArrayPipes";

const ProductList: React.FC = () => {
  const { useGetProductsQuery, useDeleteProductMutation } = useProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [productsListTest, setProductsListTest] = useState<IProduct[]>([]);



  const { array, set, find, sort, sortDirection } = useArrayHooks([] as IProduct[] );


  const {
    push,
    filter,
    update,
    remove,
    clear,
    pop,
    findIndex,
    includes,
    isEmpty,
    sortAttr,
    shuffle,
  } = useArrayPipes();

  const itemsPerPage = 5;
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();
  useEffect(() => {
    if (data !== undefined) {
      setTotalPages(
        Math.ceil(Object.keys(data).length / itemsPerPage)
      );
      // setProductsList(data);
      console.log(
        Array.isArray(data)
      )
      set(data);
      const test = pipe([])
      setProductsListTest;
    }
  }, [data]);
  useEffect(() => {
    if(array && array.length > 0) setProductsList(array);
  }, [array]);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const deleteEleemnt = (response:boolean,itemID:string|number)=>{
    if(!response) return;
    console.log(`delete item: ${itemID}`);
    deleteProduct(itemID);
  };

  const sortToogleHandler = ()=>{
    if(sortDirection == 'desc') return sort('asc');
    if(sortDirection == 'asc') return sort("desc");
  }

  const filterInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };




  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-5 mb-52 h-full">
        <div className="container">
          <div className="flex py-5">
            <div className="flex-none w-30">
              <Button size="sm" onClick={sortToogleHandler}>
                Sort:{" "}
                <Badge color="info" className="ml-3">
                  {sortDirection}
                </Badge>
              </Button>
            </div>
            <div className="flex-none w-50 ml-auto">
              <TextInput
                id="filter"
                placeholder="filter"
                addon={<HiSearch className="-ml-0.5 mr-2 h-4 w-4" />}
                list="products-names"
                onInput={filterInputHandler}
              />
              <datalist id="products-names">
                {productsList.map((element: IProduct) => (
                  <option
                    key={`list-${element.id}`}
                    value={element.title}
                  ></option>
                ))}
              </datalist>
            </div>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Product id</Table.HeadCell>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {productsList
                .filter(
                  (element: IProduct, index: number) =>
                    index < currentPage * itemsPerPage &&
                    index >= (currentPage - 1) * itemsPerPage
                )
                .map((element: IProduct) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={element.id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {element.id}
                    </Table.Cell>
                    <Table.Cell>{element.title}</Table.Cell>
                    <Table.Cell>{element.category}</Table.Cell>
                    <Table.Cell>
                      <a
                        href={`/#/productos/update/${element.id}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        <HiPencilAlt className="-ml-0.5 mr-2 h-4 w-4" />
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      <ConfirmDialog
                        buttonProps={{
                          color: "failure",
                          size: "xs",
                        }}
                        buttonMessage={<HiTrash className="mx-0 h-4 w-4" />}
                        modalMesage={
                          <>
                            <h3 className="text-center mb-3">
                              ¿Estas seguro que quieres eliminar este elemento?
                            </h3>
                            <h2 className="text-center font-bold">
                              {element.title}
                            </h2>
                          </>
                        }
                        confirmHandler={(response) =>
                          deleteEleemnt(response, element.id)
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
