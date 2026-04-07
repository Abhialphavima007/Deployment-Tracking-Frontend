function StatsCard({ title, value, color }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}>
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
      <p className="text-sm font-semibold text-gray-500 mb-3 tracking-wide uppercase">
        {title}
      </p>
      <h2 className={`text-4xl font-black tracking-tight ${color ? color : 'text-gray-900'} drop-shadow-sm`}>
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;