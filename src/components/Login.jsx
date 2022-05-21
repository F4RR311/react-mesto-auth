import React from "react";

const Login = () => {

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form">
                <input className="login__input" placeholder="Email"/>
                <input className="login__input" type="password" placeholder="Пароль"/>
                <button className="login__button" type="submit" onClick={() => {
                }}>Войти
                </button>
            </form>

        </div>


    )


}


export default Login;
