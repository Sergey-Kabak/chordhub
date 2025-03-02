'use client'

import CSVReader from 'react-csv-reader'

export const ImportComponent = () => {

  const handleFile = async (data: unknown[]) => {
    // console.log(data)

  }

  return (
    <div>
      <CSVReader onFileLoaded={handleFile} />
    </div>
  )
}