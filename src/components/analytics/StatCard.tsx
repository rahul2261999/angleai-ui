'use client';

import React from 'react';
import styled from 'styled-components';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color-dark-primary);
  margin: 8px 0;
`;

const Trend = styled.div<{ positive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: ${props => props.positive ? 'var(--blue-11)' : 'var(--red-11)'};

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Label = styled.div`
  font-size: 0.875rem;
  color: var(--text-color-light-primary);
  margin-top: 4px;
`;

interface StatCardProps {
  value: string | number;
  trend: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  trend,
  label,
  prefix = '',
  suffix = ''
}) => {
  const isPositive = trend >= 0;
  const trendValue = Math.abs(trend);

  return (
    <StatContainer>
      <Value>
        {prefix}{value}{suffix}
      </Value>
      <Trend positive={isPositive}>
        {isPositive ? <TrendingUp /> : <TrendingDown />}
        {trendValue}% {isPositive ? 'increase' : 'decrease'}
      </Trend>
      <Label>{label}</Label>
    </StatContainer>
  );
};

export default StatCard; 