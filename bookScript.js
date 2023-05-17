const item_cart = {};
var ALL_BOOKS = [];

const addCart = (title) => {
  console.log(title);
  item_cart[title] = item_cart[title] ? item_cart[title] + 1 : 1;
  cart_list(item_cart);
};
const deleteCart = (title) => {
  if (item_cart[title] > 1) {
    item_cart[title] = item_cart[title] - 1;
  } else {
    delete item_cart[title];
  }
  cart_list(item_cart);
};

const book_card = (data) => {
  return `<div class="book-card">
                    <div class="book-card-img">
                        <img class="img" src=${data?.formats["image/jpeg"]} />
                    </div>
                    <div class="book-card-body">
                        <p>${data.title}</p>
                        <p>${data.authors[0].name}</p>
                        <p>Price : 30$</p>
                        <button onclick=addCart('${data.title
                          .replace(/[^a-zA-Z ]/g, "")
                          .split(" ")
                          .join("_")}')> add to card</button>
                    </div>
                </div>`;
};

const author_card = (data) => {
  return `
                    <input type="checkbox" name="author-check" id=${data?.name}>
                    <label class="truncate" style="padding-left: 10px;" for=${data?.name}>${data?.name}</label>
                    <label style="padding-left: 10px;" for=${data?.name}>${data?.total}</label>
                
                `;
};

const cart_card = (data) => {
  return `
                    <p class="truncate" >${data?.title}</p>
                    <p>${data?.count}</p>
                    <div>
                    <button onclick=deleteCart('${data.title}')>-</button>
                    <button onclick=addCart('${data.title}')>+</button>
                    </div>
  `;
};

const book_list = (data) => {
  const div = document.getElementById("books");
  div.innerHTML = "";
  data.forEach((element) => {
    console.log(element);
    const el = document.createElement("div");
    el.innerHTML = book_card(element);
    div.appendChild(el);
  });
};

const author_list = (data) => {
  const div = document.getElementById("authors");
  const authors = {};
  data.forEach((element) => {
    element.authors.forEach((author) => {
      authors[author.name] = authors[author.name]
        ? authors[author.name] + 1
        : 1;
    });
  });
  Object.keys(authors).forEach((author) => {
    const el = document.createElement("div");
    el.classList.add("author-card");
    el.innerHTML = author_card({ name: author, total: authors[author] });
    div.appendChild(el);
  });
};

const cart_list = (carts) => {
  const div = document.getElementById("carts");
  div.innerHTML = "";

  Object.keys(carts).forEach((cart) => {
    const el = document.createElement("div");
    el.classList.add("cart-card");
    el.innerHTML = cart_card({ title: cart, count: carts[cart] });
    div.appendChild(el);
  });
};
const render_book_list = async (url) => {
  fetch("https://gutendex.com/books/")
    .then((response) => response.json())
    .then((res) => {
      ALL_BOOKS = res.results;
      book_list(res.results);
      author_list(res.results);
    });
};

render_book_list();
