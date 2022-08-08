import create from "zustand";
import { devtools } from "zustand/middleware";
import { configurePersist } from "zustand-persist";
import axios from "axios";

const { persist } = configurePersist({
  storage: localStorage,
  rootKey: "root",
});

const useStore = create(
  devtools(
    persist({ key: "state", denylist: ["error", "loading"] }, (set) => ({
      user: null,
      success: false,
      error: "",
      otp: false,
      loading: false,
      advertisment: null,
      setUser: (user) => set((oldState) => ({ ...oldState, user })),
      logout: () =>
        set({ user: null, error: "", advertisment: null, success: false }),
      signup: async (user) => {
        set({ user });
        try {
          const { data } = await axios.post(
            "http://94.237.92.101/wifi/public/index.php/api/create",
            { ...user },
            {
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          set({ success: data, loading: false });
        } catch (error) {
          console.log(error.response.data.message);
          set({ error: error.response.data.message, loading: false });
        }
      },
      verify: async (user) => {
        console.log(user, "verify");

        try {
          const { data } = await axios.post(
            "http://94.237.92.101/wifi/public/index.php/api/verify",
            { ...user },
            {
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          set({ advertisment: data, loading: false });
        } catch (error) {
          console.log(error);
          console.log(error && error.response.data.code);
          set({
            error: error,
            loading: false,
          });
        }
      },
    }))
  )
);

export default useStore;
