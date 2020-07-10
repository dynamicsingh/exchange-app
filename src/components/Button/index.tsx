import React, { FC, ReactNode, MouseEvent } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  qaIdPrefix?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
};

const Button: FC<Props> = ({
  children,
  qaIdPrefix = 'ele',
  className,
  onClick,
  disabled = false,
  type = 'submit',
}) => {
  return (
    <button
      data-testid={`${qaIdPrefix}-btn`}
      className={cn(styles.button, className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export { Button };
