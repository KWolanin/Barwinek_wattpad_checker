function Tag({ name }) {
  const tailwindColors = [
    "bg-purple-500",
    "bg-emerald-500",
    "bg-sky-500",
    // "bg-rose-500",
    "bg-own-salmon",
    "bg-own-orange",
    "bg-own-pink",
    "bg-own-violet",
  ]

  const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const colorClass = tailwindColors[hash % tailwindColors.length]

  return (
    <span
      className={`px-2 py-1 rounded-full shadow text-white text-sm font-semibold ${colorClass}`}
    >
      {name}
    </span>
  )
}

export default Tag;