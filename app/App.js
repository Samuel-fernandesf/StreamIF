import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Modal, StatusBar } from 'react-native';
import DetailScreen from './screens/DetailScreen'
import CatalogScreen from './screens/CatalogScreen'
import AddMediaForm from './components/AddMediaForm'

export default function app() {
  const [mediaList, setMediaList] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('Catalog');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(true);

  const addMediaHandler = (title, genre, score) => {
    const newMedia = {
      'id': Date.now().toString(),
      'title': title,
      'genre': genre,
      'score': parseInt(score, 10),
      'isWatched': false,
      'notes': ''
    };
    setMediaList([newMedia, ...mediaList]);
    setModalIsVisible(false);
  }

  const toggleWatchedStatus = (id) => {
    setMediaList(mediaList.map(item =>
      item.id === id ? { ...item, isWatched: !item.isWatched } : item
    ));
  };

  const removeMedia = (id) => {
    setMediaList(mediaList.filter(item => item.id !== id));
  };

  const saveNotes = (id, text) => {
    setMediaList(mediaList.map(item =>
      item.id === id ? { ...item, notes: text } : item
    ));
  };

  const startAddMediaHandler = () => {
    setModalIsVisible(true);
  };
  const endAddMediaHandler = () => {
    setModalIsVisible(false);
  };

  const openDetails = (media) => {
    setSelectedMedia(media);
    setCurrentScreen('Details');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>

      <StatusBar hidden={true} />

      {currentScreen === 'Catalog' ? (
        <CatalogScreen
          mediaList={mediaList}
          onAddPress={startAddMediaHandler}
          onToggleWatched={toggleWatchedStatus}
          onDelete={removeMedia}
          onLongPressCard={openDetails}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme} />
      ) :
        (
          <DetailScreen
            media={selectedMedia}
            onBack={() => setCurrentScreen('Catalog')}
            onSaveNotes={saveNotes}
            isDarkMode={isDarkMode} />
        )
      }

      <Modal visible={modalIsVisible} animationType="slide" transparent={false}>
        <AddMediaForm
          onSave={addMediaHandler}
          onCancel={endAddMediaHandler}
          isDarkMode={isDarkMode}
        />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
