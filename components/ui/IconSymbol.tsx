// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MATERIAL_MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof MaterialIcons>["name"]
  >
>;

const IONICONS_MAPPING = {
  // See Ionicons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  "info.circle": "information-circle",
  "trash.fill": "trash-sharp",
  "plus.circle": "add-circle-sharp",
} as Partial<
  Record<
    import("expo-symbols").SymbolViewProps["name"],
    React.ComponentProps<typeof Ionicons>["name"]
  >
>;

export type IconSymbolName = keyof typeof MATERIAL_MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
  library = "MaterialIcons", // Choose library dynamically
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  library?: "MaterialIcons" | "Ionicons";
}) {
  const IconComponent = library === "Ionicons" ? Ionicons : MaterialIcons; // Determine which library to use

  const iconName =
    library === "Ionicons" ? IONICONS_MAPPING[name] : MATERIAL_MAPPING[name];

  if (!iconName) {
    console.warn(`Icon name "${name}" not mapped to ${library}.`);
    return null;
  }
  return (
    <IconComponent color={color} size={size} name={iconNames} style={style} />
  );
}
