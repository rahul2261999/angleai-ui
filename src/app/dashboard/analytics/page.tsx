'use client';

import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/analytics/StatCard';

const AnalyticsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
`;

const Card = styled.div`
  background: var(--bg-color-primary);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow-sm-primary);
  border: 1px solid var(--border-color-subtle-primary);
`;

const WideCard = styled(Card)`
  grid-column: span 12;
`;

const MediumCard = styled(Card)`
  grid-column: span 6;
`;

const SmallCard = styled(Card)`
  grid-column: span 4;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color-dark-primary);
  margin: 0 0 16px 0;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color-dark-primary);
  margin: 0 0 24px 0;
`;

const AnalyticsPage = () => {
  return (
    <Layout>
      <PageTitle>Analytics Dashboard</PageTitle>
      <AnalyticsContainer>
        {/* Summary Cards */}
        <SmallCard>
          <StatCard
            value={2847}
            trend={12.5}
            label="Total users this month"
          />
        </SmallCard>
        <SmallCard>
          <StatCard
            value={156}
            trend={-8.3}
            label="Active sessions"
          />
        </SmallCard>
        <SmallCard>
          <StatCard
            value={245}
            trend={15.8}
            label="Average response time"
            suffix="ms"
          />
        </SmallCard>

        {/* Charts */}
        <WideCard>
          <CardTitle>Usage Analytics</CardTitle>
          {/* Add main analytics chart component */}
        </WideCard>

        {/* Split Section */}
        <MediumCard>
          <CardTitle>User Distribution</CardTitle>
          {/* Add user distribution chart component */}
        </MediumCard>
        <MediumCard>
          <CardTitle>Performance Metrics</CardTitle>
          {/* Add performance metrics component */}
        </MediumCard>

        {/* Detailed Stats */}
        <WideCard>
          <CardTitle>Recent Activity</CardTitle>
          {/* Add activity table component */}
        </WideCard>
      </AnalyticsContainer>
    </Layout>
  );
};

export default AnalyticsPage; 