const generateJwt = require('./utils/generateJwt')
const bcrypt = require('bcryptjs')
const verifyToken = require('./utils/verifyToken')
const hashPassword = require('./utils/hashPassword')

module.exports = {
  Query: {
    // getFiles: () => {

    // },
    getAppointments: async (parent, args, { Appointment }) => {
      console.log('getAppointments resolver')
      console.log('args.date', args.date)
      const appointments = await Appointment.find({ date: { $in: args.date } })
      console.log('appts', appointments)

      return appointments
    },

    selectKitchen: async (parent, args, { Kitchen }) => {
      console.log('selectKitchen resolover')
      console.log(args)
      const selectedKitchen = await Kitchen.findById(args.id)
        .populate({
          path: 'appointments',
          model: 'Appointment'
          // populate: {
          //   path: 'dateMeal',
          //   model: 'DateMeal'
          // }
        })
      if (!selectedKitchen) {
        throw new Error('Kitchen not found')
      }
      console.log('selectedKitchen:')
      console.log(selectedKitchen)
      return selectedKitchen
    },

    verifyUser: async (parent, { token }, { User }) => {
      // start by using payload, then use authorization header
      console.log('in getCurrentUserFromToken')
      console.log('args', token)
      const userX = await verifyToken(token)
      console.log('userX', userX)
      const user = await User.findOne({ email: userX.email })

      if (!user) {
        throw new Error('User not found.')
      }
      console.log('user: ', user)
      return user
    },

    getCurrentUserFromToken: async (parent, { token }) => {
      // start by using payload, then use authorization header
      console.log('in getCurrentUserFromToken')
      console.log('args', token)
      const userInfoFromToken = verifyToken(token)

      if (!userInfoFromToken) {
        throw new Error('User not found.')
      }
      console.log('userInfoFromToken: ', userInfoFromToken, +new Date())
      return userInfoFromToken
    },

    getCurrentUser: async (_, args, { User, currentUser }) => {
      // console.log('getCurrentUser resolver', currentUser)
      // console.log(currentUser)
      if (!currentUser) {
        console.log('no current user')
        return null
      }
      // console.log('currentUser: ', currentUser)
      const user = await User.findOne({ email: currentUser.email })
      if (!user) {
        throw new Error('User not found.')
      }
      console.log('user: ', user)
      return user
    },

    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: 'desc' })
        .populate({
          path: 'createdBy',
          model: 'User'
        })

      return posts
    },
    getKitchens: async (_, args, { Kitchen }) => {
      console.log('getKitchens-resolvers')
      // console.dir(Kitchen)
      const kitchens = await Kitchen.find({})
        .populate({
          path: 'appointments',
          model: 'Appointment'
          // populate: {
          //   path: 'dateMeal',
          //   model: 'DateMeal'
          // }
        })
        // .populate({
        //   path: 'appointments',
        //   model: 'Appointment'
        // })
      // .sort({ createdDate: 'desc' })
      // .populate({
      //   path: 'createdBy',
      //   model: 'User'
      // })
      // console.log('kitchen[0] ', kitchens[0])
      console.log(kitchens)
      console.log('kitchens')
      return kitchens
    }
  },

  Mutation: {
    // createMeal: async (parent, args, { Meal }) => {
    //   const meal = await new Meal({
    //     date: args.date,
    //     time: args.time,
    //     mainCourse: args.mainCourse
    //   }).save

    //   if (!meal) {
    //     throw new Error('Could not create kitchen.')
    //   }
    //   // console.log('kitchen result', kitchen)
    //   console.log('return meal from resolver')
    //   console.log(meal)
    //   return meal
    // },

    deleteKitchen: async (parent, args, { Kitchen }) => {
      console.log('deleteKitchen-resolvers')
      const kitchen = await Kitchen.findOneAndDelete({ _id: args.id })
      return kitchen
    },

    // uploadFile: async (parent, { file }) => {
    //   console.log('file-resolvers')
    //   console.log(file)
    //   const { stream, filename, mimetype, encoding } = await file
    //   console.log(stream, filename, mimetype, encoding)
    //   return { filename, mimetype, encoding }
    // },

    createKitchen: async (parent, args, { Kitchen, User }) => {
      console.log('createKitchen-resolvers')
      // const user = await getUser(args.token)
      // if (!user) {
      //   throw new Error('Invalid credentials. Please log in.')
      // }

      const kitchenInterim = await new Kitchen({
        owner: args.owner,
        address: args.address,
        city: args.city,
        burners: args.burners,
        imageUrl: args.imageUrl,
        knives: args.knives,
        name: args.name,
        rate: args.rate,
        utensils: args.utensils,
        walkin: args.walkin
      }).save()

      // console.log('createKitchen-resolvers', kitchen)
      // console.log('createKitchen-resolvers-2 ', kitchen)
      if (!kitchenInterim) {
        throw new Error('Could not create kitchen.')
      }
      // console.log('kitchen result', kitchen)

      const kitchen = await Kitchen.findById({ _id: kitchenInterim._id })
        .populate({
          path: 'owner',
          model: 'User'
        })
      if (!kitchen) {
        throw new Error('Could not create kitchen.')
      }

      console.log('return kitchen from resolver-xxxxx')
      console.log(kitchen)

      return kitchen
    },
    // createDateMeals: async (parent, { dates, meals }, { DateMeal }) => {
    //   // Eventually, load dateMeals on client side to avoid need
    //   // to hit the database to check for dateMeals that existed
    //   // at the time the application loaded.
    //   var dms = []
    //   for (var i = 0; i < dates.length; i++) {
    //     var dm = await DateMeal.findOne({ date: dates[i], meal: meals[i] })
    //     if (!dm) {
    //       dm = await DateMeal.create({ date: dates[i], meal: meals[i] })
    //     }
    //     dms.push(dm)
    //   }

    //   return dms
    // },

    // 61120d795e3b89be1f1d2b04
    // 61120d795e3b89be1f1d2b04

    updateAppointment: async (parent, { date, meal, details, user, kitchen, _id }, { Appointment, Kitchen, User }, info) => {
      console.log('_id')
      console.log(_id)
      const filter = { _id: _id }
      const update = { date, meal, details, user, kitchen }
      // const apptx = await Appointment.findOne(filter)
      const appt = await Appointment.findOneAndUpdate(filter, update, {
        new: true,
        upsert: false
      })

      console.log('updated appt')
      console.log(appt)
      return appt
    },

    createAppointment: async (parent, { date, meal, details, user, kitchen }, { Appointment, Kitchen, User }, info) => {
      console.log('createAppointment resolver-xx')
      console.log('date', date)

      const appt = {
        date,
        meal,
        details,
        user,
        kitchen
      }

      const apptx = await Appointment.create(appt)
      console.log('apptx')
      console.log(apptx)

      const apptId = apptx._id

      const kitchenUpdate = {
        $addToSet: {
          appointments: apptId
        }
      }
      const userUpdate = {
        $addToSet: {
          appointments: apptId
        }
      }

      const updatedKitchen = await Kitchen
        .findOneAndUpdate({ _id: kitchen }, kitchenUpdate, { new: true })
        .populate({
          path: 'appointments',
          model: 'Appointment'

        })

      const updatedUser = await User.findOneAndUpdate(
        { _id: user }, userUpdate, { new: true })
        .populate(
          {
            path: 'appointments',
            model: 'Appointment'

          }
        )
      //            { path: 'dateMeal', model: 'DateMeal' }

      // console.log('updatedUser')
      // console.log(updatedUser)
      // console.log('updatedKitchen')
      // console.log(updatedKitchen)

      // var updatedUserApptIds = updatedUser.appointments.map(a => a._id)
      // var updatedKitchenApptIds = updatedKitchen.appointments.map(a => a._id)

      // console.log(updatedKitchen)

      // return {
      //   username: updatedUser.username,
      //   appointments: updatedUserApptIds,
      //   appointmentsK: updatedKitchen.appointments
      // }
      return apptx
    },
    createAppointments: async (parent, { dates, meals, details, user, kitchen }, { Appointment, Kitchen, User }, info) => {
      console.log('createAppointments resolver-xx')
      console.log('dates', dates)

      const appts = []

      for (let i = 0; i < dates.length; i++) {
        appts.push({
          date: dates[i],
          meal: meals[i],
          details: details[i],
          user,
          kitchen
        })
      }

      const apptx = await Appointment.create(appts)
      console.log('apptx')
      console.log(apptx)

      const apptIds = apptx.map(a => a._id)
      // var dateMealIds = apptx.map(a => a.dateMeal)

      // try {
      // Don't need to iterate through dateShifts
      // because the $each operator will take care of it.

      // Use dateMeals for getting populate straght.
      // To do: Change to appointments.
      const kitchenUpdate = {
        $addToSet: {
          appointments: {
            $each: apptIds
          }
        }
      }
      const userUpdate = {
        $addToSet: {
          appointments: {
            $each: apptIds
          }
        }
      }

      const updatedKitchen = await Kitchen
        .findOneAndUpdate({ _id: kitchen }, kitchenUpdate, { new: true })
        .populate({
          path: 'appointments',
          model: 'Appointment'

        })

      const updatedUser = await User.findOneAndUpdate(
        { _id: user }, userUpdate, { new: true })
        .populate(
          {
            path: 'appointments',
            model: 'Appointment'

          }
        )
      //            { path: 'dateMeal', model: 'DateMeal' }

      // console.log('updatedUser')
      // console.log(updatedUser)
      // console.log('updatedKitchen')
      // console.log(updatedKitchen)

      // var updatedUserApptIds = updatedUser.appointments.map(a => a._id)
      // var updatedKitchenApptIds = updatedKitchen.appointments.map(a => a._id)

      // console.log(updatedKitchen)

      // return {
      //   username: updatedUser.username,
      //   appointments: updatedUserApptIds,
      //   appointmentsK: updatedKitchen.appointments
      // }
      return apptx
      // } catch (err) {
      //   throw new Error('Cannot update schedule')
      // }
    },

    //* ********* */

    // createAppointments: async (parent, { dateMeals, user, kitchen }, { Appointment, Kitchen, User }, info) => {
    //   console.log('createAppointments resolver')
    //   var appts = []

    //   for (var i = 0; i < dateMeals.length; i++) {
    //     appts.push({ dateMeal: dateMeals[i], user, kitchen })
    //   }
    //   var apptx = await Appointment.create(appts)
    //   var apptIds = apptx.map(a => a._id)
    //   var dateMealIds = apptx.map(a => a.dateMeal)

    //   try {
    //     // Don't need to iterate through dateShifts
    //     // because the $each operator will take care of it.

    //     // Use dateMeals for getting populate straght.
    //     // To do: Change to appointments.
    //     var kitchenUpdate = {
    //       $addToSet: {
    //         appointments: {
    //           $each: apptIds
    //         }
    //       }
    //     }
    //     var userUpdate = {
    //       $addToSet: {
    //         appointments: {
    //           $each: apptIds
    //         }
    //       }
    //     }

    //     const updatedKitchen = await Kitchen
    //       .findOneAndUpdate({ _id: kitchen }, kitchenUpdate, { new: true })
    //       .populate({
    //         path: 'appointments',
    //         model: 'Appointment',
    //         populate: ({
    //           path: 'dateMeal',
    //           model: 'DateMeal'
    //         })
    //       })

    //     const updatedUser = await User.findOneAndUpdate(
    //       { _id: user }, userUpdate, { new: true })
    //       .populate(
    //         {
    //           path: 'appointments',
    //           model: 'Appointment',
    //           populate: ({
    //             path: 'dateMeal',
    //             model: 'DateMeal'
    //           })
    //         }
    //       )
    //       //            { path: 'dateMeal', model: 'DateMeal' }

    //     console.log('updatedUser')
    //     console.log(updatedUser)

    //     var updatedUserApptIds = updatedUser.appointments.map(a => a._id)
    //     var updatedKitchenApptIds = updatedKitchen.appointments.map(a => a._id)

    //     // console.log(updatedKitchen)

    //     // return {
    //     //   username: updatedUser.username,
    //     //   appointments: updatedUserApptIds,
    //     //   appointmentsK: updatedKitchen.appointments
    //     // }
    //     return {
    //       user: updatedUser,
    //       kitchen: updatedKitchen,
    //       date: dateMealIds
    //     }
    //   } catch (err) {
    //     throw new Error('Cannot update schedule')
    //   }
    // },

    // createCalendarEvents: async (parent, { dateMeals, details, user, kitchen }, { Appointment, Kitchen, User }, info) => {
    //   console.log('createCalendarEvents resolver')
    //   var appts = []

    //   for (var i = 0; i < dateMeals.length; i++) {
    //     appts.push({
    //       dateMeal: dateMeals[i],
    //       details: details[i],
    //       user,
    //       kitchen
    //     })
    //   }
    //   var apptx = await Appointment.create(appts)
    //   // .populate({
    //   //   path: 'dateMeal',
    //   //   model: 'DateMeal'
    //   // })

    //   console.log('apptx')
    //   console.log(apptx)
    //   var apptIds = apptx.map(a => a._id)
    //   var calEvents = apptx.map(a => {
    //     const ce = {
    //       dateMeal: a.dateMeal,
    //       details: a.details
    //     }
    //     return ce
    //   })

    //   // .findOneAndUpdate({ _id: kitchen }, kitchenUpdate, { new: true })
    //   // .populate({
    //   //   path: 'appointments',
    //   //   model: 'Appointment',
    //   //   populate: ({
    //   //     path: 'dateMeal',
    //   //     model: 'DateMeal'
    //   //   })
    //   // })

    //   console.log('calEvents')
    //   console.log(calEvents)

    //   try {
    //     var kitchenUpdate = {
    //       $addToSet: {
    //         appointments: {
    //           $each: apptIds
    //         }
    //       }
    //     }
    //     var userUpdate = {
    //       $addToSet: {
    //         appointments: {
    //           $each: apptIds
    //         }
    //       }
    //     }

    //     await Kitchen
    //       .findOneAndUpdate({ _id: kitchen }, kitchenUpdate, { new: true })
    //       // .populate({
    //       //   path: 'appointments',
    //       //   model: 'Appointment',
    //       //   populate: ({
    //       //     path: 'dateMeal',
    //       //     model: 'DateMeal'
    //       //   })
    //       // })

    //     await User.findOneAndUpdate(
    //       { _id: user }, userUpdate, { new: true })

    //     console.log('user')
    //     console.log(user)

    //     console.log('calEvents')
    //     console.log(calEvents)

    //     // var updatedKitchenApptIds = updatedKitchen.appointments.map(a => a._id)

    //     return {
    //       apptx
    //     }
    //   } catch (err) {
    //     throw new Error('Cannot update calendar events')
    //   }
    // },

    createPost: async (parent, args, { Post }, info) => {
      const post = await new Post({
        title: args.title,
        imageUrl: args.imageUrl,
        categories: args.categories,
        description: args.description,
        createdBy: args.creatorId
      }).save()

      if (!post) {
        throw new Error('Could not create post.')
      }
      return post
    },
    loginUser: async (parent, args, { User }, info) => {
      console.log('login user resolver------')
      console.log(args)
      const user = await User.findOne({ username: args.username })
      console.log('login user resolver')
      if (!user) {
        throw new Error('Username not found')
      }
      // debugger
      console.log(user.email)

      const isValidPassword = await bcrypt.compare(args.password, user.password)
      if (!isValidPassword) {
        throw new Error('Invalid password--')
      }

      console.log('loginUser resolver', user)
      console.log(process.env.JWT_SECRET)
      const jToken = generateJwt(user._id, user.username, user.isCook, user.isKitchenOwner)
      console.log(jToken)
      return {
        token: jToken
      }
    },
    updateUser: async (_, { username, email, password, avatar, isCook, isKitchenOwner }, { User, AuthPayload }, info) => {
      // console.log('existingEmail', existingEmail)
      // console.log('email', email)
      // console.log('inside updateUser resolver')
      // const currUser = this.getCurrentUser()
      // if (!currUser) {
      //   throw new Error('Can\'t find user')
      // }
      const existingEmail = email
      const user = await User.findOne({ email: existingEmail })

      if (!user) {
        throw new Error('Can\'t find user')
      }
      const pword = await hashPassword(password)
      const filter = { email: existingEmail }
      const update = { username, email, password: pword, avatar, isCook, isKitchenOwner }
      try {
        const updatedUser = await User.findOneAndUpdate(filter, update, { new: true })
        const token = generateJwt(updatedUser._id, updatedUser.email)
        console.log('token', token)
        return {
          token: token
        }
      } catch (err) {
        throw new Error('Cannot update user')
      }
    },
    createUser: async (parent, { username, email, password, isCook, isKitchenOwner, avatar }, { User, AuthPayload }, info) => {
      console.log('inside createUser resolver')
      const user = await User.findOne({ username })

      if (user) {
        throw new Error('User already exists')
      }
      try {
        const newUser = await new User({
          username,
          email,
          password,
          isCook,
          isKitchenOwner,
          avatar
        }).save()
        console.log(newUser)
        const token = generateJwt(newUser.id, newUser.email)

        return {
          newUser,
          token
        }
      } catch (err) {
        throw new Error('Cannot create user')
      }
    }
  }
}
