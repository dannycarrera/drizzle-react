import { useDrizzleState } from '.'

export default drizzle => (contractNameOrNames, func, ...args) => {
  const drizzleState = useDrizzleState(drizzleState => {
    return contractNameOrNames.reduce(
      (acc, contractName) => ({
        ...acc,
        [contractName]: drizzleState.contracts[contractName]
      }),
      {}
    )
  }, args)
  return func((contractName, methodName, ...args) => {
    const instance = drizzle.contracts[contractName]
    const cacheKey = instance.methods[methodName].cacheCall(...args)
    const cache = drizzleState[contractName][methodName][cacheKey]
    return cache && cache.value
  })
}
