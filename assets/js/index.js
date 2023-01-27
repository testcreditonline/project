let loading = false;
let current = 0;
let startX;
let endX;
let currentX = 0;
let lookingForItems;

const headerWrapperContainer = document.querySelector(
    ".header-wrapper-container"
);
const headerWrapper = document.querySelector(".header-wrapper");
const lookingForContent = document.querySelector(".looking-for__content");
const lookingForButtons = document.querySelector(".looking-for__buttons");
const lookingForList = document.querySelector(".looking-for__list");
const buttonLeft = document.querySelector(".looking-for__button_left");
const buttonRight = document.querySelector(".looking-for__button_right");
const offerWrapper = document.querySelector(".offer-wrapper");
const creditorWrapper = document.querySelector(".creditor-wrapper");
const footerBlock = document.querySelector(".footer-block");
const disclaimerWrapper = document.querySelector(".disclaimer");
const slice = document.querySelector(".slice");

const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuButton = document.querySelector(".mobile-menu__button");
const mobileMenuWrapper = document.querySelector(".mobile-menu__wrapper");
const menuListElems = document.querySelectorAll(".menu__list");

const toggleMenu = () => {
    mobileMenu.classList.toggle("active");
};

const closeMenu = (e) => {
    const target = e.target;

    if (!mobileMenu.classList.contains("active")) return;

    if (!target.closest(".menu__list")) mobileMenu.classList.remove("active");
};

const getTag = () => {
    const pathname = window.location.pathname;
    return pathname.split(".")[0].slice(1);
};

const changeDocumentTitle = (tags) => {
    let title = "Займы онлайн";
    tags.forEach((t) => {
        const tag = getTag();
        if (tag === t.uniqueTag) title = `${t.text} | Займы онлайн`;
    });
    document.title = title;
};

const arrayRender = (array, templateCallback) => {
    return array.map(templateCallback).join("");
};

const renderMenu = (tags) => {
    const filteredTags = tags.filter((t) => t.containedInMenu);
    const tag = getTag();

    menuListElems.forEach((list) => {
        list.innerHTML = arrayRender(filteredTags, (t) => {
            const active = tag === t.uniqueTag ? "active" : "";

            return `
        <li class="menu__item ${active}">
            <a href="/${t.uniqueTag}.html"
                >${t.text}</a
            >
        </li>
      `;
        });
    });
};

const renderBanner = (tags) => {
    const tag = getTag();

    let pageData;

    if (!tag || tag === "index") pageData = tags[0];
    else pageData = tags.filter((o) => o.uniqueTag === tag)[0];

    const {
        promo: { title, advantages, titleColor, advantagesColor },
        bannerGradient: {
            gradientAngle,
            gradientFirstColor,
            gradientSecondColor,
        },
        bannerImageDesctop,
        bannerImageMobile,
        advantageIcon,
    } = pageData;

    const gradient = `linear-gradient(${gradientAngle}deg, ${gradientFirstColor}, ${gradientSecondColor})`;

    headerWrapperContainer.style.background =
        window.innerWidth < 1024 ? gradient : "";

    headerWrapper.style.background = window.innerWidth >= 1024 ? gradient : "";

    const advantagesList = arrayRender(
        advantages,
        (a) => `
	<div style="color: ${advantagesColor};" class="advantage" data-v-fa5ea76c="">
			<div class="check" data-v-fa5ea76c="">
				<img width="12" height="12" src="${advantageIcon}" >
			</div>
			<div class="text font-card-body" data-v-fa5ea76c="">${a}</div>
		</div>
  `
    );

    headerWrapper.innerHTML = `
        <div class="info-wrap" data-v-fa5ea76c="">
          <h1 class="title font-card-accent" style="color: ${titleColor};" data-v-fa5ea76c="">${title}</h1>
          <div class="advantages-wrap" data-v-fa5ea76c="">
            ${advantagesList}
          </div>
        </div>
        <div class="image-wrap" data-v-fa5ea76c="">
          <picture data-v-fa5ea76c="">
            <source media="(max-width: 767px)" srcset="${bannerImageMobile}" data-v-fa5ea76c="" />
            <source media="(min-width: 768px)" srcset="${bannerImageDesctop}" data-v-fa5ea76c="" />
            <img src="${bannerImageMobile}" alt="" data-v-fa5ea76c="" />
          </picture>
        </div>
      </div>
	`;
};

