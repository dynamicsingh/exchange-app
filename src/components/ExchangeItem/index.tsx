import React, { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { CURRENCIES, CURRENCY_SYMBOLS, EUR, POCKET } from 'constants/currency';
import { Rfdd, RfddOption } from 'react-free-dropdown';
import styles from './styles.module.scss';
import { Currency } from '../Currency';
import { CurrencyCode, Pocket } from 'models/pockets';

type Props = {
  currency?: CurrencyCode;
  amount?: number;
  type?: string;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onAmountChange: (amount: number) => void;
  pocket: Pocket;
  qaIdPrefix?: string;
};

//dev note: this is just for this app specific use case, there is a limit for the max amount in some apps
const MAX_AMOUNT_ALLOWED: number = Number('9'.repeat(9) + '.99');

const ExchangeItem: FC<Props> = ({
  currency = EUR,
  amount = 0,
  pocket,
  type = POCKET.SOURCE,
  onCurrencyChange,
  onAmountChange,
  qaIdPrefix = type === POCKET.SOURCE
    ? 'source-exchange-item'
    : 'destination-exchange-item',
}) => {
  const [curr, setCurr] = useState<CurrencyCode>(currency);
  const [inputAmount, setInputAmount] = useState<number>(amount);
  const [exceedsBalance, setExceedsBalance] = useState<boolean>(false);

  useEffect(() => {
    setInputAmount(amount);
    if (amount > pocket[currency]) {
      setExceedsBalance(true);
    } else if (exceedsBalance) {
      setExceedsBalance(false);
    }
  }, [amount, exceedsBalance, setExceedsBalance, currency, pocket]);

  useEffect(() => {
    setCurr(currency);
  }, [currency]);

  const onSelect = (currencyCode: CurrencyCode) => {
    setCurr(currencyCode);
    onCurrencyChange(currencyCode);
    if (inputAmount > pocket[currencyCode]) {
      setExceedsBalance(true);
    } else {
      setExceedsBalance(false);
    }
  };

  const isValidTwoDecimalPlaceNumber = (amount: number): boolean => {
    const regex = new RegExp(/^\d*\.?\d{0,2}$/);
    return regex.test(amount.toString());
  };

  const handleInputChange = (event: BaseSyntheticEvent) => {
    let value = event?.target?.value as number;

    if (!isValidTwoDecimalPlaceNumber(value) || value > MAX_AMOUNT_ALLOWED)
      return;

    if (value > pocket[curr] && type === POCKET.SOURCE) {
      setExceedsBalance(true);
    } else if (exceedsBalance) {
      setExceedsBalance(false);
    }
    onAmountChange(value);
    setInputAmount(value);
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.destination]: type === POCKET.DESTINATION,
      })}
      data-testid={`${qaIdPrefix}-container`}
    >
      <div className={styles.row} data-testid={`${qaIdPrefix}-select`}>
        <Rfdd
          onChange={(optionValue) => onSelect(optionValue as CurrencyCode)}
          className={styles.selectWrapper}
          selectClassName={cn(styles.select, {
            [styles.grey]: type === POCKET.DESTINATION,
          })}
          optionClassName={cn(styles.selectOption)}
          value={curr}
        >
          {CURRENCIES.map((currency) => (
            <RfddOption value={currency} key={currency}>
              {currency}
            </RfddOption>
          ))}
        </Rfdd>
        <div
          className={cn({
            [styles.minus]: type === POCKET.SOURCE && inputAmount,
            [styles.plus]: type === POCKET.DESTINATION && inputAmount,
            [styles.exceeds]: exceedsBalance && type === POCKET.SOURCE,
            [styles.smallSize]: inputAmount.toString().length > 6,
          })}
        >
          <input
            name={type}
            className={cn({
              [styles.exceeds]: exceedsBalance && type === POCKET.SOURCE,
              [styles.bigNumber]: inputAmount.toString().length > 6,
            })}
            placeholder={`${CURRENCY_SYMBOLS[curr]} 0`}
            onChange={handleInputChange}
            value={inputAmount === 0 ? '' : inputAmount}
            autoComplete="off"
            autoFocus={type === POCKET.SOURCE}
            data-testid={`${qaIdPrefix}-input`}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div
          className={styles.pocketBalance}
          data-testid={`${qaIdPrefix}-balance`}
        >
          Balance:{' '}
          <Currency
            amount={pocket[curr]}
            currency={currency}
            qaIdPrefix={qaIdPrefix}
          />
        </div>
        {exceedsBalance && type === POCKET.SOURCE && (
          <div
            className={styles.pocketBalance}
            data-testid={`${qaIdPrefix}-exceeds`}
          >
            exceeds balance
          </div>
        )}
      </div>
    </div>
  );
};
export { ExchangeItem };
