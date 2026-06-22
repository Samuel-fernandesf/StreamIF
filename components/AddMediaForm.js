import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function AddMediaForm(props) {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [score, setScore] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        const scoreNum = parseInt(score, 10)

        if (!title.trim() || !genre.trim() || !score.trim()) {
            setError('Todos os campos são obrigatórios.');
            return;
        };
        if (isNaN(scoreNum) || scoreNum < 1 || scoreNum > 10) {
            setError('A nota deve ser um número entre 1 e 10.');
            return;
        }

        props.onSave(title, genre, score);
        setTitle('');
        setGenre('');
        setScore('');
        setError('');
    }

    const isDark = props.isDarkMode;
    const textColor = isDark ? '#fff' : '#121212';
    const inputBg = isDark ? '#2a2a2a' : '#fff';

    return (
        <View style={[styles.formContainer, { backgroundColor: isDark ? '#1e1e1e' : '#f5f5f5' }]}>
            <Text style={[styles.title, { color: textColor }]}>Nova Mídia</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                placeholder="Título do Filme/Série"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                placeholder="Gênero (ex: Terror, Drama)"
                placeholderTextColor="#888"
                value={genre}
                onChangeText={setGenre}
            />
            <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
                placeholder="Nota (1 a 10)"
                placeholderTextColor="#888"
                maxLength={2}
                keyboardType="number-pad"
                value={score}
                onChangeText={setScore}
            />

            <View style={styles.buttonRow}>
                <Button title="Cancelar" color="red" onPress={props.onCancel} />
                <Button title="Salvar" color="green" onPress={handleSave} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    }
});