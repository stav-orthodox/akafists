export default {
   install: (app) => {
      app.config.globalProperties.$message = (html) => {
         return window.M.toast({ html });
      };
      app.config.globalProperties.$error = (html) => {
         return window.M.toast({ html: `[Ошибка]: ${html}` });
      };
   },
};