const renderLookingFor = (tags) => {
    const tag = getTag();

    const sortedTags = [...tags];

    if (tag && tag !== "index") {
        const uniqueTagElement = sortedTags.findIndex(
            (t) => t.uniqueTag === tag
        );

        [sortedTags[0], sortedTags[uniqueTagElement]] = [
            sortedTags[uniqueTagElement],
            sortedTags[0],
        ];
    }

    lookingForList.innerHTML = arrayRender(sortedTags, (t, i) => {
        const active = tag === t.uniqueTag ? "active" : "";
        return `<div  class="looking-for__item ${active}"><a class="looking-for__link" href="${t.uniqueTag}.html">${t.text}</a></div>`;
    });
};

const renderOffersList = (offers) => {
    offerWrapper.innerHTML = arrayRender(offers, (offer) => {
        let bage = ``;
        let marginTop = 38;

        if (offer.hasBage) {
            bage = `<div class="bage font-card-accent cursor-p" data-v-46445f2c="">
                      <img src="${offer.bageIcon}">
                      ${offer.bageText}
                    </div>`;
            marginTop = 0;
        }
        if (window.innerWidth <= 768) marginTop = 0;
        return `<a onclick="${offer.ym_id};return true;" style="padding-top: ${marginTop}px" href="${offer.redirect_link}" class="offer qiwi" data-v-46445f2c="">
                        ${bage}
                        <div class="offer-block cursor-p" data-v-46445f2c="">
                          <div class="offer-content" data-v-46445f2c="">
                            <div class="name-wrap" data-v-46445f2c="">
                              <div data-v-46445f2c="">
                                <img loading="lazy" src="${offer.round_logo}" alt="${offer.name}" class="logo" data-v-46445f2c="" />
                              </div>
                              <div data-v-46445f2c="">
                                <div title="${offer.name}" class="offer-name font-card-accent name-clamp" data-v-46445f2c="">
                                  ${offer.name}
                                </div>
                              </div>
                            </div>
                            <div class="values-wrap" data-v-46445f2c="">
                              <div class="offer-value" data-v-46445f2c="">
                                <div class="item-text item-label font-card-accent" data-v-46445f2c="">Сумма</div>
                                <div class="item-text item-value font-card-accent" data-v-46445f2c="">
                                  до ${offer.content.max_loan_amount} ${offer.content.rate_unit}
                                </div>
                              </div>
                              <div class="offer-value" data-v-46445f2c="">
                                <div class="item-text item-label font-card-accent" data-v-46445f2c="">Ставка</div>
                                <div class="item-text item-value font-card-accent font-blue" data-v-46445f2c="">
                                  от ${offer.content.min_loan_rate} %
                                </div>
                              </div>
                              <div class="offer-value" data-v-46445f2c="">
                                <div class="item-text item-label font-card-accent" data-v-46445f2c="">Срок</div>
                                <div class="item-text item-value font-card-accent" data-v-46445f2c="">
                                  от ${offer.content.min_loan_period} ${offer.content.term_unit}
                                </div>
                              </div>
                              <div class="offer-value" data-v-46445f2c="">
                                <div class="item-text item-label font-card-accent" data-v-46445f2c="">Возраст</div>
                                <div class="item-text item-value font-card-accent" data-v-46445f2c="">
                                  от ${offer.content.min_age} лет
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="redirect-wrap" data-v-46445f2c="">
                            <div class="button font-card-body button-popular" data-v-46445f2c="">Оформить</div>
                            <div class="font-card-body license font-grey" data-v-46445f2c="">${offer.certificate_of_cb}</div>
                          </div>
                        </div>
                      </a>`;
    });
};

const renderFooterBlock = (tags) => {
    const tag = getTag();

    let pageData;

    if (!tag || tag === "index") pageData = tags[0];
    else pageData = tags.filter((o) => o.uniqueTag === tag)[0];

    const { footerTitle, footerText } = pageData;

    footerBlock.innerHTML = `<h2 class="footer-block__title">
                                        ${footerTitle}
                                    </h2>
                                    <p class="footer-block__text">
                                        ${footerText}
                                    </p>`;
};

