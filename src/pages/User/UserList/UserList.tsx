import React, { useEffect, useState } from "react";
// import styles from "./UserList.module.scss";
import useUsersQuery from "../../../hooks/UseUsersQuery/UseUsersQuery";
import LazyPage from "components/LazyPage";
import DinamicTable from "components/DinamicTable/DinamicTable";

type TableItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

const UserList: React.FC = () => {
  const { useGetUsersQuery, useDeleteUserMutation } = useUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [usersList, setUsersList] = useState<TableItem[]>([]);

  const {
    data,
    isLoading,
    // isError,
    // error
  } = useGetUsersQuery();
  useEffect(() => {
    if (data !== undefined) {
      const tableList = data.map((element) => {
        return {
          id: element.id,
          name: `${element.name.firstname} ${element.name.lastname}`,
          username: element.username,
          email: element.email,
        } as TableItem;
      });
      setUsersList(tableList);
    }
  }, [data]);

  if (isLoading) {
    return <LazyPage />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 mb-52 h-full">
        <div className="container mx-auto">
          <DinamicTable
            rows={usersList}
            module='users'
            readItems={true}
            updateItems={true}
            deleteItemsCallback={(id: string | number) => {
              console.log(id);
              deleteUser(id);
            }}
            itemsPerPage={5}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;