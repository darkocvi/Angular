import { GlassModel } from '@api-client/public_api';

export interface GlassesState {
  glasses: GlassModel[];
  isBusy: boolean;
}

export const initialState: GlassesState = {
  glasses: null,
  isBusy: false,
};
