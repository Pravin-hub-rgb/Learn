# React Native + Ignite Roadmap
> For someone comfortable with Next.js basics

---

## Phase 0 — Your existing foundation
You already know these. They transfer directly:
- JSX, components, props
- `useState`, `useEffect`
- Fetching data with `fetch` / `axios`
- Basic routing concepts

**Key mindset shift:** React Native has no DOM, no CSS, no browser APIs. Everything maps to native mobile UI instead.

---

## Phase 1 — React Native Fundamentals
**Duration: 2–3 weeks**
**Goal: Get comfortable with raw RN before touching Ignite**

### Setup
```bash
npx create-expo-app MyFirstApp
cd MyFirstApp
npx expo start
```
Install **Expo Go** on your phone and scan the QR code. That's your dev environment.

### Core things to learn

**Components (replacing HTML tags)**
| Web (Next.js) | React Native |
|---|---|
| `<div>` | `<View>` |
| `<p>`, `<span>`, `<h1>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `<ul>` with many items | `<FlatList>` |

**Styling (no CSS files)**
```js
import { StyleSheet, View, Text } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // default (unlike web's row)
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  }
})
```

**Platform differences**
```js
import { Platform } from 'react-native'

const paddingTop = Platform.OS === 'ios' ? 44 : 24
```

### Practical mini-projects to build
1. A static profile card screen
2. A FlatList of items fetched from a public API
3. A form with TextInput + validation
4. A simple counter with `useState`

---

## Phase 2 — Ignite CLI & Project Structure
**Duration: 1 week**
**Goal: Understand what Ignite generates and why**

### Create your first Ignite app
```bash
npx ignite-cli@latest new MyIgniteApp
cd MyIgniteApp
npx expo start
```

### What Ignite gives you out of the box
- TypeScript configured
- React Navigation (v6)
- MobX-State-Tree (state management)
- apisauce (API layer)
- i18n (translations)
- Pre-built components
- Theming system
- Generators

### Folder structure to understand
```
app/
├── components/       # Reusable UI components
├── models/           # MobX-State-Tree stores
├── navigators/       # Screen navigation config
├── screens/          # Individual screens
├── services/
│   └── api/          # API calls live here
├── theme/            # Colors, spacing, fonts
└── utils/            # Helpers
```

### Ignite generators (use these constantly)
```bash
npx ignite-cli generate screen ProfileScreen
npx ignite-cli generate component UserCard
npx ignite-cli generate model UserStore
```

**This week's task:** Read through the generated boilerplate code. Don't change much — just understand what each file does.

---

## Phase 3 — Navigation with React Navigation
**Duration: 1–2 weeks**
**Goal: Move between screens confidently**

### Core navigator types

**Stack Navigator** — push/pop like browser history
```js
const Stack = createNativeStackNavigator()

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )
}
```

**Tab Navigator** — bottom tabs
```js
const Tab = createBottomTabNavigator()

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}
```

**Nested navigators** — tabs containing stacks (real apps always do this)
```
TabNavigator
├── FeedStack
│   ├── FeedScreen
│   └── PostDetailScreen
└── ProfileStack
    ├── ProfileScreen
    └── EditProfileScreen
```

### Passing data between screens
```js
// Navigate with params
navigation.navigate('Profile', { userId: '123' })

// Receive params
const { userId } = route.params
```

**This phase's project:** Build a 2-tab app — a list screen that navigates to a detail screen when you tap an item.

---

## Phase 4 — State Management with MobX-State-Tree (MST)
**Duration: 2 weeks**
**Goal: Manage global state the Ignite way**

This is the steepest learning curve. Take your time here.

### Core MST concepts

**Define a model**
```ts
import { types, Instance } from 'mobx-state-tree'

const UserModel = types.model('User', {
  id: types.identifier,
  name: types.string,
  email: types.string,
}).actions(self => ({
  setName(name: string) {
    self.name = name
  }
})).views(self => ({
  get displayName() {
    return self.name.toUpperCase()
  }
}))
```

**Root store (connects everything)**
```ts
const RootStoreModel = types.model('RootStore', {
  userStore: types.optional(UserStoreModel, {}),
  postStore: types.optional(PostStoreModel, {}),
})
```

**Access store in a screen**
```ts
import { useStores } from '../models'

function ProfileScreen() {
  const { userStore } = useStores()
  // userStore is reactive — screen re-renders on changes
}
```

**Persist store to device storage**
```ts
// Ignite handles this for you in app/models/helpers/
// Just know it saves to AsyncStorage on every change
```

**This phase's project:** Add a UserStore to your app. Store a list of users fetched from an API, display them, and let the user mark favourites (saved in the store).

---

## Phase 5 — API Integration with apisauce
**Duration: 1 week**
**Goal: Connect your app to a real backend**

### Setup the API class (Ignite generates this)
```ts
// app/services/api/api.ts
import { ApisauceInstance, create } from 'apisauce'

