import { useCallback, useState } from 'react'
import { Heading, VStack, SectionList, Text, useToast } from 'native-base'

import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'

import { api } from '@services/api'

import { AppError } from '@utils/AppError'

import { Loading } from '@components/Loading'

import { useFocusEffect } from '@react-navigation/native'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseHistory, setExerciseHistory] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fetchExercisesHistory() {
    try {
      setIsLoading(true)

      const { data } = await api.get('/history')

      setExerciseHistory(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi carregar o histórico de exercicios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchExercisesHistory()
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          showsVerticalScrollIndicator={false}
          sections={exerciseHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
              fontFamily="heading"
            >
              {title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            exerciseHistory.length === 0 && {
              flex: 1,
              justifyContent: 'center',
            }
          }
          ListEmptyComponent={() => (
            <Text color="gray.200" textAlign="center">
              Não há exercícios registrados ainda. {'\n'} Vamos fazer exercícios
              hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  )
}
