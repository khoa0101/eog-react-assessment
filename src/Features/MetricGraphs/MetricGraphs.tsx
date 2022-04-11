import React, {
  FC,
} from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Chip from '../../components/Chip';
// import {
//   dateCalc,
//   dateConvert,
//   thirtySecondsBeforeNow,
// } from '../../util/dateUtil';

const graphsQuery = gql`
  query getMultipleMeasurements($measurements: [MeasurementQuery]){
    getMultipleMeasurements(input: $measurements){
      metric
      measurements{
        at
        value
        unit
      }
    }
  }
`;

type GraphsProps = {
  currentMetrics: string[];
  after: number;
};

const MetricGraphs: FC<GraphsProps> = React.memo((props) => {
  const { currentMetrics, after } = props;

  const measurementQuery = currentMetrics.map((metric) => ({
    metricName: metric,
    after,
  }));

  const { loading, error, data } = useQuery(graphsQuery, {
    variables: {
      measurements: measurementQuery,
    },
    pollInterval: 1000,
  });

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return <Chip label="No data found" />;

  console.log(data);

  return (
    <div>MetricGraphs</div>
  );
});

export default MetricGraphs;
