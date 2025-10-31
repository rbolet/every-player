import { tokens } from "./tokens";

export const themes = {
  light: {
    background: tokens.color.neutralLight,
    text: "#000",
    primary: tokens.color.deepIndigo,
    secondary: tokens.color.balancedGreen,
    accent: tokens.color.softGold,
  },
  dark: {
    background: "#000",
    bgSlate: tokens.color.neutralDark,
    text: tokens.color.neutralLight,
    primary: tokens.color.deepIndigo,
    secondary: tokens.color.balancedGreen,
    accent: tokens.color.softGold,
  },
};

export default themes;
