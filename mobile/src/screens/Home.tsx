import { useState } from 'react'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'

import { HomeHeader } from '@components/HomeHeader'
import { Group } from '@components/Group'
import { ExerciseCard } from '@components/ExerciseCard'

export function Home() {
  const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'ombro'])
  const [exercises, setExercises] = useState(['1', '2', '3', '4', '5'])
  const [groupSelected, setGroupSelected] = useState('costas')

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleLowerCase() === item.toLocaleLowerCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack alignItems="center" justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="md">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => <ExerciseCard />}
          _contentContainerStyle={{
            pb: 8,
          }}
          mb={4}
        />
      </VStack>
    </VStack>
  )
}
