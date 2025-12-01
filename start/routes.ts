import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const EventsController = () => import('#controllers/events_controller')
const RegistrationsController = () => import('#controllers/registrations_controller')

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        router.post('/events', [EventsController, 'store'])
        router.post('/events/:id/register', [RegistrationsController, 'store'])
        router.get('/events/:id/participants', [EventsController, 'participants'])
        router.put('/events/:id', [EventsController, 'update'])
        router.delete('/events/:id', [EventsController, 'destroy'])
        router.get('/my-registrations', [RegistrationsController, 'index'])
        router.delete('/events/:id/register', [RegistrationsController, 'destroy'])
        router.put('/profile', [AuthController, 'update'])
      })
      .use(middleware.auth())
  })
  .prefix('api')
