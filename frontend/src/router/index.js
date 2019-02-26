import Vue from 'vue'
import Router from 'vue-router'
import TimeTables from '@/components/TimeTable'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'timetables',
      component: TimeTables
    }
  ]
})
