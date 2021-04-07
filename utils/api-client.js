
async function client(endpoint, customConfig = {}) {
   const config = {
      method: 'GET',
      ...customConfig
   }
   const response = await fetch(`${endpoint}`, config)
   const data = await response.json()
   if (response.ok) {
      return data
   } else {
      return Promise.reject(data)
   }
}

export { client }

