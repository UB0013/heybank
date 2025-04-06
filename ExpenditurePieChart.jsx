import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts'
  import { useState } from 'react'
  
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
  const RADIAN = Math.PI / 180
  
  // Custom % label inside pie
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
  
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  
  export default function ExpenditurePieChart() {
    const [selected, setSelected] = useState(null)
  
    const expenditure_data = {
      total_expenditure: 2000,
      rent: 800,
      food: 500,
      transport: 400,
      miscellaneous: 300
    }
  
    const data = [
      { name: 'Rent', value: expenditure_data.rent },
      { name: 'Food', value: expenditure_data.food },
      { name: 'Transport', value: expenditure_data.transport },
      { name: 'Miscellaneous', value: expenditure_data.miscellaneous }
    ]
  
    const handleSliceClick = (entry, index, e) => {
      e.stopPropagation() // prevent deselection when clicking a slice
      setSelected({ ...entry, index })
    }
  
    return (
      <div
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-4xl mx-auto"
        onClick={() => setSelected(null)} // clicking outside deselects
      >
        <h3 className="text-xl font-bold text-green-800 mb-6 text-center">
          📊 Expenditure Breakdown
        </h3>
  
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Chart */}
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={130}
                labelLine={false}
                label={renderCustomizedLabel}
                dataKey="value"
                onClick={handleSliceClick}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={selected?.index === index ? "#1F2937" : "#fff"}
                    strokeWidth={selected?.index === index ? 4 : 1}
                    cursor="pointer"
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} />
            </PieChart>
          </ResponsiveContainer>
  
          {/* Info Box */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 w-72 shadow text-left transition-all duration-200">
            {selected ? (
              <>
                <p className="text-sm text-gray-600 mb-1">Selected Category:</p>
                <p className="text-lg font-bold text-green-700">{selected.name}</p>
                <p className="text-md text-gray-700">Amount: ${selected.value}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {(selected.value / expenditure_data.total_expenditure * 100).toFixed(1)}% of total expenditure
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-sm text-center">
                Click a sector to view details.
              </p>
            )}
          </div>
        </div>
  
        {/* Legend */}
        <div className="mt-6 flex justify-center">
          <Legend
            iconType="circle"
            layout="horizontal"
            align="center"
            payload={data.map((item, index) => ({
              value: item.name,
              type: "circle",
              color: COLORS[index % COLORS.length]
            }))}
          />
        </div>
      </div>
    )
  }
  