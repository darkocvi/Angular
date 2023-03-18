import { GlassesActions, GlassesActionTypes } from '../actions/glasses.actions';
import { GlassesState, initialState } from '../models/glasses.store';

export function glassesReducer(state = initialState, action: GlassesActions): GlassesState {
  switch (action.type) {
    case GlassesActionTypes.LoadCustomerGlassesList:
      return { ...state, glasses: null, isBusy: true };

    case GlassesActionTypes.CustomerGlassesListLoaded: {
      const glasses = action.payload;
      return { ...state, glasses: glasses, isBusy: false };
    }

    case GlassesActionTypes.AddCustomerGlasses:
    case GlassesActionTypes.EditCustomerGlasses:
    case GlassesActionTypes.RemoveCustomerGlasses:
      return { ...state, isBusy: true };

    case GlassesActionTypes.CustomerGlassesAdded: {
      const glasses = action.payload;
      const glassesList = [...state.glasses];
      const idx = glassesList.findIndex((g) => g.id === glasses.id);
      if (idx === -1) {
        glassesList.push(glasses);
      }
      return { ...state, glasses: glassesList, isBusy: false };
    }

    case GlassesActionTypes.CustomerGlassesEdited: {
      const glasses = action.payload;
      const glassesList = [...state.glasses];
      const idx = glassesList.findIndex((g) => g.id === glasses.id);
      if (idx > -1) {
        glassesList.splice(idx, 1, glasses);
      }
      return { ...state, glasses: glassesList, isBusy: false };
    }

    case GlassesActionTypes.CustomerGlassesRemoved: {
      const glassesId = action.payload;
      const glassesList = [...state.glasses];
      const idx = glassesList.findIndex((g) => g.id === glassesId);
      if (idx > -1) {
        glassesList.splice(idx, 1);
      }
      return { ...state, glasses: glassesList, isBusy: false };
    }

    case GlassesActionTypes.LoadingCustomerGlassesListFailed:
    case GlassesActionTypes.AddingCustomerGlassesFailed:
    case GlassesActionTypes.EditingCustomerGlassesFailed:
    case GlassesActionTypes.RemovingCustomerGlassesFailed:
      return { ...state, isBusy: false };

    default:
      return { ...state };
  }
}
