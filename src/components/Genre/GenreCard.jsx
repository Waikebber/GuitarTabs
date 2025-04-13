import React from "react";
import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { Music as MusicIcon } from "lucide-react";
/**
 * Displays a single genre card with title and file count
 * @param {Object} props - Component properties
 * @param {Object} props.genre - Genre information
 * @param {Function} props.onClick - Click handler
 */
const GenreCard = ({ genre, onClick }) => {
    return (
      <Box
        borderWidth="2px"
        borderRadius="xl"
        p={6}
        cursor="pointer"
        onClick={() => onClick(genre)}
        _hover={{
          bg: "gray.700",
          transform: "translateY(-4px)",
          boxShadow: "xl",
        }}
        bg="gray.900"
        height="250px"
        width="full"
        maxW="400px"
        transition="all 0.2s ease-in-out"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        <Center h="full">
          <VStack spacing={6}>
            <MusicIcon size={48} />
            <VStack spacing={3}>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {genre.name}
              </Text>
              <Text fontSize="lg" color="gray.400" textAlign="center">
                {genre.files.length} {genre.files.length === 1 ? "tab" : "tabs"}
              </Text>
            </VStack>
          </VStack>
        </Center>
      </Box>
    );
};

export default GenreCard;