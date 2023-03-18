import { AppActions } from '../actions/app.actions';
import { AppState, initialState } from '../models/app.store';

export function appReducer(state = initialState, action: AppActions): AppState {
  switch (action.type) {
    default:
      return state;
  }
}
