import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    locale: false,
  },
  hash: true,
  mountElementId: 'main',
  deadCode: {},
  routes: [
    {
      path: '/Login',
      component: 'Login',
      layout: false,
      headerRender: false,
      menuRender: false,
    },
    {
      path: '/',
      component: 'index',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/oauth/': {
      target: 'http://demo.hbasesoft.com:8888/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      secure: false,
    },
    '/v1/': {
      target: 'http://demo.hbasesoft.com:8888/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      secure: false,
    },
    '/ui-oauth/': {
      target: 'http://demo.hbasesoft.com:8888/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      secure: false,
    },
  },
});
