import React, { useState } from "react";
import { VStack, HStack, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { Folder as FolderIcon } from "lucide-react";
import SongBox from "./SongBox.jsx";
import DeleteConfirmationModal from "../Links/DeleteConfirmationModal.jsx";
import EditLinkModal from "../Links/EditLinkModal.jsx";
import { useDisclosure } from "@chakra-ui/react";


/**
 * Displays a single song view with artist and song information
 * @param {Object} props - Component properties
 * @param {Object} props.artist - Artist information
 * @param {Function} props.onBackClick - Click handler for going back to genre view
 * @param {Function} props.onFileClick - Click handler for opening a song
 * @param {Function} props.onDeleteLink - Click handler for deleting a link
 * @param {Function} props.onUpdateLink - Click handler for updating a link
 */
const SongView = ({ artist, onBackClick, onFileClick, onDeleteLink, onUpdateLink }) => {
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [editTarget, setEditTarget] = useState(null);
    const deleteModal = useDisclosure();
    const editModal = useDisclosure();

    const handleDelete = async () => {
      if (deleteTarget) {
        await onDeleteLink(deleteTarget);
        deleteModal.onClose();
        setDeleteTarget(null);
      }
    };

    const handleEdit = async (newData) => {
      if (editTarget) {
        await onUpdateLink(editTarget, newData);
        setEditTarget(null);
      }
    };

    return (
      <VStack align="stretch" spacing={6}>
        <DeleteConfirmationModal isOpen={deleteModal.isOpen} onClose={deleteModal.onClose} onDelete={handleDelete} />
        <EditLinkModal isOpen={editModal.isOpen} onClose={editModal.onClose} target={editTarget} onSave={handleEdit} />

        <HStack justify="space-between">
          <Button
            leftIcon={<FolderIcon size={16} />}
            onClick={onBackClick}
            bg="gray.900"
            borderWidth="2px"
            borderColor="gray.700"
            _hover={{
              bg: "gray.700",
              transform: "translateY(-1px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
            colorScheme="blue"
          >
            Back to Artists
          </Button>
          <Heading size="lg">{artist.artist.display}</Heading>
        </HStack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {artist.songs.map((song) => (
            <SongBox
              key={song.fileName}
              song={song}
              onClick={onFileClick}
              onDelete={() => {
                setDeleteTarget(song);
                deleteModal.onOpen();
              }}
              onEdit={() => {
                setEditTarget(song);
                editModal.onOpen();
              }}
            />
          ))}
        </SimpleGrid>
      </VStack>
    );
};

export default SongView;