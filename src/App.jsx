import axios from 'axios'
import './App.css'
import { useState, useEffect, useMemo } from 'react'
import { useGlobalFilter, useTable, useSortBy, usePagination } from 'react-table'
import { COLUMNS } from './data/columns.js'

import { read, utils, writeFile } from 'xlsx'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:5173/users');
        setData(response.data.user);
      }
      catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [])


  const columns = useMemo(() => COLUMNS, [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, state, setGlobalFilter, prepareRow, page, nextPage, previousPage } = useTable({
    columns,
    data
  }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter } = state;

  const handleExport = () => {
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.sheet_add_aoa(ws, [COLUMNS.map((column) => column.Header)]);
    utils.sheet_add_json(ws, data, { skipHeader: true, origin: 'A2' });
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, 'export.csv');
  }

  return (
    <div className='min-h-screen overflow-hidden flex justify-center items-center'>
      <div className='p-8 rounded-md shadow border border-slate-50 w-3/4'>
        <div className="flex p-2 mb-4 rounded border border-slate-200 justify-between items-center">
          <div>
            <button className='bg-teal-500 px-6 py-1 text-white rounded-sm'>Add New</button>
            <button className="bg-sky-500 px-6 py-1 text-white rounded-sm ml-4" onClick={() => handleExport()}>Export</button>
          </div>
          <div>
            <input
              type="text"
              value={globalFilter || ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder='Search...'
              className='border border-slate-200 rounded-sm px-2 py-1 outline-0'
            />
          </div>
        </div>
        <table {...getTableProps()} className='table-auto w-full'>
          <thead className='bg-gray-100/50'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} className='py-2 px-4 text-slate-700'>
                    {column.render('Header')}
                    <span className='pl-2'>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : '🔼'
                        : ""
                      }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className='px-4 border-b'>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className='py-3 px-4 text-slate-500 text-sm'>
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            }
          </tbody>
          <tfoot>
            <tr className='text-center'>
              <td colSpan={columns.length} className='px-4 pt-4 text-slate-500 text-sm'>
                <button onClick={() => previousPage()} className='px-2 py-1 rounded-sm border border-slate-200 mr-2 w-1/6 text-slate-800'>Previous</button>
                <button onClick={() => nextPage()} className='px-2 py-1 rounded-sm border border-slate-200 w-1/6 text-slate-800'>Next</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default App
