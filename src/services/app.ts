import { request } from '@hbasesoft/web-plugin';
/**
 * 获取配置文件
 * @returns
 */
export async function getFrontend() {
  return request<string>('/ui-oauth/frontend.cfg');
}

/**
 * 获取菜单
 */
export async function getMenus() {
  return request<any[]>('/v1/plat/configuration/menus/list', {
    data: { dataType: 'operatePriv' },
  });
}

/*
 * 查询用户信息
 */
export async function getCurrent() {
  return request<{ userName: string }>('/v1/uum/user/account/token');
}

/**
 * 获取子应用
 * @returns
 */
export async function getApps() {
  return request('/v1/api/plat-config/applicationInfo');
}
