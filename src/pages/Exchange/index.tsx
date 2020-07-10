import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Layout } from 'components/Layout';
import { Button } from '../../components/Button';

interface Props {
  text?: string;
}

const Exchange: FC<Props> = ({ text }) => {
  return (
    <Layout>
      <div>Hell</div>
      <Button>Exchange</Button>
    </Layout>
  );
};
export { Exchange };
