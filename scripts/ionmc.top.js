async function vote(first) {
    //If user is not authorized
    if (document.querySelector('div.notification.is-primary') != null) {
        if (document.querySelector('div.notification.is-primary').textContent.includes('Голосование в рейтинге разрешено только авторизированным пользователям')) {
            chrome.runtime.sendMessage({auth: document.querySelector('div.notification.is-primary').innerText})
        } else {
            chrome.runtime.sendMessage({message: document.querySelector('div.notification.is-primary').innerText})
        }
        return
    }
    //If there is an error
    if (document.querySelector('div.notification is-danger') != null) {
        //If captcha verification failed
        if (document.querySelector('div[class="notification is-danger"]').textContent != null) {
            chrome.runtime.sendMessage({message: document.querySelector('div.notification.is-danger').textContent})
        }
        return
    }
    //If auto-vote was successful
    if (document.querySelector('div.notification.is-success') != null) {
        if (document.querySelector('div.notification.is-success').textContent.includes('Голос засчитан')) {
            chrome.runtime.sendMessage({successfully: true})
        } else if (document.querySelector('div.notification.is-success').textContent.includes('Вы уже голосовали')) {
            chrome.runtime.sendMessage({later: true})
        } else {
            chrome.runtime.sendMessage({message: document.querySelector('div.notification.is-success').textContent})
        }
        return
    }

    if (first) return

    const project = await getProject()
    document.querySelector('input[name=nickname]').value = project.nick
    document.querySelector('#app > div.mt-2.md\\:mt-0.wrapper.container.mx-auto > div.flex.items-start.mx-0.sm\\:mx-5 > div > div > form > div.flex.my-1 > div.w-2\\/5 > button').click()
}