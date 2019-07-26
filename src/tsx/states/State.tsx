import { Reducer, useReducer } from 'react';
import { initialSettingsState, ISettingsState } from './SettingsState';
import { IAlgorithmPlayerState, initialAlgorithmPlayerState } from './AlgorithmPlayerState';
import { createContainer } from 'react-tracked';
import { ActionCreator } from './Actions';
import { SettingsActions } from './SettingsActions';
import { AlgorithmPlayerActions } from './AlgorithmPlayerActions';

type State = ISettingsState & IAlgorithmPlayerState;
type Actions = SettingsActions | AlgorithmPlayerActions;
type Action = ActionCreator<Actions, State>;

const initialState: State = {
    ...initialSettingsState,
    ...initialAlgorithmPlayerState
};

const reducer: Reducer<State, Action> = (state, actionCreator) => ({ ...state, ...actionCreator(state).payload });

const useValue = () => useReducer(reducer, initialState);

const { Provider, useTracked } = createContainer(useValue);

export { Provider as GlobalStateProvider, useTracked as useGlobalState };
