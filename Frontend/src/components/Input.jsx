
import {useId} from 'react'

export default function Input({


    label,
    type="text",
    placeholder,
    className='',
    ...props

}){
    const id =useId()

    return (
        <div className={`flex flex-col gap-1 ${className}`}  >

            {label && (
                <label htmlFor={id} className='text-sm  front-medium text-gray- '>
                    {label}

                </label>
            )}
             <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full h-11 px-3 rounded-lg border border-gray-700 bg-gray-900 text-gray-100 text-sm outline-none transition-colors duration-200 placeholder:text-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
            </div>
    )


}