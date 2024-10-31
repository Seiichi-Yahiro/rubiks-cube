import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../states/States';

export const useAppDispatch = useDispatch; // TODO find AppDispatch type
export const useRedux = useSelector.withTypes<AppState>();
