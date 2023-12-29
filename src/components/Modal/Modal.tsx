import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import './Modal.scss';

type Props = {
  children: any,
  setModal: (value: boolean) => void,
}

const modalRoot = document.getElementById('modal');

export const Modal: React.FC<Props> = ({ children, setModal }) => {
  const modalElement = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRoot?.appendChild(modalElement);

    return () => {
      modalRoot?.removeChild(modalElement);
    }
  })

  const onModalClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModal(false);
  }

  return createPortal(
    <div className="modal" onClick={(event) => onModalClose(event)}>
      {children}
    </div>,
    modalElement
  );
};