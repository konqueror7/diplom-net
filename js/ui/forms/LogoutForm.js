class LogoutForm extends AsyncForm{
  onSubmit(options) {
    User.logout(options.data, (err, response) => {
      if (err || !response.success) {
        return undefined;
      }
      User.unsetCurrent();
      document.location.href = Entity.HOST + '/client';
    });
  }
}
