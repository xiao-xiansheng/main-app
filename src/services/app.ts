import { request } from '@umijs/max';

/**
 * 获取配置文件
 * @returns
 */
export async function getFrontend() {
  return request('/ui-oauth/frontend.cfg');
}

/**
 * 获取菜单
 */
export async function getMenus() {
  return request('/v1/plat/configuration/menus/list', {
    params: { dataType: 'operatePriv' },
  });
}

/*
 * 查询用户信息
 */
export async function getCurrent() {
  return request('/v1/uum/user/account/token');
}
