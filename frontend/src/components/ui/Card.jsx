export default function Card({
  children,
  className = ""
}) {

  return (

    <div className={`
      bg-white
      dark:bg-gray-800
      rounded-2xl
      shadow-sm
      border
      p-6
      ${className}
    `}>

      {children}

    </div>
  );
}