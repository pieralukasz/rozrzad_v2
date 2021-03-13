import React from 'react';
import styled from 'styled-components';

const BaseHeader: React.FC = ({ children }) => {
  return <BaseHeaderView>{children}</BaseHeaderView>;
};

const BaseHeaderView = styled.header`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  padding-top: 1rem;
  font-size: 1.25rem;
`;

export default BaseHeader;
