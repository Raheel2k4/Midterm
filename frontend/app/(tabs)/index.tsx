import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import API_URL from '../../apiConfig';
import { Colors } from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons'; // We need this for the icon

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Function for "Full Menu" button
  const showFullMenu = () => {
    router.push('/menu');
  };

  // 2. Function for "Surprise Me" button
  const surpriseMe = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/menu/random`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Network response was not ok');
      }
      const item = await response.json();

      Alert.alert(
        "Your Surprise Item!",
        `${item.name}\n(${item.category})\nRs. ${item.price.toFixed(2)}`,
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      Alert.alert("Error", error.message || "Could not fetch a surprise item.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      
      {/* === NEW "WELCOME TO SKYBREWS" HEADER === */}
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <View style={styles.brandRow}>
          <FontAwesome 
            name="coffee" // The coffee icon
            size={36}      // Sized to match the text
            color={Colors.text} // White, not black (black is invisible on dark BG)
            style={styles.headerIcon} 
          />
          <Text style={styles.brandName}>Skybrews</Text>
        </View>
      </View>
      {/* ======================================= */}

      {loading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}

      <View style={styles.buttonContainer}>
        {/* Button 1: Full Menu (Primary) */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonPrimary,
            pressed && styles.buttonPressed,
          ]}
          onPress={showFullMenu}
          disabled={loading}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            View Full Menu
          </Text>
        </Pressable>

        {/* Button 2: Surprise Me (Secondary) */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonSecondary,
            pressed && styles.buttonPressed,
          ]}
          onPress={surpriseMe}
          disabled={loading}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Surprise Me!
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

// === ALL MATCHING STYLES ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  // Styles for the brand header
  headerContainer: {
    alignItems: 'center',
    marginBottom: 60,
    // Add a subtle shadow for effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28, // Large welcome text
    fontWeight: '300',
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: 15, // Space between icon and name
  },
  brandName: {
    fontSize: 44, // Big and visible
    fontWeight: 'bold',
    color: Colors.text,
  },
  // REMOVED 'tagline' style as it's no longer used
  // Styles for the buttons
  buttonContainer: {
    width: '90%',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 2,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderColor: Colors.primary,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
  buttonTextSecondary: {
    color: Colors.primary,
  },
  loader: {
    position: 'absolute',
  },
});