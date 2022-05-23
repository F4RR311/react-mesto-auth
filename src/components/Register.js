import React from "react";

const Register = () => {

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form">
                <input className="login__input" placeholder="Email"/>
                <input className="login__input" type="password" placeholder="Пароль"/>
                <button className="login__button" type="submit" onClick={() => {
                }}>Зарегистрироваться
                </button>
            </form>

        </div>


    )


}

export default Register;
