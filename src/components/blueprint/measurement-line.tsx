import { type JSX } from 'react'

import type { FCStrict } from '@/types/fc'

interface MeasurementLineProperties {
  readonly className?: string
  readonly label?: string
  readonly orientation?: 'horizontal' | 'vertical'
  readonly width?: string
}

export const MeasurementLine: FCStrict<MeasurementLineProperties> = ({
  className,
  label,
  orientation = 'horizontal',
  width = '100px',
}: MeasurementLineProperties): JSX.Element => (
  <div
    className={`absolute flex items-center justify-center opacity-60 ${className} ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}
    style={{ [orientation === 'vertical' ? 'height' : 'width']: width }}
  >
    <div
      className={`${orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full'} bg-[#4A90E2]`}
    />
    {label && (
      <span
        className={`absolute bg-[#0B1021] px-1 font-mono text-[9px] tracking-wider text-[#4A90E2] uppercase ${orientation === 'vertical' ? '-rotate-90' : ''}`}
      >
        {label}
      </span>
    )}
    <div
      className={`absolute ${orientation === 'vertical' ? 'top-0 w-2 -translate-x-[0.5px] border-t border-[#4A90E2]' : 'left-0 h-2 -translate-y-[0.5px] border-l border-[#4A90E2]'}`}
    />
    <div
      className={`absolute ${orientation === 'vertical' ? 'bottom-0 w-2 -translate-x-[0.5px] border-b border-[#4A90E2]' : 'right-0 h-2 -translate-y-[0.5px] border-r border-[#4A90E2]'}`}
    />
  </div>
)
