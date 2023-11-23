const BaseNotification = {
    message: '', tone: null
}

const BaseGoodNotification = {
    ...BaseNotification, tone: 'good'
}

const BaseBadNotification = {
    ...BaseNotification, tone: 'bad'
}

const ErrorFetchingData = (whichData) => {
    return ({
        ...BaseBadNotification,
        message: `Fetching ${whichData} was not correctly done`
    })
}

const PersonUpdateNotification = (person) => {
    return ({
        ...BaseGoodNotification,
        message: `${person.name} correctly updated to the PhoneBook`
    })
}

const PersonAddedNotification = (person) => {
    return ({
        ...BaseGoodNotification,
        message: `${person.name} correctly added to the PhoneBook`
    })
}

const PersonDeletedNotification = (person) => {
    return ({
        ...BaseBadNotification,
        message: `${person.name} correctly deleted from the PhoneBook`
    })
}

const AlreadyRemovedPersonNotification = (person) => {
    return ({
        ...BaseBadNotification,
        message: `Information of ${person.name} already removed from the server`
    })
}

export default {
    PersonUpdateNotification, PersonAddedNotification, PersonDeletedNotification, BaseNotification, ErrorFetchingData, AlreadyRemovedPersonNotification
}