export class Api {
  apisauce: ApisauceInstance

  setup() {
    this.apisauce = create({
      baseURL: 'https://api.yourapp.com',
      timeout: 10000,
      headers: { Accept: 'application/json' },
    })
  }

  async getUsers(): Promise<GetUsersResult> {
    const response = await this.apisauce.get('/users')
    if (!response.ok) return { kind: 'bad-data' }
    return { kind: 'ok', users: response.data }
  }
}
```

### Call API from your MST store
```ts
const UserStoreModel = types.model('UserStore', {
  users: types.array(UserModel),
  status: types.optional(types.enumeration(['idle', 'loading', 'error']), 'idle'),
}).actions(self => ({
  async fetchUsers() {
    self.status = 'loading'
    const result = await getEnv(self).api.getUsers()
    if (result.kind === 'ok') {
      self.users = result.users
      self.status = 'idle'
    } else {
      self.status = 'error'
    }
  }
}))
```

---

## Phase 6 — UI, Theming & Animations
**Duration: 1–2 weeks**
**Goal: Build polished, consistent screens**

### Use Ignite's built-in components
```tsx
import { Button, Text, Screen, TextField } from '../components'

function LoginScreen() {
  return (
    <Screen preset="scroll" safeAreaEdges={['top']}>
      <Text preset="heading" tx="loginScreen.title" />
      <TextField
        labelTx="loginScreen.emailLabel"
        placeholderTx="loginScreen.emailPlaceholder"
      />
      <Button tx="loginScreen.signIn" onPress={handleLogin} />
    </Screen>
  )
}
```

### Theming — edit once, applies everywhere
```ts
// app/theme/colors.ts
export const colors = {
  palette: {
    primary500: '#3B82F6',
    neutral100: '#F5F5F5',
  },
  background: '#FFFFFF',
  text: '#1F2937',
  tint: '#3B82F6',
}
```

### Animations with Reanimated 2
```ts
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated'

const opacity = useSharedValue(0)
opacity.value = withTiming(1, { duration: 400 })

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
}))

return <Animated.View style={animatedStyle}>...</Animated.View>
```

**Keep it simple:** Start with fade-ins and slide transitions. Avoid complex physics animations until you're comfortable.

---

## Phase 7 — Build & Deploy
**Duration: 1 week**
**Goal: Get your app on a real device / app store**

### EAS Build setup
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Build profiles (in `eas.json`)
```json
{
  "build": {
    "development": { "developmentClient": true },
    "preview": { "distribution": "internal" },
    "production": {}
  }
}
```

### Build commands
```bash
eas build --platform ios --profile preview
eas build --platform android --profile preview
eas build --platform all --profile production
```

### OTA (Over-the-Air) updates
```bash
eas update --branch production --message "Fix login bug"
```
Push JavaScript changes to users instantly — no app store review needed (for JS-only changes).

### Before submitting to stores
- App icon: 1024x1024 PNG
- Splash screen configured in `app.json`
- Bundle ID / package name set
- iOS: Apple Developer account ($99/yr)
- Android: Google Play Console account ($25 one-time)

---

## Full Timeline Summary

| Phase | Topic | Time |
|---|---|---|
| 0 | Your existing knowledge | — |
| 1 | RN fundamentals | 2–3 weeks |
| 2 | Ignite setup & structure | 1 week |
| 3 | Navigation | 1–2 weeks |
| 4 | MobX-State-Tree | 2 weeks |
| 5 | API integration | 1 week |
| 6 | UI, theming, animations | 1–2 weeks |
| 7 | Build & deploy | 1 week |
| **Total** | | **~10–12 weeks** |

---

## Recommended Resources

- **Official docs:** https://reactnative.dev/docs/getting-started
- **Ignite docs:** https://github.com/infinitered/ignite
- **React Navigation:** https://reactnavigation.org/docs/getting-started
- **MST docs:** https://mobx-state-tree.js.org/intro/welcome
- **Reanimated:** https://docs.swmansion.com/react-native-reanimated
- **EAS Build:** https://docs.expo.dev/build/introduction

---

## Tips from experience

- **Don't rush Phase 1.** The more raw RN you understand, the less Ignite feels like magic.
- **Read the generated Ignite code.** It's well-written and teaches best practices by example.
- **MST is weird at first.** Give it a full week before deciding you hate it — it clicks suddenly.
- **Use the generators.** `ignite-cli generate` saves you from boilerplate mistakes.
- **Test on a real device early.** The simulator hides performance issues that real devices reveal.
- **TypeScript is your friend here.** Ignite is fully typed — let the compiler guide you.