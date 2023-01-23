export default async function getServerData() {
    const res = await fetch('https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/src/data/voting-gauges.json')
    const jsonData = await res.json()
    
    const uniqueIds = []
    
    const networkName = jsonData.map(e => {
        
        const symbols = e.pool.tokens.map (f => {
            return f.symbol
        })
        e.pool.tokens = symbols

        if (e.network === 1){
            e.network = "Mainnet"
        }
        else if (e.network === 137){
            e.network = "Polygon"
        }
        else if (e.network === 42161){
            e.network = "Arbitrum"
        }
        else if (e.network === 10){
            e.network = "Optimism"
        }
        else if (e.network === 5){
            e.network = "Goerli"
        }
        return e
    })

    const noDupes = networkName.filter(e => {
        const isDuplicate = uniqueIds.includes(e.pool.id)

        if (!isDuplicate && Math.max(e.addedTimestamp) && e.isKilled === false ) {
            uniqueIds.push(e.pool.id)
            return true
        }
        return false
    })
    return noDupes
}