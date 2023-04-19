import { PageLoading } from '@ant-design/pro-components';
import { OAuth } from '@hbasesoft/web-plugin';
import { useModel } from '@umijs/max';
import styles from './index.less';

export default function Page() {
  const { initialState } = useModel('@@initialState');

  if (!initialState?.frontend.client_id) {
    return <PageLoading />;
  }

  return (
    <OAuth
      className={styles['main-login']}
      clientId={initialState?.frontend.client_id}
      redirectUrl={`${location.origin}/redirectLogin`}
    />
  );
}
