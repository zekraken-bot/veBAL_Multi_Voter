import { useEffect, useState } from "react";

export default function FetchGauges() {

    const [jsonData, setJsonData] = useState();
    useEffect(() => {
        const baseURI = 'https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json'
        
        const fetchData = async () => {
        const response = await fetch(baseURI);
        const json = response.json();
        setJsonData(json);
        };
            fetchData();

    }, []);
    return jsonData;
}