const state = {
    isAdmin: false,
    messages: [],
};

const getters = {
    checkAdmin: state => {
        return state.isAdmin;
    },

}

const actions = {
    updateAdmin({ commit }, payload) {
        commit('setAdmin', payload);
    }
}

const mutations = {
    setAdmin(state, payload) {
        state.isAdmin = payload;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}