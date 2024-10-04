import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Memuat environment variables berdasarkan mode (development, production)
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: env.VITE_FE_PORT, // Akses env secara langsung dari `env`
      proxy: {
        "/api": {
          target: `http://${env.VITE_APP_IP_ADDRESS}:${env.VITE_FE_PORT}`, // Gunakan variabel env yang di-load
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
