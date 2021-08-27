import firebase from 'firebase/app';
export default {
   actions: {
      async createCategory({ commit }, { title }) {
         try {
            // const uid = await dispatch('getUid');
            const category = await firebase
               .database()
               .ref(`/categories`)
               .push({ title });
            return { title, id: category.key };
         } catch (e) {
            commit('setError', e);
            throw e;
         }
      },

      async fetchCategories({ commit }) {
         try {
            const categories =
               (
                  await firebase.database().ref(`/categories`).once('value')
               ).val() || {};

            return Object.keys(categories).map((key) => ({
               ...categories[key],
               id: key,
            }));
         } catch (e) {
            commit('setError', e);
            throw e;
         }
      },

      async updateCategory({ commit }, { title, id }) {
         try {
            await firebase
               .database()
               .ref(`/categories`)
               .child(id)
               .update({ title });
         } catch (e) {
            commit('setError', e);
            throw e;
         }
      },
   },
};
