import useReduxStore from './useReduxStore';

export const useStoreReducer = () => useReduxStore().store;
export const useUserReducer = () => useReduxStore().user;
export const useCommonReducer = () => useReduxStore().common;

