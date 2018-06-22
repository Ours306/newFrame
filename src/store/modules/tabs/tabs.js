export default {
  state: {
    visitedTabs: [],
    cachedTabs: []
  },
  mutations: {
    ADD_TAB (state, tab) {
      tab = tab.route
      if (state.visitedTabs.some(v => v.path === tab.path)) return
      if (tab.meta && tab.meta.title) {
        if (state.visitedTabs.indexOf(tab.meta.title) === -1) {
          state.visitedTabs.push({
            name: tab.meta.name,
            path: tab.path,
            title: tab.meta.title
          })
        }
        if (state.cachedTabs.indexOf(tab.meta.title) === -1) {
          if (!tab.meta.noCache) {
            state.cachedTabs.push(tab.meta.name)
          }
        }
      }
    },
    DELETE_TAB (state, tab) {
      if (tab.route) {
        tab.path = tab.route.path
        tab.name = tab.route.name
      } else {
        tab = tab.tab
      }
      for (let i = 0; i < state.visitedTabs.length; i++) {
        if (state.visitedTabs[i].path === tab.path) {
          state.visitedTabs.splice(i, 1)
          break
        }
      }
      for (let i = 0; i < state.cachedTabs.length; i++) {
        if (state.cachedTabs[i] === tab.name) {
          state.cachedTabs.splice(i, 1)
          break
        }
      }
    },
    DELETE_OTHER_TABS (state, tab) {
      for (let i = 0; i < state.visitedTabs.length; i++) {
        if (state.visitedTabs[i].path === tab.path) {
          state.visitedTabs = state.visitedTabs.slice(i, i + 1)
          break
        }
      }
      for (let i = 0; i < state.cachedTabs.length; i++) {
        if (state.cachedTabs[i].name === tab.name) {
          state.cachedTabs = state.cachedTabs.slice(i, i + 1)
          break
        }
      }
    },
    DELETE_ALL (state) {
      state.visitedTabs = []
      state.cachedTabs = []
    }
  },
  actions: {
    addTab ({ commit }, tab) {
      commit('ADD_TAB', tab)
    },
    deleteTab ({ commit }, tab) {
      commit('DELETE_TAB', tab)
    }
  }
}
