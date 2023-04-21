import { PageContainer } from '@ant-design/pro-components';
import { Outlet, useOutlet } from '@umijs/max';
import { FC } from 'react';

const Layout: FC = () => {
  const outlet = useOutlet();
  console.log(outlet);

  return (
    <PageContainer
      title={false}
      tabList={[
        {
          tab: '基本信息',
          key: 'base',
        },
        {
          tab: '详细信息',
          key: 'info',
        },
      ]}
    >
      <Outlet />
    </PageContainer>
  );
};

export default Layout;
