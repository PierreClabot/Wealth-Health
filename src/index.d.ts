// src/index.d.ts
declare module 'modale-wh' {
    import { MouseEventHandler, ReactNode } from 'react';
  
    interface ModaleProps {
      type: 'success' | 'warning' | 'error';
      image?: string;
      title: string;
      message: string;
      onclose: MouseEventHandler<HTMLButtonElement>;
      show: boolean;
    }
  
    const Modale: (props: ModaleProps) => ReactNode;
  
    export default Modale;
  }
  