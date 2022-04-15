import { ref, computed, onServerPrefetch } from 'vue'
import updateAppointment from '../graphql/updateAppointment.mutation.gql'
import getAppointments from '../graphql/getAppointments.query.gql'
import getAllAppointments from '../graphql/getAllAppointments.query.gql'
import createAppointments from '../graphql/createAppointments.mutation.gql'
import createAppointment from '../graphql/createAppointment.mutation.gql'
import { logErrorMessages } from '@vue/apollo-util'
import { useMutation, useQuery, useResult } from '@vue/apollo-composable'
import useMealSelection from './meal.js'
import gql from 'graphql-tag'

const state = ref({
    calDays: [],
    appts: {},
    mo: '',
    yr: '',
    moText: '',
    cardDayKey: 0,
    datesArr: [],
    calendarKey: 0
})
let datesArr = []

const mealSelection = useMealSelection()

const GET_ALL_APPTS = gql`
    query getAllAppointments {
        appointments {
            _id
            kitchen
            user
            date
            meal
            details
        }
    }
`

export const useCalendar = function () {
    // Remove this from global scope; get days, mos, yrs locally.
    const rerender = 0

    // const d2 = d.toString().length < 2 ? '0' + d : d.toString()
    // const day = ref(d2)

    let firstDayOfMo = ''
    let firstDayOfMoDayNo = ''
    let lastDayOfMo = ''
    let lastDayOfPrevMo = ''

    // let lastDayOfMo = ''

    // const lastDayOfMoDayNo = lastDayOfMo.getDay()

    // Need calDays setter and getter
    const calDays = []
    // debugger

    // SETTERS AND GETTERS
    const calDaysSetter = (calDays) => {
        state.value.calDays = calDays
    }
    const apptsSetter = (appts) => {
        // debugger
        state.value.appts = appts
    }
    const calendarKeySetter = () => {
        state.value.calendarKey = state.value.calendarKey + 1
    }
    const cardDayKeySetter = () => {
        state.value.cardDayKey = state.value.cardDayKey + 1
    }
    const datesArrSetter = (datesArr) => {
        state.value.datesArr = datesArr
    }

    const forceRerenderSetter = () => {
        state.value.forceRerender += 1
    }

    const calDaysGetter = computed(() => {
        return state.value.calDays
    })

    const apptsGetter = computed(() => {
        return state.value.appts
    })

    const cardDayKeyGetter = computed(() => {
        return state.value.cardDayKey
    })

    const calendarKeyGetter = computed(() => {
        return state.value.calendarKey
    })

    const moTextGetter = computed(() => {
        return setMoText(state.value.mo)
    })
    const moGetter = computed(() => {
        return state.value.mo
    })
    const yrGetter = computed(() => {
        return state.value.yr
    })
    const datesArrGetter = computed(() => {
        return state.value.datesArr
    })

    const forceRerenderGetter = computed(() => {
        return state.value.forcererender
    })
    //* ************
    // watchEffect(() => alert(appts.value))

    const setInitialMo = () => {
        const today = new Date()
        const m = today.getMonth() + 1
        const m2 = m.toString().length < 2 ? '0' + m : m.toString()
        // debugger
        state.value.mo = m2
        setMoText(m2)
    }

    const setInitialYr = () => {
        const today = new Date()
        state.value.yr = today.getFullYear()
    }

    const setMoText = (m) => {
        const mosToText = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }
        state.value.moText = mosToText[parseInt(m)]
        return state.value.moText
    }

    const toNext = {
        limitingMo: '12',
        newMo: '01',
        yrIncr: 1,
        moIncr: 1
    }

    const toPrev = {
        limitingMo: '01',
        newMo: '12',
        yrIncr: -1,
        moIncr: -1
    }

    function diffMo(t) {
        // debugger
        // useCalendar()
        let to = {}
        t === 'next' ? (to = toNext) : (to = toPrev)

        if (state.value.mo === to.limitingMo) {
            // debugger
            let yr = parseInt(state.value.yr)
            yr = yr + to.yrIncr
            state.value.yr = yr.toString()
            state.value.mo = to.newMo
        } else {
            // debugger
            const mo = state.value.mo * 1 + to.moIncr
            const konvert =
                mo.toString().length === 1 ? '0' + mo : mo.toString()
            // debugger
            state.value.mo = konvert
            // debugger

            // debugger
        }
        // debugger
        // gA(mm)
    }

    // const today = new Date()
    // const m = today.getMonth() + 1
    // const m2 = m.toString().length < 2 ? '0' + m : m.toString()
    // state.value.yr = today.getFullYear()
    // state.value.mo = m2
    // datesArr = []

    function createQueryDatesArr(m, y) {
        // debugger
        datesArr = []
        // const y = state.value.yr
        // // debugger
        // let m = state.value.mo

        // state.value.mo = m
        // state.value.yr = y

        const mMinusOne = m - 1
        firstDayOfMo = new Date(y, mMinusOne, 1)
        firstDayOfMoDayNo = firstDayOfMo.getDay()
        lastDayOfMo = new Date(y, m, 0).getDate()
        lastDayOfPrevMo = new Date(y, mMinusOne, 0).getDate()
        const daysInMo = new Date(y, m, 0).getDate()

        let d = firstDayOfMo.getDay() + 1

        // debugger
        if (m.toString().length < 2) {
            m = '0' + m
        }
        if (d.toString().length < 2) {
            d = '0' + d
        }
        // alert(y.toString() + m.toString() + d.toString())
        // debugger

        for (let i = 1; i <= daysInMo; i++) {
            let is = i.toString()
            if (is.length < 2) {
                is = '0' + is
            }
            datesArr.push(`${y}-${m}-${is}`)
        }
        return datesArr
    }

    let cdTrue = []
    function setUpCalendarSquares() {
        // debugger
        let s = ''
        const calDays = []
        // debugger
        // if (calDays.value.length === 0) {
        let d = 0
        for (let j = 6; j >= 7 - firstDayOfMoDayNo; j--) {
            s = (lastDayOfPrevMo - d).toString()
            // debugger

            s = s.length < 2 ? '0' + s : s
            calDays.unshift({ day: s, count: false })
            d += 1
        }
        // debugger
        // const subjectMo = dates  Arr
        // debugger
        const subjectMo2 = datesArr.map((x) => {
            const parts = x.split('-')
            // debugger
            const dt = new Date(parts[0], parseInt(parts[1]) - 1, parts[2])
            const d = dt.getDate()
            const s = d.toString().length < 2 ? '0' + d : d.toString()
            return { day: s, count: true }
        })
        // debugger
        calDays.push(...subjectMo2)

        const length = calDays.length
        for (let j = 1; j <= 35 - length; j++) {
            s = j.toString().length < 2 ? '0' + j : j
            calDays.push({ day: s, count: false })
        }
        // }
        // debugger
        calDaysSetter(calDays)
        cdTrue = calDays.filter((day) => day.count === true)
        // debugguer
        return cdTrue
    }

    const generateAppts = (cbAppts) => {
        const appts = {}
        // debugger
        let s = ''
        for (let i = 0; i < cdTrue.length; i++) {
            // debugger

            s = cdTrue[i].day.toString()
            s = s.length < 2 ? '0' + s : s

            const result = cbAppts.filter(
                (appt) => appt.date.substring(appt.date.length - 2) === s
            )

            if (result.length > 0) {
                const arr = []
                for (let k = 0; k < result.length; k++) {
                    arr.push({
                        appt: {
                            day: result[k].date,
                            meal: result[k].meal,
                            _id: result[k]._id,
                            details: result[k].details,
                            kitchen: result[k].kitchen
                        }
                    })
                }
                appts[`${state.value.yr}-${state.value.mo}-${s}`] = arr
            }
        }
        // debugger
        apptsSetter(appts)
        return appts
    }

    // "@vue/apollo-composable": "^4.0.0-alpha.15",
    // "@vue/apollo-option": "^4.0.0-alpha.15",
    // "@vue/apollo-util": "^4.0.0-alpha.15",
    function createAppt(myAppt) {
        debugger
        const { mutate: createAppt, onDone } = useMutation(
            createAppointment,
            () => ({
                variables: {
                    kitchen: myAppt.kitchen,
                    user: myAppt.user,
                    date: myAppt.date,
                    meal: myAppt.meal,
                    details: myAppt.details
                },
                refetchQueries: [getAppointments, 'getAppointments']
            })
        )
        // debugger
        // console.log(meal)
        try {
            createAppt()
            // debugger
            onDone((result) => {
                window.localStorage.setItem('appt', 'fake appt')
                apptsSetter(result)
                mealSelection.closeModal()
                forceRerenderSetter()
                // cardDayKeySetter()

                // router.push('/')
            })
        } catch {
            ;(err) => {
                console.log(err)
            }
        }
    }

    function createAppts(myAppt) {
        const { mutate: createAppt, onDone } = useMutation(
            createAppointments,
            () => ({
                variables: {
                    kitchen: myAppt.kitchen,
                    user: myAppt.user,
                    dates: [myAppt.date],
                    meals: [myAppt.meal],
                    details: [myAppt.details]
                },
                refetchQueries: [getAppointments, 'getAppointments']
            })
        )
        // debugger
        // console.log(meal)
        try {
            createAppt()
            // debugger
            onDone((result) => {
                window.localStorage.setItem('appt', 'fake appt')
                apptsSetter(result)
                mealSelection.closeModal()
                // cardDayKeySetter()

                // router.push('/')
            })
        } catch {
            ;(err) => {
                console.log(err)
            }
        }
    }

    function getTargetAppts() {
        const { result } = useQuery(getAppointments)
        const appointments = useResult(result, [])
        console.log(appointments)
    }

    function updateAppt(myAppt) {
        debugger

        const datesArrTarget = createQueryDatesArr(
            myAppt.date.substring(5, 7),
            myAppt.date.substring(0, 4)
        )
        debugger

        const myApptVariables = {
            _id: myAppt._id,
            date: myAppt.date,
            meal: myAppt.meal,
            details: myAppt.details,
            kitchen: myAppt.kitchen,
            user: myAppt.user
        }

        const { mutate: updateAppointment } = useMutation(
            gql`
                mutation updateAppointment(
                    $_id: ID!
                    $kitchen: ID!
                    $user: ID!
                    $date: String!
                    $meal: String!
                    $details: String!
                ) {
                    updateAppointment(
                        _id: $_id
                        kitchen: $kitchen
                        user: $user
                        date: $date
                        meal: $meal
                        details: $details
                    ) {
                        _id
                        user
                        kitchen
                        date
                        meal
                        details
                    }
                }
            `,
            () => ({
                variables: myApptVariables,
                update: (cache, { data: { updateAppointment } }) => {
                    debugger
                    const data = cache.readQuery({
                        query: getAppointments,
                        variables: { date: datesArrTarget }
                    })
                    debugger
                    cache.writeQuery({
                        query: getAppointments,
                        variables: { date: datesArrTarget },
                        data: {
                            getAppointments: [
                                ...data.getAppointments,
                                updateAppointment
                            ]
                        }
                    })
                }
            })
        )

        try {
            updateAppointment()
        } catch {
            ;(err) => {
                console.log(err)
            }
        }
    }

    function updateAppt_HOLD(myAppt) {
        debugger

        datesArr = createQueryDatesArr(
            myAppt.date.substring(5, 7),
            myAppt.date.substring(0, 4)
        )
        debugger
        // console.log(datesArr)
        // const { result } = useQuery(getAppointments,
        //   { dates: datesArr }
        // )
        // const appts = useResult(result, [])
        const myApptVariables = {
            _id: myAppt._id,
            date: myAppt.date,
            meal: myAppt.meal,
            details: myAppt.details,
            kitchen: myAppt.kitchen,
            user: myAppt.user
        }

        const { mutate: updateApptM } = useMutation(updateAppointment, () => ({
            variables: myApptVariables,
            update: (cache, { data: { myApptVariables } }) => {
                debugger
                cache.writeQuery({
                    query: gql`
                        query WriteAppointment($id: ID!) {
                            Appointment(_id: $id) {
                                _id
                                date
                                meal
                                details
                                kitchen
                                user
                            }
                        }
                    `,
                    data: {
                        Appointment: {
                            __typename: 'Appointment',
                            _id: myAppt._id,
                            date: myAppt.date,
                            meal: myAppt.meal,
                            details: myAppt.details,
                            kitchen: myAppt.kitchen,
                            user: myAppt.user
                        }
                    }
                })
                debugger

                const data = cache.readQuery({
                    query: getAppointments,
                    variables: { date: datesArr }
                })

                const updatedCachedAppt = cache.readQuery({
                    query: getAppointments,
                    variables: { date: [myAppt.date] }
                })
                data.getAppointments.push(updatedCachedAppt)
                cache.writeQuery({ query: getAppointments, data })
            }
        }))

        try {
            updateApptM()
            onDone((cache) => {
                console.log(cache)
            })
        } catch {
            ;(err) => {
                console.log(err)
            }
        }
    }

    const days = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
    }

    return {
        apptsSetter,
        apptsGetter,
        calDays,
        calDaysGetter,
        days,
        forceRerenderGetter,
        updateAppt,
        yrGetter,
        createAppts,
        moTextGetter,
        setInitialMo,
        moGetter,
        setInitialYr,
        setMoText,
        diffMo,
        cardDayKeySetter,
        cardDayKeyGetter,
        createQueryDatesArr,
        generateAppts,
        setUpCalendarSquares,
        calendarKeyGetter,
        calendarKeySetter,
        createAppt
    }
}

export default useCalendar

//  update: (store, {}) => {
//    debugger
//    //  const idToRemove = myAppt._id
//    // store.modify
//    //  store.modify({
//    //    id: store.identify(myAppt)
//    //  })
//    //  getAppointments(date: $date)
//    //

//    const data = store.readQuery({
//      query: getAppointments,
//      variables: { date: datesArr }
//    })
//    console.log('**********')
//    //  appts.value = data.getAppointments
//    console.log(data.getAppointments)

//    console.dir(store)
//    debugger

//  },
