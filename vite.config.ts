import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'

console.log('✅ vite.config.ts loaded');

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        // /v1로 시작하는 모든 요청을 원격 API로 프록시
        '/v1': {
          target: env.VITE_API_URL, // 실제 API 주소
          changeOrigin: true,
          secure: false, // SSL 인증서 검사 비활성화
          rewrite: (path) => path.replace(/^\/v1/, ''), // /v1 제거 후 전달
        }
      },
    },
  })
}