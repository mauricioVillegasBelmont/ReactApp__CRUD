import { FC } from "react";
import { Button,  Label,  Popover, TextInput } from "flowbite-react";

import styles from "./EditUserForm.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import ValidationContent from "../ValidationContent/ValidationContent";


interface IFormInput {
  password: string;
  confirm: string;
}


const EditUserForm: FC = () =>{
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<IFormInput>();

  const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,12}$/;

  const password = watch("password","");
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className={styles.EditUserForm}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Change password" />
            </div>

            <Popover
              trigger="hover"
              content={<ValidationContent value={password} />}
            >
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
                  pattern: {
                    value: passRegex,
                    message:
                      "Debe contar minimo con una mayuscula, una minuscula, un número y un caracter especial",
                  },
                })}
                helperText={
                  errors.password && <span>{errors.password.message}</span>
                }
                aria-expanded="false"
                aria-haspopup="dialog"
              />
            </Popover>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirm" value="Confirm your password" />
            </div>
            <TextInput
              id="confirm"
              type="password"
              color={errors.confirm ? "failure" : "gray"}
              autoComplete="new-password"
              {...register("confirm", {
                required: "Confirm is required",
                validate: (value) =>
                  value === password || "passwords dont match",
              })}
              helperText={
                errors.confirm && <span>{errors.confirm.message}</span>
              }
            />
          </div>
          <Button type="submit" >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default EditUserForm;
