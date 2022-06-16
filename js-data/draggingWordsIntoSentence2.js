(() => {
  const textForRender = [
    {
      id: 1,
      text: "On Sunday <span class='dropPlacePart'></span> <span class='dropPlacePart'></span>",
    },
    {
      id: 2,
      text: "<span class='dropPlacePart'></span> <span class='dropPlacePart'></span> on Sunday",
    },
    {
      id: 3,
      text: "<span class='dropPlacePart'></span> <span class='dropPlacePart'></span> on Monday",
    },
    {
      id: 4,
      //   text: "<p>I like to <span class=''></span> with my <span></span></p>",
      text: "On Monday <span class='dropPlacePart'></span> <span class='dropPlacePart'></span>",
    },
    {
      id: 5,
      text: "On Tuesday <span class='dropPlacePart'></span> <span class='dropPlacePart'></span>",
    },
    {
      id: 6,
      text: "<span class='dropPlacePart'></span> <span class='dropPlacePart'></span> on Tuesday",
    },
    {
      id: 7,
      text: "<span class='dropPlacePart'></span> <span class='dropPlacePart'></span> on Wednesday",
    },
    {
      id: 8,
      //   text: "<p>I like to <span class=''></span> with my <span></span></p>",
      text: "On Wednesday <span class='dropPlacePart'></span> <span class='dropPlacePart'></span>",
    },
    {
      id: 9,
      text: "<span class='dropPlacePart'></span> <span class='dropPlacePart'></span> on Thursday",
    },
    {
      id: 10,
      text: "On Thursday <span class='dropPlacePart'></span> <span class='dropPlacePart'></span>",
    },
    {
      id: 11,
      text: "On Friday <span class='dropPlacePart'></span> <span class='dropPlacePart'></span>",
    },
    {
      id: 12,
      //   text: "<p>I like to <span class=''></span> with my <span></span></p>",
      text: "<span class='dropPlacePart'></span> <span class='dropPlacePart'></span> on Friday",
    },
    {
      id: 13,
      text: "On Saturday <span class='dropPlacePart'></span> <span class='dropPlacePart'></span>",
    },
    {
      id: 14,
      text: "<span class='dropPlacePart'></span> <span class='dropPlacePart'></span> 	on Saturday",
    },
  ];

  const dragTextForRender = [
    {
      id: 1,
      text: "I",
      tag: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
    },
    {
      id: 2,
      text: "do homework",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 3,
      text: "do sports",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 4,
      text: "eat ice-cream",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 5,
      text: "feed birds",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 6,
      text: "go home",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 7,
      text: "go to school",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 8,
      text: "have fun",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 9,
      text: "I have school",
      tag: [0],
    },
    {
      id: 10,
      text: "learn English",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 11,
      text: "meet friends",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 12,
      text: "play computer games",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 13,
      text: "read books",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 14,
      text: "sleep all day long",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
    {
      id: 15,
      text: "watch cartoons",
      tag: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28],
    },
  ];

  let draggingItem;
  let elemBelow;

  const taskWrapper = document.getElementById("task-2");

  const btnReset = taskWrapper.querySelector(".resetBtn");

  const btnTest = taskWrapper.querySelector(".checkBtn");

  const controlsBox = taskWrapper.querySelector(".show-answer-controls");

  const infoBox = taskWrapper.querySelector(".show-answer-info");

  const dropBox = taskWrapper.querySelector(".dropPlaceWrapper");

  const dragBox = taskWrapper.querySelector(".dragPlaceWrapper");

  dropBox.insertAdjacentHTML(
    "beforeend",
    createDropPictureCardsMarkup(textForRender)
  );
  dragBox.insertAdjacentHTML(
    "beforeend",
    createDragPictureCardsMarkup(shuffleCards([...dragTextForRender]))
  );

  dragBox.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      [...item.children].forEach((elem) => {
        if (elem.children.length > 0) {
          elem.removeChild(elem.children[0]);
        }
      });
    });

    controlsBox.style = "";
    infoBox.textContent = "";
    draggingItem = null;
  }

  const allSpans = taskWrapper.querySelectorAll(".dropPlacePart");

  function onBtnTestClick() {
    let winCount = 0;

    [...allSpans].forEach((el, index) => {
      if (
        el.children[0]?.attributes
          .getNamedItem("drag-data")
          .value.includes(String(index + 1))
      ) {
        winCount += 1;
      }
    });

    if (winCount === [...allSpans].length) {
      controlsBox.style.backgroundColor = "lightgreen";
      infoBox.textContent = "👍 Молодец!";
    } else {
      controlsBox.style.backgroundColor = "lightpink";
      infoBox.textContent = "❌ Попробуй еще!";
    }
    // draggingItem = null;
  }

  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `
                    <p class='dragPlace' drag-data=${picture.tag}>
                   ${picture.text}
                    </p>
                                          `;
      })
      .join("");
  }
  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `<p class="dropPlace" drop-data=${picture.tag} >

                    ${picture.text}
                    </p>
                    `;
      })
      .join("");
  }

  function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  function mouseDown(event) {
    if (event.button !== 0) return;

    if (!event.target.classList.contains("dragPlace")) return;
    draggingItem = event.target;

    draggingItem.style.touchAction = "none";
    draggingItem.style.cursor = "grabbing";
    let shiftX = event.clientX - draggingItem.getBoundingClientRect().left;
    let shiftY = event.clientY - draggingItem.getBoundingClientRect().top;

    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА)

    let limits = {
      top: taskWrapper.offsetTop,
      right: taskWrapper.offsetWidth + taskWrapper.offsetLeft,
      bottom: taskWrapper.offsetHeight + taskWrapper.offsetTop,
      left: taskWrapper.offsetLeft,
    };

    draggingItem = draggingItem.cloneNode(true);

    draggingItem.style.position = "absolute";
    draggingItem.style.zIndex = 1000;

    taskWrapper.appendChild(draggingItem);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      draggingItem.style.left = pageX - shiftX + "px";
      draggingItem.style.top = pageY - shiftY + "px";
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    let clickWithoutMove = true;
    function onMouseMove(event) {
      let newLocation = {
        x: limits.left,
        y: limits.top,
      };
      if (event.pageX > limits.right) {
        newLocation.x = limits.right;
      } else if (event.pageX > limits.left) {
        newLocation.x = event.pageX;
      }
      if (event.pageY > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (event.pageY > limits.top) {
        newLocation.y = event.pageY;
      }

      clickWithoutMove = false;
      moveAt(newLocation.x, newLocation.y);

      if (!event.path.includes(draggingItem)) {
        window.addEventListener("pointerup", moveOut);
      }
      if (event.path.includes(draggingItem)) {
        window.removeEventListener("pointerup", moveOut);
      }

      draggingItem.style.visibility = "hidden";
      elemBelow = document.elementFromPoint(event.clientX, event.clientY);

      draggingItem.style.visibility = "visible";

      if (!elemBelow) return;
    }
    document.addEventListener("pointermove", onMouseMove);

    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
      const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);

      if (elemUnderPount !== draggingItem) {
        draggingItem.remove();

        // taskWrapper.removeChild(draggingItem);
      }

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }

    // draggingItem.onpointerup = function () {
    taskWrapper.onpointerup = function () {
      if (draggingItem) draggingItem.style.cursor = "grab";
      if (clickWithoutMove) {
        // taskWrapper.removeChild(draggingItem);
        draggingItem.remove();

        return document.removeEventListener("pointermove", onMouseMove);
      }
      document.removeEventListener("pointermove", onMouseMove);

      if (elemBelow.classList.contains("dropPlacePart")) {
        dropAppend(elemBelow, draggingItem);
      } else {
        // taskWrapper.removeChild(draggingItem);
        draggingItem.remove();
      }
    };
  }
  function changeStylesAndAppend(dropPlace, draggingElem) {
    draggingElem.style.position = "relative ";
    draggingElem.style.zIndex = null;
    draggingElem.style.top = null;
    draggingElem.style.left = null;
    dropPlace.appendChild(draggingElem);
  }
  // функция для смены стилей
  function changeStyles(draggingElem) {
    draggingElem.style.position = "relative ";
    draggingElem.style.zIndex = null;
    draggingElem.style.top = null;
    draggingElem.style.left = null;
  }

  // функция для возврата элемента в первоначальную область
  function dragAppend(dropPlace, draggingElem, findIdx) {
    const referenceElement = [...dropPlace.children][findIdx];
    dropPlace.insertBefore(draggingElem, referenceElement);
    changeStyles(draggingElem);
  }

  // функция для размещения элемента в области, куда его перетаскивают
  function dropAppend(dropPlace, draggingElem) {
    dropPlace.appendChild(draggingElem);
    changeStyles(draggingElem);
  }
})();
