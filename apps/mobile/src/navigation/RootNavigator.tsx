import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";
import { CalisthenicsTrackerScreen } from "../screens/app/CalisthenicsTrackerScreen";
import { ExerciseBrowserScreen } from "../screens/app/ExerciseBrowserScreen";
import { ExerciseDetailScreen } from "../screens/app/ExerciseDetailScreen";
import { HomeDashboardScreen } from "../screens/app/HomeDashboardScreen";
import { LiveWorkoutScreen } from "../screens/app/LiveWorkoutScreen";
import { MMATrackerScreen } from "../screens/app/MMATrackerScreen";
import { NotificationsScreen } from "../screens/app/NotificationsScreen";
import { ProfileScreen } from "../screens/app/ProfileScreen";
import { ProgressDashboardScreen } from "../screens/app/ProgressDashboardScreen";
import { RecoveryTrackerScreen } from "../screens/app/RecoveryTrackerScreen";
import { RunningTrackerScreen } from "../screens/app/RunningTrackerScreen";
import { SettingsScreen } from "../screens/app/SettingsScreen";
import { SubscriptionScreen } from "../screens/app/SubscriptionScreen";
import { TrainHubScreen } from "../screens/app/TrainHubScreen";
import { WorkoutBuilderScreen } from "../screens/app/WorkoutBuilderScreen";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { GoalSelectionScreen } from "../screens/onboarding/GoalSelectionScreen";
import { PlanSuggestionScreen } from "../screens/onboarding/PlanSuggestionScreen";
import { ProfileSetupScreen } from "../screens/onboarding/ProfileSetupScreen";
import { WelcomeScreen } from "../screens/onboarding/WelcomeScreen";
import { useAuthStore } from "../store/auth-store";
import { colors } from "../theme";
import type {
  AuthStackParamList,
  MainTabParamList,
  OnboardingStackParamList,
  RootStackParamList
} from "./types";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function tabIcon(name: keyof typeof Ionicons.glyphMap, color: string, size: number) {
  return <Ionicons color={color} name={name} size={size} />;
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen component={LoginScreen} name="Login" />
      <AuthStack.Screen component={RegisterScreen} name="Register" />
      <AuthStack.Screen component={ForgotPasswordScreen} name="ForgotPassword" />
    </AuthStack.Navigator>
  );
}

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen component={WelcomeScreen} name="Welcome" />
      <OnboardingStack.Screen component={GoalSelectionScreen} name="GoalSelection" />
      <OnboardingStack.Screen component={ProfileSetupScreen} name="ProfileSetup" />
      <OnboardingStack.Screen component={PlanSuggestionScreen} name="PlanSuggestion" />
    </OnboardingStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 84,
          paddingTop: 12,
          paddingBottom: 18
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSoft
      }}
    >
      <Tabs.Screen
        component={HomeDashboardScreen}
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => tabIcon("home", color, size)
        }}
      />
      <Tabs.Screen
        component={TrainHubScreen}
        name="Train"
        options={{
          tabBarIcon: ({ color, size }) => tabIcon("barbell", color, size)
        }}
      />
      <Tabs.Screen
        component={ProgressDashboardScreen}
        name="Progress"
        options={{
          tabBarIcon: ({ color, size }) => tabIcon("stats-chart", color, size)
        }}
      />
      <Tabs.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => tabIcon("person-circle", color, size)
        }}
      />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const token = useAuthStore((state) => state.token);
  const onboardingComplete = useAuthStore((state) => state.onboardingComplete);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.background },
        headerShadowVisible: false
      }}
    >
      {!token ? (
        <RootStack.Screen component={AuthNavigator} name="Auth" options={{ headerShown: false }} />
      ) : !onboardingComplete ? (
        <RootStack.Screen
          component={OnboardingNavigator}
          name="Onboarding"
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <RootStack.Screen
            component={MainTabs}
            name="MainTabs"
            options={({ navigation }) => ({
              title: "Athletica",
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate("Notifications")}>
                  <Text style={{ color: colors.accent }}>Alerts</Text>
                </Pressable>
              )
            })}
          />
          <RootStack.Screen component={ExerciseBrowserScreen} name="ExerciseBrowser" options={{ title: "Exercise Library" }} />
          <RootStack.Screen component={ExerciseDetailScreen} name="ExerciseDetail" options={{ title: "Exercise Detail" }} />
          <RootStack.Screen component={WorkoutBuilderScreen} name="WorkoutBuilder" options={{ title: "Workout Builder" }} />
          <RootStack.Screen component={LiveWorkoutScreen} name="LiveWorkout" options={{ title: "Live Workout" }} />
          <RootStack.Screen component={RunningTrackerScreen} name="RunningTracker" options={{ title: "Running Tracker" }} />
          <RootStack.Screen component={MMATrackerScreen} name="MMATracker" options={{ title: "MMA Tracker" }} />
          <RootStack.Screen component={CalisthenicsTrackerScreen} name="CalisthenicsTracker" options={{ title: "Calisthenics Tracker" }} />
          <RootStack.Screen component={RecoveryTrackerScreen} name="RecoveryTracker" options={{ title: "Recovery Tracker" }} />
          <RootStack.Screen component={SettingsScreen} name="Settings" options={{ title: "Settings" }} />
          <RootStack.Screen component={NotificationsScreen} name="Notifications" options={{ title: "Notifications" }} />
          <RootStack.Screen component={SubscriptionScreen} name="Subscription" options={{ title: "Athletica Pro" }} />
        </>
      )}
    </RootStack.Navigator>
  );
}
