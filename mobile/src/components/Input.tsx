import { Input as NativeInput, IInputProps } from 'native-base'

type InputProps = IInputProps

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeInput
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      placeholderTextColor="gray.300"
      {...rest}
    />
  )
}
