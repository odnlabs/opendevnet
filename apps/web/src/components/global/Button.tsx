'use client';

import React from 'react';

import { ButtonProps, Button as UIButton } from '@odnlabs/ui';

export const Button: React.FC<ButtonProps> = (props) => <UIButton {...props} />;
