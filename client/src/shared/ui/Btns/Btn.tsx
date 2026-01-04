import { forwardRef } from 'react';
import type { ComponentProps } from 'react';
import { Link } from 'react-router';
import type { LinkProps as RouterLinkProps } from 'react-router';
import cn from 'classnames';
import s from './Btn.module.scss';

type BtnVariant = 'primary' | 'secondary' | 'default';
type BtnSize = 'small' | 'medium' | 'large';

interface BaseButtonProps {
  className?: string;
  isReset?: boolean;
  variant?: BtnVariant;
  size?: BtnSize;
}

interface ButtonProps
  extends BaseButtonProps,
    Omit<ComponentProps<'button'>, keyof BaseButtonProps> {
  href?: never;
}

interface LinkProps
  extends BaseButtonProps,
    Omit<RouterLinkProps, keyof BaseButtonProps | 'to'> {
  href?: string;
}

type BtnProps = ButtonProps | LinkProps;

export const Btn = forwardRef<HTMLButtonElement | HTMLAnchorElement, BtnProps>(
  (
    {
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

    if (props.href) {
      return (
        <Link
          {...props}
          to={props.href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={complexClassName}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        {...(props as ButtonProps)}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={complexClassName}
      >
        {children}
      </button>
    );
  },
);

Btn.displayName = 'Btn';
