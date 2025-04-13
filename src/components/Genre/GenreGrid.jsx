import React from 'react';
import { SimpleGrid, Center, Flex } from '@chakra-ui/react';
import GenreCard from './GenreCard.jsx';

/**
 * Grid layout for displaying multiple genre cards
 * @param {Object} props - Component properties
 * @param {Array} props.genres - List of genres to display
 * @param {Function} props.onGenreClick - Click handler for genre selection
 */
const GenreGrid = ({ genres, onGenreClick }) => {
    const getColumnCount = (count) => {
      if (count === 1) return { base: 1 };
      if (count === 2) return { base: 1, md: 2 };
      if (count === 3) return { base: 1, md: 2, lg: 3 };
      return { base: 1, md: 2, lg: 3, xl: 4 };
    };

    return (
      <Flex justify="center" w="full">
        <SimpleGrid columns={getColumnCount(genres.length)} spacing={8} w="full" px={4}>
          {genres.map((genre) => (
            <Center key={genre.name}>
              <GenreCard genre={genre} onClick={onGenreClick} />
            </Center>
          ))}
        </SimpleGrid>
      </Flex>
    );
};

export default GenreGrid;