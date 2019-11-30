class LogoutForm extends AsyncForm{
  onSubmit(options) {
    User.logout(options.data, (err, response) => {
      if (err || !response.success) {
        return undefined;
      }
      // console.log(response);
      User.unsetCurrent();
      // console.log(localStorage);
      document.location.href = 'http://diplom-net/client';
    });
  }
}
