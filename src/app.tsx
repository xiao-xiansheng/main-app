// 运行时配置
import IconMap from '@/constant/iconMap';
import { InfoCircleOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-components';
import { codeForToken, desDecrypt, getAccessToken, setAccessToken } from '@hbasesoft/web-plugin';
import { RuntimeConfig, history } from '@umijs/max';
import { cloneDeep, concat, forEach } from 'lodash';
import { redirectUrl } from './constant';
import { getCurrent, getFrontend, getMenus } from './services/app';

type InitialStateType = {
  name?: string;
  userInfo?: { userName: string; [key: string]: string };
  menuItem?: MenuDataItem[];
  frontend?: { client_id: string; client_secret: string; [key: string]: string };
};

const drawMenuItem = (menu: MenuDataItem[]) => {
  let result: MenuDataItem[] = [];
  forEach(menu, (item) => {
    let res = cloneDeep(item);
    result.push(res);
    if (item.children && item.children.length > 0) {
      result = concat(result, drawMenuItem(item.children));
    }
  });
  return result;
};

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    path: item.menuUrl || item.path,
    key: item.id,
    icon: icon && IconMap[icon as string],
    hideInMenu: item.menuType === 'H',
    children: children && loopMenuItem(children),
  }));

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialStateType> {
  let userInfo = { userName: '' };
  // 初始化请求配置文件
  const { data: frontend } = await getFrontend();

  const frontendJson = JSON.parse(desDecrypt(frontend));
  // end

  // 获取用户信息
  if (getAccessToken()) {
    const { data } = await getCurrent();
    userInfo = data;
  }
  // end
  return {
    name: userInfo.userName,
    userInfo,
    menuItem: [],
    frontend: frontendJson,
  };
}

// 渲染之前
export const render: RuntimeConfig['render'] = (oldRender) => {
  if (history.location.pathname.includes('/redirectLogin') && location.search.includes('code')) {
    codeForToken({
      code: location.search.split('=')[1],
      redirectUrl: redirectUrl,
    }).then((data) => {
      setAccessToken(data.data);
      top!.location.href = '/main';
    });
  } else if (!history.location.pathname.includes('/Login') && !getAccessToken()) {
    location.href = '/main/Login';
  } else {
    oldRender();
  }
};

export const layout: RuntimeConfig['layout'] = ({ initialState, setInitialState }) => {
  return {
    title: '@umijs/max',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    logout(initialState) {
      console.log(initialState);
    },
    actionsRender: (props: any) => {
      if (props.isMobile) return [];
      return [
        <InfoCircleOutlined key="InfoCircleOutlined" />,
        <SettingOutlined key="QuestionCircleOutlined" />,
        <LogoutOutlined key="LogoutOutlined" onClick={() => props?.logout(initialState)} />,
      ];
    },
    avatarProps: {
      title: initialState?.name,
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    bgLayoutImgList: [
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menu: {
      locale: false,
      request: async () => {
        const { data: menuData } = await getMenus();
        const menuItem = loopMenuItem(menuData);
        setInitialState({ ...initialState, menuItem: drawMenuItem(menuItem) });
        return menuItem;
      },
    },
  };
};

export async function qiankun(): Promise<RuntimeConfig['qiankun']> {
  if (getAccessToken()) {
    // const apps = await getApps()
    //   .then((data) => data.data)
    //   .catch(() => []);
  }
  return {
    base: '/main',
    singular: false,
    apps: [{ name: 'gongcheng', entry: '//localhost:8010' }],
    routes: [
      {
        layout: '@/layouts/index',
        path: '/gongcheng/*',
        microApp: 'gongcheng',
        microAppProps: {
          autoCaptureError: true,
          autoSetLoading: true,
        },
      },
    ],
  };
}
