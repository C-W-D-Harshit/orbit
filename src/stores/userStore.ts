import { create } from "zustand";

type Store = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setFirstTime: (firstTime: boolean) => void;
};

type User = {
  id: string;
  username: string | null;
  email: string;
};

const userStore = create<Store>()((set) => ({
  user: null,
  setUser: (user: User) =>
    set({
      user,
    }),
  clearUser: () =>
    set({
      user: null,
    }),
  setFirstTime: (firstTime: boolean) =>
    set((state) => ({
      user: state.user ? { ...state.user, firstTime } : null,
    })),
}));

export const useUserStore = userStore;
export const { setUser, clearUser, setFirstTime } = useUserStore.getState();

export default userStore;
