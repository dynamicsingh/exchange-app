import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Layout } from 'components/Layout';

interface Props {
  text?: string;
}

const Exchange: FC<Props> = ({ text }) => {
  return <Layout>Hello</Layout>;
};
export { Exchange };
