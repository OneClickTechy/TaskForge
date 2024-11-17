const PasswordSameChecker = (password, confirmPassword) => {
    return Boolean(
      password.length && confirmPassword.length && password === confirmPassword
    );
  };

const PasswordValidChecker = (password) => {
  const passwordRegex = {
    uppercase: /[A-Z]+/g,
    lowercase: /[a-z]+/g,
    number: /[0-9]+/g,
    symbols: /[@#!&*.]+/g,
    repeat: /^(?=.*([a-zA-Z0-9])\1{2,}|012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|1234|abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk).+/

  };
  const passwordCheck = {
    hasUppercase: passwordRegex.uppercase.test(password),
    hasLowercase: passwordRegex.lowercase.test(password),
    hasNumber: passwordRegex.number.test(password),
    hasSymbol: passwordRegex.symbols.test(password),
    noRepeat: !passwordRegex.repeat.test(password)
  };
  const isValid = Boolean(Object.values(passwordCheck).every(Boolean) && password.length >=8 && password.length <= 20)
  return { passwordCheck, isValid };
}

  export { PasswordSameChecker, PasswordValidChecker }