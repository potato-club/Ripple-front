import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'

console.log('✅ vite.config.ts loaded');

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  const rawApiUrl = env.VITE_API_URL;

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        // /v1로 시작하는 모든 요청을 원격 API로 프록시
        '/v1': {
          target: rawApiUrl, // 실제 API 주소
          changeOrigin: true,
          secure: false, // SSL 인증서 검사 비활성화
          rewrite: (path) => path.replace(/^\/v1/, ''), // /v1 제거 후 전달
          configure: (proxy) => {
            // origin 헤더 바꾸기
            proxy.on('proxyReq', (proxyReq: any) => {
                try {
                  if (rawApiUrl && proxyReq.setHeader) {
                    proxyReq.setHeader('Origin', rawApiUrl);
                  }
                } catch (e) {
                  // no-op
                }
            });
            proxy.on('proxyRes', (proxyRes: any, req: any) => {
              const origin = (req && req.headers && (req.headers.origin || req.headers.host)) || '*';
              // 프리플라이트와 실제 응답에서 브라우저가 요구하는 CORS 헤더를 추가
              proxyRes.headers = proxyRes.headers || {};
              proxyRes.headers['access-control-allow-origin'] = origin;
              proxyRes.headers['access-control-allow-methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
              proxyRes.headers['access-control-allow-headers'] = 'Authorization,Origin, X-Requested-With, Content-Type, Accept';
              proxyRes.headers['access-control-allow-credentials'] = 'true';
            });
          }
        },
      },
    },
  })
}