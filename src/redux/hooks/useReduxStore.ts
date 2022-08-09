import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';

const useReduxStore = () => {
  const reduxState = useSelector((state: RootState) => state);
  return reduxState;
};

export default useReduxStore;
