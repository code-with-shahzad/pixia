import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const CustomDrawer = (props: any) => {
  const { session } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  const navigation = useNavigation<any>();

  const handleSignOut = async () => {
    // Navigation to logout or handle supabase signOut directly
    // Ideally, cleaner to navigate to a "Settings" screen or just sign out
    // props.navigation.closeDrawer();
    // For now we can keep the profile screen logic or move it here
    navigation.navigate('Profile'); 
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        {/* Header / New Chat */}
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
             <TouchableOpacity style={[styles.newChatBtn, { backgroundColor: theme.colors.primary }]} onPress={() => navigation.navigate('Chat')}>
                 <Icon name="add" size={20} color="#fff" />
                 <Text style={[styles.newChatText, { color: '#fff' }]}>New Chat</Text>
             </TouchableOpacity>
        </View>

        {/* Navigation Items (History mostly) */}
        <View style={styles.navSection}>
           <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>Recents</Text>
           {/* Placeholder for recent chats */}
           <TouchableOpacity style={styles.historyItem}>
               <Icon name="chatbubble-outline" size={18} color={theme.colors.text} />
               <Text style={[styles.historyText, { color: theme.colors.text }]} numberOfLines={1}>Previous Image Gene...</Text>
           </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      {/* Bottom User Section */}
      <View style={[styles.footer, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
         <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('Profile')}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.avatarText}>{session?.user.email?.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={[styles.userEmail, { color: theme.colors.text }]} numberOfLines={1}>{session?.user.email}</Text>
                <Text style={[styles.userSub, { color: theme.colors.textSecondary }]}>Free Configuration</Text>
            </View>
            <Icon name="ellipsis-horizontal" size={20} color={theme.colors.textSecondary} />
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 50, // Safe area
    borderBottomWidth: 1,
  },
  newChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  newChatText: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  navSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  historyText: {
    marginLeft: 12,
    fontSize: 14,
  },
  footer: {
    padding: 16,
    paddingBottom: 30, // Safe area bottom
    borderTopWidth: 1,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '600',
  },
  userSub: {
    fontSize: 12,
  },
});
