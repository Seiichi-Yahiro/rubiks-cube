import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, AppState } from 'src/redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useRedux = useSelector.withTypes<AppState>();
