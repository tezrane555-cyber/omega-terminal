#!/bin/bash
set -e
echo "=== ΩMEGA TERMINAL v2.0.0 Build Script ==="
echo "[1/4] Installing npm dependencies..."
npm install
echo "[2/4] Bundling React Native..."
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
echo "[3/4] Building APK..."
cd android
./gradlew assembleRelease --no-daemon
echo "[4/4] Done!"
echo "APK: android/app/build/outputs/apk/release/app-release.apk"
