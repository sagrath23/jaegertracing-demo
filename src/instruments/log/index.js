export const logClassMethod = () => {
  return (target, name, descriptor) => {
    const originalFunction = descriptor.value
    if (typeof originalFunction === 'function') {
      descriptor.value = (...args) => {
        console.log(`arguments of ${name}: ${args}`)
        try {
          const result = originalFunction.apply(this, args)
          console.log(`result of ${name}: ${result}`)
          return result
        } catch (error) {
          console.error(`Error: ${error}`)
          throw error
        }
      }
    }
  }
}

export const log = (functionToLog) => {
  return (...args) => {
    console.log(`Arguments: ${args}`)
    const result = functionToLog.apply(this, args)
    console.log(`result: ${result}`)
    return result
  }
}