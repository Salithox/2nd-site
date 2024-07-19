const {html} = require ('common-tags');

function card ({title, link, linktext}) {
    return html`
    <div class="card__container">
        <h2 class= "card__title">${title}</h2>
        <a class="card__link" href="${link}">${linktext}</a>
    </div>
    `;
}

module.exports = card;