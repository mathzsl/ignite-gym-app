import { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  ScrollView,
  useToast,
} from 'native-base'
import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute } from '@react-navigation/native'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

import { Button } from '@components/Button'

import { api } from '@services/api'

import { AppError } from '@utils/AppError'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  exercise_id: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [exerciseData, setExerciseData] = useState<ExerciseDTO>(
    {} as ExerciseDTO,
  )

  const navigation = useNavigation()

  const toast = useToast()

  const route = useRoute()
  const { exercise_id } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseById() {
    try {
      const { data } = await api.get(`/exercises/${exercise_id}`)

      setExerciseData(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercicio.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseById()
  }, [exerciseData])

  return (
    <VStack flex={1}>
      <VStack bg="gray.600" pt={12} pb={8} px={8} mb={8}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" size={6} color="green.500" />
        </TouchableOpacity>

        <HStack alignItems="center" justifyContent="space-between" mt={3}>
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {exerciseData.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exerciseData.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px={8}>
          <Box rounded="lg" overflow="hidden">
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exerciseData.demo}`,
              }}
              alt="Imagem do exercício"
              w="full"
              h={80}
              rounded="lg"
              resizeMode="cover"
            />
          </Box>

          <Box bg="gray.600" p={4} rounded="lg" mt={3}>
            <HStack justifyContent="space-evenly" mb={6}>
              <HStack alignItems="center">
                <SeriesSvg />

                <Text fontSize="lg" color="gray.200" ml={2}>
                  {exerciseData.series} séries
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />

                <Text fontSize="lg" color="gray.200" ml={2}>
                  {exerciseData.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      )}
    </VStack>
  )
}
