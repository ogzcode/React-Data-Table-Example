import './App.css'
import { useCallback, useEffect, useState } from 'react'
import { DataTable } from './data-table/DataTable'

import { columns, districtsColumns } from "./data-table/columns"

import axios from 'axios'

import { RowAction } from './data-table/RowAction'


function App() {
  const [countryList, setCountryList] = useState([])
  const [total, setTotal] = useState(0)
  const actions = [
    {
      label: "Edit",
      icon: null,
      onSelect: (rowData) => console.log(rowData),
    },
    {
      label: "-"
    },
    {
      label: "Delete",
      icon: null,
      onSelect: (rowData) => console.log(rowData),
    },
  ]

  const loadData = useCallback(({ sorting, columnFilters, pagination }) => {

    axios.get('/api/getAllCountry', {
      params: {
        sorting: JSON.stringify(sorting),
        columnFilters: JSON.stringify(columnFilters),
        pagination: JSON.stringify(pagination),
      },
    }).then(res => {
      setCountryList(res.data.countries)
      setTotal(res.data.total)
    })
  }, [])

  useEffect(() => {
    loadData({
      sorting: [],
      columnFilters: [],
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      }
    })
  }, [loadData])

  const rowExpansionTemplate = ({ row }) => {
    return (
      <div>
        <h1 className='text-xl mb-4'>District</h1>
        <DataTable
          columns={districtsColumns}
          data={row.original.ilceler}
          total={row.original.ilceler.length}
          rowAction={(rowData) => <RowAction rowData={rowData} actions={actions} />}
        />
      </div>
    )
  }

  return (
    <div className='p-16'>
      <DataTable
        columns={columns}
        data={countryList}
        fetchFn={loadData}
        total={total}
        rowExpansionTemplate={rowExpansionTemplate}
        rowAction={(rowData) => <RowAction rowData={rowData} actions={actions} />}
      />
    </div>
  )
}

export default App
