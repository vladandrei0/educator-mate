async function updateFisaStatus(data = {}) {
   const response = await fetch('/api/updatefise_user', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
   });
   return response.json(); // parses JSON response into native JavaScript objects
}

async function updateTemaStatus(data = {}) {
   const response = await fetch('/api/updateteme_user', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
   });
   return response.json(); // parses JSON response into native JavaScript objects
}

export { updateFisaStatus, updateTemaStatus }