(() => {
  // <span class="dropPlacePart"></span> - где нужно пустое место

  const textForRender = [
    {
      id: 1,
      title: "Seva",

      text: 'I go to school five days a week. I like school. We learn many things. I have four lessons on M <span class="dropPlacePart"></span>, W <span class="dropPlacePart"></span> and Fridays. We read, <span class="dropPlacePart"></span> and write every day. On Tuesdays and T<span class="dropPlacePart"></span> I have five lessons. We learn English and sing. We do sports <span class="dropPlacePart"></span> days a week. On Saturdays and Sundays I read <span class="dropPlacePart"></span> and play games.',

      tag: "",
    },
    {
      id: 2,
      title: "Polina",

      text: 'I have school <span class="dropPlacePart"></span> days a week. I am a good student. I have five lessons on T<span class="dropPlacePart"></span>, Wednesdays and Thursdays. We count, write and learn <span class="dropPlacePart"></span>. On Mondays, F<span class="dropPlacePart"></span> and Saturdays I have four lessons. <span></span> We read and learn French. We draw and do <span class="dropPlacePart"></span>on Wednesdays, Thursdays and S<span class="dropPlacePart"></span>. On Mondays, Tuesdays and Fridays we <span class="dropPlacePart"></span> and sing. On Sundays I <span class="dropPlacePart"></span> all day long.',
      tag: "",
    },
  ];

  const dragTextForRender = [
    {
      id: 1,
      text: "ednesdays",
      tag: [2],
    },
    {
      id: 2,
      text: "books",
      tag: [6],
    },
    {
      id: 3,
      text: "sports",
      tag: [11],
    },
    {
      id: 4,
      text: "sleep",
      tag: [14],
    },
    {
      id: 5,
      text: "count",
      tag: [3],
    },
    {
      id: 6,
      text: "hursdays",
      tag: [4],
    },
    {
      id: 7,
      text: "ondays",
      tag: [1],
    },
    {
      id: 8,
      text: "three",
      tag: [5],
    },
    {
      id: 9,
      text: "aturdays",
      tag: [12],
    },
    {
      id: 10,
      text: "six",
      tag: [7],
    },
    {
      id: 11,
      text: "ridays",
      tag: [10],
    },
    {
      id: 12,
      text: "dance",
      tag: [13],
    },
    {
      id: 13,
      text: "uesdays",
      tag: [8],
    },
    {
      id: 14,
      text: "English",
      tag: [9],
    },
  ];

  let draggingItem;
  let elemBelow;

  const taskWrapper = document.getElementById("task-3");

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

  const allSpans = taskWrapper.querySelectorAll(".dropPlacePart");

  dragBox.addEventListener("pointerdown", mouseDown);
  btnReset.addEventListener("click", onBtnResetClick);
  btnTest.addEventListener("click", onBtnTestClick);

  function onBtnResetClick() {
    [...dropBox.children].forEach((item) => {
      [...item.children].forEach((elem) => {
        [...elem.children].forEach((element) => {
          if (element.children.length > 0) {
            dragBox.appendChild(element.children[0]);
          }
        });
      });
    });

    controlsBox.style = "";
    infoBox.textContent = "";
    draggingItem = null;
  }

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
    draggingItem = null;
  }

  function createDragPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `
                    <span class='dragPlace' drag-data=${picture.tag}>
                   ${picture.text}
                    </span>
                                          `;
      })
      .join("");
  }
  function createDropPictureCardsMarkup(pictures) {
    return pictures
      .map((picture) => {
        return `<div class="dropPlace" drop-data=${picture.tag} >
        <h3 class="dropPlaceTitle">${picture.title}</h3>

        <p class="dropPlaceText" drag-data=${picture.tag}>${picture.text}</p>
        </div>
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
    // находим индекс элемента, который берем в списке отрисованных. dragBox - контейнер для перетаскиваемых элементов
    const findIdx = [...dragBox.children].findIndex(
      (el) => el === draggingItem
    );

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
      dragAppend(dragBox, draggingItem, findIdx);

      window.removeEventListener("pointerup", moveOut);
      document.removeEventListener("pointermove", onMouseMove);
    }

    draggingItem.onpointerup = function () {
      draggingItem.style.cursor = "grab";
      if (clickWithoutMove) {
        dragAppend(dragBox, draggingItem, findIdx);

        return document.removeEventListener("pointermove", onMouseMove);
      }
      document.removeEventListener("pointermove", onMouseMove);

      if (elemBelow.classList.contains("dropPlacePart")) {
        dropAppend(elemBelow, draggingItem);
      } else {
        dragAppend(dragBox, draggingItem, findIdx);
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
