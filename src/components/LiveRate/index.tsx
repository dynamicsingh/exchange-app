import React, { FC, memo } from 'react';
import styles from './styles.module.scss';
import { Currency } from '../Currency';
import { Icon as TradeIcon } from 'shared/icons/trade';
import { CurrencyCode } from 'models/pockets';

type Props = {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  conversionRate: number;
};

const LiveRate: FC<Props> = memo(
  ({ fromCurrency, toCurrency, conversionRate }) => {
    return (
      <div className={styles.container}>
        <TradeIcon className={styles.icon} />
        <Currency
          currency={fromCurrency}
          amount={1}
          precision={0}
          qaIdPrefix="from-currency"
        />
        <span>{' = '}</span>
        <Currency
          currency={toCurrency}
          amount={conversionRate}
          precision={4}
          qaIdPrefix="to-currency"
        />
      </div>
    );
  },
);
export { LiveRate };
