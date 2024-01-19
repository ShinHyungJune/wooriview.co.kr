export const state = () => ({
    domain : process.env.NODE_ENV === "production" ? "https://api-dev.wooriview.co.kr" : "http://localhost",
    pop: null,
    categories: {
        data: []
    },
    instagram_client_id: "1662125527296137",
    instagram_client_secret: "bc1ff483f107b2f837e5555a940a54b7",
    abuses: [],
    push_token: null,
})

export const mutations = {
  /*setToken (state) {
    state.token = state;
  },*/
    setPop (state, data){
        state.pop = data;
    },

    setCategories (state, data){
        state.categories = data;
    },

    setAbuses (state, data){
        state.abuses = data;
    },

    setPushToken (state, data){
        state.push_token = data;
    }
}

export const actions = {

}

