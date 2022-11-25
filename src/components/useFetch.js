import { useEffect, useState } from "react";

export default function useFetch() {

    const [jsonData, setJsonData] = useState()
    
    useEffect(() => {
        const baseURL = 'https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json'
        
        async function fetchData() {
        const response = await fetch(baseURL)
        const json = await response.json()
        setJsonData(json)
        }
            fetchData()

    }, [])
    return jsonData
}