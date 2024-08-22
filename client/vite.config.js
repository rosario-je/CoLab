import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({ 
  server: {
    proxy: {
      "/api": "https://colab-server-gs6a.onrender.com",
    }  
  } ,
  plugins: [react()],
});