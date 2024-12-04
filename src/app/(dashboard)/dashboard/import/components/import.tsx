'use client'

import CSVReader from 'react-csv-reader'

export const ImportComponent = () => {

  const handleFile = async (data: unknown[]) => {
    for (const row of data) {
      console.log(row)
    }
  }

  return (
    <div>
      <CSVReader onFileLoaded={handleFile} />
    </div>
  )
}