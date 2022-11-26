export default async function getServerData() {
    const res = await fetch('https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json')
    const jsonData = await res.json()
    return jsonData
}