import { forwardRef } from 'react'

const CustomInput = forwardRef((props: any, ref) => {
  return (
    <input
        ref={ref}
        {...props}
    />
  )
});

export default CustomInput