import React, { FC, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  Typography,
  Select,
  MenuItem,
  Checkbox,
  InputLabel,
  FormControl,
  ListItemText,
} from '@material-ui/core';
import Chip from '../../components/Chip';

const client = new ApolloClient({
  uri: 'https://react-assessment.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

const metricQuery = gql`
  query{
    getMetrics,
  }
`;

type MetricsProps = {
  metrics: string[];
  currentMetrics: string[];
  setCurrentMetrics: any;
};

const MertricSelector: FC<MetricsProps> = (props) => {
  const { metrics, currentMetrics, setCurrentMetrics } = props;

  const handleChange = (e: any) => {
    const {
      target: {
        value,
      },
    } = e;

    setCurrentMetrics(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl className='select-metrics-container'>
      <InputLabel id="select-metrics-label">Select Metrics</InputLabel>
      <Select
        labelId="select-metrics-label"
        className="select-metrics-dropdown"
        multiple
        value={currentMetrics}
        onChange={handleChange}
        renderValue={(selected: any) => selected.join(', ')}
      >
        {metrics.map((name) => (
          <MenuItem key={`${name}`} value={name}>
            <Checkbox checked={metrics.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const MetricGraphs: FC = () => {
  const [currentMetrics, setCurrentMetrics] = useState<string[]>([]);
  const { loading, error, data } = useQuery(metricQuery);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found" />;

  console.log(currentMetrics);
  const metrics = data.getMetrics;

  return (
    <MertricSelector
      metrics={metrics}
      currentMetrics={currentMetrics}
      setCurrentMetrics={setCurrentMetrics}
    />
  );
};

export default () => (
  <ApolloProvider client={client}>
    <MetricGraphs />
  </ApolloProvider>
);
