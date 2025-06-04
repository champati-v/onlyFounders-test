'use client'

import { ReactNode } from 'react';
import { OCConnect , OCConnectProps} from '@opencampus/ocid-connect-js';

export default function OCConnectWrapper({ children, opts, sandboxMode }: { children: ReactNode; opts: OCConnectProps; sandboxMode: boolean }) {
  return (
    <OCConnect opts={opts} sandboxMode={false}>
      {children}
    </OCConnect>
  );
}