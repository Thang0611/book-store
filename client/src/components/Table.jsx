import { AgGridReact } from 'ag-grid-react'
import React from 'react'

const Table = ({ rowData, columnDefs, defaultColDef }) => {
  return (
    <div className="">
      <div
        className="ag-theme-alpine container-table"
        style={{ height: '80vh' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          cacheBlockSize={20}
          animateRows={true}
        />
      </div>
    </div>
  )
}

export default Table
