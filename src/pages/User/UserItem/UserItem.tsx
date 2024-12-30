import React from "react";

import styles from "./UserItem.module.scss";
import { useGetUserQuery } from "features/user/usersSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import SimpleMaps from "components/SimpleMaps";


const UserItem: React.FC = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    // isError,
    // error,
  } = useGetUserQuery(id as string);
  if (isLoading) {
    return <Spinner />;
  }

  const geolocalization = user.address.geolocation


  return (
    <>
      <div className={`${styles.userItem} container mx-auto`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto">
          <div className="px-5">
            <h1 className={`h1 mb-6`}>addres localization</h1>
            <div className="block relative h-60">
              <SimpleMaps
                center={{
                  lat: Number(geolocalization.lat as number),
                  lng: Number(geolocalization.long as number),
                }}
                zoom={11}
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="pb-3">
              <h1>{user.username}</h1>
              <h2>
                {user.name.firstname} - {user.name.lastname}
              </h2>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
            <hr />
            <div className="py-3">
              <p>addres:</p>
              <div className="pl-3">
                <p>city: {user.address.city}</p>
                <p>street: {user.address.street}</p>
                <p>number: {user.address.number}</p>
                <p>zipcode: {user.address.zipcode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItem;