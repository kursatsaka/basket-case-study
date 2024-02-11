import { createSelector } from "@ngrx/store";
import { AppState } from "../models/appState.interface";

export const selectFeature = (state: AppState) => state.basket;

export const productSelector = createSelector(
  selectFeature,
  (state) => state.products
);
