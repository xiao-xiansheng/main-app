import Guide from '@/components/Guide';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Guide name="Umi Max" />
    </div>
  );
};

export default HomePage;
