export default async function getServerData() {
    const res = await fetch('https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/public/data/voting-gauges.json')
    const jsonData = await res.json()
    
    const uniqueIds = []
    
    const noDupes = jsonData.filter(e => {
        const isDuplicate = uniqueIds.includes(e.pool.id)

        if (!isDuplicate && Math.max(e.addedTimestamp) && e.isKilled === false ) {
            uniqueIds.push(e.pool.id)
            return true
        }
        return false
    })
    return noDupes
}