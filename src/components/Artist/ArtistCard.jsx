import React from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';

/**
 * Displays a card for an artist with their name and songs
 * @param {Object} props - Component properties
 * @param {Object} props.artist - Artist information
 * @param {Array} props.songs - List of songs by the artist
 * @param {Function} props.onViewAll - Click handler for viewing all songs
 */
const ArtistCard = ({ artist, songs, onViewAll }) => {
    const getArtistDisplay = () => {
      if (artist.japanese) {
        return (
          <VStack spacing={1} mb={2}>
            <Heading size="md" textAlign="center" isTruncated>
              {artist.japanese}
            </Heading>
            <Text fontSize="sm" color="gray.400" textAlign="center" isTruncated>
              {artist.english}
            </Text>
          </VStack>
        );
      }
      return (
        <Heading size="md" textAlign="center" isTruncated mb={4}>
          {artist.english}
        </Heading>
      );
    };

    return (
      <Box borderWidth="2px" borderRadius="xl" p={6} bg="gray.900" w="full" h="full" display="flex" flexDirection="column">
        <VStack flex="1" spacing={4} align="stretch" h="full">
          {getArtistDisplay()}

          <VStack spacing={2} align="start" w="full" flex="1">
            {songs.slice(0, 3).map((song) => (
              <Text key={song.fileName} fontSize="sm" color="gray.400" isTruncated w="full">
                {song.japanese ? `${song.japanese} (${song.english})` : song.english}
              </Text>
            ))}
            {songs.length > 3 && (
              <Text fontSize="sm" color="gray.500">
                +{songs.length - 3} more songs
              </Text>
            )}
          </VStack>

          <Button size="sm" onClick={onViewAll} bg="gray.800" _hover={{ bg: "gray.700" }} colorScheme="blue">
            View All Songs
          </Button>
        </VStack>
      </Box>
    );
};

export default ArtistCard;