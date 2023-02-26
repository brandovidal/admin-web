export const formatRowData = (rawData: any) =>
  rawData.map((info: any) => ({
    name: info.name,
    trips: info.trips,
  }));

export const getData = async (page = 1, size = 10) => {
  const response = await fetch(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
  );
  // `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`
  return await response.json();
};
