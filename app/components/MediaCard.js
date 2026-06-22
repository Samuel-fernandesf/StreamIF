import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function MediaCard({
    item,
    onToggleWatched,
    onDelete,
    onLongPressCard,
    isDarkMode
}) {

    const getScoreColor = (score) => {
        if (score >= 7) return 'green';
        if (score >= 4) return 'orange';
        return 'red';
    };

    const isDark = isDarkMode;
    const cardBg = isDark ? '#1e1e1e' : '#fff';
    const textColor = isDark ? '#fff' : '#121212';
    const subTextColor = isDark ? '#aaa' : '#666';

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: cardBg }, item.isWatched && styles.cardWatched]}
            onLongPress={() => onLongPressCard(item)}
            onPress={() => onLongPressCard(item)}
        >
            <View style={styles.infoContainer}>
                <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
                <Text style={[styles.genre, { color: subTextColor }]}>{item.genre}</Text>
                <Text style={[styles.score, { color: getScoreColor(item.score) }]}>
                    Nota: {item.score}/10
                </Text>

                <TouchableOpacity style={styles.statusButton} onPress={() => onToggleWatched(item.id)}>
                    <Text style={styles.statusText}>
                        {item.isWatched ? 'Já assistido' : 'Não assistido'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>

        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 5,
        borderLeftColor: '#888',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardWatched: {
        opacity: 0.6,
        borderLeftColor: 'green',
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    genre: {
        fontSize: 14,
        marginVertical: 2,
    },
    score: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    statusButton: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    statusText: {
        color: '#3498db',
        fontSize: 12,
        fontWeight: 'bold',
    },
    deleteButton: {
        padding: 10,
    },
    deleteText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
    }
});