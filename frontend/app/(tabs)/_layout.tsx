import { Tabs } from 'expo-router';
import { Colors } from '../../constants/colors';
import { FontAwesome } from '@expo/vector-icons';

// ... (TabBarIcon function is the same) ...
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopColor: Colors.border,
        },
        // We no longer need header styles because they're hidden
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', // <-- CHANGED from 'Skybrews'
          headerShown: false, // <-- ADDED to hide the header
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}