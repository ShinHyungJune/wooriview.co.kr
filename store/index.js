export const state = () => ({
    domain : process.env.NODE_ENV === "production" ? "https://api.wooriview.co.kr" : "http://localhost",
    pop: null,
    categories: {
        data: []
    },
    webview: /WebView/.test(navigator.userAgent),
    instagram_client_id: "1662125527296137",
    instagram_client_secret: "bc1ff483f107b2f837e5555a940a54b7",
})

export const mutations = {
  /*setToken (state) {
    state.token = state;
  },*/
    init(state){

    },

    setPop (state, data){
        state.pop = data;
    },

    setCategories (state, data){
        state.categories = data;
    }
}

export const actions = {

}

