import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default function Message({
    userName,
    text,
    timestamp,
    isMyMessage,
}) {
    return (
        <View
            style={[
                styles.messageContainer,
                isMyMessage ? styles.myMessage : styles.otherMessage,
            ]}
        >
            {!isMyMessage && (
                <Text style={styles.userName}>{userName}</Text>
            )}
            <Text style={[
                styles.messageText,
                isMyMessage ? styles.myMessageText : styles.otherMessageText,
            ]}>
                {text}
            </Text>
            <Text style={[
                styles.timestamp,
                isMyMessage ? styles.myTimestamp : styles.otherTimestamp,
            ]}>
                {new Date(timestamp).toLocaleTimeString()}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 15,
        marginVertical: 5,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 5,
    },
    otherMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    userName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 16,
    },
    myMessageText: {
        color: '#fff',
    },
    otherMessageText: {
        color: '#333',
    },
    timestamp: {
        fontSize: 10,
        marginTop: 4,
    },
    myTimestamp: {
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'right',
    },
    otherTimestamp: {
        color: '#999',
    },
});
