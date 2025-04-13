import React from "react";
import { Box, VStack, HStack, Text, IconButton, Center } from "@chakra-ui/react";
import { File as FileIcon, Link as LinkIcon, Edit as EditIcon, Trash as TrashIcon } from "lucide-react";

/**
 * Displays a box for a single song with edit/delete options in top right corner
 * @param {Object} props - Component properties
 * @param {Object} props.song - Song information
 * @param {Function} props.onDelete - Delete click handler
 * @param {Function} props.onEdit - Edit click handler
 * @param {Function} props.onClick - Click handler for opening the song
 */
const SongBox = ({ song, onDelete, onEdit, onClick, isInRecents = false }) => {
    const getSongDisplay = () => {
      if (song.japanese && song.english) {
        return (
          <HStack spacing={2} justify="center">
            <Text>{song.japanese}</Text>
            <Text color="gray.400">|</Text>
            <Text>{song.english}</Text>
          </HStack>
        );
      }
      return <Text>{song.english || song.display}</Text>;
    };

    return (
      <Box borderWidth="1px" borderRadius="lg" p={4} cursor="pointer" onClick={() => onClick(song)} _hover={{ bg: "gray.700" }} bg="gray.900" position="relative">
        <VStack align="center" spacing={3}>
          <Box position="relative" w="full">
            <Center>{song.isLink ? <LinkIcon size={16} /> : <FileIcon size={16} />}</Center>
            {song.isLink && !isInRecents && (
              <HStack spacing={2} position="absolute" top="50%" right={0} transform="translateY(-50%)">
                <IconButton
                  aria-label="Edit link"
                  icon={<EditIcon size={16} />}
                  size="sm"
                  colorScheme="blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(song);
                  }}
                />
                <IconButton
                  aria-label="Delete link"
                  icon={<TrashIcon size={16} />}
                  size="sm"
                  colorScheme="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(song);
                  }}
                />
              </HStack>
            )}
          </Box>

          <Box textAlign="center" w="full">
            {getSongDisplay()}
          </Box>
        </VStack>
      </Box>
    );
};

export default SongBox;