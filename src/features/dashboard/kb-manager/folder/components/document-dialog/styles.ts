import styled from 'styled-components';

export const FileUploadArea = styled.div<{ $isDragActive: boolean; $disabled?: boolean }>`
  width: 100%;
  height: 200px;
  border: 2px dashed ${props => props.$isDragActive ? 'var(--blue-9)' : 'var(--gray-5)'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  background-color: ${props => props.$isDragActive ? 'var(--gray-2)' : 'var(--gray-1)'};
  opacity: ${props => props.$disabled ? '0.7' : '1'};

  &:hover {
    border-color: ${props => !props.$disabled && 'var(--blue-9)'};
    background-color: ${props => !props.$disabled && 'var(--gray-2)'};
  }
`;

export const FileIcon = styled.div`
  font-size: 2rem;
  color: var(--gray-9);
`;

export const FileText = styled.p`
  color: var(--gray-11);
  text-align: center;
  margin: 0;
  font-size: 0.875rem;
`;

export const FileName = styled.p`
  color: var(--gray-12);
  font-weight: 600;
  margin: 0;
  font-size: 0.875rem;
`;

export const InputGroup = styled.div`
  margin-top: 1.5rem;
  width: 100%;
`; 