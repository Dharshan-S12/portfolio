import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.mp3', '**/*.wasm', '**/*.jsdos'],
});
