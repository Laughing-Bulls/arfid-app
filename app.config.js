import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Brave Bites",
  slug: "brave-bites-recipes-app",
  description: "Brave Bites - Discover and create adventurous recipes with a bold orange, teal, and yellow theme. Your culinary adventure starts here!",
  privacy: "public",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#FF6B35"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.scott.arfid",
    infoPlist: {
      NSPhotoLibraryUsageDescription: "This app needs access to your photo library to save recipe photos.",
      NSCameraUsageDescription: "This app needs access to your camera to take recipe photos."
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF"
    },
    package: "com.scott.arfid",
    permissions: [
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE"
    ]
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  plugins: [
    // No additional plugins needed for AsyncStorage
  ],
  extra: {
    eas: {
      projectId: "your-project-id-here"
    }
  }
});

