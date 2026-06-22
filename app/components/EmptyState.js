import { StyleSheet, View, Text, Image } from 'react-native';

export default function EmptyState({ isDarkMode }) {
    const isDark = isDarkMode;

    return (
        <View style={styles.container}>
            <View style={styles.imagePlaceholder}>
                <Image
                    source={require('../assets/img/claquete_dark.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={[styles.text, { color: isDark ? '#fff' : '#121212' }]}>Sua lista está vazia.</Text>
            <Text style={[styles.subtext, { color: isDark ? '#888' : '#666' }]}>Adicione algum filme ou série por meio do botão Adicionar!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 50,
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginBottom: 20,
    },
    image: {
        width: 80,
        height: 80,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
});