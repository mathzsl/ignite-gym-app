import { useState } from 'react'
import { Heading, VStack, SectionList, Text } from 'native-base'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

export function History() {
  const [exerciseHistory, setExerciseHistory] = useState([
    {
      title: '09/10/2023',
      data: ['1', '2', '3'],
    },
    {
      title: '10/10/2023',
      data: ['1', '2'],
    },
    {
      title: '11/10/2023',
      data: ['1', '2', '3', '4'],
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        showsVerticalScrollIndicator={false}
        sections={exerciseHistory}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exerciseHistory.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.200" textAlign="center">
            Não há exercícios registrados ainda. {'\n'} Vamos fazer exercícios
            hoje?
          </Text>
        )}
      />
    </VStack>
  )
}
