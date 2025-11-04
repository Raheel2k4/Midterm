import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
// Make sure this path is correct
import API_URL from '../apiConfig';
import { Colors } from '../constants/colors'; 

// TypeScript interface for our data
interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

export default function MenuScreen() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ... (useEffect hook is identical) ...
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/menu`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: MenuItem[] = await response.json();
        setMenu(data);
      } catch (error) {
        Alert.alert("Error", "Could not fetch the menu.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // ... (renderItem function is identical) ...
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>
      <View style={styles.itemPriceInfo}>
        <Text style={styles.priceText}>Rs. {item.price.toFixed(2)}</Text>
        {!item.inStock && (
          <Text style={styles.outOfStock}>Out of Stock</Text>
        )}
      </View>
    </View>
  );

  // Loading spinner
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // === THIS IS THE UPDATED PART ===
  return (
    // We add a main container to hold both the title and list
    <View style={styles.container}>
      
      {/* This is your new custom header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full Menu</Text>
      </View>

      {/* Your list now sits inside the container */}
      <FlatList
        data={menu}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        // We remove the old `style` prop
        // and adjust padding here
        contentContainerStyle={{ 
          paddingHorizontal: 10,
          paddingBottom: 20, // Space at the bottom
        }} 
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

// === STYLES ARE UPDATED ===
const styles = StyleSheet.create({
  // NEW: Main container for the screen
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Light grey BG
    paddingTop: 60, // This adds space for the phone's status bar
  },
  // NEW: Custom header styles
  header: {
    paddingHorizontal: 20, // Aligns with card content
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.text, // Black
  },
  // Loader style remains the same
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  // The 'list' style is no longer needed
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.card, // White card
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary, // Sky Blue
  },
  itemCategory: {
    fontSize: 14,
    color: Colors.textSecondary, // Dark grey
    marginTop: 4,
  },
  itemPriceInfo: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text, // Black
  },
  outOfStock: {
    fontSize: 12,
    color: Colors.danger,
    fontStyle: 'italic',
    marginTop: 4,
  },
});