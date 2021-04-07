
export async function createSearchEntry(data = {}) {
   const response = await fetch('api/writesearch', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   });
   return response.json();
}

export async function createFilterEntry(data = {}) {
   const response = await fetch('api/writefilter', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
   });
   return response.json();
}