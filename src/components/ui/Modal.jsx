import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose, className = '' }) => {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current; // ensuring that the modal will not point to a different value
        if (open) {
            modal.showModal(); // built in method
        }

        // this code would also work
        // else {
        //     modal.close();
        // }

        return () => modal.close();
    }, [open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}> {children}</dialog>,
        document.getElementById('modal')
    );
}

export default Modal;