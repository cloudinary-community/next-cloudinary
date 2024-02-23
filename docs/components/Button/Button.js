import Link from 'next/link';

import { cn } from '../../lib/utils';

const Button = ({ children, className = '', href, onClick }) => {
  let buttonColor = 'text-white bg-primary hover:bg-blue-600';
  
  const buttonStyles = cn('inline-block rounded py-2.5 px-6 text-lg font-bold uppercase', buttonColor, className);

  if ( href ) {
    return (
      <Link href={href} onClick={onClick} className={buttonStyles}>
        { children }
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={buttonStyles}>
      { children }
    </button>
  )
}

export default Button;