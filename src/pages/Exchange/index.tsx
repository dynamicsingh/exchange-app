import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Layout } from 'components/Layout';
import { Button } from 'components/Button';
import {LiveRate} from "components/LiveRate";

interface Props {
  text?: string;
}

const Exchange: FC<Props> = ({ text }) => {
  return (
    <Layout>
      <div>Hell</div>
      <br/><br/>
      <LiveRate fromCurrency={"EUR"} toCurrency={"GBP"} conversionRate={10.1}/>
      <br/><br/>
      <Button>Exchange</Button>
    </Layout>
  );
};
export { Exchange };
