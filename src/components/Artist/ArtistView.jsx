import React from "react";
import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { Folder as FolderIcon } from "lucide-react";
import ArtistCard from "./ArtistCard.jsx";

/**
 * Displays a list of artists with their songs
 * @param {Object} props - Component properties
 * @param {Array} props.artists - List of artists to display
 * @param {Function} props.onSelectArtist - Click handler for selecting an artist
 * @param {Function} props.onBackToGenre - Click handler for going back to genre view
 */
const ArtistView = ({ artists, onSelectArtist, onBackToGenre }) => {
    return (
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Button
            leftIcon={<FolderIcon size={16} />}
            onClick={onBackToGenre}
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
            Back to Genre
          </Button>
          <Heading size="lg">Artists</Heading>
        </HStack>

        <Box
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
            "& > *": {
              height: "auto",
            },
            "@supports (grid-template-rows: masonry)": {
              gridTemplateRows: "masonry",
            },
          }}
        >
          {artists.map(({ artist, songs }) => (
            <ArtistCard key={artist.display} artist={artist} songs={songs} onViewAll={() => onSelectArtist({ artist, songs })} />
          ))}
        </Box>
      </VStack>
    );
};

export default ArtistView;