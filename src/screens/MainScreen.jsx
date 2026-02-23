import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Message from '../components/Message';
import { useUserContext } from '../contexts/user/UserContext';
import axios from 'axios';

export default function MainScreen() {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const { logout, user } = useUserContext();

    useEffect(() => {
        // axios.get('http://192.168.1.211:4000/messages')
        //     .then(response => {
        //         setMessages(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Failed to load messages', error);
        //     });
        fetch('http://192.168.1.211:4000/messages')
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Failed to load messages', error.message));
    }, []);

    const sendHandler = () => {
        const newMessage = {
            text: messageText,
            userId: user.id,
            userName: user.name,
            timestamp: new Date().toISOString(),
        };

        axios.post('http://192.168.1.211:4000/messages', newMessage)
            .then(response => {
                setMessages(prevMessages => [...prevMessages, response.data]);
                setMessageText('');
            })
            .catch(error => {
                console.error('Failed to send message', error);
                alert('Failed to send message. Please try again.');
            });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.messagesList}>
                <View style={styles.messagesContent}>
                    {messages.map(message =>
                        <Message
                            key={message.id}
                            isMyMessage={message.userId == user.id}
                            {...message}
                        />
                    )}
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={messageText}
                    onChangeText={setMessageText}
                    multiline={true}
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        !messageText.trim() ? styles.sendButtonDisabled : null,
                    ]}
                    disabled={messageText.trim().length === 0}
                    onPress={sendHandler}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingTop: 50,
        backgroundColor: '#007AFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    logoutButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 5,
    },
    logoutText: {
        color: '#fff',
        fontWeight: '600',
    },
    messagesList: {
        flex: 1,
    },
    messagesContent: {
        padding: 10,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        fontWeight: '600',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        maxHeight: 100,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
