const Table = ({ columns, data }) => {
  return (
    <table className="block overflow-x-scroll scrollbar w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6 p-0 first:mt-0">
      {Array.isArray(columns) && (
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr className="border-b border-gray-300">
            {columns.map(({ title, id }) => {
              return (
                <th key={id} scope="col" className="whitespace-nowrap	px-6 py-4 font-bold first:pl-0 last pr-0">
                  { title || ' ' }
                </th>
              )
            })}
          </tr>
        </thead>
      )}
      {Array.isArray(data) && (
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index} className="border-b last:border-none border-gray-200  dark:border-gray-800">
                { columns.map(({ id }, index) => {
                  let Child = row[id] || ' ';

                  if ( typeof Child === 'function' ) {
                    Child = <Child />
                  }

                  if ( index === 0  ) {
                    return (
                      <th key={`${index}-${id}`} scope="row" className="px-6 py-3 font-normal text-gray-900 whitespace-nowrap dark:text-white first:pl-0">
                        { Child }
                      </th>
                    )
                  }
                  return (
                    <td key={`${index}-${id}`} className="px-6 py-3 last:pr-0">
                      { Child }
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      )}
    </table>
  )
}

export default Table;