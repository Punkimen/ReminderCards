import React, { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { LinkProps as RouterLinkProps } from 'react-router';
import cn from 'classnames';
import s from './Btn.module.scss';

type BtnVariant = 'primary' | 'secondary' | 'default';
type BtnSize = 'small' | 'medium' | 'large';

interface BaseProps {
  className?: string;
  isReset?: boolean;
  variant?: BtnVariant;
  size?: BtnSize;
  children?: ReactNode;
}

type ButtonBtnProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

type LinkBtnProps = BaseProps &
  Omit<RouterLinkProps, keyof BaseProps> & {
    as: 'Link';
  };

const BtnComponent = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonBtnProps | LinkBtnProps
>(
  (
    {
      as,
      children,
      className,
      isReset,
      variant = 'default',
      size = 'large',
      ...props
    },
    ref,
  ) => {
    const complexClassName = isReset
      ? cn(className, s.btn, s.reset)
      : cn(className, s.btn, s[variant], s[size]);

    if (as === 'Link') {
      return (
        <Link
          {...(props as RouterLinkProps)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={complexClassName}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={complexClassName}
      >
        {children}
      </button>
    );
  },
);

BtnComponent.displayName = 'Btn';

export { BtnComponent as Btn };
