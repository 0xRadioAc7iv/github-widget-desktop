import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [weeks, setWeeks] = useState<any[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    window.api
      .fetchContributions()
      .then((response) => {
        if (response.success) setWeeks(response.data)
        else setError(response.error)
      })
      .catch((error) => setError(error))
  }, [])

  return (
    <div>
      {error ? (
        <div>Error fetching contributions</div>
      ) : (
        <div className="bg-[#0f0f0f] grid grid-flow-col auto-cols-max gap-1 p-3">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.contributionDays.map((day: any, dayIndex: number) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="w-3 h-3 rounded"
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  style={{ backgroundColor: day.contributionCount > 0 ? day.color : '#292828' }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
