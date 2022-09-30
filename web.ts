export function inject({ config, posthog }) {
    if (config.domains) {
        const domains = config.domains.split(',').map((domain) => domain.trim())
        if (domains.length > 0 && domains.indexOf(window.location.hostname) === -1) {
            return
        }
    }
    const emoji = config.emoji || '🍍'
    for (let i = 0; i < 10; i++) {
        makeItRain(emoji)
    }
    window.setInterval(() => makeItRain(emoji), 200)
    posthog.capture('made it rain', { emoji })
}

function makeItRain(emoji: string) {
    const div = document.createElement('div')
    Object.assign(div.style, {
        position: 'fixed',
        left: `${(window.innerWidth - 30) * Math.random()}px`,
        top: '-10px',
        fontSize: '24px',
        zIndex: 99999999,
        pointerEvents: 'none',
    })
    div.innerHTML = emoji
    window.document.body.appendChild(div)
    const duration = 1000 + Math.random() * 3000
    div.animate([{ top: '-10px' }, { top: `${window.innerHeight + 20}px` }], {
        duration,
        iterations: 1,
    })
    window.setTimeout(() => div.remove(), duration + 1)
}
