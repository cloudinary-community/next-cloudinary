const Table = ({ columns, data }) => {
  return (
    <table className="overflow-x-scroll scrollbar w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6 p-0 first:mt-0">
      {Array.isArray(columns) && columns.length > 0 && (
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr className="border-b border-gray-300">
            {columns.map(({ title, id }) => {
              return (
                <th
                  key={id ?? title}
                  scope="col"
                  className="whitespace-nowrap px-6 py-4 font-bold first:pl-0 last:pr-0"
                >
                  {title ?? " "}
                </th>
              );
            })}
          </tr>
        </thead>
      )}
      {Array.isArray(data) && Array.isArray(columns) && (
        <tbody>
          {data.map((row, rowIndex) => {
            const rowKey = row?.id ?? rowIndex;
            return (
              <tr
                key={rowKey}
                className="border-b last:border-none border-gray-200 dark:border-gray-800"
              >
                {columns.map(({ id }, colIndex) => {
                  // preserve 0 and '' by only replacing null/undefined
                  let Child = row?.[id];
                  if (Child === null || Child === undefined) {
                    Child = " ";
                  } else if (typeof Child === "function") {
                    // If row[id] is a function that returns JSX, call it as a component
                    Child = <Child />;
                  }

                  if (colIndex === 0) {
                    return (
                      <th
                        key={`${rowKey}-${id}`}
                        scope="row"
                        className="px-6 py-3 font-normal text-gray-900 whitespace-nowrap dark:text-white first:pl-0"
                      >
                        {Child}
                      </th>
                    );
                  }

                  return (
                    <td key={`${rowKey}-${id}`} className="px-6 py-3 last:pr-0">
                      {Child}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
};

export default Table;
