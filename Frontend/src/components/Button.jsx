export default function Button({
    children,
    variant='primary',
    className='',
    isloading=false,
    disabled,
    ...props
}){

    const baseStyles= "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"

    const variants={
         primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-500",

    }

    const isDisabled =isloading||disabled

    return (
        <button className={`${baseStyles} ${variants}  ${isDisabled ? 'opacity-70 cursor-not-allowed' : '' } ${className} `} disabled={isDisabled}
        {...props}
        >
            
      {isloading && (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}

        </button>
    )

}