const renderCreditorList = (offers) => {
    creditorWrapper.innerHTML = arrayRender(
        offers,
        (offer) => `<div class="creditor">
                      ${offer.advertiser_info}
                      <span class="legal-name">(${offer.mfi_legal_name})</span> <br />
                      <div>${offer.certificate_of_cb}</div>
                      <div>Адрес: ${offer.address}</div>
                      <div>Максимальная годовая процентная ставка: ${offer.content.max_loan_rate}</div>
                      <div>Максимальный срок займа: ${offer.content.max_loan_period} ${offer.content.term_unit}</div>
                    </div>`
    );
};

const renderDisclaimer = (disclaimer) => {
    disclaimerWrapper.innerText = disclaimer;
};

const render = (data) => {
    const { offers, tags, disclaimer } = data;

    changeDocumentTitle(tags);

    slice.style.display = loading ? "flex" : "none";

    const filteredOffers = offers.filter((offer) => {
        const tag = getTag();

        if (!tag || tag === "index") return true;

        return offer.tags.includes(tag);
    });

    renderMenu(tags);
    renderBanner(tags);
    renderLookingFor(tags);
    renderOffersList(filteredOffers);
    renderFooterBlock(tags);
    renderCreditorList(filteredOffers);
    renderDisclaimer(disclaimer);
};

const start = async () => {
    loading = true;
    const response = await fetch("data.json");
    const data = await response.json();

    render(data);

    setTimeout(() => {
        loading = false;
        render(data);
    }, 1000);
};

start();

const handleMoveTo = (e) => {
    const target = e.target;

    if (target.closest(".looking-for__button_left")) moveToSide("left");
    if (target.closest(".looking-for__button_right")) moveToSide("right");
};

const moveToSide = (side) => {
    if (window.clientWidth < 1024) {
        return;
    }
    let tags = document.querySelectorAll(".looking-for__item");

    let width;

    lookingForList.style.transition = "transform 0.3s ease-in-out";

    if (side === "right") {
        width = -tags[0].clientWidth - 10;
        lookingForList.style.transform = `translateX(${width}px)`;

        setTimeout(() => {
            lookingForList.append(tags[0]);
            lookingForList.style.transition = "transform 0s ease-in-out";
            lookingForList.style.transform = `translateX(${0}px)`;
        }, 300);
    }

    if (side === "left") {
        width = tags[tags.length - 1].clientWidth + 10;
        lookingForList.style.transition = "transform 0s ease-in-out";
        lookingForList.style.transform = `translateX(${-width}px)`;
        lookingForList.prepend(tags[tags.length - 1]);

        setTimeout(() => {
            lookingForList.style.transition = "transform 0.3s ease-in-out";

            lookingForList.style.transform = `translateX(${0}px)`;
        }, 0);
    }
};

const handleTouchStart = (e) => {
    if (window.innerWidth >= 1024) return;

    startX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
    if (window.innerWidth >= 1024) return;

    endX = e.touches[0].clientX;

    lookingForItems = document.querySelectorAll(".looking-for__item");

    let translateX;

    if (startX >= endX) {
        translateX = currentX - Math.abs(startX - endX);
    } else {
        translateX = currentX + Math.abs(startX - endX);
    }

    lookingForList.style.transform = `translateX(${translateX}px)`;
};

const handleTouchEnd = () => {
    if (window.innerWidth >= 1024) return;

    let tags = document.querySelectorAll(".looking-for__item");

    if (startX >= endX) {
        currentX = currentX - Math.abs(startX - endX);
    } else {
        currentX = currentX + Math.abs(startX - endX);
    }

    const summ = [...tags].reduce((summ, t) => (summ += 10 + t.clientWidth), 0);

    const hiddenWidth = lookingForContent.clientWidth - summ;

    if (currentX > 0) {
        currentX = 0;
        lookingForList.style.transform = `translateX(${currentX}px)`;
    }

    // console.log(currentX, hiddenWidth, summ);
    if (currentX < hiddenWidth) {
        currentX = hiddenWidth;
        lookingForList.style.transform = `translateX(${currentX}px)`;
    }
};

mobileMenuButton.addEventListener("click", toggleMenu);
mobileMenuWrapper.addEventListener("click", closeMenu);
lookingForButtons.addEventListener("click", handleMoveTo);
lookingForContent.addEventListener("touchstart", handleTouchStart);
lookingForContent.addEventListener("touchmove", handleTouchMove);
lookingForContent.addEventListener("touchend", handleTouchEnd);
