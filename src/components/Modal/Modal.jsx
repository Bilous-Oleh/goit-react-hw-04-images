import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledModal>{children}</StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Modal;
