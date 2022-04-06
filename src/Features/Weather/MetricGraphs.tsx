import React, { FC, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
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
  metrics: Object;
  setMetrics: any;
};

const MertricSelector: FC<MetricsProps> = (props) => {
  console.log(props);
  return (
    <div>This is the MetricSelector</div>
  );
};

const MetricGraphs: FC = () => {
  const [metrics, setMetrics] = useState<Object>({});
  const { loading, error, data } = useQuery(metricQuery);

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="Metrics not found" />;

  return (
    <MertricSelector metrics={metrics} setMetrics={setMetrics} />
  );
};

export default () => (
  <ApolloProvider client={client}>
    <MetricGraphs />
  </ApolloProvider>
);
