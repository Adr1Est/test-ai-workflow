const askAi = async (prompt) => {
  const response = await fetch('http://localhost:3001/aiprompt', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "payload": prompt })
  });
  const data = await response.json();
  return data
}

export { askAi }