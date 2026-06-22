import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';

export default function DetailScreen({ media, onBack, onSaveNotes, isDarkMode }) {
    const [noteText, setNoteText] = useState(media?.notes || '');
    const [message, setMessage] = useState('');

    const handleSave = () => {
        onSaveNotes(media.id, noteText);
        setMessage('Anotações salvas com sucesso!');
    };

    const getScoreColor = (score) => {
        if (score >= 7) return 'green';
        if (score >= 4) return 'orange';
        return 'red';
    };

    if (!media) return null;

    const isDark = isDarkMode;
    const textColor = isDark ? '#fff' : '#121212';
    const subTextColor = isDark ? '#888' : '#555';

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#f5f5f5' }]}>

            <TouchableOpacity style={[styles.backButton, { backgroundColor: isDark ? '#1e1e1e' : '#e0e0e0' }]} onPress={onBack}>
                <Text style={styles.backButtonText}> Voltar para o Catálogo</Text>
            </TouchableOpacity>

            <ScrollView style={styles.scrollContainer}>
                <Text style={[styles.label, { color: subTextColor }]}>Title</Text>
                <Text style={[styles.titleValue, { color: textColor }]}>{media.title}</Text>

                <Text style={[styles.label, { color: subTextColor }]}>Genre</Text>
                <Text style={[styles.value, { color: textColor }]}>{media.genre}</Text>

                <Text style={[styles.label, { color: subTextColor }]}>Minha Nota</Text>
                <Text style={[styles.value, { color: getScoreColor(media.score), fontWeight: 'bold' }]}>{media.score} / 10</Text>

                <Text style={[styles.label, { color: subTextColor }]}>Status</Text>
                <Text style={[styles.value, { color: textColor }]}>
                    {media.isWatched ? 'Já Assistido' : 'Não Assistido'}
                </Text>

                <View style={[styles.divider, { backgroundColor: isDark ? '#2a2a2a' : '#ddd' }]} />

                {message ? <Text style={styles.messageText}>{message}</Text> : null}

                <Text style={[styles.label, { color: subTextColor }]}>Anotações</Text>
                <TextInput style={[styles.inputNotes, {
                    backgroundColor: isDark ? '#1e1e1e' : '#fff', color: textColor, borderColor: isDark ? '#3a3a3a' : '#ccc'
                }]}
                    multiline
                    numberOfLines={6}
                    placeholder="Escreva o que achou desta obra."
                    placeholderTextColor={subTextColor}
                    value={noteText}
                    onChangeText={setNoteText}
                />

                <View style={styles.buttonContainer}>
                    <Button title="Salvar Anotações" color="#3498db" onPress={handleSave} />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    backButton: {
        padding: 15,
    },
    backButtonText: {
        color: '#3498db',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollContainer: {
        padding: 20,
    },
    label: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 15,
    },
    titleValue: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    value: {
        fontSize: 18,
        marginTop: 5,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        marginVertical: 20,
    },
    messageText: {
        color: 'green',
        marginTop: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputNotes: {
        padding: 15,
        borderRadius: 8,
        textAlignVertical: 'top',
        marginTop: 10,
        fontSize: 16,
        borderWidth: 1,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
});