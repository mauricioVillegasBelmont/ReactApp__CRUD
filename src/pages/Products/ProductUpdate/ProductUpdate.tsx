import React, { useEffect,  useState } from "react";

import styles from "./ProductUpdate.module.scss";
import { Badge, Button, FileInput, Label, Rating, Select, Spinner, Textarea, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import { HiUser,HiStar } from "react-icons/hi";
import { IProduct } from "features/product/interface";
import useProductsQuery from "hooks/UseProductsQuery/UseProductsQuery";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProductUpdateInput {
  id: number | string;
  title: string;
  category: string;
  image: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

const ProductUpdate: React.FC = () => {
  const {
    useGetProductQuery,
    useGetCategoriesQuery,
    useUpdateProductMutation,
  } = useProductsQuery();
  const { id } = useParams();
  const [imgFile, setImgFile] = useState<string|null>(null);

  const {
    data: productItem,
    isLoading,
    // isError,
    // error,
  } = useGetProductQuery(id as string);
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const [inputState, setInputState] = useState<IProduct|null>(null);
  const [categoriesState,setCategoriesState] = useState<string[]>([])

  useEffect(() => {
    if(!productItem) return;
    setInputState(productItem);
    setImgFile(productItem.image);
  }, [productItem]);
  useEffect(() => {
    if(!categories) return;
    setCategoriesState(categories);
  }, [categories]);

  function handleFileInputChange(event:any) {
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
    formState: { isDirty, },
  } = useForm<ProductUpdateInput>();

  useEffect(() => {
    if (!productItem) return;
    setValue("title", (inputState as IProduct).title);
    setValue("category", (inputState as IProduct).category);
    setValue("description", (inputState as IProduct).description);
    setValue("price", (inputState as IProduct).price);
  }, [productItem, inputState, setValue]);

  const [updateProduct] = useUpdateProductMutation();
  const onSubmit: SubmitHandler<ProductUpdateInput> = (data) => {
    if(!isDirty) return;
    updateProduct(data);
  };

  if (isLoading || categoriesLoading || !inputState) {
    return <Spinner />;
  }

  const round_rate = Math.round(productItem.rating.rate);


  return (
    <>
      <div className={`${styles.ProductItem} container mx-auto`}>
        <form
          encType="multipart/form-data"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="hidden"
            {...register("id", {
              value: (inputState as IProduct).id,
            })}
          />
          <input
            type="hidden"
            {...register("rating", {
              value: (inputState as IProduct).rating,
            })}
          />
          <div className="px-5">
            <img
              src={imgFile as string | undefined}
              alt={productItem.title}
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
                // value: (inputState as IProduct).title,
                // onChange: (e) => inputOnChangeHandler(e),
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
                  // value: (inputState as IProduct).description,
                  // onChange: (e) => inputOnChangeHandler(e),
                  required: "Products must have a description",
                })}
              />
            </div>
            <div className="mb-5 mt-2.5 flex items-center">
              <Rating className="mb-2">
                <Rating.Star filled={round_rate >= 1} />
                <Rating.Star filled={round_rate >= 2} />
                <Rating.Star filled={round_rate >= 3} />
                <Rating.Star filled={round_rate >= 4} />
                <Rating.Star filled={round_rate >= 5} />
                <Badge
                  icon={HiStar}
                  className="inline-flex py-1 px-3   mx-3 my-6 "
                >
                  {productItem.rating.rate}
                </Badge>
              </Rating>
              <div className="block">
                <Badge
                  icon={HiUser}
                  className="inline-flex py-1 px-3   mx-3 my-6 "
                  color="gray"
                >
                  {productItem.rating.count}
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <TextInput
                id="price"
                addon="PRICE:"
                type="number"
                step={0.05}
                {...register("price", {
                  // value: (inputState as IProduct).price,
                  // onChange: (e) => inputOnChangeHandler(e),
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

export default ProductUpdate;