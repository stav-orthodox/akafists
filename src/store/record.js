import firebase from 'firebase/app';
export default {
   actions: {
      async createRecord(
         { commit },
         { selectCat, title, qty, pubDate, addDate },
      ) {
         try {
            // const uid = await dispatch('getUid');
            const record = await firebase
               .database()
               .ref(`/records`)
               .push({ selectCat, title, qty, pubDate, addDate });
            return { selectCat, title, qty, pubDate, addDate, id: record.key };
         } catch (e) {
            commit('setError', e);
            throw e;
         }
      },

      async fetchRecords({ commit }) {
         try {
            const records =
               (
                  await firebase.database().ref(`/records`).once('value')
               ).val() || {};

            return Object.keys(records).map((key) => ({
               ...records[key],
               id: key,
            }));
         } catch (e) {
            commit('setError', e);
            throw e;
         }
      },

      async fetchRecord({ commit }, id) {
         try {
            const record =
               (
                  await firebase.database().ref(`/records/${id}`).once('value')
               ).val() || {};
            return record;
            // console.log(record);
         } catch (e) {
            commit('setError', e);
            throw e;
         }
      },

      async updateRecord(
         { commit },
         { title, qty, pubDate, addDate, selectCat, id },
      ) {
         try {
            await firebase
               .database()
               .ref(`/records/${id}`)
               .update({ title, qty, pubDate, addDate, selectCat });
         } catch (e) {
            commit('setError', e);
            throw e;
         }
      },
   },
};
