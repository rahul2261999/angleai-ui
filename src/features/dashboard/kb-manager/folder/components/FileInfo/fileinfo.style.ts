import styled from 'styled-components';

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-12);
  margin: 0 0 8px 0;
`;

export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  margin-bottom: 16px;
  background: var(--gray-2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gray-11);
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

export const InfoItem = styled.div`
  padding: 12px;
  background: var(--gray-2);
  border-radius: 8px;
`;

export const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: var(--gray-8);
  margin-bottom: 4px;
`;

export const InfoValue = styled.div`
  font-size: 0.875rem;
  color: var(--gray-12);
  font-weight: 500;
`;