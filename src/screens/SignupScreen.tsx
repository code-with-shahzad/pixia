import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'toastify-react-native';

export const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
        Toast.error(error.message);
    } else {
        Toast.success('Please check your inbox to verify your account!');
    }
    
    setLoading(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Join Pixia today</Text>
      
      <View style={styles.form}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { 
                borderColor: theme.colors.border, 
                color: theme.colors.text, 
                backgroundColor: theme.colors.inputBackground 
            }]}
            onChangeText={setEmail}
            value={email}
            placeholder="hello@example.com"
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
          />
          
          <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
          <TextInput
            style={[styles.input, { 
                borderColor: theme.colors.border, 
                color: theme.colors.text, 
                backgroundColor: theme.colors.inputBackground 
            }]}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="********"
            placeholderTextColor={theme.colors.textSecondary}
            autoCapitalize="none"
          />

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.primary }]} 
            onPress={signUpWithEmail} 
            disabled={loading}
          >
            {loading ? (
                <ActivityIndicator color='#fff' />
            ) : (
                <Text style={[styles.buttonText, { color: '#fff' }]}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
            <Text style={[styles.linkText, { color: theme.colors.primary }]}>Already have an account? Sign In</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
});
