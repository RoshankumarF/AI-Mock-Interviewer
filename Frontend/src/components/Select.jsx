export default function Select({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    error,
    disabled = false,
}) {
    const baseStyles =
        "w-full h-11 px-3 rounded-lg border bg-gray-900 text-gray-100 text-sm outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"

    const borderStyles = error
        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-2 text-sm font-medium text-gray-200"
                >
                    {label}
                </label>
            )}

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`${baseStyles} ${borderStyles}`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-1.5 text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    )
}