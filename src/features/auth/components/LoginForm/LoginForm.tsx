import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLoginMutation } from "features/auth/authApi";


import { Button, Checkbox, Label, TextInput, Toast } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { setCredentials } from "features/auth/authSlice";

import { HiX } from "react-icons/hi";
import styles from "./Login.module.scss";

interface IFormInput {
  username: string;
  password: string;
}

const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<IFormInput>();

  const [showToast, setShowToast] = useState<boolean>(false);

  const [login, { isLoading }] = useLoginMutation();

  // const emailRegex =
  //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    try {
      const tokenObj = await login(data).unwrap();
      const response = {
        ...tokenObj,
        user: data.username,
        isAdmin: false,
      };
      dispatch(setCredentials(response))
      navigate("/products");
    } catch (err) {
      console.error("Failed to logIn:", err);
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false);
      },2500);

    }


  };




  return (
    <>
      <div className={styles.LoginForm}>
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>FROM AUTH</h1>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Usuario" />
            </div>
            <TextInput
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Ingresa tu nombre de usuario"
              {...register("username", {
                required: "ingresa tu usuario",
              })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type="password"
              color={errors.password ? "failure" : "gray"}
              maxLength={12}
              autoComplete="new-password"
              {...register("password", {
                required: "New pasword is required",
                minLength: {
                  value: 6,
                  message: "Debe tener minimo 6 caracteres.",
                },
                maxLength: {
                  value: 12,
                  message: "Debe tener maximo 12 caracteres.",
                },
              })}
              helperText={
                errors.password && <span>{errors.password.message}</span>
              }
              aria-expanded="false"
              aria-haspopup="dialog"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </div>
      {showToast && (
        <Toast className="fixed left-3 bottom-3">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Oh no, there was an error
          </div>
          <Toast.Toggle />
        </Toast>
      )}
    </>
  );
};

export default LoginForm;
