import { createStore } from 'vuex';
import auth from './auth';
import category from './category';
import record from './record';

export default createStore({
   state: { error: null },
   mutations: {
      setError(state, error) {
         state.error = error;
      },
      createError(state) {
         state.error = null;
      },
   },
   getters: { error: (s) => s.error },
   // actions: {
   //    async record(
   //       { dispatch, commit },
   //       { select_cat, select_sub_cat, qty, title, pub_date, add_date },
   //    ) {
   //       console.log(dispatch);
   //       try {
   //          await firebase.database().ref(`/records`).set({
   //             select_cat,
   //             select_sub_cat,
   //             qty,
   //             title,
   //             pub_date,
   //             add_date,
   //          });
   //       } catch (e) {
   //          commit('setError', e);
   //          throw e;
   //       }
   //    },
   // },
   modules: { auth, category, record },
});
