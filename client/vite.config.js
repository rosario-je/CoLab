import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({ 
  // server: {
  //   proxy: {
  //     "/api": "https://colab-server-y33a.onrender.com",
  //   }  
  // } ,
  build: {
    outDir: 'dist' 
  },
  plugins: [react()],
});