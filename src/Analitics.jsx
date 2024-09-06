import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [totalData, setTotalData] = useState([]);
  const [redListedData, setRedListedData] = useState([]);
  const [yellowListedData, setYellowListedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all datasets concurrently
    const fetchTotalAnalytics = axios.get('https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Analytics/Total%20Analytics');
    const fetchRedListedAnalytics = axios.get('https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Analytics/RedListed%20Analytics');
    const fetchYellowListedAnalytics = axios.get('https://projectsyntech-dzb2g7dbebe0amde.southindia-01.azurewebsites.net/api/Analytics/UNListed Analytics');
    
    Promise.all([fetchTotalAnalytics, fetchRedListedAnalytics, fetchYellowListedAnalytics])
      .then(([totalResponse, redListedResponse, yellowListedResponse]) => {
        const transformedTotalData = totalResponse.data.map(item => ({
          date: new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          count: item.count
        }));

        const transformedRedListedData = redListedResponse.data.map(item => ({
          date: new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          count: item.count
        }));

        const transformedYellowListedData = yellowListedResponse.data.map(item => ({
          date: new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          count: item.count
        }));

        setTotalData(transformedTotalData);
        setRedListedData(transformedRedListedData);
        setYellowListedData(transformedYellowListedData);
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

  // Calculate total counts
  const totalCount = totalData.reduce((acc, item) => acc + item.count, 0);
  const redListedCount = redListedData.reduce((acc, item) => acc + item.count, 0);
  const yellowListedCount = yellowListedData.reduce((acc, item) => acc + item.count, 0);

  // Calculate percentages
  const totalPercentage = totalCount ? ((totalCount / totalCount) * 100).toFixed(2) : 0;
  const redListedPercentage = totalCount ? ((redListedCount / totalCount) * 100).toFixed(2) : 0;
  const yellowListedPercentage = totalCount ? ((yellowListedCount / totalCount) * 100).toFixed(2) : 0;

  return (
    <Box
      style={{
        width: '90vw',
        height: '90vh',
        padding: '20px',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Typography
        style={{
          marginTop: '20px',
          marginBottom: '20px',
          color: 'white',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
        }}
        variant="h4"
        align="center"
        gutterBottom
      >
        Analytics Data
      </Typography>
      <Grid container spacing={4}>
        {/* Total Analytics Chart */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            Total Applicants
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={totalData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis dataKey="date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <Typography style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>
            Count: {totalCount} <br /> Percentage: {totalPercentage}%
          </Typography>
        </Grid>

        {/* RedListed Analytics Chart */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{
              color: 'red',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            RedListed Analytics
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={redListedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis dataKey="date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <Typography style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
            Count: {redListedCount} <br /> Percentage: {redListedPercentage}%
          </Typography>
        </Grid>

        {/* YellowListed Analytics Chart */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            style={{
              color: 'yellow',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            UnListed Analytics
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={yellowListedData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
              <XAxis dataKey="date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
              <Line type="monotone" dataKey="count" stroke="#f9c74f" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          <Typography style={{ color: 'yellow', textAlign: 'center', marginTop: '10px' }}>
            Count: {yellowListedCount} <br /> Percentage: {yellowListedPercentage}%
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
