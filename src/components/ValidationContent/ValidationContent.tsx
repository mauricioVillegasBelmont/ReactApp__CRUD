import React, { FC, useEffect, useState } from "react";
import styles from "./LoginForm.module.scss";


import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { List } from "flowbite-react";


interface ValidationContentProps {
  value:string;
}

const ValidationContent: FC<ValidationContentProps> = (props:ValidationContentProps) =>{
  const { value } = props;

  const [spec1, setSpec1] = useState(false);
  const [spec2, setSpec2] = useState(false);
  const [spec3, setSpec3] = useState(false);
  const [spec4, setSpec4] = useState(false);
  const [spec5, setSpec5] = useState(false);
  const [suma, setSuma] = useState(5);

  useEffect(() => {
    setSuma([spec1, spec2, spec3, spec4, spec5].filter(Boolean).length);
  }, [spec1, spec2, spec3, spec4, spec5]);

  useEffect(() => {
    setSpec1(value.length > 5);
    setSpec2(/[A-Z]/.test(value));
    setSpec3(/[a-z]/.test(value));
    setSpec4(/[^A-z\s\d][\\\^]?/.test(value));
    setSpec5(/[0-9]/.test(value));
  }, [value]);


  return (
    <>
      <div className="space-y-2 p-3">
        <div className="grid grid-cols-5 gap-2">
          <div
            className={`h-1 ${suma >= 1 ? "bg-lime-500" : "bg-gray-200"}`}
          ></div>
          <div
            className={`h-1 ${suma >= 2 ? "bg-lime-500" : "bg-gray-200"}`}
          ></div>
          <div
            className={`h-1 ${suma >= 3 ? "bg-lime-500" : "bg-gray-200"}`}
          ></div>
          <div
            className={`h-1 ${suma >= 4 ? "bg-lime-500" : "bg-gray-200"}`}
          ></div>
          <div
            className={`h-1 ${suma >= 5 ? "bg-lime-500" : "bg-gray-200"}`}
          ></div>
        </div>
        <h3>It’s better to have:</h3>
        <List>
          <List.Item
            icon={spec1 ? HiCheckCircle : HiExclamationCircle}
            className={spec1 ? "text-lime-600" : "text-gray-300"}
          >
            Mínimo 6 caracteres
          </List.Item>
          <List.Item
            icon={spec2 ? HiCheckCircle : HiExclamationCircle}
            className={spec2 ? "text-lime-600" : "text-gray-300"}
          >
            Una letra mayúscula.
          </List.Item>
          <List.Item
            icon={spec3 ? HiCheckCircle : HiExclamationCircle}
            className={spec3 ? "text-lime-600" : "text-gray-300"}
          >
            Una letra minúscula.
          </List.Item>
          <List.Item
            icon={spec4 ? HiCheckCircle : HiExclamationCircle}
            className={spec4 ? "text-lime-600" : "text-gray-300"}
          >
            Un caracter especial.
          </List.Item>
          <List.Item
            icon={spec5 ? HiCheckCircle : HiExclamationCircle}
            className={spec5 ? "text-lime-600" : "text-gray-300"}
          >
            Un numero.
          </List.Item>
        </List>
      </div>
    </>
  );
}

export default ValidationContent;
