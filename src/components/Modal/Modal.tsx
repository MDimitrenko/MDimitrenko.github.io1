import React, { FC } from 'react';

import './Modal.css';
interface ModalProps {
  children: React.ReactNode;
}
export const Modal: FC<ModalProps> = ({ children }) => {
  // useEffect(() => {
  //     const handleClick = (e) => {
  //         if (e.target && e.target.className.includes('modal-outside')) {
  //             return onClose();
  //         }
  //     };
  //
  //     if (visible) {
  //         document.addEventListener("click", handleClick);
  //     }
  //
  //     return () => {
  //         if (visible) {
  //             document.removeEventListener("click", handleClick);
  //         }
  //     }
  //
  //   }, [onClose, visible])

  return (
    <div className="modal modal-outside modal-visible">
      <div className="modal-content">
        <div className="modal-button-close" />
        <div className="modal-inner-content">{children}</div>
      </div>
    </div>
  );
};
