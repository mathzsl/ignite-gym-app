import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { TabRoutes } from './tab.routes'
import { Exercise } from '@screens/Exercise'

type AppRoutes = {
  home: undefined
  exercise: {
    exercise_id: string
  }
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={TabRoutes} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}
