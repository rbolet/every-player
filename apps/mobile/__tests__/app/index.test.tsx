import React from "react";
import renderer from "react-test-renderer";
import { TamaguiProvider } from "tamagui";
import Index from "@/app/index";
import { tamaguiConfig } from "@/tamagui.config";

describe("Index Screen", () => {
  it("renders without crashing", () => {
    const tree = renderer.create(
      <TamaguiProvider config={tamaguiConfig}>
        <Index />
      </TamaguiProvider>
    );
    expect(tree).toBeTruthy();
  });

  it("matches snapshot", () => {
    const tree = renderer.create(
      <TamaguiProvider config={tamaguiConfig}>
        <Index />
      </TamaguiProvider>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
