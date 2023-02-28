export interface DataProps {
  name: string
  trips: number
}

export const formatRowData = (rawData: DataProps[] = []): DataProps[] =>
  rawData.map(info => ({
    name: info.name,
    trips: info.trips
  }))

export const getData = async (page = 1, size = 10): Promise<any> => {
  const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`)
  // `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
  return await response.json()
}
