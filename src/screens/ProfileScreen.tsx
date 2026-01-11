import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProfileScreen = () => {
  const { session } = useAuth();
  const { theme, isDark, toggleTheme } = useTheme();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const renderMenuItem = (icon: string, label: string) => (
      <TouchableOpacity style={[styles.menuItem, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Icon name={icon} size={24} color={theme.colors.text} style={styles.menuIcon} />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>{label}</Text>
          <Icon name="chevron-forward" size={20} color={theme.colors.textSecondary} style={styles.menuArrow} />
      </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
             <Text style={[styles.avatarText, { color: '#fff' }]}>{session?.user.email?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={[styles.email, { color: theme.colors.text }]}>{session?.user.email}</Text>
      </View>

      <View style={[styles.section, { borderColor: theme.colors.border }]}>
         {/* Theme Toggle */}
         <View style={[styles.menuItem, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
             <Icon name={isDark ? "moon" : "sunny"} size={24} color={theme.colors.text} style={styles.menuIcon} />
             <Text style={[styles.menuText, { color: theme.colors.text }]}>Dark Mode</Text>
             <Switch 
                value={isDark} 
                onValueChange={toggleTheme} 
                trackColor={{ false: "#767577", true: theme.colors.primary }}
             />
         </View>

         {renderMenuItem("images-outline", "My Gallery")}
         {renderMenuItem("card-outline", "Subscription")}
         {renderMenuItem("settings-outline", "Settings")}
      </View>

      <TouchableOpacity style={[styles.signOutButton, { backgroundColor: theme.colors.error }]} onPress={handleSignOut}>
        <Text style={[styles.signOutText, { color: '#fff' }]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    borderTopWidth: 1,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
  menuArrow: {
    marginLeft: 8,
  },
  signOutButton: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
