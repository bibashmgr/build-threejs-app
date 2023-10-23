type Config = {
  clientUrl: string;
  mode: string;
};

export const config: Config = {
  clientUrl: import.meta.env.VITE_CLIENT_BASE_URL,
  mode: import.meta.env.MODE,
};
