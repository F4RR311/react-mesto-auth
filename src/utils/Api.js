class Api {
    constructor({baseUrl, headers}) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`)
        }
    }

    getProfile() {

        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,

        })
            .then(this._checkResponse)


    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,

        })
            .then(this._checkResponse)

    }

    editProfile(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job

            })

        })
            .then(this._checkResponse)

    }


    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }

    removeCard(data) {
        return fetch(`${this._baseUrl}/cards/${data._id}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)

    }

    changeStatusLike(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method:`${!isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        })
            .then(this._checkResponse)

    }

    addAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar_profile
            })

        })
            .then(this._checkResponse)

    }


}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: '2178a0fc-274b-41fe-8f86-589bb9b2b9ed',
        'Content-Type': 'application/json'
    }
});