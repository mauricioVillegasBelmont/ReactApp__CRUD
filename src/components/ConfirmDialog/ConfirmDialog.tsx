import {  FC, ReactElement, useState } from "react";
import {  HiOutlineExclamationCircle, } from "react-icons/hi";
import { Modal, Button } from "flowbite-react";

// import styles from "./LoginForm.module.scss";

interface ConfirmDialogProps {
  buttonProps?:{[value:string]:string|boolean|number};
  buttonMessage: ReactElement | string;
  modalMesage: ReactElement | string;
  confirmHandler: (response: boolean) => any;
}

const ConfirmDialog: FC<ConfirmDialogProps> = (props) =>{
  const {buttonProps, buttonMessage, modalMesage, confirmHandler } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={() => openModalHandler()}>
        {buttonMessage}
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          closeModalHandler();
          confirmHandler(false);
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <div className="p-5">
            {modalMesage}
            </div>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  closeModalHandler();
                  confirmHandler(true);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  closeModalHandler();
                  confirmHandler(false);
                }}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmDialog;
