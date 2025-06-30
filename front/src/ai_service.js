const askAi = async (prompt) => {
  const response = await fetch('https://fr00zmm4-3001.uks1.devtunnels.ms/aiprompt', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "payload": prompt })
  });
  const data = await response.json();
  return data;
}

export { askAi }