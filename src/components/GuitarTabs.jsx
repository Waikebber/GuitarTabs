import React, { useState } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Box
} from "@chakra-ui/react";

import { Folder as FolderIcon, Clock as ClockIcon, Plus as PlusIcon, Trash2 as TrashIcon, Music as MusicIcon } from "lucide-react";

// Components
import GenreGrid from "./Genre/GenreGrid.jsx";
import ArtistView from "./Artist/ArtistView.jsx";
import SongView from "./Song/SongView.jsx";
import LinkForm from "./Links/LinkForm.jsx";
import SongBox from "./Song/SongBox.jsx";

// Hooks
import useFileSystem from "../hooks/useFileSystem.js";
import useRecentFiles from "../hooks/useRecentFiles.js";

// Utils
import parseFileName from "../utils/parseFileName.js";
import groupFilesByArtist from "../utils/groupFilesByArtist.js";


/**
 * Main application component that manages the overall state and view hierarchy
 * Handles navigation between views and file operations
 */
const GuitarTabs = () => {
    const [view, setView] = useState("home");
    const [currentGenre, setCurrentGenre] = useState("");
    const { recentFiles, addRecentFile, clearRecentFiles } = useRecentFiles();
    const [currentArtist, setCurrentArtist] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [editTarget, setEditTarget] = useState(null);
    const { rootHandle, genres, initializeDirectory, error, showPermissionDialog, loadLinks, saveLinks, loadDirectory, deleteLink, updateLink } = useFileSystem();

    const handleGenreClick = (genre) => {
      const artists = groupFilesByArtist(genre.files);
      setCurrentGenre({ ...genre, artists });
      setView("artist");
    };

    const handleArtistClick = (artist) => {
      setCurrentArtist(artist);
      setView("songs");
    };

    const handleDeleteLink = async (songData) => {
      const success = await deleteLink(rootHandle, songData.genre, songData.artist || songData.fileName.split(" - ")[0], songData.song || songData.fileName.split(" - ")[1]);
      if (success) {
        // Refresh the current genre view
        const currentGenreData = genres.find((g) => g.name === currentGenre.name);
        if (currentGenreData) {
          const artists = groupFilesByArtist(currentGenreData.files);
          setCurrentGenre({ ...currentGenreData, artists });
        }
      }
    };

    const handleUpdateLink = async (oldData, newData) => {
      const success = await updateLink(rootHandle, oldData, newData);
      if (success) {
        await loadDirectory(rootHandle);
      }
    };

    const handleFileClick = async (file) => {
      try {
        if (file.isLink) {
          window.open(file.url, "_blank");

          // Parse the name to get proper japanese/english fields
          const parsedName = parseFileName(`${file.artist} - ${file.song}`);

          const recentLinkData = {
            name: `${file.artist} - ${file.song}`,
            genre: file.genre,
            isLink: true,
            url: file.url,
            display: parsedName.song.display,
            artist: file.artist,
            song: file.song,
            fileName: `${file.artist} - ${file.song}`,
            japanese: parsedName.song.japanese,
            english: parsedName.song.english,
          };

          addRecentFile(recentLinkData);
        } else {
          const fileData = await file.handle.getFile();
          const url = URL.createObjectURL(fileData);
          window.open(url, "_blank");

          // Parse the PDF file name
          const parsedName = parseFileName(file.handle.name);

          addRecentFile({
            name: file.handle.name,
            genre: file.genre,
            isPdf: true,
            display: parsedName.song.display,
            handle: file.handle,
            fileName: file.handle.name,
            japanese: parsedName.song.japanese,
            english: parsedName.song.english,
          });
        }
      } catch (err) {
        console.error("Error opening file:", err);
      }
    };

    const handleRecentFileClick = async (recentFile) => {
      if (recentFile.isLink && recentFile.url) {
        window.open(recentFile.url, "_blank");

        // Ensure we maintain all the parsed name information
        const parsedName = parseFileName(recentFile.name);
        addRecentFile({
          ...recentFile,
          display: parsedName.song.display,
          japanese: parsedName.song.japanese,
          english: parsedName.song.english,
        });
        return;
      }

      const genre = genres.find((g) => g.name === recentFile.genre);
      if (!genre) {
        console.error("Genre not found:", recentFile.genre);
        return;
      }

      const file = genre.files.find((f) => f.name === recentFile.name);
      if (!file) {
        console.error("File not found:", recentFile.name);
        return;
      }

      try {
        const fileData = await file.handle.getFile();
        const url = URL.createObjectURL(fileData);
        window.open(url, "_blank");

        // Parse the name when re-adding to recents
        const parsedName = parseFileName(recentFile.name);
        addRecentFile({
          ...recentFile,
          display: parsedName.song.display,
          japanese: parsedName.song.japanese,
          english: parsedName.song.english,
        });
      } catch (err) {
        console.error("Error opening file:", err);
      }
    };

    if (showPermissionDialog) {
      return (
        <Container maxW="container.xl" py={8}>
          <VStack spacing={4}>
            <Heading>Guitar Tabs Browser</Heading>
            <Button onClick={initializeDirectory} colorScheme="blue" leftIcon={<FolderIcon size={16} />}>
              Grant Permission
            </Button>
            {error && <Text color="red.500">{error}</Text>}
          </VStack>
        </Container>
      );
    }

    if (!rootHandle) {
      return (
        <Container maxW="container.xl" py={8}>
          <Heading size="lg">Loading Guitar Tabs...</Heading>
        </Container>
      );
    }

    return (
      <Container maxW="container.xl" py={8}>
        {/* Add Link Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader>Add New Link</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <LinkForm
                rootHandle={rootHandle}
                onSave={() => {
                  onClose();
                }}
                loadDirectory={loadDirectory}
                loadLinks={loadLinks}
                saveLinks={saveLinks}
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        {view === "home" ? (
          <VStack spacing={12} align="stretch">
            {/* Header with Add Link Button */}
            <Flex justify="space-between" align="center">
              <Heading size="lg">Guitar Tabs</Heading>
              <Button leftIcon={<PlusIcon size={16} />} onClick={onOpen} colorScheme="blue" size="md">
                Add Link
              </Button>
            </Flex>

            {recentFiles.length > 0 && (
              <Box>
                <Flex justify="center" position="relative" mb={6}>
                  <Heading size="md" textAlign="center">
                    <VStack>
                      <ClockIcon size={24} />
                      <Text>Recent Tabs</Text>
                    </VStack>
                  </Heading>
                  <IconButton aria-label="Clear recent tabs" icon={<TrashIcon size={16} />} onClick={clearRecentFiles} colorScheme="red" variant="ghost" size="sm" position="absolute" right={0} top="50%" transform="translateY(-50%)" />
                </Flex>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  {recentFiles
                    .filter((file) => file.name)
                    .map((file) => (
                      <SongBox
                        key={file.name}
                        song={{
                          ...file,
                          fileName: file.name,
                          display: file.name,
                          isLink: file.isLink,
                          url: file.url,
                          artist: file.artist,
                          song: file.song,
                          handle: file.handle,
                          genre: file.genre,
                        }}
                        onClick={() => handleRecentFileClick(file)}
                        isInRecents={true}
                      />
                    ))}
                </SimpleGrid>
              </Box>
            )}

            {/* Genres Section */}
            <Box>
              <Heading size="md" mb={6} textAlign="center">
                <VStack>
                  <MusicIcon size={24} />
                  <Text>Genres</Text>
                </VStack>
              </Heading>
              {genres.length === 0 ? (
                <Text fontSize="lg" textAlign="center">
                  No folders found. Please ensure the selected directory contains subfolders.
                </Text>
              ) : (
                <GenreGrid genres={genres} onGenreClick={handleGenreClick} />
              )}
            </Box>
          </VStack>
        ) : view === "artist" ? (
          <ArtistView artists={currentGenre.artists} onSelectArtist={handleArtistClick} onBackToGenre={() => setView("home")} />
        ) : view === "songs" ? (
          <SongView artist={currentArtist} onBackClick={() => setView("artist")} onFileClick={handleFileClick} onDeleteLink={handleDeleteLink} onUpdateLink={handleUpdateLink} />
        ) : null}
      </Container>
    );
};

export default GuitarTabs;