import Vue from 'vue'
import Router from 'vue-router'
import StartScreen from '@/components/StartScreen'
import GameScreen from '@/components/GameScreen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartScreen',
      component: StartScreen
    },
    {
      path: '/game',
      name: 'GameScreen',
      component: GameScreen
    }
  ]
})
