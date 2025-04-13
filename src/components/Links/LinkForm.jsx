import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    Text
} from "@chakra-ui/react";

/**
 * Form for adding a new link to the directory
 * @param {Object} props - Component properties
 * @param {FileSystemDirectoryHandle} props.rootHandle - Root directory handle
 * @param {Function} props.onSave - Save completion handler
 * @param {Function} props.loadDirectory - Directory reload function
 * @param {Function} props.loadLinks - Links load function
 * @param {Function} props.saveLinks - Links save function
 */
const LinkForm = ({ rootHandle, onSave, loadDirectory, loadLinks, saveLinks }) => {
    const [genre, setGenre] = useState("");
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        const links = await loadLinks(rootHandle);
        if (!links[genre]) links[genre] = {};
        if (!links[genre][artist]) links[genre][artist] = {};
        links[genre][artist][song] = url;

        const success = await saveLinks(rootHandle, links);

        if (success) {
          await loadDirectory(rootHandle);
          setGenre("");
          setArtist("");
          setSong("");
          setUrl("");
          onSave();
        } else {
          setError("Failed to save link");
        }
      } catch (err) {
        console.error("Error saving link:", err);
        setError("Error saving link: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    return (
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

        <Button type="submit" colorScheme="blue" isLoading={isLoading}>
          Save Link
        </Button>
      </VStack>
    );
};

export default LinkForm;