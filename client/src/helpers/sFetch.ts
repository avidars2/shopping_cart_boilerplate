import type { Methods } from "../types"
type Fetch = <Tbody>(
  path: string, 
  method?: Methods, 
  body?: Tbody
) => Promise<{ok: boolean, result?: any}>
const HOST = "http://localhost:5001"


export const sFetch: Fetch = async (path, method, body) => {
  try {
    const res = await fetch(HOST + path, {
      method: method ?? "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body) ?? undefined
    })

    if (res?.ok) {
      console.log(res)
      let jsonResult = await res.json();
      console.log("sFetch log: ", jsonResult)
      return {ok: true, result: jsonResult}
    } else {
      console.log('Bad input');
      return {ok: false}
    }

  } catch (e) {
    return {ok: false, error: e}
  }

}
