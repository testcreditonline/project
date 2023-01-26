let loading = false;
let current = 0;
let startX;
let endX;

const headerWrapperContainer = document.querySelector(
    ".header-wrapper-container"
);
const headerWrapper = document.querySelector(".header-wrapper");
const lookingForList = document.querySelector(".looking-for__list");
const lookingForContent = document.querySelector(".looking-for__content");
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
        let popularBage = `<span></span>`;
        if (offer.hasPopularBage) {
            popularBage = `<div class="bage font-card-accent cursor-p" data-v-46445f2c="">
                          <svg
                            width="16"
                            height="16"
                            viewbox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon"
                            data-v-46445f2c=""
                          >
                            <path
                              d="M12.9261 6.16895C12.897 6.11765 12.8548 6.07498 12.8039 6.04529C12.7529 6.0156 12.695 5.99995 12.6361 5.99995H8.26939L9.00147 0.406369C9.00932 0.331508 8.99176 0.256181 8.9516 0.192517C8.91144 0.128853 8.85102 0.0805566 8.78008 0.0554039C8.70913 0.0302511 8.63178 0.0297056 8.56049 0.0538553C8.4892 0.0780049 8.42811 0.125444 8.38705 0.188536L3.07672 9.49204C3.04567 9.54254 3.02865 9.60042 3.02742 9.6597C3.02618 9.71898 3.04079 9.77751 3.06972 9.82926C3.09864 9.88102 3.14085 9.92412 3.19199 9.95412C3.24313 9.98413 3.30135 9.99995 3.36064 9.99995H7.66205L7.08189 15.602C7.07618 15.6766 7.0956 15.7509 7.13704 15.8132C7.17847 15.8755 7.23956 15.9222 7.31056 15.9457C7.38157 15.9693 7.45843 15.9685 7.5289 15.9433C7.59937 15.9182 7.65941 15.8702 7.69947 15.807L12.9221 6.50454C12.9523 6.45395 12.9687 6.39624 12.9694 6.33729C12.9701 6.27833 12.9551 6.22025 12.9261 6.16895Z"
                              fill="white"
                              data-v-46445f2c=""
                            ></path>
                          </svg>

                          Рекомендуем
                        </div>`;
        }
        return `		<a href="${offer.redirect_link}" class="offer qiwi" data-v-46445f2c="">
                        ${popularBage}
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

// const handleTouchStart = (e) => {
//     startX = e.touches[0].clientX;
// };

// const handleTouchMove = (e) => {
//     endX = e.touches[0].clientX;
// };

// const handleTouchEnd = () => {
//     if (Math.abs(startX - endX) < 30) return;
//     if (startX > endX) moveToSide("right");
//     if (startX < endX) moveToSide("left");
// };

// lookingForContent.addEventListener("touchstart", handleTouchStart);
// lookingForContent.addEventListener("touchmove", handleTouchMove);
// lookingForContent.addEventListener("touchend", handleTouchEnd);
