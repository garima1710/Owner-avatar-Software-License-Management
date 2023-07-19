import React from 'react';
import Modal from 'react-modal';

const modal = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {children}
    </Modal>
  );
};

export default modal;