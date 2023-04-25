import {
  AreaChartOutlined,
  BarsOutlined,
  CalendarOutlined,
  ContactsOutlined,
  DollarCircleOutlined,
  HeartOutlined,
  PartitionOutlined,
  ReconciliationOutlined,
  RedEnvelopeOutlined,
  SettingOutlined,
  SmileOutlined,
  ToolOutlined,
  TransactionOutlined,
} from '@ant-design/icons';

const IconMap: Record<string, React.ReactElement> = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  bars: <BarsOutlined />,
  areaChart: <AreaChartOutlined />,
  tool: <ToolOutlined />,
  partition: <PartitionOutlined />,
  reconciliation: <ReconciliationOutlined />,
  contacts: <ContactsOutlined />,
  redEnvelope: <RedEnvelopeOutlined />,
  setting: <SettingOutlined />,
  calendar: <CalendarOutlined />,
  transaction: <TransactionOutlined />,
  dollarCircle: <DollarCircleOutlined />,
};

export default IconMap;
