import {useEffect, useState} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api.js"
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup";
import EditaAvatarPopup from "./EditaAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getProfile(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user)
                setCards(cards)
            })
    }, []);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleEditPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setSelectedCard(null)
    }

    function handleUpdateUser(data) {
        api.editProfile(data).then((newUser) => {

            setCurrentUser(newUser);
            closeAllPopups();
        })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleUpdateAvatar(data) {
        api.addAvatar(data).then((newAvatar) => {
            setCurrentUser(newAvatar);
            closeAllPopups();
        })
            .catch((err) => {
                console.error(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeStatusLike(card._id, isLiked)
            .then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                // Обновляем стейт
                setCards(newCards);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });

    }

    function handleCardDelete(card) {
        api.removeCard(card).then(() => {
            setCards((items) => items.filter((c) => c._id !== card._id && c));
        }).catch((err) => {
            console.error(err);
        });
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data).then((newCard) => {
            setCards([...cards, newCard]);
            closeAllPopups();
        }).catch((err) => {
            console.error(err);
        });
    }

    useEffect(() => {
        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard) {
            function handleEsc(evt) {
                if (evt.key === 'Escape') {
                    closeAllPopups();
                }
            }

            document.addEventListener('keydown', handleEsc);

            return () => {
                document.removeEventListener('keydown', handleEsc);
            }
        }
    }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, selectedCard]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="wrapper">
                <div className="page">
                    <Header/>

                    <Main onEditAvatar={handleEditAvatarClick}
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleEditPlaceClick}
                          onCardClick={handleCardClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete}
                    />
                    <Footer/>

                    <EditaAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <EditProfilePopup
                        onClose={closeAllPopups}
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
