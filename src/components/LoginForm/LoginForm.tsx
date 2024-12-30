import React, { FC } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import styles from "./LoginForm.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm: FC = () =>{
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormInput>();

  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className={styles.LoginForm}>
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              {...register("email", {
                required: "ingresa tu email",
                pattern: {
                  value: emailRegex,
                  message: "Ingresa un email valido",
                },
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
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
