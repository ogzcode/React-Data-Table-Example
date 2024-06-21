import './App.css'
import { useEffect, useState } from 'react'
import { DataTable } from './data-table/DataTable'

import { columns } from "./data-table/columns"

import axios from 'axios'


function App() {
  const [countryList, setCountryList] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    loadData({
      sorting: [],
      columnFilters: [],
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      }
    })
  }, [])

  const loadData = async ({ sorting, columnFilters, pagination }) => {

    const res = await axios.get('/api/getAllCountry', {
      params: {
        sorting: JSON.stringify(sorting),
        columnFilters: JSON.stringify(columnFilters),
        pagination: JSON.stringify(pagination),
      },
    })

    console.log(res.data.countries, res.data.total)

    setCountryList(res.data.countries)
    setTotal(res.data.total)
  }

  return (
    <div className='p-16'>
      <DataTable columns={columns} data={countryList} fetchFn={loadData} total={total} />
    </div>
  )
}

export default App
