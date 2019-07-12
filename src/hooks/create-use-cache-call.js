import { useDrizzleState } from '.'

export default drizzle => (contractName, methodName, ...args) => {
  const { contractMethodState } = useDrizzleState(
    drizzleState => ({
      contractMethodState: drizzleState.contracts[contractName][methodName]
    }),
    args
  )

  const instance = drizzle.contracts[contractName]
  const cacheKey = instance.methods[methodName].cacheCall(...args)
  const cache = contractMethodState[cacheKey]
  return cache && cache.value
}
