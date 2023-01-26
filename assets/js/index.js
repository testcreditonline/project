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
const lookingForList = document.querySelector(".looking-for__list");
const offerWrapper = document.querySelector(".offer-wrapper");
const creditorWrapper = document.querySelector(".creditor-wrapper");
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

const renderBanner = ({
    title,
    advantages,
    gradientAngle,
    gradientFirstColor,
    gradientSecondColor,
}) => {
    const gradient = `linear-gradient(${gradientAngle}deg, ${gradientFirstColor}, ${gradientSecondColor})`;

    headerWrapperContainer.style.background =
        window.innerWidth < 1024 ? gradient : "";

    headerWrapper.style.background = window.innerWidth >= 1024 ? gradient : "";

    const advantagesList = arrayRender(
        advantages,
        (a) => `
	<div class="advantage" data-v-fa5ea76c="">
			<div class="check" data-v-fa5ea76c="">
				<svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-fa5ea76c="">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M10.5303 2.46967C10.8232 2.76256 10.8232 3.23744 10.5303 3.53033L5.03033 9.03033C4.73744 9.32322 4.26256 9.32322 3.96967 9.03033L1.46967 6.53033C1.17678 6.23744 1.17678 5.76256 1.46967 5.46967C1.76256 5.17678 2.23744 5.17678 2.53033 5.46967L4.5 7.43934L9.46967 2.46967C9.76256 2.17678 10.2374 2.17678 10.5303 2.46967Z"
					fill="#2E2E2E"
					data-v-fa5ea76c=""
				></path>
				</svg>
			</div>
			<div class="text font-card-body" data-v-fa5ea76c="">${a}</div>
		</div>
  `
    );

    headerWrapper.innerHTML = `
        <div class="info-wrap" data-v-fa5ea76c="">
          <div class="title font-card-accent" data-v-fa5ea76c="">${title}</div>
          <div class="advantages-wrap" data-v-fa5ea76c="">
            ${advantagesList}
          </div>
        </div>
        <div class="image-wrap" data-v-fa5ea76c="">
          <picture data-v-fa5ea76c="">
            <source media="(max-width: 767px)" srcset="assets/images/banner_images/xs.png" data-v-fa5ea76c="" />
            <source media="(min-width: 768px)" srcset="assets/images/banner_images/md.png" data-v-fa5ea76c="" />
            <img src="assets/images/banner_images/xs.png" alt="" data-v-fa5ea76c="" />
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
        return `<div style="order: ${i}" class="looking-for__item ${active}"><a class="looking-for__link" href="${t.uniqueTag}.html">${t.text}</a></div>`;
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
        return `		<a style="padding-top: ${marginTop}px" href="${offer.redirect_link}" class="offer qiwi" data-v-46445f2c="">
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
    const { offers, tags, promo, disclaimer } = data;

    changeDocumentTitle(tags);

    slice.style.display = loading ? "flex" : "none";

    const filteredOffers = offers.filter((offer) => {
        const tag = getTag();

        if (!tag || tag === "index") return true;

        return offer.tags.includes(tag);
    });

    renderMenu(tags);
    renderBanner(promo);
    renderLookingFor(tags);
    renderOffersList(filteredOffers);
    renderCreditorList(filteredOffers);
    renderDisclaimer(disclaimer);
};

const handleMoveTo = (e) => {
    const target = e.target;

    if (target.closest(".looking-for__button_left")) moveToSide("left");
    if (target.closest(".looking-for__button_right")) moveToSide("right");
};

const moveToSide = (side) => {
    const tags = document.querySelectorAll(".looking-for__item");

    tags.forEach((t) => {
        const order = +t.style.order;
        if (side === "right") {
            if (order === 0) t.style.order = tags.length - 1;
            else t.style.order = order - 1;
        } else {
            if (order === tags.length - 1) t.style.order = 0;
            else t.style.order = order + 1;
        }
    });
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

mobileMenuButton.addEventListener("click", toggleMenu);
mobileMenuWrapper.addEventListener("click", closeMenu);
lookingForContent.addEventListener("click", handleMoveTo);

const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
    endX = e.touches[0].clientX;

    lookingForItems = document.querySelectorAll(".looking-for__item");

    let translateX;

    if (startX >= endX) {
        translateX = currentX - Math.abs(startX - endX);
    } else {
        translateX = currentX + Math.abs(startX - endX);
    }

    lookingForItems.forEach((item) => {
        item.style.transform = `translateX(${translateX}px)`;
    });
};

const handleTouchEnd = () => {
    if (window.innerWidth >= 1024) return;

    if (startX >= endX) {
        currentX = currentX - Math.abs(startX - endX);
    } else {
        currentX = currentX + Math.abs(startX - endX);
    }

    const summ =
        [...lookingForItems].reduce((sum, item) => {
            return (sum += 10 + item.clientWidth);
        }, 0) - lookingForList.clientWidth;

    if (currentX > 0) {
        currentX = 0;
        lookingForItems.forEach((item) => {
            item.style.transform = `translateX(${currentX}px)`;
        });
    }
    if (summ < Math.abs(currentX)) {
        currentX = -summ;
        lookingForItems.forEach((item) => {
            item.style.transform = `translateX(${currentX}px)`;
        });
    }
};

lookingForContent.addEventListener("touchstart", handleTouchStart);
lookingForContent.addEventListener("touchmove", handleTouchMove);
lookingForContent.addEventListener("touchend", handleTouchEnd);
