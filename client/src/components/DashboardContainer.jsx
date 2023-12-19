import React, { useMemo, useState } from 'react'
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'
import Table from './Table'
import { useNavigate } from 'react-router-dom'
import ActionsRender from './ActionsRender'
import { useGetBooks } from '../reactQuery/reactQueryProduct'
import { Button } from 'antd'


const DashboardContainer = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetBooks()

  const [columnDefs, setColumnDefs] = useState([
    { field: 'title', minWidth: 300 },
    { field: 'author' },
    {
      field: 'category',
    },
    {
      field: 'publisher',
    },
    {
      field: 'numOfPage',
    },
    { field: 'price', minWidth: 100 },
    { field: 'quantity' },
    { field: 'action', minWidth: 160, cellRenderer: ActionsRender },
  ])

  const clickAdd = () => {
    navigate('/product', { state: {} })
  }

  const defaultColDef = useMemo(() => {
    return {
      filter: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,

    }
  }, [])
  if (isLoading || isError) {
    return 'loading'
  }
  return (
    <div className="flex justify-center items-center">
      <div className="w-[100%] py-8 px-10">
        <div className=" ">
          <Button className="bg-teal-700 text-white mb-4" onClick={clickAdd}>
            Thêm sách
          </Button>
        </div>
        <Table
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={'multiple'}
        />
      </div>
    </div>
  )
}

export default DashboardContainer
