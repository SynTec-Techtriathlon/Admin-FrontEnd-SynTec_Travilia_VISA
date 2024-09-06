import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgress, Box } from '@mui/material';
import axios from 'axios';

function Analitics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Analytics/Total Analytics')
      .then(response => {
        const formattedData = response.data.map(item => ({
          date: new Date(item.date).toLocaleString(),  // Formatting the date
          count: item.count,
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching analytics data", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Analitics;
