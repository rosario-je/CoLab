import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({ 
  server: {
    proxy: {
      "/api": "https://colab-yx6w.onrender.com",
    }  
  } ,
  plugins: [react()],
})