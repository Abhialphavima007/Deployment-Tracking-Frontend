function StatsCard({ title, value, color }) {

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition">

      <p className="text-sm text-gray-500 mb-2">
        {title}
      </p>

      <h2 className={`text-2xl font-bold ${color}`}>
        {value}
      </h2>

    </div>

  );

}

export default StatsCard;