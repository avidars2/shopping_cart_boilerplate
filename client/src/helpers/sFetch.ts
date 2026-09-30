type Fetch = <Tbody>(
  path: string, 
  method?: ("GET" | "POST" | "PUT" | "DELETE"), 
  body?: Tbody
) => Promise<{ok: boolean, result?: any}>
const HOST = "http://localhost:5001"

export const sFetch: Fetch = async (path, method, body) => {
  const res = await fetch(HOST + path, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body) ?? undefined
  })

  if (res?.ok) {
    let jsonResult = await res.json();
    console.log("sFetch log: ", jsonResult)
    return {ok: true, result: jsonResult}
  } else {
    console.log('Bad input');
    return {ok: false}
  }

}
