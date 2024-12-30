import React, { useEffect, useState } from "react";
// import { useUserEditHooks } from "./UserEdit.hooks";
import styles from "./UserEdit.module.scss";
import { Button, Spinner, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "features/user/usersSlice";


import {IUser} from "features/user/interface"
import { SubmitHandler, useForm } from "react-hook-form";

import SimpleMaps from "components/SimpleMaps";
import { Poi } from "components/SimpleMaps/PoiMarkers";
import useUsersQuery from "hooks/UseUsersQuery/UseUsersQuery";

interface UserUpdateInput {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
};


const UserEdit: React.FC = () => {
  const { id } = useParams();
  const { useUpdateUserMutation } = useUsersQuery();

  const [inputState, setInputState] = useState<IUser | null>(null);

  const [usePois, setUsePois] = useState<Poi|null>(null);
  const [useCenter, setUseCenter] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 0,
    lng: 0,
  });
  const {
    data: user,
    isLoading,
    // isError,
    // error,
  } = useGetUserQuery(id as string);

  useEffect(() => {
    if(!user) return;
    setInputState(user);
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty, touchedFields },
  } = useForm<UserUpdateInput>();

  useEffect(() => {
    if (!user || !inputState) return;
    setValue("id", (inputState as IUser).id);
    setValue("email", (inputState as IUser).email);
    setValue("username", (inputState as IUser).username);
    setValue("name.firstname", (inputState as IUser).name.firstname);
    setValue("name.lastname", (inputState as IUser).name.lastname);
    setValue("address.city", (inputState as IUser).address.city);
    setValue("address.street", (inputState as IUser).address.street);
    setValue("address.number", (inputState as IUser).address.number);
    setValue("address.zipcode", (inputState as IUser).address.zipcode);
    setValue(
      "address.geolocation.lat",
      (inputState as IUser).address.geolocation.lat
    );
    setValue(
      "address.geolocation.long",
      (inputState as IUser).address.geolocation.long
    );
    setValue("phone", (inputState as IUser).phone);

    const geolocalizationCenter = {
      lat: Number((inputState as IUser).address.geolocation.lat),
      lng: Number((inputState as IUser).address.geolocation.long),
    };
    setUseCenter(geolocalizationCenter);

    const userPoi = {
      key: (inputState as IUser).username,
      location: geolocalizationCenter,
    };
    setUsePois(userPoi);
  }, [inputState, setValue, user]);

  useEffect(() => {
    if (!usePois) return;
    setValue("address.geolocation.lat", String(usePois?.location.lat));
    setValue("address.geolocation.long", String(usePois?.location.lng));
  }, [usePois, setValue]);



  const callBackGeolocation = (event:any) => {
    console.log(event.latLng);
    const userPoi = {
      key: (inputState as IUser).username,
      location: event.latLng,
    };
    setUsePois(userPoi);
  };

  const [userUpdate] =useUpdateUserMutation();
  const onSubmit: SubmitHandler<UserUpdateInput> = (data) => {
    console.log(data, errors, isValid, isDirty, touchedFields);
    if (!isDirty) return;
    userUpdate(data);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className={`${styles.userItem} container mx-auto`}>
        <div className="grid grid-cols-1 gap-5 my-auto">
          <form className="lg:col-span-2" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id", {})} />
            <input
              type="hidden"
              {...register("address.geolocation.lat", {})}
            />
            <input
              type="hidden"
              {...register("address.geolocation.long", {})}
            />
            <div className="grid grid-cols-1 gap-5 pb-3">
              <TextInput
                id="title"
                addon="USERNAME"
                {...register("username", {
                  required: "Products must have a title",
                })}
              />
              <TextInput
                id="title"
                addon="FIRSTNAME"
                {...register("name.firstname", {
                  required: "Products must have a title",
                })}
              />
              <TextInput
                id="title"
                addon="LASTNAME"
                {...register("name.lastname", {
                  required: "Products must have a title",
                })}
              />
              <TextInput
                id="title"
                addon="EMAIL"
                {...register("email", {
                  required: "Products must have a title",
                })}
              />
              <TextInput
                id="title"
                addon="PHONE"
                {...register("phone", {
                  required: "Products must have a title",
                })}
              />
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-3 py-3">
              <div className="px-5">
                <h1 className={`h1 mb-6`}>addres localization</h1>
                <div className="block relative h-60">
                  <SimpleMaps
                    center={useCenter}
                    zoom={5}
                    locations={usePois ? ([usePois] as Poi[]) : []}
                    locationsCallback={callBackGeolocation}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:col-span-2 gap-5 pl-3">
                <p className="pb-3">addres:</p>
                <TextInput
                  id="title"
                  addon="CITY"
                  {...register("address.city", {
                    required: "Products must have a title",
                  })}
                />
                <TextInput
                  id="title"
                  addon="STREET"
                  {...register("address.street", {
                    required: "Products must have a title",
                  })}
                />
                <TextInput
                  id="title"
                  addon="NUMBER"
                  {...register("address.number", {
                    required: "Products must have a title",
                  })}
                />

                <TextInput
                  id="title"
                  addon="ZIPCODE"
                  {...register("address.zipcode", {
                    required: "Products must have a title",
                  })}
                />
              </div>
            </div>
            <div className=" gap-5 my-5">
              <Button type="submit" className="ml-auto" disabled={!isDirty}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserEdit;