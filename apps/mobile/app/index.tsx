import { YStack, H1, Theme } from "tamagui";

export default function Index() {
  return (
    <Theme name="dark">
      <YStack
        flex={1}
        backgroundColor="$background"
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$4"
        paddingVertical="$6"
      >
        <H1 size="$12" color="$text" fontWeight="900" letterSpacing="$1" textAlign="center">
          DON'T
        </H1>
        <H1 size="$12" color="$secondary" fontWeight="900" letterSpacing="$1" textAlign="center">
          PANIC
        </H1>
      </YStack>
    </Theme>
  );
}
