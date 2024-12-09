'use client'

import CSVReader from 'react-csv-reader'

export const ImportComponent = () => {

  const t = async () => {

  }
  const handleFile = async (data: unknown[]) => {

    await fetch('/api/import', {
      method: 'POST',
      body: JSON.stringify({ data })
    })


    // for (const row of data) {
    //   const performerName = row[0].split('-')?.[0]?.trim() || '';
    //   const songName = row[0].split('-')?.[1]?.trim() || '';
    //
    //   const promise = await fetch('/api/performers', {
    //     method: 'POST',
    //     body: JSON.stringify({ name: performerName })
    //   })
    //
    //   const result = await promise.json()
    //
    //   fetch('/api/songs', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       album: '',
    //       name: songName,
    //       tonalities: [
    //         row[1]
    //       ],
    //       performer: `performer/${result.data.id}`
    //     }),
    //   })
    // }
  }

  return (
    <div>
      <button onClick={t}>ttt</button>
      <CSVReader onFileLoaded={handleFile} />
    </div>
  )
}