 import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  HStack,
  Text
} from "@chakra-ui/react";
 
 /**
 * Modal for editing a link
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Modal close handler
 * @param {Object} props.target - Link data to edit
 * @param {Function} props.onSave - Save handler
 */
 const EditLinkModal = ({ isOpen, onClose, target, onSave }) => {
    const [genre, setGenre] = useState(target?.genre || "");
    const [artist, setArtist] = useState(target?.artist || "");
    const [song, setSong] = useState(target?.song || "");
    const [url, setUrl] = useState(target?.url || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (target) {
        setGenre(target.genre);
        setArtist(target.artist);
        setSong(target.song);
        setUrl(target.url);
      }
    }, [target]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        await onSave({ genre, artist, song, url });
        onClose();
      } catch (err) {
        setError("Error updating link: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800">
          <ModalHeader>Edit Link</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              {error && <Text color="red.500">{error}</Text>}

              <FormControl isRequired>
                <FormLabel>Genre</FormLabel>
                <Input value={genre} onChange={(e) => setGenre(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Artist</FormLabel>
                <Input value={artist} onChange={(e) => setArtist(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Song</FormLabel>
                <Input value={song} onChange={(e) => setSong(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>URL</FormLabel>
                <Input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
              </FormControl>

              <HStack spacing={4} width="100%">
                <Button type="submit" colorScheme="blue" isLoading={isLoading} flex={1}>
                  Save Changes
                </Button>
                <Button onClick={onClose} flex={1}>
                  Cancel
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
};

export default EditLinkModal;