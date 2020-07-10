import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.appContainer} data-testid="layout-container">
      {children}
    </div>
  );
};
export { Layout };
