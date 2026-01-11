import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I am Pixia. Describe an image you want me to generate.', isUser: false },
  ]);
  const { theme } = useTheme();
  const navigation = useNavigation();

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simulate AI response for now
    setTimeout(() => {
        const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: `I'm generating an image for: "${newMessage.text}"...`,
            isUser: false,
        };
        setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble, 
      item.isUser 
        ? [styles.userBubble, { backgroundColor: theme.colors.primary }] 
        : [styles.aiBubble, { backgroundColor: theme.colors.surface }]
    ]}>
      <Text style={[
        styles.messageText,
        item.isUser ? { color: '#fff' } : { color: theme.colors.text }
      ]}>{item.text}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
             <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginRight: 15 }}>
                 <Icon name="menu" size={24} color={theme.colors.text} />
             </TouchableOpacity>
             <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Pixia Chat</Text>
        </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={[styles.inputContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
        <TextInput
          style={[styles.input, { 
              backgroundColor: theme.colors.inputBackground, 
              color: theme.colors.text, 
              borderColor: theme.colors.border 
          }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Describe your image..."
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity onPress={sendMessage} style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    alignItems: 'center',
    paddingBottom: 40,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginRight: 10,
    borderWidth: 1,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
