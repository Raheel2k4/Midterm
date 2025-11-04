import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable, // We need this for the new icon
} from 'react-native';
import { useRouter } from 'expo-router';
import API_URL from '../apiConfig';
import { Colors } from '../constants/colors';
import { useCartStore } from '../store/cartStore'; // <-- 1. Import the brain
import { FontAwesome } from '@expo/vector-icons'; // <-- 2. Import icons

interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

export default function MenuScreen() {
  const router = useRouter();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // <-- 3. Get cart items to show the count
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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
    <Pressable onPress={() => router.push(`/item/${item._id}`)}>
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
    </Pressable>
  );

  if (loading) {
    // ... (loader is identical) ...
  }

  return (
    <View style={styles.container}>
      
      {/* === 4. THIS IS THE UPDATED HEADER === */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Full Menu</Text>
        <Pressable 
          onPress={() => router.push('/(tabs)/cart')} 
          style={styles.cartIconContainer}
        >
          <FontAwesome name="shopping-cart" size={24} color={Colors.text} />
          {totalItems > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </Pressable>
      </View>
      {/* ================================ */}

      <FlatList
        data={menu}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ 
          paddingHorizontal: 10,
          paddingBottom: 20,
        }} 
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
}

// === 5. THESE STYLES ARE UPDATED ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row', // Make it a row
    justifyContent: 'space-between', // Push items apart
    alignItems: 'center', // Vertically align title and icon
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.text,
  },
  cartIconContainer: {
    padding: 8, // Makes it easier to tap
  },
  // New styles for the badge
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.danger,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  // ... (all other styles are identical) ...
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.card,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  itemCategory: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  itemPriceInfo: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  outOfStock: {
    fontSize: 12,
    color: Colors.danger,
    fontStyle: 'italic',
    marginTop: 4,
  },
});