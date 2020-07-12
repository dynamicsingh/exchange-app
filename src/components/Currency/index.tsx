import React, { FC, memo } from 'react';
import { getCurrencySymbol } from 'shared/utils/currency';
import { CurrencyCode } from 'models/pockets';

type Props = {
  currency: CurrencyCode;
  amount: number;
  precision?: number;
  qaIdPrefix?: string;
};

const DEFAULT_PRECISION: number = 2;

const Currency: FC<Props> = memo(
  ({
    currency,
    amount,
    precision = DEFAULT_PRECISION,
    qaIdPrefix = 'currency',
  }) => {
    if (isNaN(amount)) return null;
    const currencySymbol = getCurrencySymbol(currency);
    const preciseAmount = amount.toFixed(precision);
    return (
      <span data-testid={`${qaIdPrefix}-amount`}>
        {preciseAmount} {currencySymbol}
      </span>
    );
  },
);

export { Currency };
