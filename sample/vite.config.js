import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5147, // 希望するポート番号を設定
    strictPort: true, // この設定を追加することで、指定したポートが使われていない場合のみ起動します
  },
});
