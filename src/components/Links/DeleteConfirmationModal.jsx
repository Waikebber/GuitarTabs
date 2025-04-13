import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

/**
 * Modal for confirming deletion of a link
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Modal close handler
 * @param {Function} props.onDelete - Delete confirmation handler
 */
const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>Are you sure you want to delete this link?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onDelete}>
              Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
};

export default DeleteConfirmationModal;