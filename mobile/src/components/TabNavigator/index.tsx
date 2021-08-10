import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'

import { colors } from '../../constants/colors'
import {
  Line,
  RouteButton,
  RouteButtonText,
  BottomTab,
  Container,
  NewBetButton,
  NewBetButtonContainer,
} from './styles'

const MyTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <BottomTab>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const iconName =
          label === 'Home' ? 'home' : label === 'Account' ? 'user' : undefined

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, { merge: true })
          }
        }

        if (label === 'NewBetScreen') {
          return (
            <NewBetButtonContainer key={route.key}>
              <NewBetButton
                accessibilityRole='button'
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
              >
                <MaterialCommunityIcons
                  name='poker-chip'
                  size={59}
                  color={colors.white}
                />
              </NewBetButton>
            </NewBetButtonContainer>
          )
        }

        return (
          <Container key={route.key}>
            <Line isFocused={isFocused} />
            <RouteButton
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
            >
              <SimpleLineIcons
                name={iconName}
                size={25}
                color={isFocused ? colors.green : '#C1C1C1'}
              />

              <RouteButtonText isFocused={isFocused}>{label}</RouteButtonText>
            </RouteButton>
          </Container>
        )
      })}
    </BottomTab>
  )
}

export default MyTabBar
