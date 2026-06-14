const isProd = import.meta.env.PROD;
const API_BASE_URL = isProd ? '/api' : 'http://localhost:8000/api';

export const fetchOverview = async () => {
  const response = await fetch(`${API_BASE_URL}/overview`);
  if (!response.ok) throw new Error('Failed to fetch overview data');
  return response.json();
};

export const fetchAnalytics = async () => {
  const response = await fetch(`${API_BASE_URL}/analytics`);
  if (!response.ok) throw new Error('Failed to fetch analytics data');
  return response.json();
};

export const fetchClustering = async () => {
  const response = await fetch(`${API_BASE_URL}/clustering`);
  if (!response.ok) throw new Error('Failed to fetch clustering data');
  return response.json();
};

export const predictEnergy = async (params) => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) throw new Error('Failed to predict energy');
  return response.json();
};

export const getRecommendations = async (constraints) => {
  const response = await fetch(`${API_BASE_URL}/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(constraints),
  });
  if (!response.ok) throw new Error('Failed to get recommendations');
  return response.json();
};
