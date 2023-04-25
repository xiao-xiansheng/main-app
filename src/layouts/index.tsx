import { PageLoading } from '@ant-design/pro-components';
import { useLocation, useModel } from '@umijs/max';
import { Tabs } from 'antd';
import { FC, useEffect } from 'react';

const Layout: FC = () => {
  const location = useLocation();

  const { initialState } = useModel('@@initialState');

  const { items, activeKey, setActiveKey, increment, decrement } = useModel('useTabs');

  useEffect(() => {
    if (initialState?.menuItem?.length) {
      increment(initialState?.menuItem, location.pathname);
    }
  }, [location.pathname, initialState?.menuItem]);

  const onEdit = (targetKey: string, action: string) => {
    if (action === 'remove') decrement(targetKey);
  };

  if (!initialState?.menuItem?.length) {
    return <PageLoading />;
  }

  return (
    <Tabs
      hideAdd
      items={items}
      onChange={(key) => {
        setActiveKey(key);
      }}
      activeKey={activeKey}
      onEdit={onEdit}
      type="editable-card"
    />
  );
};

export default Layout;
