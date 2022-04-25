/* eslint-disable no-undef */
import {
  wait,
  cleanup
} from "@testing-library/react";
import moxios from "moxios";
import { createMemoryHistory } from "history";
import React from "react";
import Captions from "../CaptionsContainer";
import { renderWithReduxAndRouter, mockStore } from "../../../utils/testUtils";
const mockGetCaptions = jest.fn().mockName("getCaptions");
const mockClearCaptions = jest.fn().mockName("clearCaptions");
const mockCreateCaptionAlone = jest.fn().mockName("createCaptionAlone");

describe("Captions Tests", () => {
  let store;
  afterEach(() => {
    cleanup();
    moxios.uninstall();
  });
  beforeEach(() => {
    store = mockStore({
      captions: {
        captions: [
          {
            id: 1,
            caption: "This is my home base oo"
          }
        ]
      }
    });
    moxios.install();
  });
  let history = createMemoryHistory({
    initialEntries: ["/captions"]
  });
  it("should load the document to the DOM with an input form", () => {
    const { queryByPlaceholderText } = renderWithReduxAndRouter(
      <Captions
        getCaptions={mockGetCaptions}
        clearCaptions={mockClearCaptions}
        createCaptionAlone={mockCreateCaptionAlone}
      />,
      {
        route: "/captions",
        initialState: {},
        history: history,
        store
      }
    );
    const searchInput = queryByPlaceholderText("Enter Captions to Add");
    expect(searchInput).not.toBeNull();
  });

  it("should display the nav bar after loading", async () => {
    const { queryAllByText } = renderWithReduxAndRouter(
      <Captions
        getCaptions={mockGetCaptions}
        clearCaptions={mockClearCaptions}
        createCaptionAlone={mockCreateCaptionAlone}
      />,
      {
        route: "/captions",
        initialState: {},
        history: history,
        store
      }
    );
    const homeMenuButton = queryAllByText("Home");
    const tagsMenuButton = queryAllByText("Tags");
    const captionsMenuButton = queryAllByText("Captions");

    await wait(() => {
      expect(homeMenuButton).not.toBeNull;
      expect(tagsMenuButton).not.toBeNull;
      expect(captionsMenuButton).not.toBeNull;
    });
  });

  it("should display text when searched captions are empty", () => {
    const { queryByText } = renderWithReduxAndRouter(
      <Captions
        getCaptions={mockGetCaptions}
        clearCaptions={mockClearCaptions}
        createCaptionAlone={mockCreateCaptionAlone}
      />,
      {
        route: "/captions",
        initialState: {},
        history: history,
        store
      }
    );
    const emptyError = queryByText("Please Search Above");
    expect(emptyError).not.toBeNull;
  });

});
