# RNKeyboardHeightRepro

![Build](https://github.com/sxsx2yzyz/RNKeyboardHeightRepro/workflows/Pre%20Merge%20Checks/badge.svg)

A React Native project to reproduce keyboard height detection issues on Android when switching between different keyboard types.

## 🐛 Issue Description

**Problem**: When switching between different keyboard types on Android, `Keyboard.addListener` events and `Keyboard.metrics()?.height` return the height of the previous keyboard instead of the current one.

**Platform**: Android only (iOS not affected)

**Test Environment**: 
- Android Emulator: Medium Phone API 36.0
- React Native: Latest version

**Affected Scenarios**:
- Switching from numeric keyboard to password keyboard
- Switching from system security keyboard to regular keyboard
- Any keyboard type change where heights differ

**Impact**:
- Both event callback heights and static `Keyboard.metrics()?.height` values are incorrect
- Issue resolves on next keyboard opening
- Consistently reproducible across different keyboard types
- **Video demonstration available**: [screenRecord.mov](./screenRecord.mov) in the root directory

## 🚀 Quick Start

### Prerequisites
Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment).

### Installation & Running

1. **Clone the repository**
```bash
git clone https://github.com/sxsx2yzyz/RNKeyboardHeightRepro.git
cd RNKeyboardHeightRepro
```

2. **Install dependencies**
```bash
cd ReproducerApp
npm install
# or
yarn install
```

3. **Start Metro bundler**
```bash
npm start
# or
yarn start
```

4. **Run on Android**
```bash
npm run android
# or
yarn android
```

## 🔍 How to Reproduce the Issue

### Test Environment
- **Android Emulator**: Medium Phone API 36.0
- **Platform**: Android only (iOS not affected)

### Step-by-Step Reproduction

1. **Launch the app** - You'll see two text inputs and a keyboard height display
2. **Tap the first input field** - A numeric keyboard appears, note the height
3. **Switch to the second input field** - The keyboard type changes, but the displayed height remains from the previous keyboard
4. **Switch back and forth** - The issue persists until the next keyboard opening

### Expected vs Actual Behavior

**Expected**: Keyboard height should update immediately when switching keyboard types
**Actual**: Keyboard height shows the previous keyboard's height until next keyboard opening

## 📱 App Structure

The reproduction app contains:

- **Two TextInput components** with different keyboard configurations:
  - Input 1: `keyboardType='numeric'` + `secureTextEntry={true}`
  - Input 2: `keyboardType='visible-password'` + `secureTextEntry={false}`

- **Real-time keyboard height display** showing current detected height

- **Keyboard event listeners** monitoring `keyboardDidShow` and `keyboardDidHide` events

## 🛠 Technical Details

### Code Implementation

```typescript
const [keyboardHeight, setKeyboardHeight] = useState(0);

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  });
  const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  });
  // ...
}, []);
```

### Affected APIs

- `Keyboard.addListener('keyboardDidShow', callback)`
- `Keyboard.addListener('keyboardDidHide', callback)`
- `Keyboard.metrics()?.height`

## 📋 Reproduction Checklist

- [x] Create reproduction project
- [x] Implement keyboard type switching
- [x] Add real-time height monitoring
- [x] Test on Android device/emulator
- [x] Document reproduction steps
- [ ] Submit issue to React Native repository

## 🐛 Issue Status

- **Platform**: Android only (iOS not affected)
- **Test Environment**: Medium Phone API 36.0 emulator
- **React Native Version**: Latest
- **Reproducible**: Yes
- **Status**: Open
- **Video Evidence**: [screenRecord.mov](./screenRecord.mov) in root directory

## 📞 Contributing

If you can reproduce this issue or have additional information, please:

1. Test the reproduction steps above
2. Report any variations or additional scenarios
3. Share device/emulator details if the issue differs

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This is a reproduction project for a React Native keyboard height detection issue. The app is intentionally minimal to focus on the specific problem.
