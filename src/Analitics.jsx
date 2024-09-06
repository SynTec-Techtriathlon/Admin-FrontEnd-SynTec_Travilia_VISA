import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the API
    axios.get('https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Analytics/Total%20Analytics')
      .then((response) => {
        // Transform the data for the chart
        const transformedData = response.data.map(item => ({
          date: new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), // Format the date
          count: item.count
        }));
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box style={{ width: '90vw', height: '90vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Analytics Data
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Analytics;
