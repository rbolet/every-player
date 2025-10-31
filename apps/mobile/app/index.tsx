import { StatusBar } from 'expo-status-bar';
import { YStack, H1, H2, Paragraph } from 'tamagui';

export default function Index() {
  return (
    <YStack 
      flex={1} 
      backgroundColor="$background" 
      alignItems="center" 
      justifyContent="center" 
      paddingHorizontal="$4" 
      paddingVertical="$6"
      gap="$6"
    >
      <H1 
        size="$12" 
        color="$red10" 
        textAlign="center" 
        fontWeight="900"
        letterSpacing="$1"
      >
        DON'T PANIC
      </H1>
      
      <YStack gap="$3" alignItems="center">
        <H2 size="$8" color="$color12" textAlign="center" fontWeight="600">
          EveryPlayer
        </H2>
        <Paragraph size="$5" color="$color11" textAlign="center">
          Youth Soccer Roster Management
        </Paragraph>
      </YStack>
      
      <Paragraph 
        size="$4" 
        color="$color10" 
        textAlign="center" 
        maxWidth={320}
        lineHeight="$6"
      >
        Your friendly neighborhood app for managing youth soccer teams, players, and everything in between.
      </Paragraph>
      
      <StatusBar style="auto" />
    </YStack>
  );
}
