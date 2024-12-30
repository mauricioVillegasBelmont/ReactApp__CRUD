import React, { useEffect, useState } from "react";
import styles from "./ProductCreate.module.scss";
import {
  Button,
  FileInput,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";

import useProductsQuery from "hooks/UseProductsQuery/UseProductsQuery";

interface ProductCreateInput {
  title: string;
  category: string;
  image: string;
  description: string;
  price: number;
};
const ProductCreate: React.FC = () => {
  const { useGetCategoriesQuery, useCreateProductMutation } = useProductsQuery();
  const [imgFile, setImgFile] = useState<string>(
    "https://placehold.co/400"
  );

  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [categoriesState, setCategoriesState] = useState<string[]>([]);


  useEffect(() => {
    if (!categories) return;
    setCategoriesState(categories);
  }, [categories]);

  function handleFileInputChange(event: any) {
    if (event.target.files.length < 1) return;
    const file = event.target.files[0];
    const blob = new Blob([file], { type: file.type });
    const url = URL.createObjectURL(blob);
    setImgFile(url);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty, touchedFields },
  } = useForm<ProductCreateInput>();

  setValue("title", "");
  setValue("category", "");
  setValue("description", "");
  setValue("price", 0);
  // useEffect(() => {
  // }, []);

  const [createProduct] = useCreateProductMutation();
  const onSubmit: SubmitHandler<ProductCreateInput> = (data) => {
    console.log(data, errors, isValid, isDirty, touchedFields);
    if (!isDirty) return;
    createProduct(data);
  };



  if (isLoading) {
    return <Spinner />;
  }

   return (
    <>
      <div className={`${styles.ProductItem} container mx-auto`}>
        <form
          encType="multipart/form-data"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-5">
            <img
              src={imgFile as string | undefined}
              alt='preview'
              className="mb-3"
            />
            <FileInput
              id="file"
              helperText="A product picture"
              accept="image/png, image/jpeg, image/webp"
              {...register("image", {
                onChange: (e) => handleFileInputChange(e),
              })}
            />
          </div>
          <div className="lg:col-span-2">
            <TextInput
              id="title"
              addon="TITLE"
              {...register("title", {
                required: "Products must have a title",
              })}
            />
            <div className="my-5">
              <Select
                id="countries"
                addon="CATEGORY"
                {...register("category", {
                  required: "Products must have a category",
                })}
              >
                <option value="" disabled hidden >selecciona una opcion</option>
                {categoriesState.map((element, index) => (
                  <option key={index} value={element}>
                    {element}
                  </option>
                ))}
              </Select>
            </div>
            <div className="my-5">
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description:" />
              </div>
              <Textarea
                id="description"
                placeholder="Product description"
                rows={4}
                {...register("description", {
                  required: "Products must have a description",
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <TextInput
                id="price"
                addon="PRICE:"
                type="number"
                step={0.05}
                {...register("price", {
                  required: "Products must have a price",
                })}
              />
            </div>
          </div>
          <div className="lg:col-span-3 gap-5 my-5">
            <Button type="submit" className="ml-auto" disabled={!isDirty}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductCreate;