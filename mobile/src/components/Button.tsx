import { Button as NativeButton, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <NativeButton
      w="full"
      h={14}
      bg="green.700"
      rounded="sm"
      _pressed={{
        bg: 'green.500',
      }}
      {...rest}
    >
      <Text color="white" fontFamily="heading" fontSize="sm">
        {title}
      </Text>
    </NativeButton>
  )
}
