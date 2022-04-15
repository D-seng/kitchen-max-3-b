import externalSetup from '../composables/externalSetup'

export default (to, from, next) => {
    const { validateByToken } = externalSetup()
    const prom = validateByToken()
    prom.then((response) => {
        next((comp) => comp.setData(response))
    }).catch(() => {
        next({ name: 'Login' })
    })
}
