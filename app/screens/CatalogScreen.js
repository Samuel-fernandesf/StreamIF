import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import MediaCard from '../components/MediaCard';
import EmptyState from '../components/EmptyState';

export default function CatalogScreen({
    mediaList,
    onAddPress,
    onToggleWatched,
    onDelete,
    onLongPressCard,
    isDarkMode,
    toggleTheme
}) {

    const isDark = isDarkMode;

    const [sortType, setSortType] = useState('az'); //ou score

    const toggleSort = () => {
        setSortType(prev => prev === 'az' ? 'score' : 'az');
    };

    const sortedData = [...mediaList].sort((a, b) => {
        if (sortType === 'az') {
            return a.title.localeCompare(b.title);
        } else {
            return b.score - a.score;
        }
    });

    const totalMedia = mediaList.length;
    const watchedMedia = mediaList.filter(item => item.isWatched).length;

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f5' }]}>

            <View style={[styles.header, { borderBottomColor: isDark ? '#2a2a2a' : '#ddd' }]}>

                <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#121212' }]}>StreamIF</Text>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                        <Image
                            source={isDarkMode
                                ? require('../assets/img/sun.png')
                                : require('../assets/img/moon.png')
                            }
                            style={styles.themeIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                        <Text style={styles.addButtonText}>+ Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.subHeader, { backgroundColor: isDark ? '#1e1e1e' : '#e0e0e0' }]}>
                <Text style={[styles.counterText, { color: isDark ? '#bbb' : '#555' }]}>
                    {totalMedia} títulos | {watchedMedia} assistidos
                </Text>

                <TouchableOpacity style={styles.sortButton} onPress={toggleSort}>
                    <Text style={styles.sortButtonText}>
                        Ordenar: {sortType === 'az' ? 'A-Z' : 'Maior Nota'}
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={sortedData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <MediaCard
                        item={item}
                        onToggleWatched={onToggleWatched}
                        onDelete={onDelete}
                        onLongPressCard={onLongPressCard}
                        isDarkMode={isDarkMode}
                    />
                )}
                ListEmptyComponent={<EmptyState />}
                contentContainerStyle={styles.listContent}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    themeButton: {
        marginRight: 15,
        padding: 5,
    },
    themeIcon: {
        width: 28,
        height: 28,
        tintColor: '#3498db',
    },
    addButton: {
        backgroundColor: '#e50914',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    counterText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    sortButton: {
        backgroundColor: '#3498db',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 15,
    },
    sortButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    listContent: {
        paddingBottom: 20,

    }
})