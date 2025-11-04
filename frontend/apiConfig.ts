import Constants from 'expo-constants';

/**
 * Gets the IP address of the machine running the Expo bundler.
 * This is the most reliable way to connect your app (on your phone)
 * to your backend (on your computer) without hardcoding the IP.
 */
const getApiUrl = () => {
  // 1. Get the host and port (e.g., "192.168.186.1:8081")
  const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost;

  if (!debuggerHost) {
    // Fallback 1: Try a different manifest property
    const manifestHost = Constants.manifest?.debuggerHost;
    if (manifestHost) {
      const host = manifestHost.split(':')[0]; // Get IP part only
      return `http://${host}:3000`;
    }
    // Fallback 2: Use your last known good IP
    console.warn("Could not auto-detect host, falling back to 192.168.186.1");
    return 'http://192.168.186.1:3000';
  }

  // 2. Get just the IP part (e.g., "192.168.186.1")
  const host = debuggerHost.split(':')[0];

  // 3. Return it with the backend port
  return `http://${host}:3000`;
};

// Create the URL and export it.
const API_URL = getApiUrl();

export default API_URL;

