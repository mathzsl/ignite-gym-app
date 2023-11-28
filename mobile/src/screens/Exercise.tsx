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
} from 'native-base'
import { Feather } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native'

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'

import { Button } from '@components/Button'

export function Exercise() {
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack bg="gray.600" pt={12} pb={8} px={8} mb={8}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" size={6} color="green.500" />
        </TouchableOpacity>

        <HStack alignItems="center" justifyContent="space-between" mt={3}>
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack px={8}>
          <Image
            source={{
              uri: 'https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-2.jpg',
            }}
            alt="Imagem do exercício"
            w="full"
            h={80}
            rounded="lg"
            resizeMode="cover"
          />

          <Box bg="gray.600" p={4} rounded="lg" mt={3}>
            <HStack justifyContent="space-evenly" mb={6}>
              <HStack alignItems="center">
                <SeriesSvg />

                <Text fontSize="lg" color="gray.200" ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />

                <Text fontSize="lg" color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}
