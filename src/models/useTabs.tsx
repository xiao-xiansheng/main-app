import { MenuDataItem } from '@ant-design/pro-components';
import { MicroAppWithMemoHistory, history } from '@umijs/max';
import { Dropdown, MenuProps, Space } from 'antd';
import { cloneDeep, concat, filter, isEmpty, remove } from 'lodash';
import { useCallback, useState } from 'react';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '关闭标签页',
  },
  {
    key: '2',
    label: '关闭其他标签页',
  },
  {
    key: '3',
    label: '关闭右侧标签页',
  },
  {
    key: '4',
    danger: true,
    label: '关闭左侧标签页',
  },
];

const getTabName = (menuItem: MenuDataItem) => (
  <Dropdown menu={{ items }} trigger={['contextMenu']}>
    <Space>
      {menuItem.icon}
      {menuItem.name}
    </Space>
  </Dropdown>
);

export default function Index() {
  const [items, setItems] = useState<any[]>([]);

  const [activeKey, setActiveKey] = useState('');

  const [activeMenuItem, setActiveMenuItem] = useState<Record<string, any>>({});

  const increment = useCallback(
    (menuItem: MenuDataItem[], pathname: string) => {
      // 当前的菜单信息
      const activeMenuItem = filter(menuItem, (el) => el.path === pathname)?.[0];
      // 是否已经存在
      const isExist = !filter(items, (el: any) => el.key === activeMenuItem.key).length;

      console.log(activeMenuItem);

      // 当前选中的key
      setActiveKey(activeMenuItem?.id);
      // 当前选中菜单
      setActiveMenuItem(activeMenuItem);
      // 如果存在就不继续添加了
      if (!isEmpty(activeMenuItem) && isExist) {
        setItems((c) =>
          concat(c, {
            path: activeMenuItem.path,
            key: activeMenuItem.key,
            label: getTabName(activeMenuItem),
            children: (
              <MicroAppWithMemoHistory name={activeMenuItem.appCode} url={pathname.replace('/gongcheng', '')} />
            ),
          }),
        );
      }
    },
    [items],
  );

  // 删除tabs
  const decrement = useCallback(
    (targetKey: string) => {
      // 少于一个  不让删除
      if (items.length <= 1) return;
      // 删除的tabs不存在的话
      if (filter(items, (e) => e.key === targetKey).length === 0) return;

      const newItems = remove(cloneDeep(items), (d) => d.key !== targetKey);

      setItems(newItems);

      // 删除的key 等于  当前选择的key 说明删除的就是自身 如果删除自身的话 重新选择第一个tab打开
      if (targetKey === activeKey) {
        console.log(newItems);

        setActiveKey(newItems[0].key);
        setActiveMenuItem(newItems[0]);
        console.log(newItems[0].path);

        history.push(newItems[0].path);
      }
    },
    [items],
  );

  return { items, setItems, activeKey, setActiveKey, activeMenuItem, setActiveMenuItem, increment, decrement };
}
