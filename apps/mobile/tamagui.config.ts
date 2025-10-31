import { createTamagui, type TamaguiInternalConfig } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { tokens } from "./style/tokens";
import { themes } from "./style/themes";

export const tamaguiConfig: TamaguiInternalConfig = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    ...tokens,
  },
  themes: {
    ...defaultConfig.themes,
    ...themes,
    // add custom themes here
  },
});

export default tamaguiConfig;

// export type AppTamaguiConfig = typeof tamaguiConfig;

// declare module "tamagui" {
//   interface TamaguiCustomConfig extends AppTamaguiConfig {}
// }
